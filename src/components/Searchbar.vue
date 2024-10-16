<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const showResults = ref(false);
const results = ref([]);
const emit = defineEmits(["result-selected"]);
const {searchFn} = defineProps(["search-fn"]);
const query = ref("");

function onFocus() {
  showResults.value = true;
  search();
}

function focusOut() {
  showResults.value = false;
}

function selectResult(value) {
  showResults.value = false;
  emit("result-selected", value);
}

async function search() {
  results.value = await searchFn(query.value);
}

function handleClickOutside(event) {
  const wrapper = document.querySelector(".wrapper");
  if (wrapper && !wrapper.contains(event.target)) {
    focusOut();
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="wrapper">
    <input placeholder="Search players" @focusin="onFocus" @input="search" v-model="query">
    <div class="results" v-if="showResults">
      <button class="result" v-for="result in results" @click="selectResult(result)">{{ result }}</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}

input {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 5px 12px;
  color: inherit;
  width: 100%;
  font-family: 'Minecraftia', sans-serif;
}

input::placeholder {
  color: var(--color-text);
}

.results {
  border-radius: 8px;
  position: absolute;
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  width: 100%;
}

.results button {
  display: block;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 8px;
  cursor: pointer;
  transition-duration: 0.15s;
  border-radius: 8px;
  background-color: var(--color-background-mute);
  border: none;
}

.results button:hover {
  filter: brightness(1.05);
}

.results button:active {
  scale: 0.95;
}
</style>
