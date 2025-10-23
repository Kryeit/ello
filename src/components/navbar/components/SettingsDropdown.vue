<script setup>
import {ref} from 'vue';
import ThemeSwitch from "@/components/navbar/components/ThemeSwitch.vue";
import LanguageSelector from "@/components/navbar/components/LanguageSelector.vue";
import Modal from "@/components/Modal.vue";

// State to toggle modal visibility
const showSettings = ref(false);
</script>

<template>
  <div class="menu">
    <!-- Trigger Button -->
    <button class="settings-button" @click="showSettings = true">
      <span>{{ $t("navbar.settings.label") }}</span>
    </button>

    <Modal :title="$t('navbar.settings.label')" v-model:shown="showSettings">
      <div class="setting">
        <span>{{ $t("navbar.settings.theme") }}</span>
        <ThemeSwitch />
      </div>
      <div class="setting">
        <span>{{ $t("navbar.settings.language") }}</span>
        <LanguageSelector />
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.menu {
  width: 100%;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;
}

.setting:hover {
  background: var(--color-background-mute);
}

.settings-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 100%;
}

.settings-button:hover {
  background: var(--color-background-mute);
}

.settings-button:active {
  transform: scale(0.95);
}
</style>
