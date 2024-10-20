const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click" , checkCredentials);

    function checkCredentials(){
        //Ici, il faut appeler  l'API pour vérifier les credentiales en BD
        if(mailInput.value == "test@mail.com" && passwordInput.value == "123"){
            alert("Vous etes connectés");

            //il faudra récupérer le vrai token
            const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";

            //l'objectif c'est de placer ce token en cookie
            window.location.replace("/");
    }
    else{
        mailInput.classList.add("is-invalid");

        passwordInput.classList.add("is-invalid");
    }
}
    