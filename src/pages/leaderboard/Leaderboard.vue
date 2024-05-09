<script setup>
import Dropdown from "@/components/Dropdown.vue";
import {ref, watch} from "vue";

const sortDirections = [{'name': 'Descending', 'value': 'DESC'}, {'name': 'Ascending', 'value': 'ASC'}];
const orders = [
  {'name': 'Playtime', 'value': 'playtime'},
  {'name': 'Last played', 'value': 'last-played'},
  {'name': 'Distance walked', 'value': 'distance-walked'},
  {'name': 'Deaths', 'value': 'deaths'},
  {'name': 'Mob kills', 'value': 'mob-kills'}
];

function getRank(i) {
  const rank = i + entriesPerPage * (page.value - 1);
  return sortDirection.value.value === "ASC" ? totalCount.value - rank : rank + 1;
}

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
    const response = await fetch(`/api/leaderboard?limit=${entriesPerPage}&offset=${(page.value - 1) * entriesPerPage}&sort-direction=${sortDirection.value.value}&order-by=${order.value.value}`);
    const json = await response.json();
    totalCount.value = json["total-count"];
    table.value = json["leaderboard"];
  }, 400);
});
</script>

<template>
  <h1>Leaderboard</h1>
  <div class="settings">
    <div>
      <h2>Order: </h2>
      <Dropdown class="dropdown" :values="sortDirections" v-model="sortDirection"></Dropdown>
    </div>

    <div>
      <h2>Order by: </h2>
      <Dropdown class="dropdown wide" :values="orders" v-model="order"></Dropdown>
    </div>

  </div>
  <button class="page-button" @click="previousPage"><</button>
  <input class="page-input" :value="page" @input="updatePage($event.target.value)"><a class="page"> /
  {{ Math.ceil(totalCount / entriesPerPage) }}</a>
  <button class="page-button" @click="nextPage">></button>

  <div class="table-wrapper">
    <table v-if="order">
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>{{ order.name }}</th>
      </tr>

      <tr v-for="(entry, i) in table">
        <td>{{ getRank(i) }}.</td>
        <td>{{ entry.name }}</td>
        <td>{{ entry.value }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.page-button:first-of-type {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.page-button {
  border: 1px solid var(--vt-c-divider-dark-1);
  background: var(--vt-c-black-mute);
  height: 28px;
  min-width: 28px;
  color: inherit;
  cursor: pointer;
  margin-bottom: 8px;
}

.page-button:last-of-type {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

a.page {
  border: 1px solid var(--vt-c-divider-dark-1);
  background: var(--vt-c-black-soft);
  height: 28px;
  display: inline-block;
  width: 57px;
  line-height: normal;
  padding: 1px 2px;
}

.page-input {
  height: 28px;
  color: inherit;
  border: 1px solid var(--vt-c-divider-dark-1);
  background: var(--vt-c-black-mute);
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
  border: 1px solid var(--vt-c-divider-dark-1);
  border-radius: 8px;
  width: fit-content;
  padding: 0 8px;
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
  color: var(--vt-c-white-mute);
}
</style>
