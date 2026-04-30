import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const docRef = doc(db, "utilisateurs", user.uid);
        
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                displayData(data, user);
            } else {
                // Si aucune info en base, on crée un profil provisoire
                const initialData = {
                    nom: user.displayName || "Nouveau Membre",
                    photo: user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                    email: user.email
                };
                await setDoc(docRef, initialData);
                displayData(initialData, user);
            }
        } catch (error) {
            console.error("Erreur de permission : ", error);
            document.getElementById('acc-name').innerText = "Erreur d'accès aux données";
        }
    } else {
        window.location.href = "auth.html";
    }
});

function displayData(data, user) {
    document.getElementById('acc-name').innerText = data.nom;
    document.getElementById('acc-email').innerText = user.email;
    document.getElementById('acc-id').innerText = user.uid;
    document.getElementById('acc-pic').src = data.photo;
}