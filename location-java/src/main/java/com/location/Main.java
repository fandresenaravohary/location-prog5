package com.location;

import java.util.*;

public class Main {
    private static final Scanner scanner = new Scanner(System.in);

    private static final Map<String, LocationItem> catalog = new HashMap<>();

    public static void main(String[] args) {
        initialiserCatalogue();
        boucleMenu();
        System.out.println("Au revoir !");
        scanner.close();
    }

    private static void initialiserCatalogue() {
        System.out.println("=== Système de location ===");
        System.out.print("Combien d'objets voulez-vous ajouter ? ");
        int n = lireEntier();
        scanner.nextLine();

        for (int i = 1; i <= n; i++) {
            System.out.print("Nom de l'objet #" + i + " : ");
            String nom = scanner.nextLine().trim();
            while (nom.isEmpty() || catalog.containsKey(nom.toLowerCase())) {
                System.out.print(nom.isEmpty()
                        ? "Le nom ne peut pas être vide. Réessayez : "
                        : "Cet objet existe déjà. Choisissez un autre nom : ");
                nom = scanner.nextLine().trim();
            }
            catalog.put(nom.toLowerCase(), new LocationItem(nom));
        }
    }

    private static void boucleMenu() {
        boolean sortir = false;
        while (!sortir) {
            System.out.println("\nMenu:");
            System.out.println("1. Réserver un objet");
            System.out.println("2. Voir les statuts");
            System.out.println("3. Quitter");
            System.out.print("Votre choix : ");
            int choix = lireEntier();
            scanner.nextLine();

            switch (choix) {
                case 1 -> actionReserver();
                case 2 -> actionVoirStatuts();
                case 3 -> sortir = true;
                default -> System.out.println("Choix invalide, réessayez.");
            }
        }
    }

    private static void actionReserver() {
        System.out.print("Quel objet voulez-vous réserver ? ");
        String nomObjet = scanner.nextLine().trim().toLowerCase();
        LocationItem item = catalog.get(nomObjet);
        if (item == null) {
            System.out.println("Objet non trouvé.");
            return;
        }
        System.out.print("Pour combien de jours ? ");
        int jours = lireEntier();
        scanner.nextLine();
        System.out.println(item.reserver(jours));
    }

    private static void actionVoirStatuts() {
        System.out.println("=== Statuts des objets ===");
        catalog.values().forEach(item ->
                System.out.printf("- %s : %s%n", item.getNom(), item.getStatut())
        );
    }

    private static int lireEntier() {
        while (!scanner.hasNextInt()) {
            System.out.print("Veuillez entrer un nombre valide : ");
            scanner.next();
        }
        return scanner.nextInt();
    }
}
