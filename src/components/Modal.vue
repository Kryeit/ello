<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

const shown = defineModel("shown", false);
</script>

<template>
  <div v-if="shown" class="modal-overlay">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h1 class="modal-title">{{ title }}</h1>
        <button class="close-btn" @click="shown = false">&times;</button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<style scoped>

.modal-content {
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-overlay {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>