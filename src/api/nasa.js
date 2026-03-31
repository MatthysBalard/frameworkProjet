import axios from 'axios';

const nasaClient = axios.create({
  baseURL: 'https://api.nasa.gov',
  params: {
    api_key: 'SUfLNzXshty3YV0blVaqJ3Dsfzt4tLSzF29idUnm'
  }
});

export const nasaApi = {
  // Récupération des données APOD (Astronomy Picture of the Day)
  getApod(count = 10) {
    return nasaClient.get('/planetary/apod', { params: { count } });
  },
  
  getApodByDate(date) {
    return nasaClient.get('/planetary/apod', { params: { date } });
  },

  // Récupération des clichés du Rover Curiosity
  getMarsPhotos() {
    return nasaClient.get('/mars-photos/api/v1/rovers/curiosity/photos', { 
      params: { sol: 1000 } 
    });
  },

  // Récupération du flux des objets géocroiseurs (NeoWs)
  getAsteroids(startDate) {
    return nasaClient.get('/neo/rest/v1/feed', { params: { start_date: startDate } });
  },

  // Récupération des détails d'un objet spécifique par son identifiant
  getAsteroidById(id) {
    return nasaClient.get(`/neo/rest/v1/neo/${id}`);
  }
};