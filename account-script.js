import { auth, db, storage } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

function updateUI(data, user) {
    const accName = document.getElementById('acc-name');
    const accEmail = document.getElementById('acc-email');
    const accId = document.getElementById('acc-id');
    const accPic = document.getElementById('acc-pic');
    const accStatus = document.getElementById('acc-status');

    if (accName) accName.innerText = data.nom || "Nouveau Membre";
    if (accEmail) accEmail.innerText = user.email;
    if (accId) accId.innerText = user.uid;
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

            // Si le doc n'existe pas, on le crée (Première fois)
            if (!userSnap.exists()) {
                await setDoc(docRef, { nom: "Nouveau Membre", photo: "", email: user.email });
                userSnap = await getDoc(docRef);
            }

            const userData = userSnap.data();
            updateUI(userData, user);

            // --- GESTION DU BOUTON MODIFIER ---
            const editBtn = document.getElementById('edit-profile-btn');
            const viewSec = document.getElementById('view-section');
            const editSec = document.getElementById('edit-section');

            if (editBtn && viewSec && editSec) {
                editBtn.onclick = async () => {
                    try {
                        if (editSec.style.display === "none") {
                            editSec.style.display = "block";
                            viewSec.style.display = "none";
                            editBtn.innerText = "Enregistrer les modifications";
                            const editInput = document.getElementById('edit-name-input');
                            if (editInput) editInput.value = document.getElementById('acc-name').innerText;
                        } else {
                            // Sauvegarde du nom
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
                    } catch (error) {
                        console.error("Erreur lors de la mise à jour du profil:", error);
                        alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
                    }
                };
            }

            // --- GESTION DE L'UPLOAD PHOTO ---
            const fileInput = document.getElementById('file');
            if (fileInput) {
                fileInput.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    // Vérifier le type de fichier
                    if (!file.type.startsWith('image/')) {
                        alert("Veuillez sélectionner une image valide.");
                        return;
                    }

                    // Vérifier la taille (max 5MB)
                    if (file.size > 5 * 1024 * 1024) {
                        alert("L'image ne doit pas dépasser 5MB.");
                        return;
                    }

                    try {
                        const sRef = ref(storage, `profils/${user.uid}`);
                        const task = uploadBytesResumable(sRef, file);

                        const prog = document.getElementById('upload-progress');
                        if (prog) prog.style.display = "block";

                        task.on('state_changed', 
                            (s) => {
                                if (prog) prog.value = (s.bytesTransferred / s.totalBytes) * 100;
                            },
                            (err) => {
                                console.error("Erreur d'upload:", err);
                                alert("Erreur lors de l'upload de l'image.");
                                if (prog) prog.style.display = "none";
                            },
                            async () => {
                                try {
                                    const url = await getDownloadURL(task.snapshot.ref);
                                    await updateDoc(docRef, { photo: url });
                                    const accPic = document.getElementById('acc-pic');
                                    if (accPic) accPic.src = url;
                                    if (prog) prog.style.display = "none";
                                    alert("Photo mise à jour !");
                                } catch (error) {
                                    console.error("Erreur lors de la mise à jour de l'URL:", error);
                                    alert("Erreur lors de la mise à jour de la photo.");
                                    if (prog) prog.style.display = "none";
                                }
                            }
                        );
                    } catch (error) {
                        console.error("Erreur lors de l'initialisation de l'upload:", error);
                        alert("Erreur lors de l'upload de l'image.");
                    }
                };
            }
        } catch (error) {
            console.error("Erreur lors du chargement des données utilisateur:", error);
            console.error("Détails de l'erreur:", {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            // Afficher un message d'erreur dans l'interface
            const accName = document.getElementById('acc-name');
            if (accName) accName.innerText = "Erreur de chargement";
            alert("Erreur lors du chargement des données. Veuillez rafraîchir la page.");
        }
    });
});