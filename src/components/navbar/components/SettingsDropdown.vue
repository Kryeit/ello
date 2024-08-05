<script setup>
import ThemeSwitch from "@/components/navbar/components/ThemeSwitch.vue";
import LanguageSelector from "@/components/navbar/components/LanguageSelector.vue";
</script>

<template>
  <div>
    <v-menu transition="slide-x-reverse-transition" location="end" open-on-hover :close-on-content-click="false" :open-delay="0" :close-delay="400">
      <template v-slot:activator="{ props }">

        <v-list-item v-bind="props">
          <v-list-item-title class="title">
            <span class="left-arrow"><</span>
            <span class="settings-text">{{ $t("navbar.settings.label") }}</span>
          </v-list-item-title>
        </v-list-item>

      </template>

      <v-list bg-color="var(--color-background)">
        <div class="setting">
          <v-list-item-title>{{ $t("navbar.settings.theme") }}</v-list-item-title>
          <ThemeSwitch/>
        </div>

        <div class="setting">
          <v-list-item-title>{{ $t("navbar.settings.language") }}</v-list-item-title>
          <LanguageSelector class="language-selector"/>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped>
.left-arrow {
  float: left;
}

.settings-text {
  margin-left: 10px;
}

.title {
  color: var(--color-text);
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
</style>