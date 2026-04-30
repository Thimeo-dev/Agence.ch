import { auth } from "./firebase-config.js"; // Assure-toi que le chemin est correct
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // 1. Récupération des éléments
        const elName = document.getElementById('acc-name');
        const elEmail = document.getElementById('acc-email');
        const elPic = document.getElementById('acc-pic');
        const elId = document.getElementById('acc-id');
        const elStatus = document.getElementById('acc-status');

        // 2. Remplissage des données
        elName.innerText = user.displayName || "Utilisateur sans nom";
        elEmail.innerText = user.email;
        elId.innerText = user.uid;
        
        // Photo de profil
        const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        elPic.src = user.photoURL || defaultPic;

        // Statut Admin
        if (elStatus) {
            elStatus.innerText = (user.email === "thimeosousa02@gmail.com") 
                ? "Administrateur" 
                : "Membre Agence.ch";
        }

    } else {
        // Si personne n'est connecté, on renvoie à la page de login
        window.location.href = "auth.html";
    }
});