<script setup>
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  colors: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['update:selectedColor']);

const selectedColor = ref(null);

onMounted(() => {
  const firstColor = Object.keys(props.colors)[0];
  if (firstColor) {
    selectedColor.value = firstColor;
    emits('update:selectedColor', firstColor);
  }
});

const selectColor = (color) => {
  selectedColor.value = color;
  emits('update:selectedColor', color);
};
</script>

<template>
  <div class="color-selector">
    <div
        v-for="color in Object.keys(colors)"
        :key="color"
        class="color-square"
        :class="{ selected: color === selectedColor }"
        :style="{ backgroundColor: color }"
        @click="selectColor(color)"
    >
    </div>
  </div>
</template>

<style scoped>
.color-selector {
  display: flex;
  flex-wrap: wrap;
}

.color-square {
  width: 30px;
  height: 30px;
  margin: 5px;
  cursor: pointer;
  border: 2px solid var(--color-background-mute);

}

.color-square.selected {
  border: 2px solid var(--color-border);
}
</style>