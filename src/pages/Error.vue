<template>
  <div class="error-page">
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <p>Here are some helpful links to get you back on track:</p>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About Us</router-link></li>
      <li><router-link to="/contact">Contact Us</router-link></li>
      <li><router-link to="/getting-started">Getting Started</router-link></li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
.error-page {
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