<script setup>
import { ref, onMounted, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  colors: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['update:selectedColor']);

const selectedColor = ref(null);

onMounted(() => {
  if (props.colors.length > 0) {
    selectedColor.value = props.colors[0];
    emits('update:selectedColor', props.colors[0]);
  }
});

const selectColor = (color) => {
  selectedColor.value = color;
  emits('update:selectedColor', color);
};
</script>

<template>
  <div class="color-selector" v-if="colors.filter(color => color).length > 0">
    <div class="overlay"></div>
    <div
        v-for="color in colors"
        :key="color"
        class="color-square"
        :class="{ selected: color === selectedColor }"
        :style="{ '--color': color }"
        @click="selectColor(color)"
    >
    </div>
  </div>
</template>

<style scoped>
.color-selector {
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

.color-square {
  margin: 5px;
  cursor: pointer;
  width: 42px;
  height: 42px;
  border: none;
  background-image: url('/src/assets/minecraft/squared_button.png');
  background-size: cover;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  user-select: none;
  z-index: 1;
  position: relative;
}

.color-square::before {
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

.color-square.selected {
  background-image: url('/src/assets/minecraft/squared_button_hover.png');
}
</style>