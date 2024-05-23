<script setup>
import { ref, onMounted } from 'vue';

const projectIds = ['duaqEXgz', /* Base */
  'iEeNYT4y', /* Mayson's */
  'thV8JtM6' /* Ray's */];

const modpacks = ref([]);

const fetchModpackData = async (projectId) => {
  try {
    const response = await fetch(`https://api.modrinth.com/v2/project/${projectId}`);
    if (!response.ok) {
      throw new Error(`Error fetching data for project ID ${projectId}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

onMounted(async () => {
  const fetchPromises = projectIds.map(projectId => fetchModpackData(projectId));
  const results = await Promise.all(fetchPromises);
  modpacks.value = results.filter(result => result !== null);
});
</script>

<template>
  <h1>Modpacks</h1>
  <div v-for="(modpack, index) in modpacks" :key="index" class="modpack">
    <a :href="`https://modrinth.com/mod/${modpack.slug}`" target="_blank">
      <img :src="modpack.icon_url" :alt="modpack.title" class="modpack-icon" />
      <div class="modpack-content">
        <div class="modpack-info">
          <h2>{{ modpack.title }}</h2>
          <p>{{ modpack.description }}</p>
        </div>
        <div class="modpack-stats">
          <p class="downloads"><strong>Downloads:</strong> {{ modpack.downloads }}</p>
          <p class="followers"><strong>Followers:</strong> {{ modpack.followers }}</p>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
  margin-top: 20px;
  font-size: 52px;
}

.modpack {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  position: relative;
}

.modpack:hover {
  transform: scale(1.01);
}

.modpack a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.modpack-icon {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.modpack-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  position: relative;
}

.modpack-info {
  flex-grow: 1;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.modpack-info p {
  padding-top: 10px;
}

.modpack-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.downloads, .followers {
  white-space: nowrap;
}
</style>
