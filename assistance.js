import { collection, addDoc, serverTimestamp, query, orderBy, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let unsubscribe = null;

// 1. LIRE les messages
const listenToMessages = (user, chatWindow) => {
    if (unsubscribe) unsubscribe();

    const q = query(
        collection(db, "messages"), 
        where("uid", "==", user.uid), 
        orderBy("createdAt", "asc")
    );

    unsubscribe = onSnapshot(q, (snapshot) => {
        chatWindow.innerHTML = "";
        snapshot.forEach((doc) => {
            const msg = doc.data();
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent'); 
            messageDiv.innerHTML = `<p class="msg-text">${msg.text}</p>`;
            chatWindow.appendChild(messageDiv);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');
    const sendButton = chatForm ? chatForm.querySelector('button[type="submit"]') : null;

    const showLoginRequired = () => {
        if (chatWindow) {
            chatWindow.innerHTML = `<p class="chat-info" data-key="chat_login_required">Veuillez vous connecter pour envoyer un message.</p>`;
        }
        if (messageInput) {
            messageInput.disabled = true;
            messageInput.placeholder = "Connexion requise pour écrire";
        }
        if (sendButton) sendButton.disabled = true;
        if (typeof window.translatePage === 'function') {
            window.translatePage();
        }
    };

    if (chatForm && messageInput) {
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const user = auth.currentUser;
            const messageText = messageInput.value.trim();

            if (!user) {
                alert("Vous devez être connecté pour envoyer un message.");
                window.location.href = 'auth.html';
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
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            if (chatWindow) {
                listenToMessages(user, chatWindow);
            }
            if (messageInput) {
                messageInput.disabled = false;
                messageInput.placeholder = "Écrivez votre message...";
            }
            if (sendButton) sendButton.disabled = false;
        } else {
            if (unsubscribe) unsubscribe();
            showLoginRequired();
        }
    });
});