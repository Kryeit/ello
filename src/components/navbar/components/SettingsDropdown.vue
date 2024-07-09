<template>
  <div>
    <v-menu class="menu" location="end" open-on-hover :close-on-content-click="false" :open-delay="0">
      <template v-slot:activator="{ props }">

        <v-list-item v-bind="props">
          <v-list-item-title>
            {{ $t("navbar.settings") }} >
          </v-list-item-title>
        </v-list-item>

      </template>

      <v-list class="menu">
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
.menu {
  background-color: var(--color-background);
}

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
  color: var(--color-text);
}

.language-selector {
  margin: 0 22px;
}
</style>