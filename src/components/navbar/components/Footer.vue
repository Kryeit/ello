<script setup>
import {ref} from "vue";
import treePath from "@/assets/tree.png";
import {addToast} from "@/js/toasts.js";
import {i18n} from "@/main.js";

const treeSource = ref(treePath);
const clickSound = new URL('@/assets/sounds/click.ogg', import.meta.url);
const sound = ref(new Audio(clickSound.href));

async function addEmailToast() {
  await sound.value.play();
  addToast('map.png', i18n.global.t("navbar.footer.contact.email.title"), i18n.global.t("navbar.footer.contact.email.description"));
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

      <router-link to="/about">
        {{ $t("navbar.footer.kryeit.about") }}
      </router-link>
      <a href="https://status.kryeit.com" target="_blank">
        {{ $t("navbar.footer.kryeit.status") }}
      </a>
      <a href="https://kryeit.miraheze.org" target="_blank">Wiki</a>
    </div>

    <div class="footer-section">
      <p>
        {{ $t("navbar.footer.survival.title") }}
      </p>

      <hr class="separator">

      <router-link to="/getting-started">
        {{ $t("navbar.footer.survival.getting-started") }}
      </router-link>

      <a href="https://archive.kryeit.com" target="_blank">
        {{ $t("navbar.footer.survival.archive") }}
      </a>

      <a href="https://map.kryeit.com" target="_blank">
        {{ $t("navbar.footer.survival.map") }}
      </a>
    </div>

    <div class="footer-section">
      <p>
        {{ $t("navbar.footer.support.title") }}
      </p>
      <hr class="separator">

      <router-link to="/bans">
        {{ $t("navbar.footer.support.bans") }}
      </router-link>
      <router-link to="/faq">
        {{ $t("navbar.footer.support.faq") }}
      </router-link>
    </div>

    <div class="footer-section">
      <p>
        {{ $t("navbar.footer.contact.title") }}
      </p>
      <hr class="separator">

      <a @click="addEmailToast" style="cursor: pointer">
        {{ $t("navbar.footer.contact.email.label") }}
      </a>
    </div>

  </div>
</template>

<style scoped>
.footer {
  bottom: 0;
  max-height: 30vh;
  width: auto;
  background-color: var(--color-text);
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2%;
  border-top: 5px solid var(--color-border);
}

.footer-section {
  padding: 10px 0;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.footer-section p {
  font-size: 13px;
  color: var(--color-background);
  margin-bottom: 3px;
}

.footer-section a, button {
  font-size: 11px;
  white-space: nowrap;
  color: var(--color-background);
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

@media (max-width: 1024px) {
  .footer {
    padding-bottom: 80px;
    gap: 5px;
  }

  .footer img {
    display: none;
  }
}
</style>