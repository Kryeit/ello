<template>
  <div class="server-ip">
    <div class="copy-input-container">
      <div class="input-container" @click="copyText">
        <input ref="textInput" type="text" v-model="text" readonly>
        <span class="cursor">_</span>
      </div>
      <button @click="copyTextWithoutSelection">
        <img src="/src/assets/map.png" alt="Copy" />
      </button>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import clickSound from '@/assets/sounds/click.ogg';

const textInput = ref(null);
const text = ref('kryeit.com');
const sound = ref(new Audio(clickSound));

async function copyText() {
  if (textInput.value) {
    textInput.value.select();
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
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}
</script>

<style scoped>
.copy-input-container {
  display: flex;
  justify-content: center;
  padding: 20px 20px;
  width: 100%;
}

.input-container {
  position: relative;
  display: inline-block;
  padding-right: 8px;
}

input[type="text"] {
  width: 14ch;
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
  background-image: url('/src/assets/squared_button.png');
  background-size: contain ;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  cursor: pointer;
}

button img {
  width: 30px;
  height: 30px;
  image-rendering: pixelated;
}

button:hover {
  background-image: url('/src/assets/squared_button_hover.png');
}


.server-ip {
  position: relative;
  border: 4px solid black;
  border-radius: 12px;
  display: flex;
  align-items: center;
  background-image: url('/src/assets/dirt.png');
  background-size: 100px 100px;
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
