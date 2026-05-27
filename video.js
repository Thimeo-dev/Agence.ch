// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
    
    // On sélectionne tous les cadres de miniatures
    const containers = document.querySelectorAll('.youtube-thumbnail-wrapper');

    containers.forEach(container => {
        container.addEventListener('click', function() {
            // On récupère l'ID YouTube stocké dans le HTML
            const videoId = this.getAttribute('data-video-id');
            
            if (videoId) {
                // On crée l'iframe dynamique avec autoplay activé
                this.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                `;
            }
        });
    });

});