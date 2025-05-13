// classes/LocationItem.js
class LocationItem {
    constructor(nom) {
        this.nom = nom;
        this.estReserve = false;
        this.dateFinReservation = null;
    }

    estDisponible() {
        if (!this.estReserve) return true;

        const aujourdHui = new Date();
        if (aujourdHui > this.dateFinReservation) {
            this.estReserve = false;
            this.dateFinReservation = null;
            return true;
        }

        return false;
    }

    reserver(jours) {
        if (jours < 1) {
            return "La réservation doit durer au moins 1 jour.";
        }

        if (!this.estDisponible()) {
            return `L'objet '${this.nom}' est déjà réservé jusqu’au ${this._formatDate(this.dateFinReservation)}.`;
        }

        const aujourdHui = new Date();
        const dateFin = new Date(aujourdHui);
        dateFin.setDate(aujourdHui.getDate() + jours);

        this.estReserve = true;
        this.dateFinReservation = dateFin;

        return `✅ Réservation de '${this.nom}' pour ${jours} jour(s).`;
    }

    getStatut() {
        this.estDisponible();
        if (!this.estReserve) {
            return "Disponible";
        }
        return `Réservé jusqu’au ${this._formatDate(this.dateFinReservation)}`;
    }

    _formatDate(date) {
        return date.toLocaleDateString('fr-FR');
    }
}

module.exports = LocationItem;
