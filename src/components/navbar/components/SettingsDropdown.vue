<script setup>
import { ref } from 'vue';
import ThemeSwitch from "@/components/navbar/components/ThemeSwitch.vue";
import LanguageSelector from "@/components/navbar/components/LanguageSelector.vue";

// State to toggle modal visibility
const showSettings = ref(false);

// Function to open/close modal
const toggleModal = () => {
  showSettings.value = !showSettings.value;
};
</script>

<template>
  <div class="menu">
    <!-- Trigger Button -->
    <button class="settings-button" @click="toggleModal">
      <span>{{ $t("navbar.settings.label") }}</span>
    </button>

    <!-- Modal -->
    <div v-if="showSettings" class="modal-overlay" @click="toggleModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h1 class="modal-title">{{ $t("navbar.settings.label") }}</h1>
          <button class="close-btn" @click="toggleModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="setting">
            <span>{{ $t("navbar.settings.theme") }}</span>
            <ThemeSwitch />
          </div>
          <div class="setting">
            <span>{{ $t("navbar.settings.language") }}</span>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: 100%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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

.modal-content {
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>
