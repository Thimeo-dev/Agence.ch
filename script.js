const authForm = document.getElementById('auth-form');

if (authForm) {
    authForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche la page de se recharger

        const email = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;

        console.log("Tentative de connexion avec :", email);
        // Authentification réelle gérée par auth-script.js
    });
}