<h1>Bien venue sur le site du estaurant P'tit Cahoua</h1>

Vous avez dit :

import Route from "./Route.js";

//Définir ici vos routes

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique"

Votre code semble être une configuration pour la gestion des routes dans une application JavaScript. Voici une clarification de votre code :

Importation de la classe Route depuis un fichier externe "./Route.js".
Déclaration des routes avec un tableau allRoutes qui contient des objets Route. Chaque objet correspond à une route définie avec trois paramètres :
Le chemin URL ("/").
Le titre de la route ("Accueil").
Le fichier HTML à charger ("/pages/home.html").
Déclaration du nom du site avec websiteName, qui sera ajouté au titre de chaque page (par exemple, Accueil - Quai Antique).
Voici votre code tel qu'il est :

javascript
Copier le code
import Route from "./Route.js";

// Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
];

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
Si vous souhaitez ajouter d'autres routes ou modifier cette configuration, vous pouvez simplement étendre le tableau allRoutes en ajoutant d'autres instances de Route. Par exemple, si vous avez une autre page pour un menu, vous pouvez faire ceci :

javascript
Copier le code
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/menu", "Menu", "/pages/menu.html"),
];
Si vous avez besoin d'aide pour le fichier Route.js ou pour d'autres fonctionnalités, faites-le moi savoir !






Vous avez dit :
import Route from "./Route.js";
import { allRoutes, websiteName } from "./allRoutes.js";

// Création d'une route pour la page 404 (page introuvable)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Fonction pour récupérer la route correspondant à une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondance
  allRoutes.forEach((element) => {
    if (element.url == url) {
      currentRoute = element;
    }
  });
  // Si aucune correspondance n'est trouvée, on retourne la route 404
  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = window.location.pathname;
  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);
  // Récupération du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Ajout du contenu HTML à l'élément avec l'ID "main-page"
  document.getElementById("main-page").innerHTML = html;

  // Ajout du contenu JavaScript
  if (actualRoute.pathJS != "") {
    // Création d'une balise script
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);

    // Ajout de la balise script au corps du document
    document.querySelector("body").appendChild(scriptTag);
  }

  // Changement du titre de la page
  document.title = actualRoute.title + " - " + websiteName;
};

// Fonction pour gérer les événements de routage (clic sur les liens)
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  // Mise à jour de l'URL dans l'historique du navigateur
  window.history.pushState({}, "", event.target.href);
  // Chargement du contenu de la nouvelle page
  LoadContentPage();
};

// Gestion de l'événement de retour en arrière dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent à la propriété route de la fenêtre
window.route = routeEvent;
// Chargement du contenu de la page au chargement initial
LoadContentPage();

Votre code met en place un système de routage simple pour une application web utilisant JavaScript, avec une gestion des erreurs 404 et un chargement dynamique des pages. Voici un récapitulatif et quelques suggestions sur ce code :

Fonctionnalités principales :
Import des routes et du nom du site :

Vous importez les routes définies dans allRoutes.js ainsi que le nom du site (websiteName) pour l'utiliser lors du changement du titre de la page.
Route 404 :

Une route pour les pages introuvables est créée avec la variable route404, qui sera utilisée lorsque l'URL ne correspond à aucune route définie dans allRoutes.
Recherche de route par URL :

La fonction getRouteByUrl permet de rechercher la route correspondante à l'URL actuelle. Si aucune route n'est trouvée, la route 404 est renvoyée.
Chargement du contenu de la page :

La fonction LoadContentPage utilise l'API Fetch pour charger le contenu HTML de la route actuelle et l'injecter dans l'élément HTML avec l'ID main-page.
Si un fichier JavaScript est associé à la page, il est chargé dynamiquement avec un élément <script>.
Événements de routage :

La fonction routeEvent permet de gérer les clics sur les liens et de mettre à jour l'URL sans recharger la page (utilisant pushState pour modifier l'historique).
Le contenu est mis à jour sans rechargement de page, grâce à l'appel de LoadContentPage().
Retour en arrière dans l'historique :

window.onpopstate est utilisé pour gérer la navigation dans l'historique (boutons "retour" et "suivant" du navigateur) et recharger le contenu correspondant à l'URL.
Suggestions d'amélioration :
Optimisation de la recherche de route :

Utilisez la méthode find pour une recherche plus élégante au lieu de forEach :
javascript
Copier le code
const getRouteByUrl = (url) => {
  return allRoutes.find((element) => element.url === url) || route404;
};
Gestion des erreurs lors du chargement du contenu :

Vous pourriez gérer les erreurs lors du chargement du contenu avec fetch en ajoutant un catch :
javascript
Copier le code
const html = await fetch(actualRoute.pathHtml)
  .then((data) => data.text())
  .catch(() => "<h1>Erreur de chargement de la page</h1>");
Gestion des liens internes :

Assurez-vous que vos liens internes (dans le HTML chargé) utilisent bien event.preventDefault() pour éviter le rechargement de la page.
Ajout de transitions :

Pour une meilleure expérience utilisateur, vous pourriez ajouter des transitions lors du changement de page (par exemple, en utilisant CSS ou JavaScript pour des animations).
Sécurité :

Veillez à ne pas charger de scripts externes de manière non sécurisée, surtout si l'URL des scripts provient de sources inconnues.
Cela semble être une très bonne base pour un système de routage léger. Si vous avez besoin de clarifications ou d'ajouts spécifiques, n'hésitez pas !






Vous avez dit :
export default class Route {
    constructor(url, title, pathHtml, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
    }
}

Votre classe Route est bien structurée et définit les propriétés essentielles pour gérer une route dans votre système de routage. Voici un petit récapitulatif des composants de cette classe et quelques suggestions d'améliorations :

Classe Route :
Constructeur :
Le constructeur prend quatre paramètres :
url : L'URL de la route.
title : Le titre de la page associée à la route.
pathHtml : Le chemin vers le fichier HTML à charger pour cette route.
pathJS : Optionnel, c'est le chemin vers un fichier JavaScript spécifique à la route. Si aucun fichier JS n'est nécessaire, ce paramètre est vide par défaut (pathJS = "").
Améliorations possibles :
Validation des arguments :

Vous pourriez ajouter des vérifications simples dans le constructeur pour vous assurer que les valeurs passées sont valides (par exemple, que url, title, et pathHtml sont bien des chaînes de caractères).
Exemple :
javascript
Copier le code
constructor(url, title, pathHtml, pathJS = "") {
  if (typeof url !== 'string' || typeof title !== 'string' || typeof pathHtml !== 'string') {
    throw new Error("Les paramètres url, title et pathHtml doivent être des chaînes de caractères.");
  }
  this.url = url;
  this.title = title;
  this.pathHtml = pathHtml;
  this.pathJS = pathJS;
}
Méthodes supplémentaires :

Vous pourriez ajouter des méthodes dans la classe pour mieux encapsuler les comportements ou manipuler les données liées à une route.
Par exemple, une méthode pour vérifier si la route a





Vous avez dit :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header> Le menu</header>

    <main id="main-page">
        <!--le contenue de la page sera injecté ici-->
    </main>

    <footer>Le footer de mon site</footer>
    
    <script type="module" src="Router/Router.js"></script>
</body>
</html>
ChatGPT a dit :
ChatGPT
Votre code HTML est bien structuré pour une page qui utilise un système de routage. Voici une brève explication et quelques suggestions pour l'améliorer :

Structure de votre document HTML :
Doctype et balises HTML :

Le <!DOCTYPE html> définit le document comme étant du HTML5, ce qui est parfait pour les navigateurs modernes.
Balise <head> :

Contient les métadonnées, comme le charset (UTF-8) et la viewport pour le responsive design.
Vous pourriez également envisager d'ajouter une balise <meta> pour le description du site pour le SEO.
Balise <body> :

Header : Un en-tête simple pour le menu. Vous pourriez envisager d'ajouter une liste de liens de navigation ici pour plus de clarté.
Main : L'élément <main> avec un ID main-page est idéal pour injecter le contenu des pages. Cela facilite le chargement dynamique de différentes parties de votre site.
Footer : Un pied de page simple. Vous pourriez y ajouter des informations supplémentaires, comme des liens de contact ou des mentions légales.
Script :

Vous chargez votre fichier JavaScript Router.js en tant que module, ce qui est une bonne pratique. Assurez-vous que le chemin du fichier est correct.
Suggestions d'amélioration :
Ajouter des styles CSS :

Considérez l'ajout d'une feuille de style CSS pour améliorer l'apparence de votre page. Cela pourrait être fait en ajoutant une balise <link> dans le <head> :
html
Copier le code
<link rel="stylesheet" href="style.css">
Navigation dans le menu :

Si vous avez des routes définies, il serait utile d'inclure des éléments de navigation (liens) dans l'en-tête :
html
Copier le code
<header>
    <nav>
        <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/pages/home.html">Home</a></li>
            <li><a href="/pages/404.html">Page Introuvable</a></li>
        </ul>
    </nav>
</header>
Améliorer l'accessibilité :

Pensez à ajouter des attributs ARIA pour améliorer l'accessibilité de votre site.
Titre dynamique :

Le titre de la page est actuellement statique. Si vous modifiez le contenu chargé dynamiquement, vous pouvez également modifier le titre en fonction de la route active, ce que vous faites déjà dans votre script JavaScript.
Voici un exemple de votre code HTML avec quelques-unes de ces améliorations :

html
Copier le code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/pages/home.html">Home</a></li>
                <li><a href="/pages/404.html">Page Introuvable</a></li>
            </ul>
        </nav>
    </header>

    <main id="main-page">
        <!--le contenu de la page sera injecté ici-->
    </main>

    <footer>Le footer de mon site</footer>
    
    <script type="module" src="Router/Router.js"></script>
</body>
</html>
Ces modifications peuvent rendre votre site plus convivial et accessible. Si vous avez d'autres questions ou si vous souhaitez des précisions sur certains aspects, n'hésitez pas à demander !






Vous avez dit :
sur l 'affichage de la page il n' a pas le <h1>Bien venue sur le site du estaurant P'tit Cahoua</h1>
ChatGPT a dit :
ChatGPT
Pour afficher le titre <h1>Bien venue sur le site du restaurant P'tit Cahoua</h1> sur votre page, vous devez vous assurer que ce contenu est bien injecté dans la section <main> de votre document HTML. Voici comment vous pouvez le faire :

Étapes à suivre :
Créez une page HTML pour l'accueil (par exemple home.html), où vous placerez le contenu que vous souhaitez afficher.

Ajoutez le contenu dans cette page. Voici à quoi pourrait ressembler home.html :

html
Copier le code
<!-- pages/home.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - P'tit Cahoua</title>
</head>
<body>
    <h1>Bien venue sur le site du restaurant P'tit Cahoua</h1>
    <p>Bienvenue sur notre site ! Découvrez nos spécialités.</p>
</body>
</html>
Assurez-vous des points suivants :
Chemin du fichier :

Vérifiez que le fichier home.html est situé dans le dossier /pages comme spécifié dans votre configuration de routes.
Chargement de la page :

Lorsque vous ouvrez votre application, l'URL par défaut est /, qui correspond à la route pour l'accueil dans votre fichier allRoutes.js. Lorsque la page se charge, la fonction LoadContentPage doit récupérer le contenu de home.html et l'injecter dans l'élément avec l'ID main-page.
Mise à jour du JavaScript :

Votre logique dans Router.js devrait fonctionner pour injecter le contenu du fichier home.html dans <main id="main-page">.
Vérification finale :
Démarrer XAMPP : Assurez-vous que le serveur Apache est démarré dans XAMPP.
Accéder à votre application : Ouvrez votre navigateur et allez à http://localhost/ pour voir si le contenu s'affiche comme prévu.
Exemple complet de allRoutes.js :
Si vous avez déjà défini votre route dans allRoutes.js, cela devrait ressembler à ceci :

