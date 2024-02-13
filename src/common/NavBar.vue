
<template>
  <div v-if="showNav" class="fullscreen-nav">
    <header>
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <Title msg="Kryeit" />
      </div>
    </header>
    <main>
      <Sections />
    </main>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
import Title from '@/components/Title.vue';
import Sections from '@/components/Sections.vue';

const props = defineProps({
  showNav: Boolean
});
</script>

<style scoped>
.fullscreen-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li a {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  margin: 1rem 0;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .fullscreen-nav {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .fullscreen-nav header,
  .fullscreen-nav main {
    flex: 1;
  }

  header,
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .logo {
    width: 100px;
    height: auto;
    margin-bottom: 1rem;
  }

  header .wrapper {
    display: block;
  }
}
</style>


