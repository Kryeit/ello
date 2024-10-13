<script setup>
function downloadImage(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
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
      <img src="https://kryeit.com/images/icon.png" alt="Server Icon"/>
      <button class="download-button" @click="downloadImage('https://kryeit.com/images/icon.png', 'icon.png')">Download</button>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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

img {
  object-fit: contain;
}

.download-button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.download-button:hover {
  background-color: #0056b3;
}
</style>