javascript
Copier le code
import Route from "./Route.js";

// Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
];

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
Conclusion :
Après avoir effectué ces étapes, le message d'accueil que vous avez écrit devrait apparaître sur votre page lorsque vous accédez à votre application. Si cela ne fonctionne toujours pas, vérifiez les erreurs dans la console de votre navigateur pour diagnostiquer le problème. N'hésitez pas à me faire savoir si vous avez besoin d'aide supplémentaire !

Dynamiser la partie front !

Vérifier les champs d'un formulaire en JS

La vérification des champs d'un formulaire en JavaScript est une étape cruciale pour s'assurer que les données soumises par l'utilisateur sont valides et conformes aux attentes. Pour réaliser cette vérification, on utilise généralement des fonctions JavaScript qui s'exécutent à différentes étapes (modification de champs, clic, validation du formulaire, etc.). Ces fonctions peuvent vérifier différents aspects, tels que la présence d'informations obligatoires, le format correct des données (par exemple, une adresse e-mail valide) ou encore des valeurs dans des plages acceptables pour certains champs numériques. En cas de non-conformité, des messages d'erreur peuvent être affichés à l'utilisateur, l'incitant à corriger les champs concernés avant de soumettre à nouveau. La vérification des champs en JavaScript contribue à améliorer l'expérience utilisateur en garantissant des données fiables et complètes pour le traitement ultérieur du formulaire.

Méthode :

Capter l'événement

Lors de l'implémentation de la validation des champs d’un formulaire, nous devons définir à quel moment nous voulons effectuer cette vérification. Dans notre cas, nous allons effectuer la vérification lors de la saisie dans les champs de notre formulaire. Nous allons écouter l'événement keyup.

Définition : keyup

L'événement keyup en JavaScript se déclenche lorsqu'une touche du clavier est relâchée après avoir été enfoncée. Il est très couramment utilisé pour capturer les saisies de l'utilisateur dans un champ de saisie (input) ou une zone de texte (textarea).

Lorsque l'utilisateur appuie sur une touche, l'événement keydown se déclenche, et lorsque la touche est relâchée, l'événement keyup est déclenché.

L'événement keyup est souvent utilisé pour mettre à jour une interface utilisateur en temps réel en fonction de la saisie de l'utilisateur ou pour effectuer des actions spécifiques une fois qu'une touche est relâchée.

Voici un exemple simple d'utilisation de l'événement keyup en JavaScript :

html
Copier le code
<input type="text" id="myInput">
JavaScript :

js
Copier le code
const inputElement = document.getElementById('myInput');

inputElement.addEventListener('keyup', (event) => {
  console.log('Touche relâchée : ', event.key);
});
Méthode : Vérifier les champs requis

Nous voulons maintenant vérifier que les champs "nom" et "prénom" soient bien remplis. Cette vérification s'effectuera à chaque fois que l’utilisateur tapera sur le clavier dans un champ. Voici les trois étapes pour ajouter un événement en JS :

Définir la cible : Sélectionner l'élément HTML sur lequel écouter l'événement. Cela peut être fait avec des méthodes comme document.getElementById, document.querySelector, etc.
Définir l'événement : Spécifier le type d'événement à écouter, comme click, keyup, submit, etc.
Définir l'action à exécuter : Utiliser addEventListener pour attacher l'événement à la cible et spécifier la fonction de rappel.
js
Copier le code
// Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");

inputNom.addEventListener("keyup", validateForm); 
inputPrenom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

// Fonction permettant de valider tout le formulaire
function validateForm(){
    validateRequired(inputNom);
    validateRequired(inputPrenom);
}

function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
}
Vérification sur la page d'inscription

Nous allons implémenter cette vérification sur la page d'inscription (signup.html). Pour lier JavaScript à cette page, nous allons utiliser une méthode dans notre routeur (fichier allRoutes.js). Nous ajouterons un chemin vers notre fichier JS dans Route.js, ligne Route("/signup"), avec les paramètres suivants : "js/auth/signup.js". Ensuite, nous créons un dossier js, à l'intérieur duquel nous créons un dossier auth, et un fichier signup.js.

Dans ce fichier, il faut implémenter le JavaScript de la page. Par exemple, pour vérifier un champ requis comme le champ "nom", on récupère l'ID de l'input dans signup.html (ici "NomInput") :

js
Copier le code
const inputNom = document.getElementById('NomInput');
On ajoute un écouteur d'événement keyup :

js
Copier le code
inputElement.addEventListener('keyup', validateForm);
Ensuite, la fonction validateForm validera tout le formulaire.

Vérifier le mail: vérifier le champs email :

Voici une explication détaillée du code de la fonction validateMail :

js
Copier le code
function validateMail(input) {
    // Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;

    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
1. Déclaration de la fonction
La fonction validateMail est définie pour valider si l'adresse e-mail fournie dans le champ input est au bon format ou non. Cette fonction prend un seul paramètre input, qui représente l'élément HTML <input> contenant l'e-mail à valider.

2. Définir une expression régulière (regex)
js
Copier le code
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
L'expression régulière emailRegex est définie pour correspondre au format typique d'une adresse e-mail. Voici la décomposition de cette regex :

^ : Début de la chaîne.
[^\s@]+ : Au moins un caractère qui n'est ni un espace (\s) ni un @.
@ : Le caractère @ doit être présent.
[^\s@]+ : Encore au moins un caractère qui n'est ni un espace ni un @ (la partie qui suit l'@, c'est-à-dire le domaine).
\. : Un point . doit être présent pour séparer le domaine et l'extension.
[^\s@]+ : Au moins un caractère qui n'est ni un espace ni un @ après le point (l'extension de domaine, comme ".com").
$ : Fin de la chaîne.
Cette regex s'assure donc que l'e-mail contient :

Un nom d'utilisateur avant le @.
Un @.
Un domaine suivi d'un point.
Une extension après le point.
3. Récupérer la valeur de l'e-mail
js
Copier le code
const mailUser = input.value;
Ici, on récupère la valeur de l'élément input (l'e-mail saisi par l'utilisateur) et on la stocke dans la variable mailUser.

