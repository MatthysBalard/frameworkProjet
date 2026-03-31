<script setup>
import { ref, onMounted } from 'vue';
import { nasaApi } from '../api/nasa';

const marsPhotos = ref([]);
const loading = ref(true);

/**
 * Récupération des clichés du Rover Curiosity
 */
onMounted(async () => {
  try {
    const response = await nasaApi.getMarsPhotos();
    // On limite à 24 photos pour une grille harmonieuse
    if (response.data && response.data.photos) {
      marsPhotos.value = response.data.photos.slice(0, 24);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des photos Mars :", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="mars-container">
    <h1>Galerie Martienne</h1>
    <p class="subtitle">Exploration visuelle du cratère Gale par le Rover Curiosity</p>
    
    <div v-if="loading" class="status-message">Réception des signaux de Mars...</div>

    <div v-else class="mars-grid">
      <div v-for="photo in marsPhotos" :key="photo.id" class="mars-card">
        <router-link :to="{ name: 'Details', params: { id: photo.id }}" class="card-link">
          <div class="image-wrapper">
            <img :src="photo.img_src" :alt="'Photo Mars ' + photo.id" class="mars-img" />
            <div class="overlay">
              <span>Voir les détails</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mars-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
.subtitle { color: #bdc3c7; margin-bottom: 30px; }

.mars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.mars-card {
  border-radius: 8px;
  overflow: hidden;
  background: #1a1d29;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.image-wrapper {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.mars-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: scale 0.5s ease;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay span {
  color: white;
  border: 1px solid white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Effets au survol */
.mars-card:hover { transform: scale(1.03); }
.mars-card:hover .overlay { opacity: 1; }
.mars-card:hover .mars-img { scale: 1.1; }

.status-message { text-align: center; margin-top: 50px; color: #bdc3c7; }
</style>