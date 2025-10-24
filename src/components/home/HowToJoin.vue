<script setup>
import CopyIP from "@/components/home/CopyIP.vue";
</script>

<template>
  <div class="how-to-join">
    <div class="standard-install">
      <img class="title-image" src="../../assets/standard.png" alt="Standard">
      <div>
        <p>1. <a href="https://modrinth.com/app" target="_blank">
          {{ $t("home.how-to-join.standard.1")}}
        </a></p>
        <p>2. <a href="https://modrinth.com/modpack/Kryeit" target="_blank">
          {{ $t("home.how-to-join.standard.2")}}
        </a></p>
      </div>
      <br>
      <h4>
        {{ $t("home.how-to-join.standard.description")}}
      </h4>
    </div>

    <CopyIP/>

    <div class="advanced-install">
      <img class="title-image" src="../../assets/advanced.png" alt="Advanced">
      <div>
        <p>1. <a href="/launchers">
          {{ $t("home.how-to-join.advanced.1")}}
        </a></p>
        <p>2. <a href="/modpacks">
          {{ $t("home.how-to-join.advanced.2")}}
        </a></p>
      </div>
      <br>
      <h4>
        {{ $t("home.how-to-join.advanced.description")}}
      </h4>
    </div>
  </div>
</template>

<style scoped>

.how-to-join {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  width: 80%;
  object-fit: cover;
  display: block;
  margin: auto;
  user-select: none;
  padding-bottom: 20px
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