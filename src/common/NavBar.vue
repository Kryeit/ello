<template>
  <div>
    <!-- ...existing NavBar content... -->

    <!-- Fullscreen Nav with blurry background -->
    <div v-if="showNav" class="fullscreen-nav">
      <!-- Header content -->
      <header class="header-content tw-flex tw-justify-between tw-items-center tw-w-full tw-px-4 tw-py-2">
        <!-- Left side content (e.g., title or logo) -->
        <div class="header-left">
          <Title msg="Kryeit" />
          <!-- Additional info here -->
        </div>

        <!-- Right side content (e.g., buttons) -->
        <div class="header-right">
          <!-- Buttons or other interactive elements here -->
          <button class="tw-btn">Button 1</button>
          <button class="tw-btn">Button 2</button>
        </div>
      </header>

      <!-- Nav Sections -->
      <NavSections />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Title from '@/components/Title.vue';
import NavSections from '@/common/NavSections.vue';

defineProps({
  showNav: Boolean
});
</script>

<style scoped>
.fullscreen-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
  padding-top: 2%; /* Fixed value for spacing */
  padding-bottom: 2%;
  box-sizing: border-box;
  overflow: hidden;
}

.header-content {
  display: flex;
  justify-content: space-between; /* Keep items spaced out */
  align-items: center; /* Center items vertically */
  flex-wrap: nowrap; /* Prevent items from wrapping */
  width: 100%; /* Ensure the header spans the full width */
}

.header-left, .header-right {
  flex: 1; /* Allow flex items to grow if needed */
  display: flex;
  align-items: center; /* Center items vertically */
}

.header-left {
  padding-left: 10%;
  flex: 1;
  justify-content: center; /* Adjust if you want the title to be more centered */
}

.header-right {
  flex: 0 1 auto; /* Do not grow but allow shrinking */
  justify-content: flex-end;
}





/* Assuming you have a .tw-btn class in your Tailwind setup for button styling */
.tw-btn {
  /* Add Tailwind classes or custom styles for your buttons here */
  margin-left: 16px; /* Fixed value for spacing between buttons */
}

/* Style for NavSections.vue should ensure each section takes up one-third of the width */
</style>
