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
    <h3>Sizes:</h3>
    <div class="sizes">
      <div v-for="size in sizes" :key="size" class="size-option">
        <input type="radio" :id="size" :value="size" v-model="selectedSize" @change="selectSize(size)" />
        <label class="size" :for="size">{{ size }}</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.size-selector {
  margin-top: 20px;
}

.sizes {
  display: flex;
  gap: 10px;
}

.size-option {
  display: flex;
  align-items: center;
}

.size {
  margin-left: 5px;
  cursor: pointer;
}
</style>