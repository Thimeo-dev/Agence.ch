import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function updateUI(data, user) {
    const accName = document.getElementById('acc-name');
    const accEmail = document.getElementById('acc-email');
    const accId = document.getElementById('acc-id');
    const accPic = document.getElementById('acc-pic');
    const accStatus = document.getElementById('acc-status');

    if (accName) accName.innerText = data.nom || "Nouveau Membre";
    if (accEmail) accEmail.innerText = user.email;
    if (accId) accId.innerText = user.uid;
    
    // La photo est maintenant soit une URL Flaticon, soit du texte Base64
    if (accPic) accPic.src = data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    
    if (accStatus) accStatus.innerText = (user.email === "thimeosousa02@gmail.com") ? "Administrateur" : "Membre Agence.ch";
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) { 
            window.location.href = "auth.html"; 
            return; 
        }

        const docRef = doc(db, "utilisateurs", user.uid);
        
        try {
            let userSnap = await getDoc(docRef);

            // Si le doc n'existe pas, on le crée
            if (!userSnap.exists()) {
                await setDoc(docRef, { nom: "Nouveau Membre", photo: "", email: user.email });
                userSnap = await getDoc(docRef);
            }

            const userData = userSnap.data();
            updateUI(userData, user);

            // --- GESTION DU BOUTON MODIFIER (NOM) ---
            const editBtn = document.getElementById('edit-profile-btn');
            const viewSec = document.getElementById('view-section');
            const editSec = document.getElementById('edit-section');

            if (editBtn && viewSec && editSec) {
                editBtn.onclick = async () => {
                    if (editSec.style.display === "none") {
                        editSec.style.display = "block";
                        viewSec.style.display = "none";
                        editBtn.innerText = "Enregistrer les modifications";
                        const editInput = document.getElementById('edit-name-input');
                        if (editInput) editInput.value = document.getElementById('acc-name').innerText;
                    } else {
                        const editInput = document.getElementById('edit-name-input');
                        if (editInput) {
                            const newName = editInput.value.trim();
                            if (newName) {
                                await updateDoc(docRef, { nom: newName });
                                document.getElementById('acc-name').innerText = newName;
                                alert("Nom mis à jour !");
                            }
                        }
                        editSec.style.display = "none";
                        viewSec.style.display = "block";
                        editBtn.innerText = "Modifier le profil";
                    }
                };
            }

            // --- GESTION DE LA PHOTO (CONVERSION TEXTE BASE64) ---
            const fileInput = document.getElementById('file');
            if (fileInput) {
                fileInput.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    // Sécurité : Type image uniquement
                    if (!file.type.startsWith('image/')) {
                        alert("Veuillez sélectionner une image valide.");
                        return;
                    }

                    // Sécurité : Taille limitée à 800Ko pour Firestore
                    if (file.size > 800 * 1024) {
                        alert("L'image est trop lourde pour le mode gratuit (Max 800 Ko).");
                        return;
                    }

                    const reader = new FileReader();
                    
                    // Cette fonction se déclenche quand la conversion en texte est finie
                    reader.onloadend = async () => {
                        const base64String = reader.result;

                        try {
                            // On enregistre le TEXTE de l'image dans Firestore directement
                            await updateDoc(docRef, { photo: base64String });
                            
                            const accPic = document.getElementById('acc-pic');
                            if (accPic) accPic.src = base64String;
                            
                            alert("Photo de profil mise à jour !");
                        } catch (error) {
                            console.error("Erreur Firestore:", error);
                            alert("Erreur lors de l'enregistrement de l'image.");
                        }
                    };

                    // Lance la conversion du fichier en texte
                    reader.readAsDataURL(file);
                };
            }

        } catch (error) {
            console.error("Erreur lors du chargement:", error);
            const accName = document.getElementById('acc-name');
            if (accName) accName.innerText = "Erreur de chargement";
            alert("Erreur lors du chargement des données. Veuillez rafraîchir la page.");
        }
    });
});