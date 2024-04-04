<script setup>
import {ref, defineProps} from 'vue';
import Title from '@/components/Title.vue';
import NavSections from '@/common/NavSections.vue';
import HoveredList from "@/common/components/HoveredList.vue";
import IconKryeit from "@/components/icons/IconKryeit.vue";

defineProps({
  showNav: Boolean
});

</script>


<template>
  <div>
    <body v-if="showNav" class="fullscreen-nav">

      <header class="header-content">
        <div class="header">
          <Title msg="Menu" style="color: black"/>
          <HoveredList class="hovered-list"/>
        </div>
      </header>

      <NavSections />

      <div class="footer">
        <div class="footer-content">
          <IconKryeit />
          <p>Kryeit </p>
        </div>
      </div>
    </body>

  </div>
</template>

<style scoped>
.fullscreen-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
  padding-bottom: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.header-content {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 0 5rem 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-color);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  width: 100%;
  position: relative;
}

.hovered-list {
  padding-right: 20px;
}

.header::before {
  content: "";
  display: block;
  width: 10%;
}

.button-list button:hover {
  background-color: #0056b3;
}

.footer {
  bottom: 0;
  width: 50%;
  background-color: var(--main-color);
  color: white;
  padding: 1rem 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-content image {
  width: 10px;
}

</style>
