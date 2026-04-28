import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user || user.email !== "ton-email@agence.ch") {
        // Si pas connecté ou pas le bon email -> Redirection immédiate
        alert("Accès strictement réservé à l'administrateur.");
        window.location.href = "index.html";
    }
});