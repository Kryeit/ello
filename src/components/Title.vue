<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  subMsg: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="header">
    <h1>{{ msg }}</h1>
    <h2 v-if="subMsg" class="sub-header">{{ subMsg }}</h2>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header h1 {
  font-weight: 600;
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

.sub-header {
  font-weight: 400;
  font-size: 1.4rem;
  color: #666;
}

.header h1,
.sub-header {
  text-align: center;
}

@media (min-width: 1024px) {
  .header,
  .sub-header {
    text-align: center;
  }
}
</style>