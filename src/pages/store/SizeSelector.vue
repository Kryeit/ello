<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  sizes: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['update:selectedSize']);

const selectedSize = ref(null);

const selectSize = (size) => {
  selectedSize.value = size;
  emits('update:selectedSize', size);
};

watch(() => props.sizes, (newSizes) => {
  if (newSizes.length > 0) {
    selectSize(newSizes[0]);
  }
}, { immediate: true });
</script>

<template>
  <div class="size-selector">
    <div class="overlay"></div>
    <div class="sizes">
      <div v-for="size in sizes" :key="size" class="size-option" :class="{ selected: size === selectedSize }" @click="selectSize(size)">
        <input type="radio" :id="size" :value="size" v-model="selectedSize" @change="selectSize(size)" />
        <label class="size" :for="size">{{ size }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.size-selector {
  display: inline-flex;
  background-image: url('/src/assets/minecraft/dirt.png');
  background-size: 70px 70px;
  background-repeat: repeat;
  image-rendering: pixelated;
  padding: 6px;
  border: 3px solid black;
  border-radius: 12px;
  position: relative;
}

.sizes {
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.size-option {
  display: flex;
  align-items: center;
  width: 42px;
  height: 42px;
  border: none;
  background-image: url('/src/assets/minecraft/squared_button.png');
  background-size: cover;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.size-option::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: var(--color); /* Use the color variable */
  opacity: 1; /* Adjust the opacity as needed */
  mix-blend-mode: overlay; /* Blend the color with the background */
  z-index: -1;
}

.size-option.selected {
  background-image: url('/src/assets/minecraft/squared_button_hover.png');
}

.size {
  cursor: pointer;
  color: white;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.7rem;
}

input[type="radio"] {
  display: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 0;
  pointer-events: none;
}
</style>