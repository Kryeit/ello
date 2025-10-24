<script setup>
import {onMounted, ref} from 'vue';

const officialProjectIds = ['duaqEXgz', 'QZixYYM8'];
const communityProjectIds = ['iEeNYT4y', 'thV8JtM6', 'uWc39OfE', 'eqC2P8yE'];

const officialModpacks = ref([]);
const communityModpacks = ref([]);
const rotationAngles = new Map();

const fetchModpackData = async (projectId) => {
  try {
    // Fetch modpack data
    const modpackResponse = await fetch(`https://api.modrinth.com/v2/project/${projectId}`);
    if (!modpackResponse.ok) {
      throw new Error(`Error fetching data for project ID ${projectId}: ${modpackResponse.statusText}`);
    }
    const modpackData = await modpackResponse.json();

    // Fetch authors data
    const membersResponse = await fetch(`https://api.modrinth.com/v2/project/${projectId}/members`);
    if (!membersResponse.ok) {
      throw new Error(`Error fetching authors for project ID ${projectId}: ${membersResponse.statusText}`);
    }
    const membersData = await membersResponse.json();

    // Extract author names
    const authors = membersData.map(member => member.user?.name || member.user?.username);

    // Return combined modpack and author data
    return { ...modpackData, authors };
  } catch (error) {
    console.error(error);
    return null;
  }
};
onMounted(async () => {
  const officialFetchPromises = officialProjectIds.map(projectId => fetchModpackData(projectId));
  const communityFetchPromises = communityProjectIds.map(projectId => fetchModpackData(projectId));

  const officialResults = await Promise.all(officialFetchPromises);
  const communityResults = await Promise.all(communityFetchPromises);

  officialModpacks.value = officialResults.filter(result => result !== null);
  communityModpacks.value = communityResults.filter(result => result !== null);
});

const processTitle = (title) => {
  if (title.startsWith('Kryeit: ')) {
    return { prefix: 'Kryeit:', title: title.replace('Kryeit: ', '') };
  } else if (title.startsWith('Kryeit ')) {
    return { prefix: 'Kryeit', title: title.replace('Kryeit ', '') };
  }
  return { prefix: '', title };
};
</script>

<template>
  <h1>Modpacks</h1>
  <h2>Official</h2>
  <div class="modpack-grid">
    <div v-for="(modpack, index) in officialModpacks" :key="index" class="modpack">
      <a :href="`https://modrinth.com/mod/${modpack.slug}`" target="_blank" class="clicked-wrapper">
        <img
            :src="modpack.icon_url"
            :alt="modpack.title"
            class="modpack-icon"
        />
        <div class="modpack-content">
          <div class="modpack-info">
            <h2 v-if="processTitle(modpack.title).prefix" class="prefix">{{ processTitle(modpack.title).prefix }}</h2>
            <h2>{{ processTitle(modpack.title).title }}</h2>
            <p style="text-align: justify">{{ modpack.description }}</p>
          </div>
          <div class="modpack-stats">
            <p><strong>Made by:</strong>
              <span class="authors">
                <span v-for="(author, index) in modpack.authors" :key="index">
                  <a :href="`https://modrinth.com/user/${author}`" target="_blank" rel="noopener noreferrer" @click.stop>{{ author }}</a>
                <span v-if="index < modpack.authors.length - 1">, </span>
              </span>
            </span>
            </p>
            <p class="followers">
              Followers:
              {{ modpack.followers }}
            </p>

            <p class="downloads">
              <Download />
              {{ modpack.downloads }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>

  <h2>Community driven</h2>
  <div class="modpack-grid">
    <div v-for="(modpack, index) in communityModpacks" :key="index" class="modpack">
      <a :href="`https://modrinth.com/mod/${modpack.slug}`" target="_blank" class="clicked-wrapper">
        <img
            :src="modpack.icon_url"
            :alt="modpack.title"
            class="modpack-icon"
        />
        <div class="modpack-content">
          <div class="modpack-info">
            <h2 v-if="processTitle(modpack.title).prefix" class="prefix">{{ processTitle(modpack.title).prefix }}</h2>
            <h2>{{ processTitle(modpack.title).title }}</h2>
            <p style="text-align: justify">{{ modpack.description }}</p>
          </div>
          <div class="modpack-stats">
            <p><strong>Made by:</strong>
              <span class="authors">
                <span v-for="(author, index) in modpack.authors" :key="index">
                  <a :href="`https://modrinth.com/user/${author}`" target="_blank" rel="noopener noreferrer" @click.stop>{{ author }}</a>
                <span v-if="index < modpack.authors.length - 1">, </span>
              </span>
            </span>
            </p>
            <p class="downloads">
              <Download />
              {{ modpack.downloads }}
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

.modpack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.modpack {
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

.modpack-icon {
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

.modpack-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  margin-top: 190px; /* Adjust to provide space for the icon */
}

.modpack-info {
  text-align: left;
  flex-grow: 1;
}

.modpack-info p {
  padding-top: 10px;
}

.modpack-stats {
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

.modpack:hover .modpack-icon {
  animation: rotate 238s linear infinite;
  transform: scale(1.04);
}
</style>