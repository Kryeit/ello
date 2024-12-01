<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";

const { values } = defineProps(["values"]);
const selectedValue = defineModel();
selectedValue.value = values[0];
const inputValue = ref(values[0].name);

const show = ref(false);

function blur() {
  show.value = false;
}

function focus() {
  show.value = true;
}

function select(value) {
  selectedValue.value = value;
  inputValue.value = value.name;
  blur();
}

function handleClickOutside(event) {
  if (!event.target.closest('.wrapper')) {
    blur();
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="wrapper">
    <input placeholder="Search players" @focusin="focus" readonly v-model="inputValue">
    <div class="results" v-if="show">
      <a v-for="value in values" @click="select(value)">{{ value.name }}</a>
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
}

.results {
  margin-top: 3px;
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