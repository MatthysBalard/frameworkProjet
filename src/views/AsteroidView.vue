<script setup>
import { ref, onMounted } from 'vue';
import { nasaApi } from '../api/nasa';

const asteroids = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    // Récupération de la date du jour pour l'API NeoWs
    const today = new Date().toISOString().split('T')[0];
    const response = await nasaApi.getAsteroids(today);
    
    // Extraction de la liste des objets géocroiseurs du jour
    asteroids.value = response.data.near_earth_objects[today];
  } catch (error) {
    console.error("Erreur lors de la récupération des astéroïdes :", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="asteroid-container">
    <h1>☄️ Surveillance des Astéroïdes</h1>
    <p class="subtitle">Objets passant à proximité de la Terre aujourd'hui</p>

    <div v-if="loading" class="loader">Analyse des trajectoires en cours...</div>

    <div v-else class="asteroid-grid">
      <router-link 
        v-for="a in asteroids" 
        :key="a.id" 
        :to="{ name: 'Details', params: { id: a.id }}" 
        class="card-link"
      >
        <div class="asteroid-card">
          <div class="card-header">
            <h3>{{ a.name }}</h3>
            <span :class="a.is_potentially_hazardous_asteroid ? 'danger-badge' : 'safe-badge'">
              {{ a.is_potentially_hazardous_asteroid ? '⚠️ DANGEREUX' : '✅ SÛR' }}
            </span>
          </div>

          <div class="card-body">
            <p><strong>Diamètre approx :</strong> {{ a.estimated_diameter.meters.estimated_diameter_max.toFixed(2) }} m</p>
            <p><strong>Vitesse :</strong> {{ Math.round(a.close_approach_data[0].relative_velocity.kilometers_per_hour) }} km/h</p>
            <p><strong>Distance de survol :</strong> {{ parseFloat(a.close_approach_data[0].miss_distance.kilometers).toLocaleString() }} km</p>
            <p class="more-info">Cliquer pour plus d'informations ➔</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.asteroid-container { padding: 20px; color: white; min-height: 100vh; }
.asteroid-grid { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }

/* Style pour enlever le style "lien" par défaut */
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;
}

.card-link:hover {
  transform: translateX(10px); /* Petit décalage au survol */
}

.asteroid-card {
  background: #1a1d29;
  border-left: 5px solid #3a3f58;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}

.card-header { display: flex; justify-content: space-between; align-items: center; }

.danger-badge { color: #ff4d4d; font-weight: bold; font-size: 0.8rem; border: 1px solid #ff4d4d; padding: 2px 8px; border-radius: 4px; }
.safe-badge { color: #44ff44; font-weight: bold; font-size: 0.8rem; border: 1px solid #44ff44; padding: 2px 8px; border-radius: 4px; }

.card-body p { margin: 5px 0; font-size: 0.9rem; color: #ccc; }

.more-info {
  margin-top: 10px !important;
  color: #3498db !important;
  font-size: 0.8rem !important;
  font-style: italic;
}
</style>