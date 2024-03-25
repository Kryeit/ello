<script setup>

</script>

<template>
  <div class="banner">
    <img alt="Kryeit banner" src="https://kryeit.com/banner.webp"/>
  </div>
  <h1>This is text. I really like this text. </h1>
  <h2>This is smaller text. I love text.</h2>
</template>

<style scoped>
.banner img {
  width: calc(100vw - 30px);
  max-width: 1200px;
  height: auto;
}

.banner {
  margin-top: 30px;
  margin-bottom: 30px ;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>