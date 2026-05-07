import { collection, addDoc, serverTimestamp, query, orderBy, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";

// Sélection des éléments
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatWindow = document.getElementById('chat-window');

// 1. LIRE les messages (FILTRÉS par utilisateur)
const listenToMessages = (user) => {
    // On ne récupère que les messages où l'UID correspond à l'utilisateur connecté
    const q = query(
        collection(db, "messages"), 
        where("uid", "==", user.uid), 
        orderBy("createdAt", "asc")
    );

    onSnapshot(q, (snapshot) => {
        chatWindow.innerHTML = "";
        snapshot.forEach((doc) => {
            const msg = doc.data();
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent'); // Ici, ce sont tous les siens
            messageDiv.innerHTML = `<p class="msg-text">${msg.text}</p>`;
            chatWindow.appendChild(messageDiv);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
};

// 2. ENVOYER un message (Uniquement si connecté)
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const messageText = messageInput.value.trim();

    if (!user) {
        alert("Vous devez être connecté pour envoyer un message.");
        return;
    }

    if (messageText !== "") {
        try {
            await addDoc(collection(db, "messages"), {
                text: messageText,
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp()
            });
            messageInput.value = ""; 
        } catch (error) {
            console.error("Erreur d'envoi :", error);
        }
    }
});

// 3. SURVEILLER l'état de connexion
auth.onAuthStateChanged((user) => {
    if (user) {
        listenToMessages(user);
        messageInput.disabled = false;
        messageInput.style.opacity = "1";
    } else {
        chatWindow.innerHTML = "<p>Veuillez vous connecter pour voir votre historique.</p>";
        messageInput.disabled = true;
        messageInput.style.opacity = "0.5";
    }
});