import { collection, addDoc, serverTimestamp, query, orderBy, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

// Sélection des éléments (Assure-toi que les IDs correspondent à ton HTML)
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatWindow = document.getElementById('chat-window');

console.log('Éléments trouvés:', { chatForm, messageInput, chatWindow });

let unsubscribe = null; // Variable pour stocker l'écouteur Firestore

// Fonction pour initialiser le message au chargement
function initializeStatusMessage() {
    const statusEl = document.getElementById('status-message');
    console.log('Initialisation - statusEl:', statusEl);
    if (!statusEl) {
        console.warn('Element #status-message not found, retrying in 100ms...');
        setTimeout(initializeStatusMessage, 100);
        return;
    }
    console.log('Affichage du message par défaut (pas connecté)');
    updateStatusDisplay(false, false);
}

// 1. LIRE les messages (FILTRÉS par utilisateur)
const listenToMessages = (user) => {
    // Si un écouteur existe déjà, on le coupe avant d'en créer un nouveau
    if (unsubscribe) unsubscribe();

    const q = query(
        collection(db, "messages"), 
        where("uid", "==", user.uid), 
        orderBy("createdAt", "asc")
    );

    unsubscribe = onSnapshot(q, (snapshot) => {
        chatWindow.innerHTML = "";
        const hasMessages = snapshot.size > 0;
        
        snapshot.forEach((doc) => {
            const msg = doc.data();
            const messageDiv = document.createElement('div');
            
            // On utilise tes classes de bulles (sent/received)
            // Ici, comme c'est filtré par UID, ce sont forcément ses messages ("sent")
            messageDiv.classList.add('message', 'sent'); 
            
            messageDiv.innerHTML = `<p class="msg-text">${msg.text}</p>`;
            chatWindow.appendChild(messageDiv);
        });
        
        // Afficher/masquer le message de statut
        updateStatusDisplay(true, hasMessages);
        
        // Scroll automatique vers le bas à chaque nouveau message
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, (error) => {
        // Si tu vois cette erreur, clique sur le lien dans la console pour créer l'index
        console.error("Erreur Firestore (Index possiblement manquant) :", error);
    });
};

// 2. ENVOYER un message (Fonctionne avec Entrée grâce au submit du form)
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const messageText = messageInput.value.trim();

    if (!user) {
        // L'utilisateur n'est pas connecté, on bloque l'envoi
        updateStatusDisplay(false, false);
        return;
    }

    if (messageText !== "") {
        try {
            await addDoc(collection(db, "messages"), {
                text: messageText,
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp() // Utilise l'heure du serveur Firebase
            });
            
            // On vide l'input, ce qui fait redescendre le label via le CSS :valid
            messageInput.value = ""; 
        } catch (error) {
            console.error("Erreur d'envoi :", error);
        }
    }
});

// 3. SURVEILLER l'état de connexion
auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged - User:', user);
    if (user) {
        console.log('Utilisateur connecté:', user.email);
        listenToMessages(user);
        messageInput.disabled = false;
        messageInput.style.opacity = "1";
    } else {
        console.log('Utilisateur non connecté');
        if (unsubscribe) unsubscribe(); // On arrête d'écouter les messages
        chatWindow.innerHTML = "";
        messageInput.disabled = true;
        messageInput.style.opacity = "0.5";
        updateStatusDisplay(false, false); // Afficher le message de connexion
    }
});

function updateStatusDisplay(isLoggedIn, hasMessages) {
    const statusEl = document.getElementById('status-message');
    console.log('updateStatusDisplay appelée:', { isLoggedIn, hasMessages, statusEl });
    
    if (!statusEl) {
        console.error('Élément #status-message not found!');
        return;
    }
    
    if (!isLoggedIn) {
        // Cas 1 : Pas connecté
        statusEl.innerHTML = 'Veuillez vous <a href="auth.html">connecter</a> pour envoyer un message.';
        statusEl.style.display = 'flex';
        console.log('Affichage: pas connecté');
    } else if (isLoggedIn && !hasMessages) {
        // Cas 2 : Connecté mais historique vide
        statusEl.textContent = 'Il y a toujours rien...';
        statusEl.style.display = 'flex';
        console.log('Affichage: historique vide');
    } else {
        // Cas 3 : Connecté avec des messages (on cache le texte translucide)
        statusEl.textContent = '';
        statusEl.style.display = 'none';
        console.log('Affichage: messages trouvés');
    }
}

// Exemple d'utilisation (à tester dans ta console)
// updateStatusDisplay(false, false); // Affiche "Veuillez vous connecter"
// updateStatusDisplay(true, false);  // Affiche "Historique vide"

// Initialiser le message de statut au chargement
initializeStatusMessage();