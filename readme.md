# 📦 Application de Location d'Objets

Cette application permet de gérer la **réservation d'objets** (voiture, maison, etc.) pour une durée spécifiée en **jours**. Elle existe sous 4 implémentations différentes : **Java**, **JavaScript**, **TypeScript** et **Python**.

---

## 🚀 Fonctionnalités principales

- ✅ **Ajout d'objets à louer**
- 📆 **Réservation d'un objet pour un nombre de jours**
- 🔁 **Vérification automatique de la disponibilité**
- 🔒 **Empêche la réservation d’un objet déjà réservé**
- 📌 **Affichage du statut de chaque objet** :
  - **Disponible**
  - **Réservé jusqu’à une date**

---

## 🧠 Cas d'utilisation

- Réserver une voiture pour 3 jours
- Louer une maison pour une semaine
- Vérifier quand un objet devient disponible à nouveau

---

## ❌ Gestion des erreurs

- ❗ Tentative de réservation avec une durée invalide (ex : 0 jour)
- ❗ Tentative de réservation d’un objet déjà réservé
- ❗ Tentative de réservation d’un objet inexistant

---

## 🛠 Technologies utilisées

- 💻 **Java** – Console (dossier `location-java`)
- 🌐 **JavaScript** – Console ou navigateur (dossier `location-javascript`)
- 🧩 **TypeScript** – Console ou navigateur (dossier `location-typescript`)
- 🐍 **Python** – Console (dossier `location-python`)

---

## ▶️ Lancer chaque version

### Java

```bash
cd location-java
javac com/location/*.java
java com.location.Main