4. Vérifier si l'e-mail correspond à la regex
js
Copier le code
if (mailUser.match(emailRegex)) {
Cette ligne utilise la méthode match() pour vérifier si la valeur saisie par l'utilisateur (mailUser) correspond à l'expression régulière emailRegex. Si elle correspond (c'est-à-dire que l'e-mail est dans le bon format), le bloc if est exécuté.

5. Ajouter ou retirer des classes selon la validation
Si l'e-mail est valide :

js
Copier le code
input.classList.add("is-valid");
input.classList.remove("is-invalid");
La classe is-valid est ajoutée à l'élément input. Cette classe est souvent utilisée avec Bootstrap pour indiquer visuellement que la saisie est correcte.
La classe is-invalid est retirée, pour supprimer toute indication visuelle d'une erreur éventuelle.
Ensuite, la fonction retourne true pour indiquer que la validation a réussi.

Si l'e-mail n'est pas valide :

js
Copier le code
input.classList.remove("is-valid");
input.classList.add("is-invalid");
La classe is-valid est retirée.
La classe is-invalid est ajoutée pour indiquer visuellement une erreur de saisie.
Enfin, la fonction retourne false pour indiquer que la validation a échoué.

6. Retour de la fonction
Si l'e-mail correspond au format défini par emailRegex, la fonction retourne true.
Si l'e-mail ne correspond pas, la fonction retourne false.
En résumé :
La fonction utilise une expression régulière pour valider le format d'une adresse e-mail.
Si l'e-mail est correct, elle applique une classe CSS pour indiquer que le champ est valide.
Si l'e-mail est incorrect, elle applique une classe CSS pour indiquer une erreur et retourne false.


Dans notre formulaire il faut qu'on désactive le boutton inscription et l'activer uniquement une fois le formulaire est rempli:
c'est pour ce la il faut  récupérer l'id de ce boutton "Inscription" dans le fichier "signup.html" il faut lui donner un id "btn-validation-inscription" et l'appeler dans la déclaration des  variables dans le fichier "signup.js" en lui donnant une variable "const btnValidation = document.getElementById("btn-validation-inscription");" comme ça on récupére un boutton de validation, a chaque fois qu 'on appelle la méthode validateForm()
on fait un if : if(ok){
        btnValidation.disabled= false;
          }else{
        btnValidation.disabled= true;
    }
    Dans ce cas là on a pas les moyens pour vérifier si tout mes champs sont de la bonne façon (chaps nom, prénom email ..), ce qu 'on va faire c'est de récupérer les booléens pour savoir si mon "input" c'est ok ou s'il n'est pas .Ce qu'on va faire c'est de récupérer mon validateRequire(InputNom , prénom et maildans une variable)
    const nomok = validateRequired(inputNom);
    const prenomok = validateRequired(inputPreNom);
    const mailok = validateMail(inputMail);
    on va faire un return true dans la fonction validateRequired(input) et un return false dans le cas contraire : un return false

    function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
    on fait parail pour validateMail:

    function validateMail(input){
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
    Ainsi on va définir différentes variables : const

    function validateForm(){ nomok, prenomok et mailok
   const nomok = validateRequired(inputNom);
    const prenomok = validateRequired(inputPreNom);
    const mailok = validateMail(inputMail);
    if(nomok && prenomo && mailok){
        btnValidation.disabled= false;
    }else{
        btnValidation.disabled= true;
    }
}


ChatGPT a dit :
ChatGPT
Peux-tu préciser les deux codes dont tu veux comparer la différence ?




LA DIFFERENCE ENTRE DEUX CODES DE VALIDATION DE MOT DE PASSE:

function validatePassword(passwordInput, confirmPasswordInput) {
    if (passwordInput.value !== '' && passwordInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.classList.add("is-valid");
        confirmPasswordInput.classList.remove("is-invalid");
        return true;
    } else {
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }

La fonction que tu as fournie permet de valider si deux champs de mot de passe sont identiques. Voici une explication détaillée du code que tu as donné :

Fonction validatePassword
Paramètres :
passwordInput : représente le champ où l'utilisateur entre son mot de passe.
confirmPasswordInput : représente le champ de confirmation du mot de passe.
Fonctionnement :
Condition principale :


if (passwordInput.value !== '' && passwordInput.value === confirmPasswordInput.value)
La condition vérifie deux choses :
Le champ passwordInput n'est pas vide.
Le mot de passe entré dans passwordInput est identique à celui dans confirmPasswordInput.
Si ces deux conditions sont vraies, alors les actions suivantes sont effectuées :

La classe is-valid est ajoutée à confirmPasswordInput.
La classe is-invalid est retirée de confirmPasswordInput.
La fonction retourne true, ce qui signifie que les deux mots de passe sont identiques.
Sinon (else) : Si l'une des conditions échoue (soit le mot de passe est vide, soit les mots de passe ne correspondent pas) :

La classe is-valid est retirée de confirmPasswordInput.
La classe is-invalid est ajoutée à confirmPasswordInput.
La fonction retourne false, ce qui signifie que les mots de passe ne correspondent pas.
Différence potentielle ?
Je suppose que tu voulais comparer ce code avec un autre. Si tu veux que je t'aide à comparer deux versions différentes ou deux approches pour valider un mot de passe, peux-tu me partager l'autre code ou approche que tu souhaites analyser ?






Vous avez dit :
et ce code 
ChatGPT a dit :
ChatGPT
Il semble que tu n'as pas fourni le deuxième code pour la comparaison. Peux-tu partager le second code afin que je puisse comparer les deux et te montrer les différences ?






Vous avez dit :
function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }


Merci d'avoir partagé le second code ! Comparons maintenant les deux fonctions validatePassword.

1. Premier code (Validation de la correspondance entre deux champs de mot de passe) :
javascript
Copier le code
function validatePassword(passwordInput, confirmPasswordInput) {
    if (passwordInput.value !== '' && passwordInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.classList.add("is-valid");
        confirmPasswordInput.classList.remove("is-invalid");
        return true;
    } else {
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
        return false;
    }
}
Objectif : Valider que le mot de passe et la confirmation du mot de passe sont identiques.
Classes CSS :
Ajoute la classe is-valid si les mots de passe correspondent.
Ajoute la classe is-invalid si les mots de passe ne correspondent pas.
Retourne : true si les deux mots de passe sont identiques et non vides, sinon false.
Ce code ne vérifie pas la complexité du mot de passe, mais uniquement la correspondance entre deux champs.

2. Deuxième code (Validation de la complexité d'un seul mot de passe) :
javascript
Copier le code
function validatePassword(input) {
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
Objectif : Valider si un seul mot de passe respecte un ensemble de critères de complexité définis par un regex.
Critères du regex :
Au moins une lettre minuscule.
Au moins une lettre majuscule.
Au moins un chiffre.
Au moins un caractère spécial.
Longueur minimale de 8 caractères.
Classes CSS :
Ajoute la classe is-valid si le mot de passe respecte les critères du regex.
Ajoute la classe is-invalid si le mot de passe ne respecte pas ces critères.
Retourne : true si le mot de passe est valide selon le regex, sinon false.
Différences principales :
Objectif :

Premier code : Vérifie si deux champs de mot de passe correspondent (ex : mot de passe et confirmation).
Deuxième code : Vérifie si un seul mot de passe respecte une complexité définie par un regex (sécurité du mot de passe).
Validation :

Premier code : Pas de vérification de la complexité du mot de passe, juste une comparaison entre deux champs.
Deuxième code : Utilise un regex pour vérifier la sécurité et la complexité du mot de passe (exigences spécifiques).
Utilisation :

Premier code : Peut être utilisé lors de la soumission d'un formulaire où deux mots de passe doivent correspondre.
Deuxième code : Utilisé pour valider la force d'un mot de passe, indépendamment de tout champ de confirmation.
Conclusion :
Le premier code est pour valider que deux mots de passe correspondent (ex : un formulaire d'inscription avec confirmation de mot de passe), tandis que le deuxième code est pour vérifier la complexité d'un mot de passe selon des règles de sécurité (ex : vérifier si un mot de passe est suffisamment fort).



============> CODE DE BASE 
:
// Récupérer les éléments du formulaire
const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

// Ajout des événements 'input' pour valider les champs en temps réel
inputNom.addEventListener("input", validateForm); 
inputPreNom.addEventListener("input", validateForm);
inputMail.addEventListener("input", validateForm);
inputPassword.addEventListener("input", validateForm);
inputValidationPassword.addEventListener("input", validateForm);

// Fonction permettant de valider tout le formulaire
function validateForm() {
    const nomok = validateRequired(inputNom);
    const prenomok = validateRequired(inputPreNom);
    const mailok = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword );
    const passwordConfirmok = validateConfirmationPassword(inputPassword, inputValidationPassword)

    // Activer le bouton si tout est valide
    if (nomok && prenomok && mailok && passwordOk && passwordConfirmok) {
        btnValidation.disabled = false; 
    } else {
        btnValidation.disabled = true;
    }
}

function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

// Fonction de validation de l'email
function validateMail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
   
}

// Fonction de validation des champs obligatoires
function validateRequired(input) {
    if (input.value.trim() !== '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction de validation du mot de passe
function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
    
    
    
}
==========================================================================

Voici la correction des fautes de ton texte :

GESTION DE LA CONNEXION ET DÉCONNEXION

Nous allons maintenant implémenter la fonction de connexion sur le site P'tit Cahoua. L'objectif est de mettre en place une connexion artificielle, c'est-à-dire que nous n'avons pas encore d'API de connexion à appeler ni de base de données. Nous allons simplement simuler une connexion sur un compte. Par exemple, seul le compte avec l'email aouad@yahoo.fr et le mot de passe 12345! pourra être connecté. Nous allons stocker l'état de l'utilisateur (connecté ou non) dans un cookie, ainsi qu'un token (par exemple un badge d'accès). L'objectif initial est de gérer une connexion qui nous permet de vérifier si les données saisies sont correctes ou non. Pour cela, nous allons ajouter un fichier JavaScript à notre connexion.

Dans le fichier allRoute.js, nous ajouterons notre chemin d'accès à la route "signin" : "/js/auth/signup.js".

Depuis notre page signin.html, nous allons récupérer l'input de l'email et celui du mot de passe. Nous allons créer deux variables :

javascript
Copier le code
const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
Ensuite, nous allons récupérer le bouton de connexion, lui donner un ID "btnSignin", et lui attribuer une action. Il faut changer le type du bouton de "submit" à "button", car le bouton va valider le formulaire mais il doit exécuter l'action que nous définissons nous-mêmes. Nous allons écouter l'événement "click" sur le bouton avec un addEventListener, qui exécutera la fonction checkCredentials au moment où on clique sur le bouton :

javascript
Copier le code
btnSignin.addEventListener("click", checkCredentials);
Nous allons créer cette fonction qui va vérifier les données utilisateur avec une simple condition pour valider les éléments du formulaire :

javascript
Copier le code
if (mailInput.value == "test@mail.com" && passwordInput.value == "123") {
    alert("Vous êtes connecté");
} else {
    mailInput.classList.add("is-invalid");
    passwordInput.classList.add("is-invalid");
}
Le test est réussi, nous allons maintenant ajouter un message d'erreur dans le cas où l'email et le mot de passe ne correspondent pas. Pour cela, il faut créer un message d'erreur dans le HTML :

html
Copier le code
<div class="invalid-feedback">
    L'email et le mot de passe ne correspondent pas.
</div>
Ma fonction de connexion simule maintenant correctement une connexion. Ce que je voudrais faire ensuite, c'est simuler un token, par exemple une chaîne de caractères aléatoire que nous appellerons ainsi :

javascript
Copier le code
const token = "hdgekdstelpdjdnssje";
L'objectif est de placer ce token dans un cookie : si nous avons ce token, l'utilisateur est connecté, sinon il est déconnecté.

==============================================================================================
CONNEXION :

Nous voulons maintenant gérer les cookies, c'est-à-dire que nous voulons ajouter ce token dans un cookie pour indiquer à l'utilisateur s'il est connecté ou non. Nous allons utiliser les méthodes que nous avons vues dans le cours pour gérer les cookies. Ces méthodes seront collées dans le fichier script.js, qui sera accessible depuis n'importe quelle page. Contrairement aux autres scripts qui sont spécifiques à une seule page, celui-ci doit être chargé sur toutes les pages. Pour l'appeler, il faut aller dans le fichier index.html et ajouter le script suivant :

html
Copier le code
<script src="js/script.js"></script>
Ensuite, je vais coller les méthodes de gestion des cookies. Voici les trois méthodes :

javascript
Copier le code
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
En plus de cela, je vais créer une fonction pour stocker le token. Cette méthode, qui prend un paramètre token, va stocker le token dans un cookie. Le nom de mon cookie sera "accesstoken", et je veux que ce token soit valide pendant 7 jours. Après 7 jours, le cookie expirera. Je vais également créer une fonction pour récupérer le cookie contenant le token. Dans le fichier signin.js, nous allons appeler setToken(token).

javascript
Copier le code
const tokenCookieName = "accesstoken";

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}
Ces méthodes se trouvent dans script.js et seront utilisées dans signin.js. Lors de la connexion, je vais définir le cookie en appelant la méthode setToken(token).

Maintenant que cette méthode est en place, nous voulons savoir si l'utilisateur est connecté ou non. Pour cela, nous allons implémenter une méthode dans script.js qui nous permettra de vérifier l'état de connexion :

javascript
Copier le code
function isConnected() {
    if (getToken() == null || getToken() == undefined) {
        return false;
    } else {
        return true;
    }
}

if (isConnected()) {
    alert("Je suis connecté");
} else {
    alert("Je ne suis pas connecté");
}
J'espère que cela t'aide ! N'hésite pas si tu as d'autres questions ou besoin de précisions.
==========================================================================
DECONNECTION:

DÉCONNEXION :

Nous allons gérer la déconnexion de notre site. La déconnexion consiste simplement à supprimer le cookie qui porte le nom "accesstoken". Ce que nous voulons faire, c'est ajouter un bouton qui permettra de se déconnecter. Je vais ajouter ce bouton dans le fichier index.html, dans le menu, en tant qu'élément ("item"). Ce bouton ne sera pas un lien, mais un bouton qui aura pour ID "signoutBtn". Lorsque l'utilisateur cliquera sur ce bouton, il sera déconnecté.

Dans le fichier script.js, nous allons récupérer ce bouton en créant une variable 
javascript
Copier le code
const signoutBtn = document.getElementById("signout-btn");
Ensuite, nous allons lui ajouter un événement :

javascript
Copier le code
signoutBtn.addEventListener("click", signout);
Cet événement écoute les clics et appelle la fonction signout. Il faut donc créer cette fonction, qui va supprimer le cookie tokenCookieName. Une fois déconnecté, nous allons actualiser la page avec la méthode window.location.reload() pour mettre à jour l'interface utilisateur :

javascript
Copier le code
function signout() {
    eraseCookie(tokenCookieName);
    window.location.reload();
}
==========================================================================
Afficher/masquer des éléments sur la page en fonction du rôle:
Maintenant que nous pouvons nous connecter et déconncter nous allons pouvoir masquer les éléments en fonction de nos besoin, mias selon notre cahier de charge nous savons que l'utilisateur peut avoir différent roles , il peut etre un visiteur non connecté , un utilisateur connecté ou un addministrateur, l'ojectif est de gerer ces roles, cela nous allons le faire dans notre connexion, dans la connexion nous ajoutons un token, en plus du token il faut gérer le role de l'utilisateur, pour cela nous allons utiliser la méthode "setCookie("rol", "admin", 7)" qui aura pour paramétre un role pour un addministrateur et une durée de 7 jours,.
Dans le fichier "script.js" nous devons suprimer ce cookie
avec la méthode "eraseCookie("role")", étant donné qu'il y' a deux fois la chaine de caractére rolr , il fautmieux créer une variable "const RoleCookieName = "role";" en meme temps il faut changer le paramétre "role" dans la méthode setCookie pour éviter les fautes d'orthographe.
Ce que nous allons faire maintenant c'est d'utiliser une méthode pour récupérer le role de l'administrateur: 
function getRole(){
    return getRole(RoleCookieName);
}
Maintenant que je connait le role de l'utilisateur, nous pourrons 
Afficher/masquer des éléments sur la page en fonction du rôle
Maintenant que nous pouvons nous connecter et nous déconnecter, nous allons pouvoir masquer ou afficher des éléments en fonction de nos besoins. Selon notre cahier des charges, nous savons que l'utilisateur peut avoir différents rôles : il peut être un visiteur non connecté, un utilisateur connecté, ou un administrateur. L'objectif est de gérer ces rôles. Pour cela, nous allons le faire dans notre logique de connexion. Lors de la connexion, nous ajoutons un token, et en plus de ce token, il faut également gérer le rôle de l'utilisateur.

Pour ce faire, nous allons utiliser la méthode setCookie("role", "admin", 7) qui va enregistrer un cookie avec le rôle d'administrateur pour une durée de 7 jours. Ensuite, dans le fichier script.js, nous devons supprimer ce cookie à l'aide de la méthode eraseCookie("role").

Comme il y a plusieurs fois le mot "role" utilisé dans le code, il est préférable de créer une variable constante const RoleCookieName = "role"; pour éviter les fautes d'orthographe et faciliter la maintenance du code. Il faut ensuite remplacer les occurrences de "role" par cette variable dans les méthodes liées aux cookies.

Nous allons maintenant créer une méthode pour récupérer le rôle de l'utilisateur :

javascript
Copier le code
function getRole() {
    return getCookie(RoleCookieName);
}
Maintenant que je connais le rôle de l'utilisateur, nous pouvons afficher ou masquer les éléments en fonction de ce rôle. On peut définir quatre états :

disconnected (non connecté)
connected (connecté, soit en tant qu'administrateur soit en tant que client)
admin
client
Pour afficher les éléments appropriés, nous allons utiliser un attribut HTML data-show. Cela permet de gérer facilement l'affichage des éléments selon que l'utilisateur est connecté ou non. Par exemple, dans le fichier index.html, on peut définir les éléments comme suit :

html
Copier le code
<li class="nav-item" data-show="disconnected">
  <a class="nav-link" href="/signin">Connexion</a>
</li>

<li class="nav-item" data-show="connected">
  <button class="nav-link" id="signout-btn">Déconnexion</button>
</li>
Ensuite, nous créons une fonction showAndHideElementsForRoles() pour afficher ou masquer les éléments selon le rôle de l'utilisateur :

javascript
Copier le code
function showAndHideElementsForRoles() {
    const userConnected = isConnected(); // Vérifie si l'utilisateur est connecté
    const role = getRole(); // Récupère le rôle de l'utilisateur

    // Sélectionne tous les éléments qui possèdent l'attribut data-show
    let allElementsToEdit = document.querySelectorAll('[data-show]');

    // Parcourt ces éléments et affiche/masque en fonction du rôle
    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected': 
                if (userConnected) {
                    element.classList.add("d-none"); // Masque l'élément si connecté
                }
                break;
            case 'connected': 
                if (!userConnected) {
                    element.classList.add("d-none"); // Masque l'élément si déconnecté
                }
                break;
            case 'admin': 
                if (!userConnected || role !== "admin") {
                    element.classList.add("d-none"); // Masque l'élément si pas administrateur
                }
                break;
            case 'client': 
                if (!userConnected || role !== "client") {
                    element.classList.add("d-none"); // Masque l'élément si pas client
                }
                break;
        }
    });
}
Ensuite, il faut appeler cette fonction dans le fichier router.js pour qu'elle s'exécute au bon moment, par exemple après le chargement de la page :

