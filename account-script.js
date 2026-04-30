import { auth } from "./firebase-config.js";
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // 1. Éléments HTML
        const elName = document.getElementById('acc-name');
        const elEmail = document.getElementById('acc-email');
        const elPic = document.getElementById('acc-pic');
        const elId = document.getElementById('acc-id');
        const elStatus = document.getElementById('acc-status');
        const editBtn = document.getElementById('edit-profile-btn');

        // 2. Données provisoires si le profil est vide
        const tempName = "Utilisateur_" + user.uid.substring(0, 5);
        const tempPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

        // 3. Affichage des infos
        elName.innerText = user.displayName || tempName;
        elEmail.innerText = user.email;
        elId.innerText = user.uid;
        elPic.src = user.photoURL || tempPic;
        
        if (elStatus) {
            elStatus.innerText = (user.email === "thimeosousa02@gmail.com") ? "Administrateur" : "Client Agence.ch";
        }

        // 4. Logique de modification
        editBtn.onclick = async () => {
            if (editBtn.innerText === "Modifier le profil") {
                // Passage en mode édition
                const currentName = elName.innerText;
                elName.innerHTML = `<input type="text" id="input-name" value="${currentName}" class="edit-input">`;
                editBtn.innerText = "Enregistrer";
                editBtn.style.backgroundColor = "#1a73e8";
                editBtn.style.color = "white";
            } else {
                // Enregistrement des données
                const newName = document.getElementById('input-name').value;
                
                try {
                    await updateProfile(auth.currentUser, {
                        displayName: newName
                        // Tu peux aussi ajouter photoURL: "lien_vers_image" ici
                    });
                    
                    elName.innerText = newName;
                    editBtn.innerText = "Modifier le profil";
                    editBtn.style.backgroundColor = "";
                    alert("Profil mis à jour avec succès !");
                } catch (error) {
                    console.error("Erreur:", error);
                    alert("Impossible de mettre à jour le profil.");
                }
            }
        };

    } else {
        // Redirection si personne n'est connecté
        window.location.href = "auth.html";
    }
});