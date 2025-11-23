<script setup>
const emit = defineEmits(["select"])
</script>

<template>
  <div class="bg-zinc-800 p-2 rounded-lg">
    <label for="file-input" class="flex flex-col items-center">
      <input id="file-input" class="hidden" type="file" @change="emit('select', {files: $event.target.files})"/>
      <i class="text-3xl! pi pi-upload"></i>
      <h1>Drag & Drop or click to select and upload songs</h1>
    </label>
  </div>
</template>

<style scoped>

</style>