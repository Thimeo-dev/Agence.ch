import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // On a l'email via user.email, mais on cherche le document par UID
        const docRef = doc(db, "utilisateurs", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // On remplit le HTML avec les vraies infos de la base
            document.getElementById('acc-name').innerText = data.nom || "Utilisateur sans nom";
            document.getElementById('acc-email').innerText = user.email; // L'email vient du compte
            document.getElementById('acc-id').innerText = user.uid;
            document.getElementById('acc-pic').src = data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        } else {
            // Si c'est la 1ère fois et qu'il n'y a pas de doc, on affiche les infos de base
            document.getElementById('acc-name').innerText = user.displayName || "Nouveau Membre";
            document.getElementById('acc-email').innerText = user.email;
            document.getElementById('acc-id').innerText = user.uid;
        }
    } else {
        window.location.href = "auth.html";
    }
});