const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "https://127.0.0.1:8000/api/";


// Vérification si le bouton de déconnexion existe avant d'ajouter l'événement
if (signoutBtn) {
    signoutBtn.addEventListener("click", signout);
}


function getRole() {
    return getCookie(RoleCookieName);
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName); // Correction ici
    window.location.href = "/";  // Redirige vers la page d'accueil
}

function setToken(token) {
    setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {
    return getToken() !== null; // Simplification
}

if (isConnected()) {
    alert("Je suis connecté");
} else {
    alert("Je ne suis pas connecté");
}

/* On pourrait définir quatre rôles :
===> disconnected
===> connected (admin ou client)
    - admin
    - client
*/

function showAndHideElementsForRoles() {
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if (!userConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if (!userConnected || role != "client") {
                    element.classList.add("d-none");
                }
                break;
        }
    });
}
function sanitizeHtml(text){
    const tempHtml = document.createElement('div')
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

function getInfoUser(){
    

    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
};
     fetch(apiUrl+"account/me", requestOptions)
     .then(response=>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result=> {
        return result;
    }) 
    .catch(error => {
        console.log("erreur lors de la récupération des données utilisateur");
    })


}

