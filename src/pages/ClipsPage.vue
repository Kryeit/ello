<script setup>
import FileUpload from "@/components/FileUpload.vue";
import {computed, ref} from "vue";
import {useToast} from "primevue";

const toast = useToast();

const uploadClipDialogVisible = ref(false);
const selectedFile = ref();
const submitter = ref("");
const coordinateX = ref();
const coordinateY = ref();
const description = ref("");
const submitStatus = ref("done");
const error = ref("");

const uploading = ref(false);
const uploadProgress = ref(0);
let uploadFilename;

function onFileSelected({files}) {
  selectedFile.value = files[0];

  submitter.value = "";
  coordinateX.value = null;
  coordinateY.value = null;
  description.value = "";

  uploadClipDialogVisible.value = true;

  if (["error", "done"].includes(submitStatus.value)) {
    startUpload().then();
    submitStatus.value = "uploading";
  }
}

async function submit() {
  submitStatus.value = "processing";

  const response = await fetch("/api/events/clips/save-clip", {
    body: JSON.stringify({
      filename: uploadFilename,
      submitter: submitter.value,
      description: description.value,
      coordinateX: coordinateX.value === null ? 0 : coordinateX.value,
      coordinateY: coordinateY.value === null ? 0 : coordinateY.value
    }),
    method: "POST"
  });

  if (!response.ok) {
    error.value = await response.text();
    toast.add({severity: "error", summary: "Failed to submit clip", detail: error.value, life: 3000});
    submitStatus.value = "error";
  } else {
    submitStatus.value = "done";
  }
}

async function startUpload() {
  try {
    uploading.value = true;

    const uploadUrlData = await fetch("/api/events/clips/upload-url", {
      method: "POST"
    }).then(res => res.json());

    const request = new XMLHttpRequest();
    request.upload.onprogress = e => uploadProgress.value = e.loaded / e.total;

    const uploadPromise = new Promise((res) => {
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          res();
        }
      }
    });

    uploadFilename = uploadUrlData.name;
    request.open("POST", uploadUrlData.url);
    request.send(selectedFile.value);
    await uploadPromise;
  } finally {
    uploading.value = false;
  }
}

const formInvalid = computed(() => {
  return selectedFile.value?.size >= 500 * 1024 * 1024
      || submitter.value.trim().length === 0
      || submitter.value.trim().length >= 100
      || (typeof coordinateX.value === 'number') !== (typeof coordinateY.value === 'number')
      || description.value.trim().length === 0
      || description.value.trim().length >= 1000;
});
</script>

<template>
  <div>
    <h1 class="text-2xl mb-4">Clips Event</h1>

    <h1>Upload short clips of anything you like, roleplay moments or cinematic shots of beautiful places.</h1>
    <h1>You can submit edited clips or simply raw footage, but all clips must be centered around Kryeit</h1>
    <h1>Kryeit members then vote for clips in our Discord server until xxth of xx 2026. The highest voted clips will be
      compiled into a trailer.</h1>
    <br>
    <h1>Clips should be between 10 to 20 seconds long</h1>
    <h1>Aspect ratio must be 16/9 and a resolution of 1920x1080 or better is preferred</h1>

    <FileUpload class="mt-4" @select="onFileSelected"/>

    <Dialog v-model:visible="uploadClipDialogVisible" modal header="Submit Clip" :style="{ width: '25rem' }">
      <template v-if="submitStatus === 'uploading'">
        <Message v-if="selectedFile?.size >= 500 * 1024 * 1024" severity="error">File must be smaller than 500 MB
        </Message>

        <div class="flex flex-col gap-2 mb-4!">
          <label for="submitter" class="font-semibold w-24">Submitter</label>
          <h1 class="text-xs text-gray-400">Can be your name or a group/post</h1>
          <InputText id="submitter" v-model="submitter"/>
          <Message v-if="submitter.trim().length === 0" severity="error">Please enter a name</Message>
          <Message v-if="submitter.trim().length >= 100" severity="error">Submitter is too long</Message>
        </div>

        <div class="flex flex-col gap-2 mb-4!">
          <h1 class="font-semibold w-24">Coordinates</h1>
          <h1 class="text-xs text-gray-400">The area where this clip has been recorded (optional)</h1>

          <InputGroup>
            <InputGroupAddon>X</InputGroupAddon>
            <InputNumber v-model="coordinateX" :use-grouping="false"/>
            <InputGroupAddon>Y</InputGroupAddon>
            <InputNumber v-model="coordinateY" :use-grouping="false"/>
          </InputGroup>

          <Message v-if="(typeof coordinateX === 'number') !== (typeof coordinateY === 'number')" severity="error">Enter
            both coordinates
          </Message>
        </div>

        <div class="flex flex-col gap-2 mb-4!">
          <label for="submitter" class="font-semibold w-24">Description</label>
          <h1 class="text-xs text-gray-400">Provide a bit of context for your clip</h1>
          <Textarea id="submitter" v-model="description" :rows="4"/>
          <Message v-if="description.trim().length === 0" severity="error">Please enter a description</Message>
          <Message v-if="description.trim().length >= 1000" severity="error">Description is too long</Message>
        </div>

        <div>
          <h1 v-if="uploading">Uploading...</h1>
          <ProgressBar v-if="uploading" :value="Math.round(uploadProgress * 100)"/>
          <Button class="mt-2" :disabled="uploading || formInvalid" fluid label="Submit" @click="submit()"/>
        </div>
      </template>

      <template v-else-if="submitStatus === 'processing'">
        <h1 class="text-center">We are currently processing your clip</h1>

        <h1 class="text-center text-gray-400 text-sm">This may take several minutes</h1>
        <h1 class="text-center text-gray-400 text-sm">Please do not close this tab while your clip is processing</h1>
      </template>

      <template v-else-if="submitStatus === 'error'">
        <h1 class="text-center">An error occurred while processing your clip</h1>
        <h1 class="text-red-500">{{ error }}</h1>

        <Button class="mt-4" label="Close" fluid @click="uploadClipDialogVisible = false"/>
      </template>

      <template v-else>
        <h1 class="text-center">Your clip has been processed successfully and will appear on Discord promptly</h1>
        <Button class="mt-4" label="Close" fluid @click="uploadClipDialogVisible = false"/>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>

</style>