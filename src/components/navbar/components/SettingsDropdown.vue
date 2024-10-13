<script setup>
import { ref } from 'vue';
import ThemeSwitch from "@/components/navbar/components/ThemeSwitch.vue";
import LanguageSelector from "@/components/navbar/components/LanguageSelector.vue";

const showSettings = ref(false);
</script>

<template>
  <div class="menu">
    <div class="menu-item" @click="showSettings.value = !showSettings.value">
      <span class="left-arrow"><</span>
      <span class="settings-text">{{ $t("navbar.settings.label") }}</span>
    </div>

    <div v-if="showSettings.value" class="settings-list">
      <div class="setting">
        <span>{{ $t("navbar.settings.theme") }}</span>
        <ThemeSwitch/>
      </div>

      <div class="setting">
        <span>{{ $t("navbar.settings.language") }}</span>
        <LanguageSelector class="language-selector"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-arrow {
  float: left;
}

.settings-text {
  margin-left: 10px;
}

.setting {
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text);
  margin-bottom: 20px;
}

.language-selector {
  margin: 0 20px;
}

.setting:last-child {
  margin-bottom: 0;
}

.menu {
  display: flex;
  flex-direction: column;
}

.settings-list {
  display: none;
}

.menu-item:hover .settings-list {
  display: block;
}
</style>