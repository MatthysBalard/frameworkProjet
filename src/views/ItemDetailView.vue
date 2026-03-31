<script setup>
import { ref, onMounted } from 'vue';
import { nasaApi } from '../api/nasa';

const props = defineProps(['id']);
const item = ref(null);
const loading = ref(true);

/**
 * Récupération des données selon le format de l'identifiant
 */
onMounted(async () => {
  try {
    // Cas 1 : Provenance APOD (L'identifiant est une date ISO)
    if (props.id.includes('-') && props.id.length === 10) {
      const res = await nasaApi.getApodByDate(props.id);
      item.value = res.data;
    } 
    
    // Cas 2 : Provenance NeoWs (Identifiant numérique long)
    else if (props.id.length >= 7 && !props.id.includes('-')) {
      const res = await nasaApi.getAsteroidById(props.id);
      const data = res.data;
      
      item.value = {
        title: `Astéroïde ${data.name}`,
        explanation: `Objet géocroiseur dont le diamètre est estimé entre ${data.estimated_diameter.meters.estimated_diameter_min.toFixed(2)}m et ${data.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m.`,
        // Image d'illustration scientifique
        url: "https://photojournal.jpl.nasa.gov/jpeg/PIA00013.jpg",
        isAsteroid: true,
        velocity: Math.round(data.close_approach_data[0].relative_velocity.kilometers_per_hour),
        distance: parseFloat(data.close_approach_data[0].miss_distance.kilometers).toLocaleString(),
        hazard: data.is_potentially_hazardous_asteroid
      };
    } 
    
    // Cas 3 : Provenance Mars Rover (Clichés de Curiosity)
    else {
      item.value = {
        title: "Exploration Martienne",
        explanation: `Cliché haute définition capturé par le Rover Curiosity sur le sol martien (ID Source : ${props.id}).`,
        img_src: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/proc/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG"
      };
    }
  } catch (error) {
    console.error("Erreur de récupération des données NASA :", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="detail-container">
    <button class="btn-back" @click="$router.back()">⬅ Retour</button>

    <div v-if="loading" class="status-message">Analyse des données spatiales...</div>

    <div v-else-if="item" class="detail-content">
      <h1>{{ item.title }}</h1>
      
      <img :src="item.url || item.img_src || item.hdurl" class="responsive-img" alt="Espace" />
      
      <div class="text-content">
        <p class="description">{{ item.explanation }}</p>
        
        <div v-if="item.isAsteroid" class="stats-grid">
          <div class="stat-item">
            <span class="label">Vitesse relative</span>
            <span class="value">{{ item.velocity }} km/h</span>
          </div>
          <div class="stat-item">
            <span class="label">Distance de survol</span>
            <span class="value">{{ item.distance }} km</span>
          </div>
          <div class="stat-item">
            <span class="label">Potentiellement dangereux</span>
            <span class="value" :style="{ color: item.hazard ? '#e74c3c' : '#2ecc71' }">
              {{ item.hazard ? 'Oui' : 'Non' }}
            </span>
          </div>
        </div>

        <div v-if="item.date" class="meta-info">
          <strong>Date d'observation :</strong> {{ item.date }}
        </div>

        <div v-if="!item.date && !item.isAsteroid" class="meta-info">
          📸 <em>Image issue des archives de la mission MSL (Mars Science Laboratory).</em>
        </div>
      </div>
    </div>

    <div v-else class="status-message">Erreur : Impossible de charger les détails.</div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;
}

.btn-back {
  background: #34495e;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background 0.3s;
}

.btn-back:hover { background: #2c3e50; }

.responsive-img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.text-content {
  margin-top: 1.5rem;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
}

.description {
  font-size: 1.1rem;
  text-align: justify;
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.stat-item { display: flex; flex-direction: column; }
.label { font-size: 0.75rem; color: #bdc3c7; text-transform: uppercase; }
.value { font-size: 1rem; font-weight: bold; margin-top: 4px; }

.meta-info {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: #bdc3c7;
}

.status-message { text-align: center; margin-top: 4rem; }
</style>