// main.js
const { createInterface, askQuestion } = require('./utils/readline');
const ReservationService = require('./services/ReservationService');

async function main() {
    const rl = createInterface();
    const service = new ReservationService();

    console.log("=== Système de location ===");
    const nombre = parseInt(await askQuestion(rl, "Combien d'objets voulez-vous ajouter ? "), 10);

    for (let i = 1; i <= nombre; i++) {
        let nom = await askQuestion(rl, `Nom de l'objet #${i} : `);
        nom = nom.trim();
        while (!nom || service.catalogue.has(nom.toLowerCase())) {
            nom = await askQuestion(rl, nom
                ? "Cet objet existe déjà. Choisissez un autre nom : "
                : "Le nom ne peut pas être vide. Réessayez : ");
            nom = nom.trim();
        }
        service.ajouterObjet(nom);
    }

    let quitter = false;
    while (!quitter) {
        console.log("\nMenu:");
        console.log("1. Réserver un objet");
        console.log("2. Voir les statuts");
        console.log("3. Quitter");

        const choix = await askQuestion(rl, "Votre choix : ");

        switch (choix.trim()) {
            case '1': {
                const nom = await askQuestion(rl, "Quel objet voulez-vous réserver ? ");
                const jours = parseInt(await askQuestion(rl, "Pour combien de jours ? "), 10);
                console.log(service.reserverObjet(nom.trim(), jours));
                break;
            }
            case '2':
                console.log("=== Statuts des objets ===");
                service.getStatuts().forEach(ligne => console.log(ligne));
                break;
            case '3':
                quitter = true;
                break;
            default:
                console.log("⚠️ Choix invalide, réessayez.");
        }
    }

    console.log("Au revoir !");
    rl.close();
}

main();
