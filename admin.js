onAuthStateChanged(auth, async (user) => {
    const isAdmin = user && user.email === "thimeosousa02@gmail.com";
    const pathname = window.location.pathname;
    const isOnAdminPage = pathname.endsWith('admin.html') || pathname.includes('/admin');
    const body = document.querySelector('body');

    if (isOnAdminPage) {
        if (!isAdmin) {
            window.location.href = 'index.html';
        } else {
            // 1. Récupérer le nom
            const adminNameSpan = document.getElementById('admin-name');
            if (adminNameSpan) {
                // On essaie de récupérer le nom depuis l'auth Firebase, sinon Firestore
                let displayName = user.displayName || "Monsieur"; 
                
                // Si tu as un champ "nom" dans ton Firestore "utilisateurs" :
                try {
                    const userDoc = await getDoc(doc(db, "utilisateurs", user.uid));
                    if (userDoc.exists() && userDoc.data().nom) {
                        displayName = userDoc.data().nom;
                    }
                } catch (e) {
                    console.log("Nom non trouvé dans Firestore, utilisation du pseudo par défaut.");
                }
                
                adminNameSpan.textContent = displayName;
            }

            // 2. Lancer l'apparition fluide (la transition de 2s)
            setTimeout(() => {
                body.style.opacity = '1';
            }, 100);
        }
    } else {
        body.style.opacity = '1';
    }
});