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
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
const items = [
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me' },
  { title: 'Click Me 2' },
]
</script>

<style scoped>

</style>