<template>
  <div>
    <v-menu location="end" open-on-hover>
      <template v-slot:activator="{ props }">

        <v-list-item @click="">
          <v-list-item-title v-bind="props">
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