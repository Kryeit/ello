<script setup>
import AuthService from "@/js/auth/authService.js";
import FileUpload from "@/components/FileUpload.vue";
import {ref, watch} from "vue";
import {addToast} from "@/js/toasts.js";
import {Toast as PrimeToast, useConfirm, useToast} from "primevue";
import draggable from 'vuedraggable';
import {textToHTML} from "@sfirew/minecraft-motd-parser";
import {areStringArraysEqual} from "@/utils.js";

const toast = useToast();
const confirm = useConfirm();

const songs = ref([]);
const addSongDialogVisible = ref(false);
const selectedFile = ref();
const uploadProgress = ref(0);
const uploading = ref(false);
const newSongName = ref("");

const discordAccount = ref();
const connectDiscordDialogVisible = ref(false);
const connectDiscordOTP = ref();
const connectingDiscord = ref(false);

const availableRoles = ref([]);
const roles = ref([]);
const savingRoles = ref(false);

function onFileSelected({files}) {
  selectedFile.value = files[0];
  addSongDialogVisible.value = true;

  uploading.value = false;
  uploadProgress.value = 0;
  newSongName.value = "";
}

watch(AuthService.user, val => {
  if (val === undefined) return;

  fetch("/api/account/songs").then(res => res.json()).then(songData => {
    songs.value = songData;
  });

  fetchDiscordConnection().then();

  fetch("/api/account/roles/available").then(res => res.json()).then(roles => {
    availableRoles.value = roles.filter(r => !val.roles.find(rr => rr.id === r.id));
  });

  roles.value = val.roles;
}, {immediate: true});

watch(AuthService.validatingLogin, val => {
  if (!val && !AuthService.user.value) {
    AuthService.loginShown.value = true;
  }
}, {immediate: true});

async function fetchDiscordConnection() {
  return fetch("/api/account/connections/discord").then(res => res.json()).then(account => {
    discordAccount.value = account;
  });
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

async function connectDiscord() {
  try {
    connectingDiscord.value = true;
    const encodedCode = encodeURIComponent(connectDiscordOTP.value.replace(" ", ""));

    const response = await fetch("/api/account/connections/discord/connect?otp=" + encodedCode, {
      method: "POST"
    });

    if (!response.ok) {
      toast.add({summary: "Failed to connect Discord", detail: await response.text(), life: 3000});
      return;
    }

    await fetchDiscordConnection();
    connectDiscordDialogVisible.value = false;
  } finally {
    connectingDiscord.value = false;
  }
}

async function disconnectDiscord() {
  confirm.require({
    message: `Do you want to disconnect Discord?`,
    header: "Disconnect",
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Disconnect',
      severity: 'danger'
    },
    accept: async () => {
      await fetch(`/api/account/connections/discord`, {
        method: "DELETE"
      });
      discordAccount.value = null;
    }
  });
}

function checkRoleMove(event) {
  return event.from === event.to || roles.value.length < 3;
}

async function saveRoles() {
  try {
    savingRoles.value = true;

    const response = await fetch("/api/account/roles", {
      method: "PATCH",
      body: JSON.stringify(roles.value.map(r => r.id))
    });

    if (!response.ok) toast.add({
      summary: "Failed to save roles",
      detail: await response.text(),
      life: 3000,
      severity: "error"
    });
    else {
      AuthService.user.value.roles = roles.value;
    }
  } finally {
    savingRoles.value = false;
  }
}
</script>

<template>
  <template v-if="AuthService.user">
    <h1 class="text-xl mb-8!">Hello {{ AuthService.user.value?.username }}</h1>

    <h1 class="text-xl">Your Connections</h1>
    <div class="rounded-lg p-2 bg-zinc-800 mb-8!">
      <h1 class="mb-2! text-lg">Discord</h1>
      <div v-if="discordAccount?.avatarURL" class="flex items-center gap-2">
        <img class="rounded-full h-12" :src="discordAccount.avatarURL">
        <h1 class="text-zinc-400">{{ discordAccount.name }}</h1>
        <Button class="ml-auto!" icon="pi pi-times" severity="danger" size="small" @click="disconnectDiscord"/>
      </div>
      <div v-else>
        <Button icon="pi pi-plus" size="small" label="Connect Discord"
                @click="connectDiscordOTP = ''; connectDiscordDialogVisible = true"/>
      </div>
    </div>

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

    <h1 class="text-lg mt-8!">Visible Badges</h1>
    <draggable
        class="flex flex-row rounded-lg bg-zinc-800 h-14 mb-2!"
        v-model="roles"
        group="people"
        item-key="id"
        :sort="true">
      <template #item="{element}">
        <div class="p-4 hover:outline rounded-lg">
          <a v-html="textToHTML(element.prefix)"></a>
        </div>
      </template>
    </draggable>
    <Message severity="error">You can choose up to three badges</Message>

    <h1 class="text-lg">Available Badges</h1>

    <draggable
        v-model="availableRoles"
        group="people"
        item-key="id"
        :sort="true"
        :move="checkRoleMove">
      <template #item="{element}">
        <div class="p-4 flex gap-2 items-center hover:outline rounded-lg w-fit">
          <a v-html="textToHTML(element.prefix)"></a>
          <h1>{{ element.name }}</h1>
        </div>
      </template>
    </draggable>
    <Button label="Save" icon="pi pi-save"
            :disabled="areStringArraysEqual(roles.map(r => r.id), AuthService.user.value.roles.map(r => r.id))"
            :loading="savingRoles" @click="saveRoles"/>

    <!--    INVISIBLE -->
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

    <Dialog v-model:visible="connectDiscordDialogVisible" modal header="Connect Discord" :style="{ width: '25rem' }">
      <div class="flex flex-col gap-2 mb-4!">
        <label for="otp" class="font-semibold w-24">OTP</label>
        <InputText v-model="connectDiscordOTP" id="otp"/>
        <Message v-if="connectDiscordOTP.trim().length === 0" severity="error">Please enter a otp</Message>
      </div>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="connectDiscordDialogVisible = false"></Button>
        <Button :loading="connectingDiscord" :disabled="connectDiscordOTP.trim().length === 0" type="button"
                label="Connect" @click="connectDiscord"></Button>
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
