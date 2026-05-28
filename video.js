// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
    
    // On sélectionne tous les cadres de miniatures
    const containers = document.querySelectorAll('.youtube-thumbnail-wrapper');

    containers.forEach(container => {
        container.addEventListener('click', function() {
            // On récupère l'ID YouTube stocké dans le HTML
            const videoId = this.getAttribute('data-video-id');
            
            if (videoId) {
                // 1. On injecte l'iframe dynamique avec l'autoplay activé
                this.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                `;

                // 2. On sélectionne l'iframe qui vient d'être créée
                const iframe = this.querySelector('iframe');

                // 3. On demande au navigateur de passer l'iframe en plein écran immédiatement
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) { /* Pour Safari */
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) { /* Pour Internet Explorer / Edge */
                    iframe.msRequestFullscreen();
                }
            }
        });
    });

});