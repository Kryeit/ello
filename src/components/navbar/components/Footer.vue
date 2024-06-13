<script setup>
import {ref} from "vue";
import treePath from "@/assets/tree.png";

const treeSource = ref(treePath);

</script>

<template>
  <div class="footer">
    <img :src="treeSource" alt=""/>
    <div class="footer-section">
      <p>Kryeit </p>
      <router-link to="/about">About us</router-link>
      <a href="https://status.kryeit.com" target="_blank">Status</a>
      <a href="https://kryeit.wiki.gg" target="_blank">Wiki</a>
    </div>

    <div class="footer-section">
      <p>Survival</p>
      <a href="https://map.kryeit.com" target="_blank">World Map</a>
      <a href="https://archive.kryeit.com" target="_blank">Archive</a>
    </div>

    <div class="footer-section">
      <p>Support</p>
      <router-link to="/bans">Bans</router-link>
      <router-link to="/faq">FAQ</router-link>
    </div>

    <div class="footer-section">
      <p>Contact</p>
      <a href="mailto:kryeit.minecraft@gmail.com">Email us</a>
    </div>

  </div>
</template>

<style scoped>
.footer {
  bottom: 0;
  max-height: 17vh;
  width: auto;
  background-color: var(--primary-brass-gold);
  color: white;
  padding: 0.6rem;
  text-align: center;
  display: flex;
  justify-content: space-around;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  margin-bottom: 7px;
}

.footer-section a {
  font-size: 11px;
  white-space: nowrap;
  color: lightblue;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
  color: blue;
}

.footer img {
  max-height: 100%;
}

@media (max-width: 600px) {
  .footer {
    padding-bottom: 150px;
    gap: 0;
  }

  .footer-section {
    padding: 4px;
  }
}
</style>