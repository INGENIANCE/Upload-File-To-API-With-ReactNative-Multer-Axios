# Upload vers une API Node.js avec React Native, Multer et Axios

> 📃 Ce projet est utilisé dans le cadre d'un article disponible depuis le blog technique d'Ingéniance :
https://techblog.ingeniance.fr/gerer-upload-fichiers-reactnative-nodejs-axios-multer

Ce dépôt propose un POC permettant d'uploader un fichier provenant d'une application mobile développée sous [React Native](https://reactnative.dev/) vers une API [Node.js](https://nodejs.org/) dont la gestion des fichiers est gérée par le middleware [Multer](https://github.com/expressjs/multer). L'application mobile s'appuie sur la librairie [axios](https://github.com/axios/axios) pour transmettre la requête vers l'API.

L'ensemble des explications pour l'utilisation de ce POC sont détaillées dans l'article en lien au début de ce Readme. Cependant voici un condensé de ce qu'il faut faire pour pouvoir l'installer.

## Prérequis

Vous devez disposer d'une installation d'**Android Studio** sur votre poste : https://developer.android.com/studio?hl=fr

Veuillez suivre ensuite les indications fournies par les équipes de **React Native** pour mettre en place votre environnement de développement mobile : https://reactnative.dev/docs/environment-setup

Assurez vous simplement que le niveau de l'API utilisée est au moins de 30.

## Installation et exécution de l'API Node.js

Vous devez disposer d'une installation LTS de [Node.js](https://nodejs.org/en/download/) sur votre poste (14.X ou supérieure recommandée).

Vous devez ensuite cloner le contenu du dossier `api` sur votre poste puis lancer la commande suivante pour installer les dépendances :
```bash
npm i
```
Une fois l'installation terminée vous pourrez ensuite exécuter l'API à l'aide de la commande suivante à la racine du dossier `api` :
```bash
node index.js
```
Une instance du serveur [express.js](https://expressjs.com/) sera exécutée sur le port 8000 de votre poste et visible depuis l'adresse http://localhost:8000 de votre navigteur Web.

## Installation et exécution de l'application React Native

Vous devez tout d'abord créer un nouveau projet à l'aide de la CLI de **React Native** :
```bash
npx react-native init <your-react-native-project-folder-name>
```
Remplacez le contenu du fichier `App.tsx` à la racine du projet nouvellement créé par celui contenu dans le dossier `mobile` de ce dépôt. Créez également un dossier `components` et placez y le fichier `Camera.tsx` contenu dans `mobile\components`. Enfin remplacez le fichier `package.json` de votre projet par celui du dépôt et exécutez la commande suivante à la racine de votre projet **React Native** :
```bash
npm i
```
Reste plus qu'à vérifier votre environnement de développement en vous assurant qu'une émulateur Android est exécuté avant de taper la commande `npm start` qui va lancer une instance de **Metro**, le connecteur entre votre application et l'émulateur. Une fois **Metro** lancé, vous pouvez exécuter la commande suivante :
```bash
npm run android
```
L'initialisation prendra un peu de temps, mais vous n'aurez plus à le refaire temps que vous laisserez votre application trouner. Metro s'assure d'une relance à chaud des modifications que vous effectuez dans votre code.

## Vérifier les permissions

Vous devez vérifier que votre application aura bien les droits d'accès à la caméra de l'appareil. Pour celà ouvrez le fichier `AndroidManifest.xml` situé dans le dossier `mobile\android\app\src\main\` et vérifiez la présence des lignes suivantes :
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
```

Happy coding !

