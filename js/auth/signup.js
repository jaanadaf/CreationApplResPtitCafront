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
btnValidation.addEventListener("click", InscrireUtilisateur);

// Fonction permettant de valider tout le formulaire
function validateForm() {
    const nomok = validateName(inputNom);
    const prenomok = validateName(inputPreNom);
    const mailok = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmok = validateConfirmationPassword(inputPassword, inputValidationPassword);

    // Activer le bouton si tout est valide
    if (nomok && prenomok && mailok && passwordOk && passwordConfirmok) {
        btnValidation.disabled = false; 
    } else {
        btnValidation.disabled = true;
    }
}


// Fonction de validation pour nom et prénom
function validateName(input) {
    // Regex qui vérifie que l'entrée contient uniquement des lettres (majuscules ou minuscules)
    const nameRegex = /^[A-Za-z]+$/;
    const name = input.value.trim(); // Enlever les espaces au début et à la fin

    // Vérifier si le champ contient uniquement des lettres
    if (name.match(nameRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

// Fonction de validation de la confirmation du mot de passe
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value === inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    } else {
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
function validatePassword(input) {
    // Définir mon regex
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
function InscrireUtilisateur(){
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
