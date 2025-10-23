<script setup>
import Dropdown from "@/components/Dropdown.vue";
import {ref, watch} from "vue";

const sortDirections = [{'name': 'Descending', 'value': 'DESC'}, {'name': 'Ascending', 'value': 'ASC'}];
const orders = [
  {'name': 'Playtime', 'value': 'minecraft:play_time'},
  {'name': 'Distance walked', 'value': 'minecraft:walk_one_cm'},
  {'name': 'Deaths', 'value': 'minecraft:deaths'},
  {'name': 'Mob kills', 'value': 'minecraft:mob_kills'}
];

const sortDirection = ref();
const order = ref();
const page = ref(1);
const totalCount = ref(0);
const entriesPerPage = 50;
const table = ref();
let timoutId = 0;

function updatePage(value) {
  const newPage = parseInt(value);
  if (!isNaN(newPage)) {
    page.value = newPage;
  }
}

function previousPage() {
  page.value = Math.max(1, page.value - 1);
}

function nextPage() {
  page.value = Math.min(Math.ceil(totalCount.value / entriesPerPage), page.value + 1);
}

watch([page, sortDirection, order], () => {
  clearTimeout(timoutId);
  timoutId = setTimeout(async () => {
    const response = await fetch(`/api/leaderboard?limit=${entriesPerPage}&offset=${(page.value - 1) * entriesPerPage}&ascending=${sortDirection.value.value === "ASC"}&key=${order.value.value}`);
    const json = await response.json();
    // totalCount.value = json["total-count"];
    totalCount.value = json.length;
    table.value = json;
  }, 0);
});

function getRank(i) {
  const rank = i + entriesPerPage * (page.value - 1);
  return sortDirection.value.value === "ASC" ? totalCount.value - rank : rank + 1;
}
</script>

<template>
  <h1>Leaderboard</h1>
  <div class="settings">
    <div class="setting">
      <h2>Statistic: </h2>
      <Dropdown class="dropdown wide" :values="orders" v-model="order"></Dropdown>
    </div>

    <div class="setting">
      <h2>Order: </h2>
      <Dropdown class="dropdown" :values="sortDirections" v-model="sortDirection"></Dropdown>
    </div>
  </div>
  <div class="page-input-wrapper">
    <button class="page-button" @click="previousPage"><</button>
    <input class="page-input" :value="page" @input="updatePage($event.target.value)"><a class="page"> /
    {{ Math.ceil(totalCount / entriesPerPage) }}</a>
    <button class="page-button" @click="nextPage">></button>
  </div>

  <div class="table-wrapper">
    <table v-if="order">
      <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>{{ order.name }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry, i) in table" :key="i">
        <td>{{ getRank(i) }}.</td>
        <td>{{ entry.name }}</td>
        <td>{{ entry.formattedValue }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.page-button:first-of-type {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.page-button {
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  height: 28px;
  min-width: 28px;
  color: inherit;
  cursor: pointer;
}

.page-button:last-of-type {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

a.page {
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  height: 28px;
  display: inline-block;
  width: 57px;
  line-height: normal;
  padding: 2px 2px;
}

.page-input {
  height: 28px;
  color: inherit;
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  width: 40px;
}

th {
  font-weight: bold;
  text-align: left;
}

th:first-child {
  padding-right: 10px;
}

.table-wrapper {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: fit-content;
  padding: 0 8px;
  background-color: var(--color-background-mute);
}

table {
  border-radius: 8px;
  border-collapse: collapse;
}

.dropdown {
  width: 100px;
  display: inline-block;
}

.dropdown.wide {
  width: 130px;
}

.setting {
  display: flex;
  align-items: center;
}

.settings h2 {
  display: inline-block;
  font-weight: normal;
  margin-right: 7px;
  font-size: 18px;
}

.settings {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

h1 {
  color: var(--color-text);
}

.page-input-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
</style>
