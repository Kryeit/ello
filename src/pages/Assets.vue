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

async function downloadCursor() {
  try {
    const response = await fetch('https://kryeit.com/api/assets/cursor');

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'cursor.rar'); // Filename for download
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading cursor file:', error);
  }
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
      <h3>List Icon</h3>
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

    <div class="card">
      <h3>Cursor</h3>
      <div class="image-container">
        <img src="@/assets/kryeit/cursor.png" alt="Custom cursor" />
      </div>
      <button class="download-button" @click="downloadCursor()">Download</button>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  min-width: 150px;
  min-height: 150px;
  margin: 8px auto 0 auto;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.download-button {
  background: var(--color-background-mute);
  margin-top: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 100%;
  display: flex;
  min-height: 30px;
}

.download-button:hover {
  filter: brightness(1.05);
}

.download-button:active {
  transform: scale(0.95);
}

@media (max-width: 600px) {

  .grid {
    flex-direction: column;
    align-items: center;
    margin-bottom: 75px; /* Needed for some reason (#app style in main.css is not working) */
  }

  .card {
    width: 100%;
    max-width: 300px;
    margin-bottom: 32px;
  }

  .card:last-child {
    margin-bottom: 0;
  }
}
</style>