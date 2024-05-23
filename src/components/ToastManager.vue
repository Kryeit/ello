<template>
  <div class="toast-container">
    <Toast
        v-for="(toast, index) in getToasts()"
        :key="toast.id"
        :image="toast.image"
        :title="toast.title"
        :description="toast.description"
        :zIndex="baseZIndex + index"
        @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup>
import Toast from './Toast.vue';
import { getToasts, removeToast } from '@/javascript/toasts.js';

const baseZIndex = 9999;
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
