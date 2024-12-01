<script setup>
import {onMounted, ref} from 'vue';

const modIds = ['jv0UKGOX', 'KN33kvHF', 'w8avchdW', '8k8d2Dbx', 'BGFlKGar'];

const mods = ref([]);

const fetchModData = async (projectId) => {
  try {
    // Fetch mod data
    const modResponse = await fetch(`https://api.modrinth.com/v2/project/${projectId}`);
    if (!modResponse.ok) {
      throw new Error(`Error fetching data for project ID ${projectId}: ${modResponse.statusText}`);
    }
    const modData = await modResponse.json();

    // Fetch authors data
    const membersResponse = await fetch(`https://api.modrinth.com/v2/project/${projectId}/members`);
    if (!membersResponse.ok) {
      throw new Error(`Error fetching authors for project ID ${projectId}: ${membersResponse.statusText}`);
    }
    const membersData = await membersResponse.json();

    // Extract author names
    const authors = membersData.map(member => member.user?.name || member.user?.username);

    // Return combined mod and author data
    return {...modData, authors};
  } catch (error) {
    console.error(error);
    return null;
  }
};

onMounted(async () => {
  const modsFetchPromises = modIds.map(projectId => fetchModData(projectId));

  const results = await Promise.all(modsFetchPromises);

  mods.value = results.filter(result => result !== null);
});

const processTitle = (title) => {
  if (title.startsWith('Create: ')) {
    return {prefix: 'Create:', title: title.replace('Create: ', '')};
  } else if (title.startsWith('Create ')) {
    return {prefix: 'Create', title: title.replace('Create ', '')};
  }
  return {prefix: '', title};
};
</script>

<template>
  <h1>Homemade mods of Kryeit</h1>
  <div class="mod-grid">
    <div v-for="(mod, index) in mods" :key="index" class="mod">
      <a :href="`https://modrinth.com/mod/${mod.slug}`" target="_blank" class="clicked-wrapper">
        <img
            :src="mod.icon_url"
            :alt="mod.title"
            class="mod-icon"
        />
        <div class="mod-content">
          <div class="mod-info">
            <h2 v-if="processTitle(mod.title).prefix" class="prefix">{{ processTitle(mod.title).prefix }}</h2>
            <h2>{{ processTitle(mod.title).title }}</h2>
            <p style="text-align: justify">{{ mod.description }}</p>
          </div>
          <div class="mod-stats">
            <p><strong>Made by:</strong>
              <span class="authors">
                <span v-for="(author, index) in mod.authors" :key="index">
                  <a :href="`https://modrinth.com/user/${author}`" target="_blank" rel="noopener noreferrer"
                     @click.stop>{{ author }}</a>
                <span v-if="index < mod.authors.length - 1">, </span>
              </span>
            </span>
            </p>
            <p class="followers">
              Followers:
              {{ mod.followers }}
            </p>
            <p class="downloads">
              <Download/>
              {{ mod.downloads }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
  margin-top: 20px;
  font-size: 52px;
}

.mod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.mod {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid var(--color-border);
  border-radius: 10px;
  position: relative;
  background: var(--color-background-mute);
  overflow: hidden;
  transition: transform 1.5s ease;
  animation: none;
}

.clicked-wrapper {
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.mod-icon {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  background: var(--color-background);
  border: 3px solid var(--color-border);
  padding: 10px;
  position: absolute;
  top: 20px; /* Adjust as needed */
}

.mod-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  margin-top: 190px; /* Adjust to provide space for the icon */
}

.mod-info {
  text-align: left;
  flex-grow: 1;
}

.mod-info p {
  padding-top: 10px;
}

.mod-stats {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding-top: 20px;
}

.downloads, .followers {
  white-space: nowrap;
}

h2 {
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  margin: 0 0 0 12px;
}

.prefix {
  font-size: 0.8rem;
}

.authors {
  display: inline;
  font-weight: bold;
  margin-left: 8px;
  gap: 4px;
}

.authors a {
  color: var(--color-text);
}

.authors a:hover {
  color: #0000EE;
}

@keyframes rotate {
  from {
    transform: rotate(0deg) scale(1.04);
  }
  to {
    transform: rotate(360deg) scale(1.04);
  }
}

.mod:hover .mod-icon {
  animation: rotate 238s linear infinite;
  transform: scale(1.04);
}
</style>