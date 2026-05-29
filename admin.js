import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🎯 CONFIGURATION FIREBASE (Remplace ces lignes par TES propres clés de configuration)
const firebaseConfig = {
    apiKey: "TON_API_KEY",
    authDomain: "TON_AUTH_DOMAIN",
    projectId: "TON_PROJECT_ID",
    storageBucket: "TON_STORAGE_BUCKET",
    messagingSenderId: "TON_MESSAGING_SENDER_ID",
    appId: "TON_APP_ID"
};

// Initialisation de l'application Firebase pour ce script
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const adminChatWindow = document.getElementById('admin-chat-window');
const adminChatForm = document.getElementById('admin-chat-form');
const adminMessageInput = document.getElementById('admin-message-input');

// Variable globale pour stocker l'ID de l'utilisateur avec qui on discute
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
                    accNameSpan.textContent = "Thiméo";
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
    const messagesRef = collection(db, "messages");

    onSnapshot(messagesRef, (snapshot) => {
        if (!adminChatWindow) return;
        adminChatWindow.innerHTML = ""; 

        if (snapshot.empty) {
            adminChatWindow.innerHTML = `<p class="chat-info">Aucun message d'assistance reçu.</p>`;
            return;
        }

        const allMessages = [];
        snapshot.forEach((doc) => {
            allMessages.push({ id: doc.id, ...doc.data() });
        });

        // Tri par date en JavaScript
        allMessages.sort((a, b) => {
            const dateA = a.createdAt ? a.createdAt.toMillis() : 0;
            const dateB = b.createdAt ? b.createdAt.toMillis() : 0;
            return dateA - dateB;
        });

        // Affichage des messages
        allMessages.forEach((msg) => {
            const messageDiv = document.createElement('div');
            
            if (msg.email === "thimeosousa02@gmail.com") {
                messageDiv.classList.add('message', 'admin-reply');
                messageDiv.innerHTML = `<p class="msg-text"><strong>Moi :</strong> ${msg.text}</p>`;
            } else {
                messageDiv.classList.add('message', 'client-msg');
                messageDiv.innerHTML = `<p class="msg-text"><strong>${msg.email || 'Client'} :</strong> ${msg.text}</p>`;
                
                // Mémorisation de l'UID client pour la réponse
                activeUserChatUid = msg.uid;
            }
            
            adminChatWindow.appendChild(messageDiv);
        });

        adminChatWindow.scrollTop = adminChatWindow.scrollHeight;
    }, (error) => {
        console.error("Erreur lors de la lecture des messages :", error);
        if (adminChatWindow) {
            adminChatWindow.innerHTML = `<p class="chat-info" style="color: red;">Erreur Firebase : ${error.message}</p>`;
        }
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
            alert("Désolé, impossible de répondre car aucun UID client n'a été détecté.");
            return;
        }

        if (replyText !== "") {
            try {
                await addDoc(collection(db, "messages"), {
                    text: replyText,
                    uid: activeUserChatUid, 
                    email: user.email, 
                    createdAt: serverTimestamp()
                });

                adminMessageInput.value = ""; 
            } catch (error) {
                console.error("Erreur d'envoi de la réponse admin :", error);
                alert("Erreur lors de l'envoi : " + error.message);
            }
        }
    });
}

// Lancement des fonctions
loadUserName();
listenToAllMessages();