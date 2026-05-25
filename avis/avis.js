// Données des avis (avec ta liste complète de 9 personnes)
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
        avatar: "./avis/jackie.jpg",
        note: 4
    },
    {
        nom: "Phyllis",
        texte: "Des suggestions de voyage magnifiques et parfaitement adaptées à nos attentes.",
        avatar: "./avis/phyllis.jpg",
        note: 5
    },
    {
        nom: "Elizabeth",
        texte: "Les infos sur les destinations sont très complètes et utiles.",
        avatar: "./avis/elizabeth.jpg",
        note: 4
    },
    {
        nom: "Pamala",
        texte: "Je n'attendais pas à mieux.",
        avatar: "./avis/pamala.jpg",
        note: 5
    },
    {
        nom: "Dexter",
        texte: "L'assistance est formidable ! J'ai eu de la facilité à les contacter.",
        avatar: "./avis/dexter.jpg",
        note: 5
    },
    {
        nom: "Anh",
        texte: "Je vous consseil cette agence ! J'en ai parler avec mes amis.",
        avatar: "./avis/anh.jpg",
        note: 4
    },
    {
        nom: "Jade",
        texte: "Le personnel est très professionnel et accueillant.",
        avatar: "./avis/jade.jpg",
        note: 5
    },
    {
        nom: "Jack",
        texte: "Le prix vaut le coup.",
        avatar: "./avis/jack.png",
        note: 4
    }
];

// Fonction pour charger et dupliquer les avis pour l'effet infini
const initialiserCarrouselAvis = () => {
    const track = document.getElementById("avis-track");
    if (!track) return;

    track.innerHTML = "";

    // 1. Crée le premier groupe d'avis (Original)
    const groupeOriginal = document.createElement("div");
    groupeOriginal.classList.add("avis-group");

    listeAvis.forEach(avis => {
        // CORRECTION : Génération des étoiles
        let etoilesHTML = "";
        for (let i = 1; i <= 5; i++) {
            etoilesHTML += `<span class="star ${i <= avis.note ? 'filled' : ''}">★</span>`;
        }

        // CORRECTION : Injection des étoiles dans le HTML avec la classe review-info
        const carteHTML = `
            <div class="review-card">
                <div class="review-header">
                    <img src="${avis.avatar}" alt="${avis.nom}" class="review-avatar">
                    <div class="review-info">
                        <h4 class="review-author">${avis.nom}</h4>
                        <div class="rating-display">
                            ${etoilesHTML}
                        </div>
                    </div>
                </div>
                <p class="review-text">"${avis.texte}"</p>
            </div>
        `;
        groupeOriginal.innerHTML += carteHTML;
    });

    // 2. Crée le deuxième groupe d'avis (Copie conforme)
    const groupeCopie = groupeOriginal.cloneNode(true);
    groupeCopie.setAttribute("aria-hidden", "true");

    // 3. Injecte les deux groupes côte à côte
    track.appendChild(groupeOriginal);
    track.appendChild(groupeCopie);
};

// Lance la création du carrousel
document.addEventListener("DOMContentLoaded", initialiserCarrouselAvis);