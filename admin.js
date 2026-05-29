import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const adminChatWindow = document.getElementById('admin-chat-window');
const adminChatForm = document.getElementById('admin-chat-form');
const adminMessageInput = document.getElementById('admin-message-input');

// Variable globale pour stocker l'ID de l'utilisateur avec qui on discute actuellement
// (Pratique pour savoir à qui on répond)
let activeUserChatUid = null; 

// 1. Fonction pour récupérer et afficher le nom de l'admin
const loadUserName = () => {
    onAuthStateChanged(auth, async (user) => {
        const accNameSpan = document.getElementById('acc-name');
        
        if (user && accNameSpan) {
            try {
                const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                if (userDoc.exists() && userDoc.data().nom) {
                    accNameSpan.textContent = userDoc.data().nom;
                } else {
                    accNameSpan.textContent = "Administrateur";
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du nom :", error);
                accNameSpan.textContent = "Admin";
            }
        }
    });
};

// 2. ÉCOUTER TOUS LES MESSAGES D'ASSISTANCE
const listenToAllMessages = () => {
    // On trie par date pour avoir le fil de discussion dans l'ordre
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    onSnapshot(q, (snapshot) => {
        if (!adminChatWindow) return;
        adminChatWindow.innerHTML = ""; // On vide avant de réafficher

        if (snapshot.empty) {
            adminChatWindow.innerHTML = `<p class="chat-info">Aucun message d'assistance reçu.</p>`;
            return;
        }

        snapshot.forEach((doc) => {
            const msg = doc.data();
            const messageDiv = document.createElement('div');
            
            // On différencie visuellement tes réponses de leurs messages
            // Si l'email correspond au tien, c'est une réponse admin, sinon c'est le client
            if (msg.email === "thimeosousa02@gmail.com") {
                messageDiv.classList.add('message', 'admin-reply');
                messageDiv.innerHTML = `<p class="msg-text"><strong>Moi :</strong> ${msg.text}</p>`;
            } else {
                messageDiv.classList.add('message', 'client-msg');
                messageDiv.innerHTML = `<p class="msg-text"><strong>${msg.email || 'Client'} :</strong> ${msg.text}</p>`;
                
                // On mémorise l'UID du dernier client qui a écrit pour pouvoir lui répondre automatiquement
                activeUserChatUid = msg.uid;
            }
            
            adminChatWindow.appendChild(messageDiv);
        });

        // Défilement automatique vers le bas
        adminChatWindow.scrollTop = adminChatWindow.scrollHeight;
    }, (error) => {
        console.error("Erreur lors de la lecture des messages :", error);
    });
};

// 3. ENVOYER UNE RÉPONSE DEPUIS L'ADMINISTRATION
if (adminChatForm) {
    adminChatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = auth.currentUser;
        const replyText = adminMessageInput.value.trim();

        if (!user) {
            alert("Vous devez être connecté pour répondre.");
            return;
        }

        if (!activeUserChatUid) {
            alert("Aucun utilisateur cible détecté pour cette réponse.");
            return;
        }

        if (replyText !== "") {
            try {
                // On ajoute le message dans la collection globale "messages"
                // On utilise l'UID du client ciblé pour que le message apparaisse dans son interface
                await addDoc(collection(db, "messages"), {
                    text: replyText,
                    uid: activeUserChatUid, // Lié à l'UID du client pour ses règles de lecture
                    email: user.email, // Ton email admin pour t'identifier
                    createdAt: serverTimestamp()
                });

                adminMessageInput.value = ""; // On vide l'entrée de texte
            } catch (error) {
                console.error("Erreur d'envoi de la réponse admin :", error);
            }
        }
    });
}

// Lancement des fonctionnalités au chargement du script
loadUserName();
listenToAllMessages();