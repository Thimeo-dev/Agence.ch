if (countryId && countriesData[countryId]) {
    const countryData = countriesData[countryId];
    const info = countryData[lang] || countryData['fr'];

    // Ton code d'affichage actuel
    if (titleEl) titleEl.textContent = info.name;
    if (descEl) descEl.textContent = info.desc;
    if (infoEl) infoEl.textContent = info.info;

    // --- CODE À AJOUTER POUR LA GALERIE INFINIE ---
    const galleryTrack = document.getElementById('country-gallery-track');
    const galleryContainer = document.getElementById('country-gallery-container');

    // On vérifie qu'on a bien un tableau d'images pour ce pays
    if (galleryTrack && countryData.images && countryData.images.length > 0) {
        galleryContainer.style.display = 'block'; // On affiche le conteneur
        galleryTrack.innerHTML = ''; // On vide le conteneur avant de le remplir

        // Pour faire un scroll infini CSS fluide, on crée 2 groupes identiques
        for (let i = 0; i < 2; i++) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'horizontal-scroll-group';
            if (i === 1) groupDiv.setAttribute('aria-hidden', 'true');

            // On ajoute chaque image du tableau dans le groupe actuel
            countryData.images.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = `Scène de ${info.name || 'Pays'}`;
                groupDiv.appendChild(img);
            });

            // On ajoute le groupe dans le rail de défilement (track)
            galleryTrack.appendChild(groupDiv);
        }
    } else if (galleryContainer) {
        // Si aucune image n'est configurée, on cache la section pour éviter un espace vide
        galleryContainer.style.display = 'none';
    }
}