javascript
Copier le code
// Afficher et masquer les éléments en fonction du rôle
showAndHideElementsForRoles();
==============================================================================================================================================================================================
Authentification dans le routage :

Maintenant, il faut que je parcoure mon site pour attribuer data-show uniquement à certaines personnes. Par exemple, dans la galerie photo, il y a l'option "Modifier" et "Supprimer" qui est réservée à l'administrateur. Nous allons pouvoir modifier la page galerie, il faut aller voir les boutons "Modifier" et "Supprimer" et je vais pouvoir ajouter le data-show admin au bouton dans le fichier galerie.html :

html
Copier le code
<div class="action-image-button" data-show="admin">
    <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal">
        <i class="bi bi-pencil-square"></i>
    </button>
</div>
Je gère bien maintenant les éléments à afficher ou à masquer en fonction de mon rôle, mais j'ai une faille de sécurité assez importante : même si j'ai masqué des éléments, j'ai toujours accès à des pages auxquelles je n'ai pas droit. C'est pourquoi il faut définir des routes pour certains rôles. Nous devons modifier notre structure de la classe Route.js. Actuellement, notre classe gère une URL, un titre, un pathHtml et un pathJS. Nous allons rajouter un élément qui s'appelle authorize, que nous ajouterons dans la signature de notre constructeur. Nous avons besoin de cet attribut authorize pour instancier une instance de la classe Route. Cet attribut sera un tableau de chaînes de caractères.


export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.pathJS = pathJS;
        this.authorize = authorize;
    }
}

/*
[] -> Tableau vide : Tout le monde peut y accéder
["disconnected"] -> Réservé aux utilisateurs déconnectés
["client"] -> Réservé aux utilisateurs avec le rôle client
["admin"] -> Réservé aux utilisateurs avec le rôle admin
["client", "admin"] -> Réservé aux utilisateurs avec le rôle client ou admin
*/
Nous avons au total cinq cas possibles que nous allons pouvoir passer dans le fichier AllRoutes.js pour définir l'accès aux pages. Voici la présentation :

import Route from "./Route.js";

// Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/galerie", "La galerie", "/pages/galerie.html", []),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"], "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html", ["client", "admin"]),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"]),
    new Route("/allResa", "Vos réservations", "/pages/reservation/allResa.html", ["client"]),
    new Route("/reserver", "Réserver", "/pages/reservation/reserver.html", ["client"]),
];

// Le titre s'affiche comme ceci : Route.title - websiteName
export const websiteName = "Quai Antique";
Maintenant que nous allons vérifier si l'utilisateur a le rôle nécessaire, nous allons le faire dans le fichier router.js. Ce que nous allons faire, c'est qu'avant d'arriver à la page d'accueil, nous voulons connaître le rôle de chaque utilisateur et leurs droits d'accès. C'est pour cela que nous allons créer une variable :


const allRolesArray = actualRoute.authorize;
Maintenant, dans notre fichier router.js, nous devons, avant de charger le contenu d’une page en fonction de l’url, vérifier si l’utilisateur a bien le droit d’accéder à cette route. Il suffit pour cela de vérifier si le rôle de l’utilisateur est présent dans le tableau ‘authorize’ de notre route.
const path = window.location.pathname;
  // Récupération de l'URL actuelle
  const actualRoute = getRouteByUrl(path);

  //Vérifier les droits d'accès à la page
  const allRolesArray = actualRoute.authorize;

  if(allRolesArray.length > 0){
    if(allRolesArray.includes("disconnected")){
      if(isConnected()){
        window.location.replace("/");
      }
    }
    else{
      const roleUser = getRole();
      if(!allRolesArray.includes(roleUser)){
        window.location.replace("/");
      }
    }
  }

  EXPLICATION DU CODE


const path = window.location.pathname;
// Récupération de l'URL actuelle
window.location.pathname : Cette ligne récupère le chemin de l'URL actuelle (par exemple, /galerie, /signin, etc.) et le stocke dans la variable path. Cela permet de savoir sur quelle page l'utilisateur se trouve.

