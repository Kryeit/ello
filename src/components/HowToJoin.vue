<script setup>

import CopyIP from "@/components/CopyIP.vue";
</script>

<template>
  <div class="how-to-join">
    <div class="standard-install">
      <img class="title-image" src="../assets/standard.png" alt="Standard">
      <br>
      <ol>
        <li><a href="https://modrinth.com/app" target="_blank">Download Modrinth App</a></li>
        <li><a href="https://modrinth.com/modpack/Kryeit" target="_blank">Download our modpack</a></li>
      </ol>
      <br>
      <h4>Additionally, you can just search "Kryeit" inside the Modrinth App.</h4>
    </div>

    <CopyIP/>

    <div class="advanced-install">
      <img class="title-image" src="../assets/advanced.png" alt="Advanced">
      <br>
      <ol>
        <li><a href="/launchers">Download any launcher</a></li>
        <li><a href="/modpacks">Download any Kryeit modpack</a></li>
      </ol>
      <br>
      <h4>Note that this is prone to bugs, and errors client-side.</h4>
    </div>
  </div>
</template>

<style scoped>

.how-to-join {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 20px;
}

.how-to-join a img {
  height: 20px;
}

.standard-install {
  border: 4px solid black;
  border-radius: 12px;
  background: #79553a;
  width: 100%;
  padding: 20px;
  color: lightgrey;
}

.title-image {
  image-rendering: pixelated;
  width: 80%;
  object-fit: cover;
  display: block;
  margin: auto;
}

.standard-install a {
  text-decoration: none;
  color: lightgrey;
}

.standard-install a:hover {
  text-decoration: underline;
}

.advanced-install {
  border: 4px solid black;
  border-radius: 12px;
  background: #3b291b;
  width: 100%;
  padding: 20px;
  color: lightgrey;
}

.advanced-install a {
  text-decoration: none;
  color: lightgrey;
}

.advanced-install a:hover {
  text-decoration: underline;
}

@media (max-width: 1000px) {
  .how-to-join {
    flex-direction: column;
  }
}
</style>