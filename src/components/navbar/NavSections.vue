<script setup>
import {useRouter} from 'vue-router';

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
    <div class="section" @click="navigateToAnalytics">
      <img class="librarian" src="@/assets/minecraft/librarian.webp" alt="Librarian" />
      <h4>Analytics</h4>
    </div>
    <div class="section" @click="navigateToStore">
      <img class="snowman" src="@/assets/kryeit/snowman.png" alt="Snowman" />
      <h1>Store</h1>
      </div>
    <div class="section">
      <h4>Nothing</h4>

    </div>
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
  flex: 1;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  cursor: pointer;
  position: relative;
  color: white;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 255, 0.5);
  transition: transform 0.3s ease-in-out;
  user-select: none;
}

.section h1 {
  z-index: 1000;
}

.section:nth-child(2) {
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 40px rgb(255, 122, 12);
}

.section:nth-child(3) {
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 255, 0, 0.5);
}

.section:hover {
  transform: scale(1.1);
}

@media (max-width: 1024px) {
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

  .snowman {
    max-width: 250px;
  }

  .librarian {
    max-width: 60px;
    right: 40px;
  }
}

.snowman {
  position: absolute;
  z-index: 0;
  transform: rotate(-7deg);
  left: 20px;
  width: 300px;
  user-select: none;
  pointer-events: none;
}

.librarian {
  position: absolute;
  z-index: 0;
  right: 60px;
  width: 80px;
  user-select: none;
  pointer-events: none;
}

h4 {
  z-index: 2;
}

</style>