<template>
  <div class="copy-input-container">
    <input ref="textInput" type="text" v-model="text" readonly>
    <button @click="copyText">Copy IP</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const textInput = ref(null);
const text = ref('kryeit.com');

function copyText() {
  if (textInput.value) {
    textInput.value.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
}
</script>

<style scoped>
.copy-input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 20px;
  width: 100%;
}

.copy-input-container button {
  font-family: 'Minecraftia', sans-serif;
}

input[type="text"] {
  width: auto;
  max-width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Minecraftia', sans-serif;
}


button {
  padding: 8px 16px;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

button:hover {
  background-color: #45a049;
}
</style>