const actualRoute = getRouteByUrl(path);
getRouteByUrl(path) : Cette fonction (que tu dois avoir définie ailleurs dans ton code) prend le chemin actuel en argument et retourne l'objet de route correspondant à cette URL, contenant probablement des informations comme le titre de la page, le chemin HTML, et les droits d'accès (l'attribut authorize).

// Vérifier les droits d'accès à la page
const allRolesArray = actualRoute.authorize;
actualRoute.authorize : Cette ligne accède à l'attribut authorize de l'objet actualRoute, qui est un tableau des rôles autorisés à accéder à cette page. On le stocke dans allRolesArray.


if(allRolesArray.length > 0) {
Ici, on vérifie si le tableau allRolesArray contient des éléments. Si c'est le cas, cela signifie qu'il y a des restrictions d'accès.

if(allRolesArray.includes("disconnected")) {
    if(isConnected()) {
        window.location.replace("/");
    }
}
allRolesArray.includes("disconnected") : On vérifie si le tableau des rôles autorisés inclut le rôle "disconnected", ce qui signifie que la page est réservée aux utilisateurs qui ne sont pas connectés.
isConnected() : Cette fonction (à définir ailleurs) vérifie si l'utilisateur est connecté.
window.location.replace("/") : Si l'utilisateur est connecté (et donc ne doit pas accéder à cette page), il est redirigé vers la page d'accueil.


else {
    const roleUser = getRole();
    if(!allRolesArray.includes(roleUser)) {
        window.location.replace("/");
    }
}
Si la page n'est pas réservée aux utilisateurs déconnectés, on récupère le rôle de l'utilisateur courant à l'aide de la fonction getRole().
!allRolesArray.includes(roleUser) : On vérifie si le rôle de l'utilisateur n'est pas dans le tableau allRolesArray. Si c'est le cas, cela signifie que l'utilisateur n'a pas les droits nécessaires pour accéder à la page, et il est donc redirigé vers la page d'accueil.
================================================================================
                   APPELER UNE API DEPUIS LE FRONT
ISTALLATION DE LA PARTIE BACK
Pour pouvoir appeler notre api depuis javascript,il faut installer notre partie back sur notre machine, pour pouvoir la lancer en local et ainsi l'appeler depuis javascript,il faut aller chercher le  dossier contenant le front"CreationApplResPtitCafront" de notre projet, au dessus de ce dossier front il faut créer un dossier qui va contenir le back "CreationAppResPtitCaBack",il faut se positionner à l'intérieur, une fois on y est il faut cloner le repository dans l'invite de commande pour copier l’application depuis github sur notre pc "https://github.com/GaetanRole/studi-restaurant-symfony-lts-api"
Sur cette URL, nous avons accès à tous les fichiers de l’application, mais il nous faut savoir la lancer sur notre machine ! C’est pour nous aider qu’un fichier Readme.md est toujours présent. Il contient des instructions pour installer et lancer le programme.
Méthode:
Les prérequis:
La partie « Project requirements » de ce fichier nous mentionne les différents éléments que nous devons avoir installés sur notre machine pour pouvoir lancer l’application. S’il nous en manque, nous devons les installer, sans quoi l’application ne pourra jamais tourner sur notre machine.
Installation:
Nous pouvons maintenant installer l’application. La documentation nous explique comment effectuer le ‘git clone’ pour copier l’application depuis github sur notre pc.

Ensuite, nous devons configurer l’application pour la faire fonctionner avec notre environnement. Il suffit de suivre les différentes instructions sur le document.

La commande ‘$ cp .env .env.local’ va copier le fichier de configuration .env dans un nouveau fichier ayant pour nom .env.local. Ce fichier permet de contenir vos informations sensibles (connexion, clé d’authentification, etc.) à contrario du .env qui est une base, pouvant être versionnée.

Nous allons modifier la variable d’environnement DATABASE_URL de ce nouveau fichier. C’est une chaine de connexion, elle permettra à votre application Symfony à se connecter à votre base de données. En utilisant une base de données MySql, nous obtenons une chaîne de connexion composée ainsi :

CTRL+C pour copier, CTRL+V pour coller
1
mysql://user:pwd@127.0.0.1:3306/bdd?serverVersion=8&charset=utf8mb4
mysql://: C'est le protocole utilisé pour la connexion à MySQL.

user: C'est le nom d'utilisateur MySQL que vous utilisez pour vous connecter.

pwd: C'est le mot de passe de l'utilisateur (il est important de noter que le mot de passe doit être gardé confidentiel et sécurisé).

127.0.0.1: C'est l'adresse IP du serveur MySQL auquel vous souhaitez vous connecter. Dans ce cas, il s'agit de l'adresse IP locale, ce qui signifie que le serveur MySQL est sur la même machine que celle à partir de laquelle vous tentez de vous connecter.

3306: C'est le port MySQL par défaut.

bdd : C'est le nom de la base de données à laquelle vous souhaitez vous connecter.

serverVersion=8&charset=utf8mb4: Ici des paramètres supplémentaires spécifiant la version du serveur MySQL et l'encodage de caractères.

Il faut donc modifier cette chaîne de connexion pour l’adapter aux besoins.

Création et mise en place de la BDD
Nous allons maintenant utiliser les outils mis en place dans l’API pour créer la base de données et sa structure automatiquement. Il suffit pour cela de taper ces trois commandes :


composer install      
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrat

Lancer l’API:
Notre API est maintenant installée, nous pouvons essayer de la lancer en local, en tapant la commande suivante :
symfony server:start 
=======================================================================================================================================================================================
DOCUMENTATION D'API
Une documentation d'API est un ensemble de documents qui expliquent comment utiliser une API. La documentation d'API est essentielle pour les développeurs, car elle fournit des informations détaillées sur les endpoints (points d'accès) de l'API, les paramètres requis, les formats de données acceptés, les méthodes HTTP supportées, les erreurs possibles, et d'autres informations importantes pour intégrer l'API dans une application.
Si nous comparons notre API à un restaurant, la documentation d’API serait la carte de menu du restaurant.
Maintenant que notre API est installé, je peux esaayer de la tester, pour la tester il faut envoyer une requette HTPP à cette api pour executer une commande, pour avoir des données inscrites en base de donnée, cette documentation "NelmioApi" de tester l'API directement de cet interface, par exemple je voudrais inscrir un nouvel utilisateur.

METHODE:
-ouvrir l'anglet "inscrir un nouvel utilisateur"
-appuyer sur le bouton "try it out" qui va me permettre de définir les données de ma requette et de l'executer aprés avoir changer les données
-{
  "firstName": "Thomas",
  "lastName": "Dupont",
  "email": "thomas@email.com",
  "password": "Mot de passe"
}
-Aprés il faut cliquer sur le bouton "execute"
-Consulter la base de donnée pour voir les données du nouveau utilisateu
===========================================================================================================
Postman
Postman est un outil populaire pour tester vos API. Il permet de configurer et d’envoyer des requêtes HTTP de manière simple et pratique. Avec son interface visuelle, vous pouvez même générer du code !

Inscription d'un Utilisateur avec Postman
Vous pouvez tester l'inscription d'un utilisateur directement depuis Postman en effectuant une requête POST vers votre API.

Appeler notre API depuis notre Code avec fetch
Maintenant que notre API est opérationnelle, nous souhaitons l'appeler directement depuis notre code JavaScript. Il existe différentes méthodes pour cela, mais nous allons utiliser fetch dans ce cours.

Étapes pour Exécuter le Code de Postman
Changer le type du bouton dans le fichier signup.html :

Modifiez le type du bouton de submit à button.
Un formulaire avec type submit entraînerait un changement de page, ce qui n'est pas souhaité ici.
Récupérer l'ID du bouton :

Assurez-vous que le bouton possède un ID et que vous l'utilisez correctement dans le fichier JavaScript.
Ajouter un eventListener :

Ajoutez un eventListener pour écouter les clics sur le bouton.
Créez une fonction nommée InscrireUtilisateur et collez le code JavaScript généré par Postman.
Code JavaScript
Voici le code généré par Postman pour inscrire un utilisateur :

javascript
Copier le code
function InscrireUtilisateur() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "firstName": "Test fetch",
        "lastName": "test test fetch",
        "email": "testdepuisPtitcaRes@email.com",
        "password": "Azerty1234!"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://127.0.0.1:8000/api/registration", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}

// Ajout d'un eventListener au bouton
btnValidation.addEventListener("click", InscrireUtilisateur);
Vérification de la Fonctionnalité :
Retournez sur le site du restaurant, cliquez sur la page d'inscription, et utilisez l'inspecteur pour vérifier les requêtes dans l'onglet "Network". Vous pouvez aussi vérifier dans la base de données si l'utilisateur a bien été enregistré.
Envoyer des Données
Bien que nous puissions inscrire un utilisateur, les données sont actuellement codées en dur dans notre JavaScript. Nous allons maintenant envoyer à l’API les données fournies par l’utilisateur via le formulaire.

Récupération des Données Utilisateur
Ajouter un ID au Formulaire :

Dans signup.html, ajoutez un ID au formulaire :
html
Copier le code
<form id="formulaireInscription">
Récupérer le Formulaire dans signup.js :

Créez une constante pour récupérer le formulaire :
javascript
Copier le code
const formInscription = document.getElementById("formulaireInscription");
Utiliser FormData pour Récupérer les Données :

Créez une instance de FormData pour récupérer les données de l'utilisateur :
javascript
Copier le code
let dataForm = new FormData(formInscription);
Mise à Jour du Code
Remplacez le code d'envoi de données par :

javascript
Copier le code
let raw = JSON.stringify({
    "firstName": dataForm.get("nom"),
    "lastName": dataForm.get("prenom"),
    "email": dataForm.get("email"),
    "password": dataForm.get("mdp")
});
Modifier la Gestion de la Réponse :
Changez response.text() par response.json() pour traiter la réponse JSON de l'API.
Avertissement
Attention ! Assurez-vous que les clés utilisées dans l'objet JSON correspondent exactement aux name des inputs dans votre formulaire, par exemple :

html
Copier le code
<input type="text" name="nom" />
et

javascript
Copier le code
"firstName": dataForm.get("nom"),
===============================================================================================
ACTION APRES LA REQUETTE
Je vais maintenant réagir différement si mon fetch a réussi ou si il a échoué, je vais pour cela modiffiér le code, pour trouver l'endroit ou il y a la réponse, ou je vais pouvoir récupérer
le code de retour htpp, pour savoir l'état de la requette,si la requette commence par 2 c'est un succée, 5 erreur serveur, 4 c'est érreur client, je vais pouvoir récupérer la réponse en brut, on va récupérer la response en brut,je vais mettre des acolades pour executer plusieurs code, en finalité je retourner une respone.json, cest à dire d'abord je vais récupérer la réponse globale avec tout le header avec la réponse htpp
et le return response.json va retourner à la prochaine .then(result) va retourner uniquement le contenue que j'ai besoin sous format json. dans ma response je vais pouvoir utiliser certains éléments,
c'est pour cela je vais mettre un débouger,
.then(response => {
debugger;
return response.json();
})
ce débouger va arréter l'exécution des lignes de code de javascript, pour voir ce qui ce passe, taper response dans la console , qui va nous retourner l'état desvariables, parmis il y'a le statut qui est de 201, ainsi que le ok, qui montre que mon inscription a bien fonctionné, c'est pour cela il faut mettre un if :
if(response.ok), il nous retourne response.json(), si non une alert:
else{
alert("Erreur lors de l'inscription");
}
Maintenant je vais faire quelle que chose pour voir si l'inscription a fonctionné, pour rediriger l'utilisateur vers la page de connection, aprés avoir reçu le résultat je vais executer plusieurs ligne de code , je met des acolades, puisque la fonction fléché lorsqu'il n'a pas d'acolade,il permet d'executer une seule ligne de commande

.then(result =>{
console.log(result)
})
le console.log(result) ne me sert pas forcément, certain site connecte l'utilisateur aprés l'inscription, nous faisons pas ce choix , nous nous contons de le rediriger vers la connection , pour rediriger l'utilisateur on utilise la méthode suivante:
document.location.href="/signin" avec une alerte:
alert("Bravo "+dataForm.get("prenon")+", vous etes maintenant inscrit, vous pouvez vous connecter.")
Quand on est redirigé vers la page de connection, maintenant je veux quand je me connecte,j'envoie une requette API pour verifier la connection, ainsi l'utilisateur et le mot de passe et récupérer l4API Token pour valider sa connection.

EXPLICATION DU CODE
Pour implémenter cette logique, je vais clarifier les étapes de manière structurée pour que tu puisses facilement suivre et adapter ton code pour gérer les réponses d’une requête API lors de l'inscription et de la connexion :

1. Récupérer et Vérifier la Réponse HTTP
Après avoir envoyé ta requête fetch, utilise .then(response => { ... }) pour analyser le code de retour HTTP et traiter la réponse.

Exemple de code :

javascript
Copier le code
fetch('URL_API', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataForm)
})
.then(response => {
    debugger;  // Permet de mettre un point d'arrêt et d'examiner la réponse
    if (response.ok) {
        return response.json(); // Succès (codes 2xx)
    } else {
        throw new Error("Erreur lors de l'inscription");
    }
})
.then(result => {
    console.log(result);
    // Rediriger l'utilisateur vers la page de connexion avec un message de succès
    alert("Bravo " + dataForm.get("prenom") + ", vous êtes maintenant inscrit, vous pouvez vous connecter.");
    document.location.href = "/signin";
})
.catch(error => {
    alert(error.message); // Affiche une erreur en cas de code 4xx ou 5xx
});
2. Utiliser debugger pour Vérifier les Données de Réponse
L’instruction debugger; permet d’arrêter le code à cet endroit et de voir l’état de l’objet response dans la console de développement (accessible avec F12 sur le navigateur). Tape response dans la console pour voir tous les détails, y compris le status et la propriété ok.

3. Rediriger l’Utilisateur après Inscription
Une fois que l’inscription est confirmée (si response.ok est vrai), utilise document.location.href pour rediriger l'utilisateur vers la page de connexion (/signin). Avant la redirection, tu peux afficher un message de confirmation pour personnaliser l'expérience utilisateur.

4. Gestion de la Connexion (Récupérer le Token API)
Dans la logique de connexion, après validation de l'email et du mot de passe, tu devras envoyer une requête API pour vérifier les identifiants de l'utilisateur. Voici comment cela peut être structuré :

javascript
Copier le code
fetch('URL_CONNEXION_API', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: dataForm.get("email"), password: dataForm.get("password") })
})
.then(response => {
    if (response.ok) {
        return response.json(); // Récupération du token si la connexion est validée
    } else {
        throw new Error("Erreur lors de la connexion");
    }
})
.then(data => {
    const apiToken = data.token; // Suppose que l'API renvoie un token dans la réponse
    console.log("Token récupéré :", apiToken);
    // Stocker le token pour valider la connexion ou rediriger l'utilisateur vers une page protégée
})
.catch(error => {
    alert(error.message); // Affiche une alerte en cas d'erreur
});
Résumé des Points Clés
Utilise debugger pour visualiser l'objet response et comprendre les données renvoyées.
Gère les erreurs client (4xx) et serveur (5xx) en affichant des messages appropriés.
Redirige l'utilisateur avec document.location.href après une inscription réussie.
Lors de la connexion, récupère le token pour authentifier l'utilisateur dans les prochaines requêtes.
Ces étapes devraient t'aider à structurer ta logique d'inscription et de connexion tout en gérant les erreurs de manière effice
============================================================================================


Connexion
Nous avons déjà implémenté l’inscription : une fois que l’utilisateur est inscrit, il est redirigé vers la page de connexion. Nous devons maintenant coder cette fonctionnalité de connexion, que nous avions auparavant créée en dur. Voici les étapes pour le faire.

1. Vérification de la fonctionnalité de login sur l'API
Pour tester la fonctionnalité de connexion, nous allons commencer par la tester directement sur l'API en utilisant le bouton "Try it out". L’API attend deux paramètres : username et password. Nous allons d'abord effectuer un test avec des identifiants incorrects pour vérifier que l’API renvoie bien une erreur.

Exemple de test avec des identifiants incorrects :

json
Copier le code
{
  "username": "anass@yahoo.fr",
  "password": "Azerty1234!"
}
Résultat attendu : une erreur 401 avec le message "erreur":"invalid credentials".

Si nous saisissons des identifiants corrects, la réponse de l’API devrait être la suivante :

