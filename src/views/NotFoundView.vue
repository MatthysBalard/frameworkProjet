<template>
  <div class="not-found-container">
    <div class="content">
      <h1 class="error-code">404</h1>
      <div class="separator"></div>
      <h2>Houston, nous avons un problème.</h2>
      <p>La page demandée est introuvable ou a dérivé hors de notre orbite.</p>
      
      <router-link to="/" class="btn-home">
        Retourner à l'accueil
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Page informative sans logique réactive
</script>

<style scoped>
.not-found-container {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
}

.error-code {
  font-size: 6rem;
  margin: 0;
  font-weight: bold;
  letter-spacing: 5px;
  color: #e67e22; /* Orange NASA */
}

.separator {
  width: 60px;
  height: 3px;
  background: #ffffff;
  margin: 20px auto;
  opacity: 0.3;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

p {
  color: #bdc3c7;
  margin-bottom: 30px;
}

.btn-home {
  display: inline-block;
  background: #34495e;
  color: white;
  text-decoration: none;
  padding: 10px 25px;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.btn-home:hover {
  background: #2c3e50;
}
</style>