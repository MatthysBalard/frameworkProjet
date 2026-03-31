<script setup>
import { ref, onMounted } from 'vue';
import { nasaApi } from '../api/nasa';

const photos = ref([]);
const loading = ref(true);

/**
 * Récupération d'un échantillon de photos astronomiques du jour (APOD)
 */
onMounted(async () => {
  try {
    const response = await nasaApi.getApod(12);
    photos.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération NASA APOD:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="apod-container">
    <h1>Galerie Astronomique</h1>
    <p class="subtitle">Sélection de clichés issus du programme Astronomy Picture of the Day</p>

    <div v-if="loading" class="status-message">Exploration de la base de données...</div>

    <div v-else class="apod-grid">
      <div v-for="photo in photos" :key="photo.date" class="apod-card">
        <img :src="photo.url" :alt="photo.title" class="card-img" />
        
        <div class="card-content">
          <h3>{{ photo.title }}</h3>
          <p class="photo-date">{{ photo.date }}</p>
          
          <router-link 
            :to="{ name: 'Details', params: { id: photo.date }}" 
            class="btn-detail"
          >
            Consulter les détails ➔
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apod-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
.subtitle { color: #bdc3c7; margin-bottom: 30px; }

.apod-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.apod-card {
  background: #1a1d29;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.apod-card:hover { transform: translateY(-8px); }

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content { padding: 15px; text-align: left; }

.card-content h3 {
  font-size: 1.1rem;
  margin: 0 0 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.photo-date { color: #7f8c8d; font-size: 0.85rem; margin-bottom: 15px; }

.btn-detail {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
}

.btn-detail:hover { text-decoration: underline; }

.status-message { text-align: center; margin-top: 50px; font-size: 1.2rem; }
</style>