json
Copier le code
{
  "user": "anass@yahoo.fr",
  "apiToken": "d6e59421ea2bd0ec2cf38826d790bf6d7b3b16d0",
  "roles": [
    "ROLE_USER"
  ]
}
2. Implémentation dans signin.js
Nous allons maintenant intégrer cette vérification dans notre fichier signin.js, en remplaçant la vérification en dur des identifiants par un appel à l’API pour vérifier les credentials.

Étapes d’implémentation
Récupérer le formulaire
Dans signin.html, nous ajoutons un ID au formulaire de connexion pour faciliter sa récupération :

html
Copier le code
<form id="signinForm">
Ensuite, dans signin.js, nous définissons une constante pour récupérer ce formulaire :

javascript
Copier le code
const signinForm = document.getElementById("signinForm");
Transformer le formulaire en FormData
Nous créons un objet FormData pour capturer les données du formulaire :

javascript
Copier le code
let dataForm = new FormData(signinForm);
Vérification des attributs name
Dans le HTML, nous nous assurons que les champs email et password ont bien les attributs name="email" et name="mdp" :

html
Copier le code
<input type="email" class="form-control" id="EmailInput" name="email">
<input type="password" class="form-control" id="PasswordInput" name="mdp">
Paramétrer l'appel AJAX via fetch
Nous copions notre précédent modèle fetch, en adaptant les données de connexion :

javascript
Copier le code
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
    "username": dataForm.get("email"),
    "password": dataForm.get("mdp")
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("https://127.0.0.1:8000/api/login", requestOptions)
.then(response => {
    if(response.ok){
        return response.json();
    } else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    } 
})
.then(result => {
    // Récupération du token
    const token = result.apiToken;
    setToken(token);

    // Placer le rôle en cookie
    setCookie(RoleCookieName, result.roles[0], 7);

    // Redirection
    window.location.replace("/");
})
.catch(error => console.log('error', error));
3. Vérification du code et optimisation
Lors des tests sur la page d'accueil, nous constatons que l’utilisateur est bien connecté. Cependant, pour éviter de dupliquer l'URL dans chaque appel fetch, nous pouvons la définir comme une variable globale dans script.js. Ainsi, l'URL sera référencée comme suit :

javascript
Copier le code
const apiUrl = "https://127.0.0.1:8000/api/";
Et dans fetch, nous appelons simplement apiUrl + "login".

AUTRE EXPLICATION
Connexion

Nous avons implémenté l'inscription : une fois l'utilisateur inscrit, il est redirigé vers la page de connexion. Maintenant, nous devons coder cette fonctionnalité de connexion, auparavant créée en "dur". Voici la démarche pour vérifier les identifiants utilisateur avec notre API.

Test de l'API de Connexion

Dans l'interface de test de l'API ("Try it out"), nous observons que la requête attend deux paramètres : "username" et "password". Nous testons d'abord avec des identifiants incorrects pour vérifier le retour d'une erreur 401 ("invalid credentials"). Ensuite, en fournissant les identifiants valides suivants :

json
Copier le code
{
   "username": "anass@yahoo.fr",
   "password": "Azerty1234!"
}
l'API retourne :

json
Copier le code
{
   "user": "anass@yahoo.fr",
   "apiToken": "d6e59421ea2bd0ec2cf38826d790bf6d7b3b16d0",
   "roles": ["ROLE_USER"]
}
Implémentation dans le fichier signin.js

Dans le fichier signin.js, nous ajoutons la logique pour récupérer les informations de connexion du formulaire et les envoyer à l'API.

Étapes :

Dans signin.html, ajoutons un id au formulaire de connexion :

html
Copier le code
<form id="signinForm">
Dans signin.js, récupérons le formulaire et convertissons-le en FormData :

javascript
Copier le code
const signinForm = document.getElementById("signinForm");
let dataForm = new FormData(signinForm);
Paramétrons l'appel AJAX via fetch :

javascript
Copier le code
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
   "username": dataForm.get("email"),
   "password": dataForm.get("mdp")
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("https://127.0.0.1:8000/api/login", requestOptions)
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
})
.then(result => {
    const token = result.apiToken;
    setToken(token);
    setCookie(RoleCookieName, result.roles[0], 7);
    window.location.replace("/");
})
.catch(error => console.log('error', error));
Si l'utilisateur n'est pas trouvé, les champs deviennent rouges en ajoutant la classe is-invalid.

Optimisation avec une Variable d'URL

Au lieu d'appeler directement l'URL absolue dans chaque requête, nous créons une variable globale apiUrl dans script.js pour stocker la base de l'URL de notre API :

javascript
Copier le code
const apiUrl = "https://127.0.0.1:8000/api/";
Dans le fichier signin.js, remplaçons l'URL de fetch :

javascript
Copier le code
fetch(`${apiUrl}login`, requestOptions);
Conclusion

Nous avons maintenant une fonctionnalité de connexion fonctionnelle. L'utilisateur est bien authentifié et redirigé vers la page d'accueil après la connexion. En centralisant l'URL de base de l'API dans une variable, nous optimisons la maintenance du code.
=============================================================================================================================================================================================
Mise en place des recommandations de sécurité pour le front-end
1. Sécuriser notre code
1.1 Utilisation d’un linter
Qu'est-ce qu'un linter ?

Un linter est un outil d'analyse statique du code source utilisé dans le développement de logiciels. Son rôle principal est d'inspecter le code pour détecter les erreurs de programmation, les violations de conventions de codage et d'autres problèmes potentiels. Les linters sont particulièrement utiles pour améliorer la qualité du code, renforcer la cohérence du style de codage et réduire les bogues.

Exemple : SonarLint

SonarLint est un outil d'analyse statique du code open source développé par SonarSource. C’est un linter que vous pouvez installer dans votre environnement de travail, tel que Visual Studio Code (VSCode).

Une fois installé, SonarLint vous montrera les différentes erreurs présentes dans votre code.

2. Protection contre les failles XSS
2.1 Qu'est-ce qu'une faille XSS ?
Une faille XSS (Cross-Site Scripting) se produit lorsqu'un utilisateur malveillant injecte du code JavaScript dans notre site. Ce code peut exécuter des actions nuisibles, comme récupérer des cookies ou modifier le comportement de la page, entraînant des conséquences graves telles que la perte ou le vol de données. Cela peut également rendre le site inutilisable, poussant les clients à se diriger vers des concurrents.

2.2 Fonctionnement des failles XSS
À chaque fois qu'il y a des entrées sur notre site (par exemple, dans notre galerie d'images), un utilisateur peut modifier des éléments comme le titre et l'image.

Exemple de gestion de la galerie d'images
Création d'une route dans allRoutes.js :

javascript
Copier le code
new Route("/galerie", "La galerie", "/pages/galerie.html", "js/galerie.js", []);
Création d'un fichier galerie.js pour récupérer les images depuis l'API.

Fonction pour générer l'image :

javascript
Copier le code
function getImage(titre, urlImage) {
    return `
        <div class="col p-3">
            <div class="image-card text-white">
                <img src="${urlImage}" class="rounded w-100"/>
                <p class="titre-image">${titre}</p>
                <div class="action-image-button" data-show="admin">
                    <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>`;
}
Ajout d'images dans galerie.html :

Supprimez toutes les images déjà présentes.
Créez une div vide pour ajouter des images :
html
Copier le code
<div class="row row-cols-2 row-cols-lg-3" id="allImages"></div>
Récupération des informations d'images dans galerie.js :

javascript
Copier le code
const galerieImage = document.getElementById("allImages");
galerieImage.innerHTML = monImage; // Mon image est obtenue via la fonction getImage
2.3 Prévention des attaques XSS
Pour prévenir les attaques XSS, il est crucial de traiter les entrées utilisateurs. Par exemple, un utilisateur malveillant pourrait essayer d'injecter du code malveillant, comme :

html
Copier le code
<img src=x onerror="window.location.replace('https://google.com')"/>
2.4 Fonction de sanitation
Il est nécessaire de créer une fonction pour rendre notre code HTML sain avant de l'injecter dans le DOM.

Exemple de fonction de sanitation :

javascript
Copier le code
function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}
Utilisation de la fonction de sanitation :

javascript
Copier le code
let titre = '<img src=x onerror="window.location.replace(\'https://google.com\')"/>';
let imgSource = "../images/image du plat.jpg";

let monImage = getImage(titre, imgSource);
titre = sanitizeHtml(titre);
imgSource = sanitizeHtml(imgSource);
En utilisant la fonction sanitizeHtml(), nous garantissons que le titre est traité comme du texte et non comme du code HTML.

METTRE EN PLACE LES RECOMMANDATIONS DE SÉCURITÉ DE LA PARTIE FRONT
Sécuriser notre code
Utilisation d’un linter
Un linter est un outil d'analyse statique du code source utilisé dans le développement de logiciels. Son rôle principal est d'inspecter le code source d'un programme informatique pour détecter les erreurs de programmation, les violations de conventions de codage et d'autres problèmes potentiels. Les linters sont particulièrement utiles pour améliorer la qualité du code, renforcer la cohérence du style de codage et réduire les bogues.

Exemple : SonarLint

SonarLint est un outil d'analyse statique du code open source développé par SonarSource. C’est un linter que vous pouvez intégrer à votre environnement de travail, comme Visual Studio Code. Une fois installé, il vous montrera les différentes erreurs présentes dans votre code.

Faille XSS
Il est important de protéger notre site contre les failles XSS (Cross-Site Scripting). Cela se produit lorsqu'un utilisateur malveillant parvient à injecter du code JavaScript sur notre site. Ce code pourrait exécuter des actions nuisibles, telles que récupérer des cookies ou perturber le comportement du site, ce qui peut avoir des conséquences graves : perte de données, vol de données, ou rendre le site inutilisable. Par exemple, dans un contexte de commerce en ligne, un concurrent malveillant pourrait tenter de rendre notre site inaccessible pour inciter les clients à aller ailleurs.

Comment cela fonctionne
À chaque fois qu'il y a des entrées sur notre page (par exemple, lors de l'ajout d'images dans notre galerie), nous devons être vigilants. Dans notre fichier allRoutes.js, nous allons lier notre page galerie :

javascript
Copier le code
new Route("/galerie", "La galerie", "/pages/galerie.html", "js/galerie.js", []);
Puis, nous allons créer un fichier galerie.js. L'objectif est de récupérer les images depuis l'API et de les injecter dans notre page. Nous allons créer une fonction qui retourne une chaîne de caractères représentant le template de l'image :

javascript
Copier le code
let monImage = getImage("titre", "../images/image_du_plat.jpg");

function getImage(titre, urlImage) {
    return `
        <div class="col p-3">
            <div class="image-card text-white">
                <img src="${urlImage}" class="rounded w-100" />
                <p class="titre-image">${titre}</p>
                <div class="action-image-button" data-show="admin">
                    <button data-show="admin" type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#EditionPhotoModal">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#DeletePhotoModal">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>`;
}
Dans notre fichier galerie.html, nous allons supprimer toutes les images déjà présentes et ajouter un div contenant les images avec un ID :

html
Copier le code
<div class="row row-cols-2 row-cols-lg-3" id="allImages"></div>
Nous créerons une constante dans galerie.js :

javascript
Copier le code
const galerieImage = document.getElementById("allImages");
Récupérer les informations des images
Nous allons récupérer les informations des images et les injecter dans notre div :

javascript
Copier le code
galerieImage.innerHTML = monImage;
Nous devons également récupérer ces informations depuis notre base de données via une requête AJAX. Les valeurs "titre" et "../images/image_du_plat.jpg" peuvent être mises à jour par les utilisateurs via une modale, que nous allons créer plus tard.

