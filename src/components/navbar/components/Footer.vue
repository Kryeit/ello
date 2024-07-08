<script setup>
import {ref} from "vue";
import treePath from "@/assets/tree.png";
import {addToast} from "@/javascript/toasts.js";

const treeSource = ref(treePath);

async function addEmailToast() {
  addToast('map.png', 'Email copied!', 'Paste this in your email to send us mail.');
  try {
    await navigator.clipboard.writeText('kryeit.minecraft@gmail.com');
  } catch (err) {
    console.error('Failed to copy email: ', err);
  }
}
</script>

<template>
  <div class="footer">
    <img :src="treeSource" alt=""/>
    <div class="footer-section">
      <p>Kryeit </p>
      <hr class="separator">

      <router-link to="/about">About us</router-link>
      <a href="https://status.kryeit.com" target="_blank">Status</a>
      <a href="https://kryeit.wiki.gg" target="_blank">Wiki</a>
    </div>

    <div class="footer-section">
      <p>Survival</p>
      <hr class="separator">

      <a href="https://map.kryeit.com" target="_blank">World Map</a>
      <a href="https://archive.kryeit.com" target="_blank">Archive</a>
    </div>

    <div class="footer-section">
      <p>Support</p>
      <hr class="separator">

      <router-link to="/bans">Bans</router-link>
      <router-link to="/faq">FAQ</router-link>
    </div>

    <div class="footer-section">
      <p>Contact</p>
      <hr class="separator">

      <button @click="addEmailToast">Email us</button>    </div>

  </div>
</template>

<style scoped>
.footer {
  bottom: 0;
  max-height: 30vh;
  width: auto;
  background-color: var(--primary-brass-gold);
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
}

.footer-section {
  padding: 10px;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.footer-section p {
  font-size: 13px;
  color: lightgray;
  margin-bottom: 3px;
}

.footer-section a, button {
  font-size: 11px;
  white-space: nowrap;
  color: lightblue;
  text-decoration: none;
  margin-top: 3px;
}

.footer-section a:hover, button:hover {
  text-decoration: underline;
  color: blue;
}

.footer img {
  max-height: 80%;
  height: 130px;
}

.separator {
  width: 100%;
}

@media (max-width: 600px) {
  .footer {
    padding-bottom: 150px;
  }

  .footer img {
    display: none;
  }
}
</style>