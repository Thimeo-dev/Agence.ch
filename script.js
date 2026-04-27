document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la page de se recharger

    const email = document.getElementById('email_field').value;
    const password = document.getElementById('password_field').value;

    console.log("Tentative de connexion avec :", email);
    
    // Prochaine étape : Firebase Auth ici !
    alert("Connexion en cours pour : " + email);
});