Sécurisation du titre
Un utilisateur malveillant pourrait injecter du code JavaScript via le champ "titre", par exemple :

html
Copier le code
<img src=x onerror="window.location.replace('https://google.com')"/>
Pour éviter cela, nous devons créer une fonction pour assainir notre code HTML au moment où nous voulons inclure .innerHTML. Nous allons créer une fonction sanitizeHtml(monImage) :

javascript
Copier le code
let titre = '<img src=x onerror="window.location.replace(\'https://google.com\')"/>';
let imgSource = "../images/image_du_plat.jpg";

let monImage = getImage(titre, imgSource);
titre = sanitizeHtml(titre);
urlImage = sanitizeHtml(urlImage);

function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}
Cette méthode sanitizeHtml() permettra de gérer le titre comme du texte, et non comme du code HTML, ce qui renforce la sécurité de notre application.
=========================================================================
Envoi de Requêtes Authentifiées avec un Jeton:
L'authentification est une partie très importante de notre application. Différents utilisateurs veulent y accéder, et si un utilisateur tente de récupérer ou de modifier des données sensibles, cela pourrait nuire à la sécurité de l'application. Dans notre API, l'endpoint api/account/me permet de récupérer toutes les informations de l'utilisateur. Nous allons tester cet appel avec Postman.

Étapes :

Ouvrir un onglet dans Postman

Cliquez sur le signe + pour ouvrir un nouvel onglet.
Vérifier la méthode HTTP

Sélectionnez la méthode GET (ou autre si nécessaire). Dans notre cas, choisissez GET.
Entrer l'URL de l'API

Collez l'URL https://127.0.0.1:8000/api/account/me dans la barre "Enter URL or paste text".
Tester l'API sans paramètres

Envoyez la requête en cliquant sur Send. Si vous n'êtes pas authentifié, un message "Full authentication is required to access this resource" apparaîtra en mode Preview, et le statut affichera 401 Unauthorized.
Effectuer un login pour obtenir le jeton

Changez la méthode en POST.

Collez https://127.0.0.1:8000/api/login dans la barre d'URL.

Dans l'onglet Body, sélectionnez raw, puis JSON.

Collez le contenu suivant :

json
Copier le code
{
  "username": "anass@yahoo.fr",
  "password": "Azerty1234!"
}
Cliquez sur Send. Si tout est correct, un statut 200 OK s'affichera, et le jeton api token sera généré.

Ajouter le jeton aux en-têtes

Revenez à la requête GET de https://127.0.0.1:8000/api/account/me.
Dans Headers, entrez X-AUTH-TOKEN dans Key, et collez le jeton obtenu dans Value.
Vérifier la réponse JSON

Cliquez sur Send pour envoyer la requête authentifiée.
Dans l'onglet Pretty, vous verrez les informations JSON de l'utilisateur.
Stocker le jeton pour les futures requêtes

Une fois connecté, stockez ce token dans un cookie. Ensuite, passez ce token dans les headers de vos requêtes fetch pour envoyer des requêtes authentifiées.
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
DEUXIEME EXPLICATION
Pour envoyer une requête authentifiée à votre API via Postman, suivez les étapes ci-dessous :

Ouvrir un nouvel onglet
Dans Postman, cliquez sur le signe + pour ouvrir un nouvel onglet.

Sélectionner la méthode GET
Dans le menu déroulant des méthodes HTTP, choisissez GET (ou la méthode appropriée pour votre requête).

Entrer l’URL de l’API
Collez l’URL de votre API dans le champ d’URL. Par exemple : https://127.0.0.1:8000/api/account/me.

Tester l’API sans authentification
Si vous tentez d'accéder directement à l'API sans authentification, vous recevrez probablement un message d'erreur. Cliquez sur Send pour envoyer la requête, puis sur Preview pour voir le message. Vous verrez probablement le message Full authentication is required to access this resource, avec le statut 401 Unauthorized.

Se connecter pour obtenir le jeton
Avant de pouvoir accéder à l’API, vous devez vous connecter pour obtenir un jeton d'authentification. Pour cela :

Ouvrez un autre onglet dans Postman et sélectionnez la méthode POST.

Entrez l’URL de connexion : https://127.0.0.1:8000/api/login.

Dans l’onglet Body, sélectionnez raw et le format JSON.

Collez les données d’identification dans le champ de texte, par exemple :

json
Copier le code
{
  "username": "anass@yahoo.fr",
  "password": "Azerty1234!"
}
Cliquez sur Send pour envoyer la requête.

Récupérer le jeton d’authentification
Si les identifiants sont corrects, vous recevrez une réponse avec le statut 200 OK et un jeton d’authentification (api token). Copiez ce jeton, car il sera nécessaire pour les requêtes authentifiées.

Ajouter le jeton aux en-têtes de la requête

Revenez dans l'onglet de votre requête GET vers https://127.0.0.1:8000/api/account/me.
Allez dans l’onglet Headers.
Dans la colonne Key, ajoutez X-AUTH-TOKEN.
Dans la colonne Value, collez le jeton que vous avez récupéré.
Envoyer la requête avec authentification
Cliquez sur Send. Si tout est configuré correctement, vous recevrez une réponse en JSON contenant les informations de l’utilisateur.

Stocker le jeton pour les requêtes futures
Pour automatiser l'authentification dans votre front-end, stockez le jeton dans un cookie ou un autre espace de stockage sécurisé et incluez-le dans les en-têtes (X-AUTH-TOKEN) de vos requêtes fetch.

Cela vous permettra d’envoyer des requêtes authentifiées et de sécuriser l’accès aux données de l’utilisateur.
===============================================================================================================================================================================================
Authentification d'une Requête : Récupération des Informations de l'Utilisateur
Nous allons créer une méthode permettant de récupérer les informations de l’utilisateur connecté via une requête HTTP en JavaScript, en utilisant la méthode fetch. Après avoir réussi à exécuter une requête authentifiée depuis Postman, nous allons implémenter cette requête en JavaScript.

Le but est de créer une méthode appelée getInfoUser, qui récupérera les informations de l'utilisateur actuellement connecté. Cela pourrait, par exemple, afficher "Bienvenue Toto" en haut à droite du menu.

Étapes de Création de la Fonction getInfoUser
Initialiser la fonction dans script.js

Ouvrez le fichier script.js et créez la fonction getInfoUser pour récupérer les informations de l'utilisateur.
Pour tester son bon fonctionnement, utilisez un console.log.
javascript
Copier le code
function getInfoUser() {
    console.log("Récupération des informations de l'utilisateur");
}

// Appeler la fonction pour test
getInfoUser();
Construire l'Objet Headers

Pour configurer les en-têtes de la requête, construisez l’objet Headers à partir du fichier signin.js. Cependant, supprimez la ligne myHeaders.append("Content-Type", "application/json");, car aucun corps (body) n’est requis ici.
javascript
Copier le code
const myHeaders = new Headers();
myHeaders.append("X-AUTH-TOKEN", getToken());  // Ajouter le jeton d’authentification
Configurer les Options de la Requête

Définissez les options de la requête en utilisant la méthode GET et sans body, puis configurez la redirection.
javascript
Copier le code
const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};
Envoyer la Requête avec fetch

Appelez l'API avec l’URL apiUrl + "account/me". Une fois la réponse obtenue, traitez-la en vérifiant si elle est réussie.
javascript
Copier le code
fetch(apiUrl + "account/me", requestOptions)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log("Erreur lors de la récupération des données utilisateur");
    });
Modifications Finales

Retourner le résultat au lieu de l’afficher avec console.log(result);.
Supprimer le message console.log("Récupération des informations de l'utilisateur");.
Retirer l'appel automatique de la fonction getInfoUser() en fin de fichier.
Code Final de la Fonction getInfoUser
javascript
Copier le code
function getInfoUser() {
    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    return fetch(apiUrl + "account/me", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Impossible de récupérer les informations utilisateur");
            }
        })
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log("Erreur lors de la récupération des données utilisateur");
        });
}
Avec cette structure, vous pouvez maintenant récupérer les informations de l'utilisateur connecté et les utiliser dans l'interface, comme afficher un message de bienvenue.
==========================================================================================================================================================================
METTRE EN LIGNE LE SITE
Mettre en Ligne le Site
AlwaysData : Création de Compte
Pour héberger notre site internet, nous avons besoin d’un hébergeur, c’est-à-dire un tiers qui propose la location de serveur sur lequel nous allons installer notre projet. Bien que la plupart des hébergeurs soient payants, il existe des options gratuites, particulièrement pour des projets étudiants. AlwaysData propose un hébergement gratuit de 100 Mo avec un nom de domaine en alwaysdata.net. C'est cet hébergeur que nous allons utiliser.

Déploiement avec FileZilla
Pour héberger gratuitement le front de notre site, nous allons suivre les étapes ci-dessous :

Accéder aux paramètres de AlwaysData :

Rendez-vous dans la section "Web" puis "Sites".
Créez un nouveau site que vous nommerez ptitrest.alwaysdata.net. L'objectif est d'héberger le site complet.
Configurer le type de site :

Cliquez sur l'icône de paramétrage (la roue).
Dans les options, choisissez le type fichiers statiques.
Cela vous permettra d'utiliser le répertoire racine et de transférer tous les fichiers de votre site sur AlwaysData afin qu’il puisse les lire correctement.
Gérer les routes du site :

Puisque nous avons mis en place un système de routage complexe pour récupérer les URL et rediriger les utilisateurs, il est nécessaire de configurer le serveur Apache pour qu'il gère correctement les routes.

Dans la section Directives supplémentaires du virtual host, ajoutez les règles suivantes pour configurer les redirections :

apache
Copier le code
RewriteEngine On
RewriteRule ^/[a-zA-Z0-9]+[/]?$ /index.html [QSA,L]
Validation de la configuration :

Une fois les réglages effectués, vous pouvez valider. Votre site sera alors créé et accessible en ligne via AlwaysData.
==========================================================================
METTRE EN LIGNE LA PARTIE FRONT DE MON SITE
Introduction à FileZilla
FileZilla est un logiciel client FTP (File Transfer Protocol) open source, permettant de transférer des fichiers entre un ordinateur local et un serveur distant via FTP, SFTP ou FTPS. Il est disponible pour les systèmes d’exploitation Windows, macOS, et Linux. Grâce à FileZilla, nous allons pouvoir déployer la partie front de notre site sur le serveur.

Hébergement sur Alwaysdata
Maintenant que mon site est hébergé chez Alwaysdata, je peux le déployer en ligne. Alwaysdata offre une URL accessible sous l'onglet "Site" qui permet d'accéder au site une fois déployé.

L'objectif est donc d'envoyer notre site directement sur Alwaysdata via FTP. Pour cela, nous utiliserons FileZilla comme client FTP pour gérer les transferts de fichiers. Trois paramètres sont essentiels pour cette connexion :

Hôte : L’adresse FTP du serveur.
Identifiant : Le nom d'utilisateur configuré sur Alwaysdata.
Mot de passe : Le mot de passe associé à ce compte.
Configuration de FileZilla pour le Projet
Connexion à FileZilla :

Lancez FileZilla.
Dans la barre de connexion en haut, entrez les informations suivantes :
Hôte : Collez l’adresse FTP (disponible sur Alwaysdata après “Hôte FTP”).
Identifiant : Votre nom d'utilisateur sur Alwaysdata.
Mot de passe : Le mot de passe configuré lors de l’inscription.
Cliquez sur Connexion rapide.
Confirmer le certificat :

Une fenêtre de certificat peut apparaître, indiquant un certificat inconnu. Cliquez sur OK pour confirmer.
Structure de FileZilla et Transfert des Fichiers
Une fois connecté, la fenêtre de FileZilla se divise en deux parties :

