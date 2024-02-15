<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  subMsg: { // Optional subheading message
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
.header h1 {
  font-weight: 600; /* Slightly bolder */
  font-size: 2.4rem; /* Adjusted for header use */
  margin-bottom: 0.5rem; /* Space between title and subheading */
}

.sub-header {
  font-weight: 400;
  font-size: 1.4rem; /* Subheading size */
  color: #666; /* Subdued color for subheading */
}

.header h1,
.sub-header {
  text-align: center; /* Ensures text is always centered */
}

@media (min-width: 1024px) {
  .header,
  .sub-header {
    text-align: center; /* Keep text centered on larger screens */
  }
}
</style>
