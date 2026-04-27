// On attend que le formulaire soit soumis
document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Évite que la page ne se recharge

    // On récupère les valeurs
    const email = document.getElementById('email_field').value;
    const password = document.getElementById('password_field').value;

    console.log("Tentative de connexion...");
    console.log("Email saisi :", email);

    // Ici, nous ajouterons le code Firebase dès que ton projet sera prêt
    alert("Connexion en cours pour : " + email + "\n(Firebase sera relié dès que la limite de projets sera levée)");
});