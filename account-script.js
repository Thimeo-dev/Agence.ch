import { auth } from "./firebase-config.js";
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// On attend que Firebase dise "C'est bon, je sais qui c'est"
onAuthStateChanged(auth, (user) => {
    const elName = document.getElementById('acc-name');
    const elEmail = document.getElementById('acc-email');
    const elPic = document.getElementById('acc-pic');
    const elId = document.getElementById('acc-id');
    const elStatus = document.getElementById('acc-status');

    if (user) {
        // Injection des vraies infos du compte
        elName.innerText = user.displayName || "Utilisateur";
        elEmail.innerText = user.email;
        elId.innerText = user.uid;
        
        // Gestion de la photo (évite le bug visuel de ta capture)
        const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        elPic.src = user.photoURL || defaultPic;

        // Badge Admin
        if (elStatus) {
            elStatus.innerText = (user.email === "thimeosousa02@gmail.com") ? "Administrateur" : "Client";
        }
    } else {
        // Si personne n'est connecté, on redirige
        window.location.href = "auth.html";
    }
});