<script setup>
import Toast from './Toast.vue';
import {getToasts, removeToast} from '@/js/toasts.js';

// Import images directly
import mapImage from '@/assets/toast/map.png';

const baseZIndex = 9999;

const imageMap = {
  'map.png': mapImage,
  // Add other images here
};

const getImage = (imageName) => {
  return imageMap[imageName] || '';
};

const handleCloseToast = (toastId) => {
  removeToast(toastId);
};
</script>

<template>
  <div class="toast-container">
    <Toast
        v-for="(toast, index) in getToasts()"
        :key="toast.id"
        :image="getImage(toast.image)"
        :title="toast.title"
        :description="toast.description"
        :zIndex="baseZIndex + index"
        :style="{ transform: `translateY(${index * 100}%)`, transition: 'transform 2s' }"
        @close="handleCloseToast(toast.id)"
    />
  </div>
</template>

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
