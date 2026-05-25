// Fonction isolée pour gérer et lancer l'hymne au format MP3 (Tout en minuscules)
export const chargerHymneNational = (countryId) => {
    const anthemEl = document.getElementById('api-country-anthem');
    
    if (!anthemEl || !countryId) return;

    // On garde l'identifiant du pays en minuscules (ex: "albanie")
    const nomFichier = countryId.toLowerCase();
    
    // Depuis pays.html, on entre directement dans le sous-dossier Hymnes
    anthemEl.src = `Hymnes/${nomFichier}.mp3`;
    
    // Force le lecteur audio à charger le nouveau fichier MP3
    anthemEl.load(); 
    
    // Affiche le conteneur du lecteur audio
    if (anthemEl.parentElement) {
        anthemEl.parentElement.style.display = "flex";
    }
};