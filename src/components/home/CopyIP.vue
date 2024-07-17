<script setup>
import {ref} from 'vue';
import {i18n} from "@/main.js";
import clickSound from '@/assets/sounds/click.ogg';
import {addToast} from "@/javascript/toasts.js";

const textInput = ref(null);
const text = ref('kryeit.com');
const sound = ref(new Audio(clickSound));

async function copyText() {
  if (textInput.value) {
    textInput.value.select();
    addToast('map.png', i18n.global.t("home.how-to-join.copy-ip.title"), i18n.global.t("home.how-to-join.copy-ip.description"));
    try {
      await navigator.clipboard.writeText(text.value);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}

async function copyTextWithoutSelection() {
  if (textInput.value) {
    try {
      await navigator.clipboard.writeText(text.value);
      await sound.value.play();
      addToast('map.png', i18n.global.t("home.how-to-join.copy-ip.title"), i18n.global.t("home.how-to-join.copy-ip.description"));

    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}
</script>

<template>
  <div class="server-ip">
    <div class="copy-input-container">
      <div class="input-container" @click="copyText">
        <input ref="textInput" type="text" v-model="text" readonly>
        <span class="cursor">_</span>
      </div>
      <button @click="copyTextWithoutSelection">
        <img src="/src/assets/toast/map.png" alt="Copy" />
      </button>
    </div>
  </div>

</template>

<style scoped>
.copy-input-container {
  display: flex;
  justify-content: center;
  padding: 20px 50px;
  width: 100%;
}

.input-container {
  position: relative;
  display: inline-block;
  padding-right: 8px;
}

input[type="text"] {
  width: 13.3ch;
  padding: 9px;
  border: 2px solid white;
  background: black;
  border-radius: 0;
  box-sizing: border-box;
  color: white;
  font-family: 'Minecraftia', sans-serif;
  outline: none;
}

.cursor {
  position: absolute;
  right: 43px;
  top: 53%;
  transform: translateY(-50%);
  color: white;
  animation: blink 0.8s infinite;
  user-select: none;
  font-family: 'Minecraftia', sans-serif;
}

@keyframes blink {
  0% {opacity: 1;}
  50% {opacity: 0;}
  100% {opacity: 1;}
}

button {
  width: 42px;
  height: 42px;
  border: none;
  background-image: url('/src/assets/minecraft/squared_button.png');
  background-size: cover;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  cursor: pointer;
  user-select: none;
  margin-top: 1px;
}

button img {
  width: 30px;
  height: 30px;
  image-rendering: pixelated;
}

button:hover {
  background-image: url('/src/assets/minecraft/squared_button_hover.png');
}

.server-ip {
  position: relative;
  border: 4px solid black;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-image: url('/src/assets/minecraft/dirt.png');
  background-size: 100px 100px;
  background-repeat: repeat;
  image-rendering: pixelated;
  margin: 20px;
}

.server-ip::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.server-ip > * {
  position: relative;
  z-index: 1;
}

</style>
