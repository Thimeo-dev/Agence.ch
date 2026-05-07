import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";

// 1. Sélection des éléments HTML
const chatForm = document.getElementById('chat-form'); // Assure-toi que ton <form> a cet ID
const messageInput = document.getElementById('message-input');
const chatWindow = document.getElementById('chat-window'); // La zone où s'affichent les messages

// 2. ENVOYER un message
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const messageText = messageInput.value.trim();

    // On vérifie si l'utilisateur est connecté et si le texte n'est pas vide
    if (messageText !== "" && auth.currentUser) {
        try {
            await addDoc(collection(db, "messages"), {
                text: messageText,
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName || "Anonyme",
                createdAt: serverTimestamp()
            });

            // On vide l'input (le label redescendra grâce au CSS car le champ devient invalide/vide)
            messageInput.value = "";
            
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
        }
    }
});

// 3. LIRE les messages en temps réel (onSnapshot)
const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    chatWindow.innerHTML = ""; // On vide la fenêtre avant de recréer la liste
    
    snapshot.forEach((doc) => {
        const msg = doc.data();
        const isMe = msg.uid === auth.currentUser?.uid;

        // Création de la bulle de message
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isMe ? 'sent' : 'received');
        
        messageDiv.innerHTML = `
            <span class="msg-name">${msg.name}</span>
            <p class="msg-text">${msg.text}</p>
        `;

        chatWindow.appendChild(messageDiv);
    });

    // Scroll automatique vers le bas pour voir le dernier message
    chatWindow.scrollTop = chatWindow.scrollHeight;
});