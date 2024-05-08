<script setup>

</script>

<template>
  <div class="loading-spinner">
    <img src="/src/assets/icon.png" width="100" alt="loading">
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  width: 100%;
  align-self: stretch;
  align-items: center;
  justify-content: center;
}

img {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>