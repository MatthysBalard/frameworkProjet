<template>
  <div class="home-container">
    <div class="hero-section">
      <h1>NASA Explorer</h1>
      <p class="tagline">Interface de consultation des données spatiales en temps réel</p>
    </div>

    <div class="navigation-grid">
      <router-link to="/apod" class="nav-card">
        <div class="icon">🛰️</div>
        <h3>Astronomie</h3>
        <p>Découvrez l'image du jour sélectionnée par la NASA.</p>
      </router-link>

      <router-link to="/mars" class="nav-card">
        <div class="icon">🚀</div>
        <h3>Planète Mars</h3>
        <p>Explorez les derniers clichés du Rover Curiosity.</p>
      </router-link>

      <router-link to="/asteroids" class="nav-card">
        <div class="icon">☄️</div>
        <h3>Astéroïdes</h3>
        <p>Surveillez les objets géocroiseurs proches de la Terre.</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Pas de logique nécessaire pour l'accueil
</script>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
}

.hero-section {
  margin-bottom: 60px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  letter-spacing: 2px;
  color: #ffffff;
}

.tagline {
  font-size: 1.2rem;
  color: #bdc3c7;
}

.navigation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.nav-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.nav-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-10px);
  border-color: #e67e22;
}

.icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #e67e22;
}

p {
  color: #bdc3c7;
  line-height: 1.5;
}
</style>