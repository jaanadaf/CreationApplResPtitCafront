const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click" , checkCredentials);

    function checkCredentials(){
        let dataForm = new FormData(signinForm)

        //Ici, il faut appeler  l'API pour vérifier les credentiales en BD
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
    
    fetch(apiUrl+"login", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        } 
    })

    .then(result =>{
         //il faudra récupérer le vrai token
         const token = result.apiToken;
         setToken(token);

         //placer ce cookie en cookie
         setCookie(RoleCookieName, result.roles[0], 7);

         //l'objectif c'est de placer ce token en cookie
         window.location.replace("/");
    })
        
    .catch(error => console.log('error', error));

}
 
    