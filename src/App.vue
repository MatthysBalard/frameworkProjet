<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/apod">APOD</router-link>
      <router-link to="/mars">Mars</router-link>
      <router-link to="/asteroids">Astéroïdes</router-link>
    </nav>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #0b0d17;
  color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  min-height: 100vh;
}

.container {
  padding: 20px;
}

.navbar {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  display: flex;
  gap: 20px;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a.router-link-active {
  color: #e67e22;
  border-bottom: 2px solid #e67e22;
}
</style>