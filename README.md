Ce projet répond aux besoins de TéléSport concernant les jeux olympiques.
Cette application nous permet d'avoir des statistiques sous forme de graphique sur les jeux olympiques précédents.

Pour lancer l'application il faut suivre les étapes suivantes :

# Environnement de développement
La commande `npm start` permet de lancer un environnement de développement. Celui-ci offre l'avantage de supporter le hot reload.

> Vous pouvez rajouter --host 0.0.0.0 à la suite de `ng serve` dans le fichier `package.json` qui permet de lancer le serveur web de développement sur toutes vos interfaces réseaux. Ceci vous permet de pouvoir tester votre application sur les appareils connectés à votre réseau, vous pouvez donc tester sur un téléphone.
# Production
Pour un environnement de production, il faut d'abord build l'application avec `npm build`. Ensuite il suffit de déposer les fichiers générés sur un serveur web ou d'ouvrir le fichier index.html.