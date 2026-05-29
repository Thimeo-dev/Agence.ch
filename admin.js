import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

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

// 2. ÉCOUTER TOUS LES MESSAGES D'ASSISTANCE (SANS BLOCAGE)
const listenToAllMessages = () => {
    // On écoute la collection sans le "orderBy" Firebase pour éviter le bug de page blanche
    const messagesRef = collection(db, "messages");

    onSnapshot(messagesRef, (snapshot) => {
        if (!adminChatWindow) return;
        adminChatWindow.innerHTML = ""; // On vide la fenêtre de chat

        if (snapshot.empty) {
            adminChatWindow.innerHTML = `<p class="chat-info">Aucun message d'assistance reçu.</p>`;
            return;
        }

        // On convertit le snapshot en tableau pour pouvoir les trier proprement en JS
        const allMessages = [];
        snapshot.forEach((doc) => {
            allMessages.push({ id: doc.id, ...doc.data() });
        });

        // Tri sécurisé par date en JavaScript (les messages sans date vont au début)
        allMessages.sort((a, b) => {
            const dateA = a.createdAt ? a.createdAt.toMillis() : 0;
            const dateB = b.createdAt ? b.createdAt.toMillis() : 0;
            return dateA - dateB;
        });

        // Affichage des messages triés
        allMessages.forEach((msg) => {
            const messageDiv = document.createElement('div');
            
            if (msg.email === "thimeosousa02@gmail.com") {
                // Message envoyé par toi (l'admin)
                messageDiv.classList.add('message', 'admin-reply');
                messageDiv.innerHTML = `<p class="msg-text"><strong>Moi :</strong> ${msg.text}</p>`;
            } else {
                // Message envoyé par un client
                messageDiv.classList.add('message', 'client-msg');
                messageDiv.innerHTML = `<p class="msg-text"><strong>${msg.email || 'Client'} :</strong> ${msg.text}</p>`;
                
                // On mémorise automatiquement son UID pour savoir à qui répondre
                activeUserChatUid = msg.uid;
            }
            
            adminChatWindow.appendChild(messageDiv);
        });

        // Défilement automatique vers le bas
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
            alert("Désolé, impossible de répondre car aucun UID client n'a été détecté dans l'historique.");
            return;
        }

        if (replyText !== "") {
            try {
                // Envoi de ta réponse liée à l'UID du client
                await addDoc(collection(db, "messages"), {
                    text: replyText,
                    uid: activeUserChatUid, 
                    email: user.email, 
                    createdAt: serverTimestamp()
                });

                adminMessageInput.value = ""; // Vide l'input après l'envoi
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