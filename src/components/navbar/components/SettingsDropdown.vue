<template>
  <div>
    <v-menu location="end" open-on-hover :close-on-content-click="false">
      <template v-slot:activator="{ props }">

        <v-list-item v-bind="props">
          <v-list-item-title>
            Settings
          </v-list-item-title>
        </v-list-item>

      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Test</v-list-item-title>
          <ThemeSwitch/>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import ThemeSwitch from "@/components/navbar/components/ThemeSwitch.vue";

const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<style scoped>

</style>