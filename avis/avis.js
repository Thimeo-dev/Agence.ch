// Données des avis (liées aux images de ton dossier "avis")
const listeAvis = [
    {
        nom: "Danny",
        texte: "Une expérience incroyable avec cette agence ! Le service en Tanzanie est impeccable.",
        avatar: "./avis/danny.jpg",
        note: 5
    },
    {
        nom: "Jackie",
        texte: "L'interface du site est super épurée et moderne. Très simple de changer de région.",
        avatar: "./avis/jackie.jpg"
    },
    {
        nom: "Phyllis",
        texte: "Des suggestions de voyage magnifiques et parfaitement adaptées à nos attentes.",
        avatar: "./avis/phyllis.jpg"
    },
    {
        nom: "Elizabeth",
        texte: "Les infos sur les destinations sont très complètes et utiles.",
        avatar: "./avis/elizabeth.jpg"
    },
    {
        nom: "Pamala",
        texte: "Je n'attendais pas à mieux.",
        avatar: "./avis/pamala.jpg"
    },
    {
        nom: "Dexter",
        texte: "L'assistance est formidable ! J'ai eu de la facilité à les contacter.",
        avatar: "./avis/dexter.jpg"
    },
    {
        nom: "Anh",
        texte: "Je vous consseil cette agence ! J'en ai parler avec mes amis.",
        avatar: "./avis/anh.jpg"
    },
    {
        nom: "Jade",
        texte: "Le personnel est très professionnel et accueillant.",
        avatar: "./avis/jade.jpg"
    },
    {
        nom: "Jack",
        texte: "Le prix vaut le coup.",
        avatar: "./avis/jack.png"
    },
];

// Fonction pour charger et dupliquer les avis pour l'effet infini
const initialiserCarrouselAvis = () => {
    const track = document.getElementById("avis-track");
    
    if (!track) return;

    track.innerHTML = "";

    // 1. Crée le premier groupe d'avis (Original)
    const groupeOriginal = document.createElement("div");
    groupeOriginal.classList.add("avis-group"); // Classe unique pour les avis

    listeAvis.forEach(avis => {
        const carteHTML = `
            <div class="review-card">
                <div class="review-header">
                    <img src="${avis.avatar}" alt="${avis.nom}" class="review-avatar">
                    <h4 class="review-author">${avis.nom}</h4>
                </div>
                <p class="review-text">"${avis.texte}"</p>
            </div>
        `;
        groupeOriginal.innerHTML += carteHTML;
    });

    // 2. Crée le deuxième groupe d'avis (Copie conforme pour la boucle infinie)
    const groupeCopie = groupeOriginal.cloneNode(true);
    groupeCopie.setAttribute("aria-hidden", "true");

    // 3. Injecte les deux groupes côte à côte dans le rail d'avis
    track.appendChild(groupeOriginal);
    track.appendChild(groupeCopie);
};

// Lance la création du carrousel dès que la page est chargée
document.addEventListener("DOMContentLoaded", initialiserCarrouselAvis);