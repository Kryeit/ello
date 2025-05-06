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
  display: flex;
  justify-content: space-around;
  border-top: 2px dashed var(--color-border);
  margin-top: auto;
}

.footer .link {
  color: var(--color-text);
}


</style>