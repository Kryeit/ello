<script setup>
import AuthService from "@/js/auth/authService.js";
import FileUpload from "@/components/FileUpload.vue";
import {ref, watch} from "vue";
import {addToast} from "@/js/toasts.js";
import {Toast as PrimeToast, useConfirm, useToast} from "primevue";

const toast = useToast();
const confirm = useConfirm();

const songs = ref([]);
const addSongDialogVisible = ref(false);
const selectedFile = ref();
const uploadProgress = ref(0);
const uploading = ref(false);
const newSongName = ref("");

watch(AuthService.user, val => {
  if (val) {
    fetch("/api/account/songs").then(res => res.json()).then(songData => {
      songs.value = songData;
    });
  }
}, {immediate: true});
watch(AuthService.validatingLogin, val => {
  if (!val && !AuthService.user.value) {
    AuthService.loginShown.value = true;
  }
}, {immediate: true});

function onFileSelected({files}) {
  selectedFile.value = files[0];
  addSongDialogVisible.value = true;

  uploading.value = false;
  uploadProgress.value = 0;
  newSongName.value = "";
}

async function uploadSong() {
  try {
    uploading.value = true;

    const uploadUrlData = await fetch("/api/usercontent/upload-url", {
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

    request.open("POST", uploadUrlData.url);
    request.send(selectedFile.value);
    await uploadPromise;

    const newSongResponse = await fetch("/api/account/songs", {
      method: "POST",
      body: JSON.stringify({
        name: newSongName.value,
        fileName: uploadUrlData.name
      })
    });

    if (!newSongResponse.ok) {
      toast.add({severity: "error", summary: "Failed to add song", detail: await newSongResponse.text(), life: 3000});
    } else {
      songs.value.push(await newSongResponse.json());
      addSongDialogVisible.value = false;
    }
  } finally {
    uploading.value = false;
  }
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
  addToast('map.png', "Song url copied to your clipboard", "");
}

async function deleteSong(song) {
  confirm.require({
    message: `Do you want to delete ${song.name}?`,
    header: "Delete",
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      await fetch(`/api/account/songs/${song.songID}`, {
        method: "DELETE"
      });
      songs.value = songs.value.filter(item => item.songID !== song.songID);
    }
  });
}

function openLogin() {
  AuthService.loginShown.value = true;
}

function isAddSongDialogValid() {
  return selectedFile.value.size < 10 * 1024 * 1024 && newSongName.value.trim().length > 0;
}
</script>

<template>
  <template v-if="AuthService.user.value">
    <h1 class="text-xl">Hello {{ AuthService.user.value?.username }}</h1>

    <h1 class="text-xl">Your Songs ({{ songs.length }} / 5)</h1>
    <div class="mb-2!">
      <div v-for="song in songs" class="flex items-center p-2 rounded-lg bg-zinc-800 mb-2!">
        <div>
          <h1 class="text-lg">{{ song.name }}</h1>
          <h1 class="text-sm text-zinc-400">{{ new Date(song.uploadedAt).toLocaleString() }}</h1>
        </div>

        <div class="ml-auto!">
          <ButtonGroup>
            <Button size="small" severity="secondary" label="Copy URL" @click="copyText(song.downloadUrl)"/>
            <Button size="small" severity="danger" icon="pi pi-trash" @click="deleteSong(song)"/>
          </ButtonGroup>
        </div>
      </div>
    </div>

    <Message v-if="songs.length === 5" severity="error">You cannot upload more than 5 songs</Message>
    <FileUpload v-else @select="onFileSelected"/>

    <Dialog v-model:visible="addSongDialogVisible" modal header="Add Song" :style="{ width: '25rem' }">
      <Message v-if="selectedFile?.size >= 10 * 1024 * 1024" severity="error">File must be smaller than 10 MB</Message>

      <div class="flex flex-col gap-2 mb-4!">
        <label for="name" class="font-semibold w-24">Name</label>
        <InputText v-model="newSongName" id="name"/>
        <Message v-if="newSongName.trim().length === 0" severity="error">Please enter a name</Message>
      </div>

      <ProgressBar v-if="uploading" :value="Math.round(uploadProgress * 100)"/>

      <div class="flex justify-end gap-2">
        <Button :disabled="uploading" type="button" label="Cancel" severity="secondary"
                @click="addSongDialogVisible = false"></Button>
        <Button :loading="uploading" :disabled="!isAddSongDialogValid()" type="button" label="Save"
                @click="uploadSong"></Button>
      </div>
    </Dialog>
  </template>

  <div v-else class="flex flex-col items-center gap-2">
    <div>
      <i class="rounded-full bg-zinc-800 aspect-square p-8 text-8xl! pi pi-user"/>
    </div>
    <h1 class="text-xl">You are not logged in</h1>
    <h1>Login to view this page</h1>
    <Button label="Login" @click="openLogin"/>
  </div>

  <PrimeToast/>
  <ConfirmDialog/>
</template>

<style scoped>

</style>
