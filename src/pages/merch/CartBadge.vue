<template>
  <span v-if="itemCount!==0" class="cart-badge">{{ itemCount }}</span>
</template>

<script setup>
const props = defineProps({
  itemCount: Number
});
</script>

<style scoped>
.cart-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-130%) translateX(90%);
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 6px;
  font-size: 0.75rem;
  min-width: 25px;
  height: 25px;
  white-space: nowrap;
  aspect-ratio: 1 / 1;
}
</style>