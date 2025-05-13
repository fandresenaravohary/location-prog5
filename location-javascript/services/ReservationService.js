// services/ReservationService.js
const LocationItem = require("../classes/LocationItem");

class ReservationService {
    constructor() {
        this.catalogue = new Map();
    }

    ajouterObjet(nom) {
        const key = nom.toLowerCase();
        if (this.catalogue.has(key)) {
            throw new Error("Objet déjà existant.");
        }
        this.catalogue.set(key, new LocationItem(nom));
    }

    reserverObjet(nom, jours) {
        const item = this.catalogue.get(nom.toLowerCase());
        if (!item) return "⚠️ Objet non trouvé.";
        return item.reserver(jours);
    }

    getStatuts() {
        const resultats = [];
        for (const item of this.catalogue.values()) {
            resultats.push(`- ${item.nom} : ${item.getStatut()}`);
        }
        return resultats;
    }
}

module.exports = ReservationService;
