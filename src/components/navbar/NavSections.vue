<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToStore = () => {
  router.push('/store');
};

const navigateToAnalytics = () => {
  router.push('/analytics');
};
</script>

<template>
  <div class="sections-container">
    <div class="section" @click="navigateToAnalytics">Analytics</div>
    <div class="section" @click="navigateToStore">Store</div>
    <div class="section">Nothing thought</div>
  </div>
</template>

<style scoped>
.sections-container {
  height: 100%;
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 10px 20px 10px 100px;
}

.section {
  background-color: var(--color-text);
  flex: 1;
  padding: 16px;
  border: 5px solid var(--color-border);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  color: var(--color-border);
}

.section:hover {
  transform: scale(1.01);
  background-color: var(--color-background);
}

@media (max-width: 900px) {
  .sections-container {
    flex-direction: column;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 8px;
    gap: 8px;
  }

  .section {
    width: 100%;
  }
}
</style>