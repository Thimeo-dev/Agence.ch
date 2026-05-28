import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Fonction pour récupérer et afficher le nom
const loadUserName = () => {
    onAuthStateChanged(auth, async (user) => {
        const adminNameSpan = document.getElementById('admin-name');
        
        if (user && adminNameSpan) {
            try {
                // Recherche dans la collection "utilisateurs" avec l'UID de l'utilisateur
                const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                
                if (userDoc.exists() && userDoc.data().nom) {
                    // Affiche le nom trouvé dans Firestore
                    adminNameSpan.textContent = userDoc.data().nom;
                } else {
                    // Fallback si le champ nom n'existe pas
                    adminNameSpan.textContent = "Utilisateur";
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du nom :", error);
                adminNameSpan.textContent = "Erreur";
            }
        }
    });
};

// Lancer la fonction
loadUserName();