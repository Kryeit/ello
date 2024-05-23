<template>
  <div class="toast-container">
    <Toast
        v-for="(toast, index) in getToasts()"
        :key="toast.id"
        :image="toast.image"
        :title="toast.title"
        :description="toast.description"
        :zIndex="baseZIndex + index"
        :style="{ transform: `translateY(${index * 100}%)`, transition: 'transform 2s' }"
        @close="handleCloseToast(toast.id)"
    />
  </div>
</template>

<script setup>
import Toast from './Toast.vue';
import { getToasts, removeToast } from '@/javascript/toasts.js';

const baseZIndex = 9999;

const handleCloseToast = (toastId) => {
  removeToast(toastId);
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 4px;
  right: 8px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toast {
  transition: transform 0.5s;
}
</style>
