package com.location;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocationItem {
    private static final DateTimeFormatter DATE_FORMATTER =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final String nom;
    private boolean estReserve;
    private LocalDate dateFinReservation;

    public LocationItem(String nom) {
        this.nom = nom;
        this.estReserve = false;
    }

    public String getNom() {
        return nom;
    }

    public boolean estDisponible() {
        if (!estReserve) {
            return true;
        }
        LocalDate aujourdHui = LocalDate.now();
        if (aujourdHui.isAfter(dateFinReservation)) {
            estReserve = false;
            dateFinReservation = null;
            return true;
        }
        return false;
    }

    public String reserver(int jours) {
        if (jours < 1) {
            return "La réservation doit durer au moins 1 jour.";
        }
        if (!estDisponible()) {
            return "L'objet '" + nom + "' est déjà réservé jusqu’au "
                    + dateFinReservation.format(DATE_FORMATTER) + ".";
        }
        estReserve = true;
        dateFinReservation = LocalDate.now().plusDays(jours);
        return "Réservation de '" + nom + "' pour " + jours + " jour(s).";
    }

    public String getStatut() {
        estDisponible();
        if (!estReserve) {
            return "Disponible";
        }
        return "Réservé jusqu’au " + dateFinReservation.format(DATE_FORMATTER);
    }
}
