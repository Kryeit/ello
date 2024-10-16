<script setup>
import {ref} from "vue";

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
</script>

<template>
  <div class="wrapper" v-click-outside="focusOut">
    <input placeholder="Search players" @focusin="onFocus" @input="search" v-model="query">
    <div class="results" v-if="showResults">
      <a v-for="result in results" @click="selectResult(result)">{{ result }}</a>
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

.results {
  border-radius: 8px;
  position: absolute;
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  width: 100%;
}

.results a {
  display: block;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 5px;
  cursor: pointer;
  transition-duration: 0.15s;
  border-radius: 4px;
}

.results a:hover {
  background: var(--color-border-hover);
}
</style>