Site local (à gauche) : représente les fichiers de votre ordinateur. Vous verrez un panneau de navigation avec les dossiers de vos projets ; en cliquant dessus, vous pouvez accéder aux fichiers nécessaires.
Site distant (à droite) : représente les fichiers sur le serveur distant Alwaysdata.
Transférer les Fichiers de admin à www
Accédez au dossier www sur le serveur distant (côté droit). Il contient un fichier index.html par défaut.
Supprimez le fichier index.html dans le dossier www pour éviter les conflits.
Sélectionnez les dossiers et fichiers nécessaires depuis le site local et faites-les glisser dans le dossier www sur le site distant.
Vérification du Déploiement
Une fois le transfert terminé, connectez-vous sur votre espace Alwaysdata.
Accédez à votre site et faites un Ctrl + F5 pour rafraîchir la page.
Votre site devrait maintenant être en ligne et accessible via l’URL fournie par Alwaysdata
===========================================================================
AUTOMATISER LE DÉPLOIEMENT
Maintenant que nous avons déployé notre application via le protocole FTP, nous voulons automatiser ce déploiement. C'est-à-dire qu'à chaque fois que je fais une modification et que je pousse cette modification vers une branche précise (par exemple, la branche main), je souhaite que ces modifications soient automatiquement uploadées sur le serveur, sans avoir à passer par FileZilla.

Pour cela, il existe un processus appelé intégration et déploiement continu (CI/CD) qui nous permet de déployer automatiquement notre application.

Voici les étapes détaillées pour configurer ce processus :

Étape 1 : Créer un workflow GitHub
Accéder à l'onglet "Actions" sur GitHub :

Allez dans votre dépôt GitHub et cliquez sur l'onglet Actions.
Vous allez y créer un workflow, un cadre de travail qui définira les actions que GitHub doit exécuter automatiquement.
Ajouter un fichier .yml :

Ce fichier servira à configurer le processus de déploiement automatique.
Dans l'onglet Actions, cliquez sur New Workflow pour créer un fichier de workflow ou modifiez-en un existant.
Étape 2 : Installer l'action FTP
Rechercher l'action "FTP" sur GitHub Marketplace :

Allez dans la section Marketplace de GitHub et recherchez "FTP".
Il existe plusieurs extensions pour FTP. Nous allons utiliser l'extension FTP Deploy.
Vous pouvez consulter la documentation de cette action en visitant ce lien : FTP Deploy on GitHub Marketplace.
Configurer l'action FTP :

Une fois sur la page de l'action FTP Deploy, copiez l'exemple de configuration de base et personnalisez-le pour votre projet.
Étape 3 : Exemple de fichier .yml pour FTP
Voici la configuration de base pour automatiser le déploiement avec FTP :

yaml
Copier le code
on:
  push:
    branches:
      - main  # Déclenche l'action lors d'un push sur la branche 'main'

name: 🚀 Deploy website on push

jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest  # Spécifie l'environnement d'exécution

    steps:
    - name: 🚚 Get latest code
      uses: actions/checkout@v4  # Action pour récupérer le dernier code

    - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5  # Action pour déployer via FTP
      with:
        server: ftp-ptitrest.alwaysdata.net  # Serveur FTP
        username: ptitrest  # Nom d'utilisateur FTP
        password: ${{ secrets.ftp_password }}  # Mot de passe stocké en secret
        server-dir: /www/  # Répertoire cible sur le serveur FTP
        exclude: |
          **/.git*  # Exclure les fichiers git
          **/.git*/**
          **/node_modules/bootstrap/scss/**  # Exclure les fichiers de dépendances inutiles
          **/node_modules/bootstrap/js/**
          **/node_modules/bootstrap-icons/icons/**
Étape 4 : Configurer le mot de passe FTP dans GitHub Secrets
Ajouter un secret pour le mot de passe FTP :
Allez dans Settings de votre dépôt GitHub.
Dans la section Secrets and Variables, sélectionnez Actions.
Cliquez sur New repository secret.
Donnez un nom au secret, par exemple : ftp_password.
Entrez le mot de passe FTP dans la valeur et cliquez sur Add secret.
Cela permet à GitHub de récupérer votre mot de passe sans l'exposer dans le fichier .yml (qui est public).

Étape 5 : Vérification du déploiement
Faire un commit et un push :
Une fois que vous avez configuré le fichier .yml avec les bonnes informations, effectuez un commit et poussez vos modifications vers la branche main.
Vérifier dans GitHub Actions :
Allez dans l'onglet Actions pour vérifier que le workflow a été exécuté correctement.
Vérifier dans FileZilla :
Pour vérifier que les fichiers ont bien été déployés, ouvrez FileZilla.
Cliquez sur Connection rapide et connectez-vous avec vos identifiants FTP.
Vérifiez que les fichiers de votre dépôt sont bien présents sur le serveur dans le répertoire spécifié (/www/).
Conclusion
En suivant ces étapes, vous avez mis en place un déploiement automatisé via FTP. Chaque fois que vous poussez du code vers la branche main, GitHub Action déploie automatiquement les fichiers sur votre serveur FTP sans intervention manuelle.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
AUTRE EXPLICATION
Pour corriger et automatiser le déploiement de votre application via FTP sur GitHub avec GitHub Actions, suivez ces étapes détaillées pour configurer correctement le workflow dans un fichier .yml :

Étapes à suivre :
Créer un fichier workflow GitHub Actions :
Allez sur votre dépôt GitHub.
Cliquez sur l'onglet "Actions" en haut.
Cliquez sur "New Workflow" ou si vous avez déjà un fichier workflow, ouvrez-le (généralement situé dans .github/workflows/).
Vous pouvez copier et coller ce fichier de workflow.
Exemple de fichier deploy.yml :
Voici un exemple complet de fichier .yml pour le déploiement via FTP.

yaml
Copier le code
on:
  push:
    branches:
      - main  # Spécifiez la branche qui déclenchera le déploiement, ici 'main'

name: 🚀 Deploy website on push

jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    
    steps:
    - name: 🚚 Get latest code
      uses: actions/checkout@v3  # Récupérer le code depuis le dépôt

    - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5  # Action pour déployer via FTP
      with:
        server: ftp-ptitrest.alwaysdata.net  # Spécifiez votre serveur FTP
        username: ptitrest  # Spécifiez votre nom d'utilisateur FTP
        password: ${{ secrets.ftp_password }}  # Utilisez un secret pour votre mot de passe FTP
        server-dir: /www/  # Dossier de destination sur le serveur
        exclude: |
          **/.git*  # Exclure les fichiers Git
          **/.git*/**
          **/node_modules/bootstrap/scss/**  # Exclure les fichiers inutiles
          **/node_modules/bootstrap/js/**
          **/node_modules/bootstrap-icons/icons/**

Explication du fichier deploy.yml :
on: push: Cette action sera déclenchée chaque fois que vous pousserez (push) des changements sur la branche spécifiée (main dans cet exemple).
actions/checkout@v3: Récupère le dernier code depuis votre dépôt.
SamKirkland/FTP-Deploy-Action@v4.3.5: Action GitHub pour déployer les fichiers via FTP.
server: Spécifie l'adresse de votre serveur FTP.
username et password: Identifiants de connexion. Le mot de passe est stocké dans un secret GitHub pour plus de sécurité.
server-dir: Le répertoire sur le serveur où les fichiers seront téléchargés.
exclude: Liste des fichiers ou dossiers à exclure du déploiement (comme .git ou node_modules).
Ajouter un secret dans GitHub :
GitHub ne permet pas d'inclure des informations sensibles comme des mots de passe directement dans le fichier .yml. Vous devez donc stocker votre mot de passe FTP dans les Secrets de votre dépôt.

Allez dans Settings (paramètres) de votre dépôt GitHub.
Sous Secrets and Variables, sélectionnez Actions.
Cliquez sur New repository secret.
Donnez un nom à votre secret, par exemple, ftp_password.
Entrez votre mot de passe FTP dans la valeur du secret et cliquez sur Add secret.
Cela protégera votre mot de passe en toute sécurité et ne sera pas visible dans le fichier .yml.

Tester le déploiement :
Pour tester si tout fonctionne correctement, effectuez une modification sur la branche main (ou la branche que vous avez spécifiée dans branches) et poussez ces changements (git push). Le déploiement devrait se déclencher automatiquement.

Vous pouvez vérifier le déploiement dans l'onglet Actions de GitHub pour voir si le workflow s'est bien exécuté.
Si le déploiement réussit, vos fichiers seront synchronisés avec le serveur FTP automatiquement.
Vérifications supplémentaires :
Si vous avez un client FTP comme FileZilla, vous pouvez tester la connexion pour vérifier que les informations sont correctes avant de faire le déploiement automatisé.
Résumé des étapes :
Créez un fichier .yml dans .github/workflows/ pour définir votre workflow.
Ajoutez les bonnes informations de votre serveur FTP dans le fichier .yml.
Stockez votre mot de passe FTP dans les GitHub Secrets.
Effectuez un git push sur la branche spécifiée et vérifiez que les fichiers sont déployés automatiquement.
Cela automatisera complètement votre déploiement via FTP chaque fois que vous poussez des modifications sur la branche main !
=========================================================================
CORRIGER UN DEPLOIEMENT
Aprés plusieurs testes, nous nous rendend compte que notre application a bien été déployé, mais qu'il manque des éléments, par exemple si je fait F12, je remarque que je n'ai pas accés à mon "boostrap-bundle" "icons", si je vérifie à FileZilla, node_module qui est présent sur ma machine mais pas sur GitHube car il est dans le dossier ".ignor", donc eu fait lorsqu' on est sur la machine en locale nous exécutons "npm install" pour installer toutes les dépendnaces sur notre machine en locale, les dépendances installés nous les enoyons pas sur GitHub, pour avoir un systéme de gestion plus simple, chaque fois que nous déplaçons notre application quelleque part, que se soit sur une autre machine de dévelloppement ou sur un serveur, nous voulons à l'endroit que nous avons déplacer l'application le "npm install" pour avoir à jour nos dépendances là ou nous les envoyons, donsc il faudrait demander à GitHub
de faire un "npm install" lui meme avant d'envoyer mon site en "FTP", je dois dons modifier mon "workflow" "Deploy website on push", cliquer sur "main.yaml" puis modifier .
Aprés avoir récupérer le code juste aprés "uses: actions/checkout@v3" , rajouter le code suivant qui permet d'installer les dépendances: 
  - name: 📂 Install dependencies
      uses: actions/setup-node@v2
      with:
        node-version: '14'
Aprés avoir installé node , je vais installé les dépendances "npm",

- name: 📂 Install npm dependencies
      run: npm install
Donc que va faire le code :
d'abord on récupére le code,

  name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
    - name: 🚚 Get latest code
      uses: actions/checkout@v3
En suite on installe "node" sur le jobe là ou il doit se faire le déploiement, puis on installe les dépendances "npm"

- name: 📂 Install npm dependencies
      run: npm install
Puis on va envoyer tout ça :

  - name: 📂 Sync files
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ftp-ptitrest.alwaysdata.net
        username: ptitrest
        password: ${{ secrets.ftp_password }}
        exclude: |
          **/.git*
          **/.git*/**
          **/node_modules/bootstrap/scss/**
          **/node_modules/bootstrap/js/**
          **/node_modules/bootstrap-icons/icons/**  
        server-dir: /www/
Aprés on fait un "commit change "
An appyant sur le fichier "main.yaml"Deploy on aura la réponse suivante:
"succeeded 5 minutes ago "
 