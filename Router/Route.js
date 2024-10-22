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
["disconnected"]-> Réserver aux utilisateurs déconnecté
["client"] -> Réserver aux utilisateurs avec le role client
["admin"] -> Réserver aux utilisateurs avec le role admin
["client", "admin"] -> Réserver aux utilisateurs avec le role client ou admin
*/