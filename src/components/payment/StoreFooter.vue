<script setup>
</script>

<template>
  <footer class="footer">
    <router-link class="link" to="/terms">terms</router-link>
    <router-link class="link" to="/privacy">privacy</router-link>
    <router-link class="link" to="/shipping">shipping</router-link>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  border-top: 2px dashed var(--color-border);
  padding-top: 10px;
  padding-bottom: 4px;
  margin-top: 200px;
}

.footer .link {
  margin: 0 50px 0 0;
  color: var(--color-text);
}

.footer .link:last-child {
  margin-right: 0;
}

</style>