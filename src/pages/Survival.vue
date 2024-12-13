<template>
  <div class="survival-page">
    <h1>Survival</h1>
    <p>Kryeit main focus is the survival server.</p>
    <p>Here are some helpful links to know more:</p>
    <ul>
      <li><router-link to="/getting-started">{{ $t("navbar.footer.survival.getting-started") }}</router-link></li>
      <li><a href="https://archive.kryeit.com" target="_blank">
        {{ $t("navbar.footer.survival.archive") }}
      </a></li>
      <li><a href="https://map.kryeit.com" target="_blank">
        {{ $t("navbar.footer.survival.map") }}
      </a></li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
.survival-page {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: var(--color-text);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>