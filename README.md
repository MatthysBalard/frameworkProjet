Projet NASA Explorer
Objectif du projet
Ce projet consiste en la création d'une application web développée avec le framework Vue.js 3. L'application consomme les données réelles issues des API publiques de la NASA pour offrir une interface de consultation de contenus astronomiques et de données télémétriques spatiales.

Fonctionnalités principales
L'application est structurée autour des modules suivants :

Accueil : Interface de navigation centralisée vers les différentes sections.

APOD (Astronomy Picture of the Day) : Affichage d'une galerie d'images astronomiques avec leurs explications scientifiques.

Exploration Mars : Visualisation des photographies capturées par le Rover Curiosity (mission MSL).

Astéroïdes (NeoWs) : Suivi des objets géocroiseurs avec affichage des données techniques (vitesse, distance de passage, dangerosité potentielle).

Détails Dynamiques : Système de routage permettant d'afficher une fiche complète pour chaque objet via un identifiant unique (date ou ID numérique).

Organisation
Développement : Travail réalisé en individuel.

Méthodologie :

Mise en place d'un client API centralisé avec Axios.

Gestion de la navigation via Vue Router avec passage de propriétés dynamiques.

Structuration des composants en Composition API.

Difficultés rencontrées et solutions
Identification des sources : Les formats d'ID diffèrent selon les types d'objets (dates ISO pour APOD vs identifiants numériques pour les astéroïdes).

Solution : Utilisation d'une logique de tri conditionnel dans le cycle de vie du composant Detail pour rediriger vers le bon appel API.

Absence d'images pour les astéroïdes : L'API NeoWs ne fournit que des données chiffrées sans visuels.

Solution : Intégration d'images d'illustration provenant du Jet Propulsion Laboratory (JPL) pour assurer la continuité visuelle de l'interface.

Récupération des données Mars : Des difficultés techniques persistent sur la récupération des données de l'API Mars Rover.

État actuel : Ce problème n'est pas résolu de mon côté à ce jour. En conséquence, le fonctionnement réel de cette section n'a pas pu être totalement vérifié en conditions réelles.

Installation et lancement:

Installation des dépendances:

npm install

Lancement en mode développement:

npm run dev