<template>
  <div>
    <v-menu location="end" open-on-hover :close-on-content-click="false" :open-delay="0">
      <template v-slot:activator="{ props }">

        <v-list-item v-bind="props">
          <v-list-item-title>
            Settings
          </v-list-item-title>
        </v-list-item>

      </template>

      <v-list>
        <div class="setting">
          <v-list-item-title>{{ $t("navbar.settings.theme") }}</v-list-item-title>
          <ThemeSwitch/>
        </div>

        <hr class="separator">

        <div class="setting">
          <v-list-item-title>{{ $t("navbar.settings.language") }}</v-list-item-title>
          <LanguageSelector class="language-selector"/>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import ThemeSwitch from "@/components/navbar/components/ThemeSwitch.vue";
import LanguageSelector from "@/components/navbar/components/LanguageSelector.vue";
</script>

<style scoped>
.separator {
  width: 70%;
  background-color: var(--color-text);
  border: none;
  height: 1px;
  margin: 10px auto;
}

.setting {
  padding-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.language-selector {
  margin: 0 22px;
}
</style>