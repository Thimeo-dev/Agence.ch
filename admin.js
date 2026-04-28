import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const auth = getAuth();
const ADMIN_EMAIL = "ton-email@agence.ch"; // <--- Vérifie bien l'orthographe ici

onAuthStateChanged(auth, (user) => {
    console.log("Vérification auth...");

    if (user && user.email === ADMIN_EMAIL) {
        console.log("Admin détecté ! Tentative d'ajout du bouton...");

        // On utilise une petite boucle pour attendre que le Header soit injecté
        const interval = setInterval(() => {
            const navUl = document.querySelector('nav ul'); // On cherche ta liste de navigation
            
            if (navUl) {
                clearInterval(interval); // On a trouvé le menu, on arrête de chercher
                
                if (!document.getElementById('admin-btn')) {
                    const li = document.createElement('li');
                    li.id = 'admin-btn';
                    li.innerHTML = `<a href="admin.html" style="color: #e74c3c; font-weight: bold;">Admin</a>`;
                    navUl.appendChild(li); // On l'ajoute à la fin de la liste
                    console.log("Bouton Admin ajouté avec succès.");
                }
            }
        }, 100); // On vérifie toutes les 100ms
    }
});