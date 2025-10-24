<template>
  <div class="survival-page">
    <h1>Survival</h1>
    <p>Kryeit main focus is the survival server.</p>
    <div>
      <p>
        If you are new to the server, you can start by reading the
        <router-link to="/getting-started">{{ $t("navbar.footer.survival.getting-started") }}</router-link>
        guide.
      </p>
      <p>We strive for a long-term commitment for each season. Each might last 3/4 years depending on Minecraft or Create updates.</p>
      <p>
        The
        <a href="https://kryeit.com/discord">Discord</a>
        is the main communication platform for the server.
      </p>
      <p>You can also see the whole
        <a href="https://map.kryeit.com">map</a>
        of the current world</p>
    </div>

    <br />

    <div class="archive-section">
      <div class="archive">
        <h2 class="archive-title">{{ $t("navbar.footer.survival.archive") }}</h2>
        <button class="archive-button" @click="openArchive">
          <img src="/src/assets/toast/map.png" alt="Copy" />
        </button>
      </div>
      <p class="archive-description">
        For now, the archive only contains the Season 2 world download.
      </p>
    </div>
  </div>
</template>

<script setup>
function openArchive() {
  window.open('https://archive.kryeit.com', '_blank');
}
</script>

<style scoped>
.survival-page {
  text-align: center;
  margin-top: 30px;
}

p, h1 {
  text-align: left;
}

.archive-section {
  display: flex;
  align-items: center;
}

.archive {
  flex: 0 0 30%;
  margin-right: 20px;
  background-image: url('/src/assets/minecraft/dirt.png');
  background-size: 100px 100px;
  background-repeat: repeat;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  border: 4px solid black;
  padding: 10px;
  border-radius: 12px;

}

.archive-title {
  color: white;
}

.archive-description {
  flex: 0 0 70%;
}

.archive-button {
  width: 44px;
  height: 44px;
  border: none;
  background-image: url('/src/assets/minecraft/squared_button.png');
  background-size: cover;
  background-repeat: no-repeat;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  cursor: pointer;
  user-select: none;
}

.archive-button img {
  width: 30px;
  height: 30px;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
}

.archive-button:hover {
  background-image: url('/src/assets/minecraft/squared_button_hover.png');
}
</style>