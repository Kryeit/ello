<script setup>
import {ref, defineProps} from 'vue';
import Title from '@/components/Title.vue';
import NavSections from '@/common/NavSections.vue';
import HoveredList from "@/common/components/HoveredList.vue";

defineProps({
  showNav: Boolean
});

</script>


<template>
  <div>
    <div v-if="showNav" class="fullscreen-nav">
      <header class="header-content">
        <div class="header-left">
          <Title msg="Menu" />
        </div>

        <div class="header-right">
          <HoveredList />
        </div>
      </header>
      <!-- Nav Sections -->
      <NavSections />
    </div>
  </div>
</template>



<style scoped>
@import url(https://fonts.bunny.net/css?family=alkalami:400);

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
  padding-top: 2%;
  padding-bottom: 2%;
  box-sizing: border-box;
  overflow: hidden;
}


.header-content {
  font-family: 'Alkalami', serif;  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 5rem 1.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1
}

.header-right {
  display: flex;
  align-items: center;
}

.tw-btn {
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tw-btn:hover {
  background-color: #0056b3;
}


.additional-btn {
  display: none;
}

.main-btn.active ~ .additional-btn {
  display: inline-block;
}

.btn1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -50%);
}

.btn2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, -50%);
}

.btn3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(100%, -50%);
}

.main-btn {
  display: none;
}

.main-btn.active {
  display: inline-block;
}

.button-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0.5rem;
}

.button-list button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.button-list button:hover {
  background-color: #0056b3;
}


/* Style for NavSections.vue should ensure each section takes up one-third of the width */
</style>
