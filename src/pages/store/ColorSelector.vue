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
    <div
        v-for="color in colors"
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
  border-radius: 12px;
}

.color-square.selected {
  border: 2px solid var(--color-border);
}
</style>