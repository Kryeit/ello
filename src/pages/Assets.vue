<script setup>
import icon from '@/assets/kryeit/icon.png';
import serverIcon from '@/assets/kryeit/server_icon.png';
import banner from '@/assets/kryeit/banner.png';

function downloadImage(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <h1>Kryeit Assets</h1>
  <div class="grid">
    <div class="card">
      <h3>Icon</h3>
      <div class="image-container">
        <img src="@/assets/kryeit/icon.png" alt="Server Icon" />
      </div>
      <button class="download-button" @click="downloadImage(icon, 'icon.png')">Download</button>
    </div>

    <div class="card">
      <h3>Server List Icon</h3>
      <div class="image-container">
        <img src="@/assets/kryeit/server_icon.png" alt="Server Icon" />
      </div>
      <button class="download-button" @click="downloadImage(serverIcon, 'server_icon.png')">Download</button>
    </div>

    <div class="card">
      <h3>Banner</h3>
      <div class="image-container">
        <img src="@/assets/kryeit/banner.png" alt="Banner" />
      </div>
      <button class="download-button" @click="downloadImage(banner, 'banner.png')">Download</button>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  gap: 20px;
  justify-content: center;
}

h1 {
  text-align: center;
}

h3 {
  white-space: nowrap;
}

.card {
  padding: 20px;
  text-align: center;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-container {
  width: 150px;
  height: 150px;
  min-width: 150px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>