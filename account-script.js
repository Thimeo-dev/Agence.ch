import { auth, db, storage } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = "auth.html"; return; }

    const docRef = doc(db, "utilisateurs", user.uid);
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

    editBtn.onclick = async () => {
        if (editSec.style.display === "none") {
            editSec.style.display = "block";
            viewSec.style.display = "none";
            editBtn.innerText = "Enregistrer les modifications";
            document.getElementById('edit-name-input').value = document.getElementById('acc-name').innerText;
        } else {
            // Sauvegarde du nom
            const newName = document.getElementById('edit-name-input').value;
            await updateDoc(docRef, { nom: newName });
            document.getElementById('acc-name').innerText = newName;
            
            editSec.style.display = "none";
            viewSec.style.display = "block";
            editBtn.innerText = "Modifier le profil";
        }
    };

    // --- GESTION DE L'UPLOAD PHOTO ---
    document.getElementById('file').onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const sRef = ref(storage, `profils/${user.uid}`);
        const task = uploadBytesResumable(sRef, file);
        const prog = document.getElementById('upload-progress');
        prog.style.display = "block";

        task.on('state_changed', 
            (s) => prog.value = (s.bytesTransferred / s.totalBytes) * 100,
            (err) => console.error(err),
            () => {
                getDownloadURL(task.snapshot.ref).then(async (url) => {
                    await updateDoc(docRef, { photo: url });
                    document.getElementById('acc-pic').src = url;
                    prog.style.display = "none";
                    alert("Photo mise à jour !");
                });
            }
        );
    };
});

function updateUI(data, user) {
    document.getElementById('acc-name').innerText = data.nom || "Nouveau Membre";
    document.getElementById('acc-email').innerText = user.email;
    document.getElementById('acc-id').innerText = user.uid;
    document.getElementById('acc-pic').src = data.photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    document.getElementById('acc-status').innerText = (user.email === "thimeosousa02@gmail.com") ? "Administrateur" : "Membre Agence.ch";
}