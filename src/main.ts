import { rl, ask } from './utils/readlineHelper'
import { LocationItem } from './models/LocationItem'

const catalog = new Map<string, LocationItem>()

async function initialiserCatalogue() {
  console.log("=== Système de location ===")
  const nbStr = await ask("Combien d'objets voulez-vous ajouter ? ")
  const n = parseInt(nbStr)

  for (let i = 0; i < n; i++) {
    let nom = await ask(`Nom de l'objet #${i + 1} : `)
    nom = nom.trim()

    while (!nom || catalog.has(nom.toLowerCase())) {
      nom = await ask(!nom
        ? "Le nom ne peut pas être vide. Réessayez : "
        : "Cet objet existe déjà. Choisissez un autre nom : ")
      nom = nom.trim()
    }

    catalog.set(nom.toLowerCase(), new LocationItem(nom))
  }
}

async function boucleMenu() {
  let quitter = false

  while (!quitter) {
    console.log("\nMenu :")
    console.log("1. Réserver un objet")
    console.log("2. Voir les statuts")
    console.log("3. Quitter")

    const choix = await ask("Votre choix : ")

    switch (choix.trim()) {
      case '1':
        await actionReserver()
        break
      case '2':
        actionVoirStatuts()
        break
      case '3':
        quitter = true
        break
      default:
        console.log("⚠️ Choix invalide, réessayez.")
    }
  }

  rl.close()
  console.log("Au revoir !")
}

async function actionReserver() {
  let nom = await ask("Quel objet voulez-vous réserver ? ")
  nom = nom.trim().toLowerCase()

  const item = catalog.get(nom)
  if (!item) {
    console.log("⚠️ Objet non trouvé.")
    return
  }

  const joursStr = await ask("Pour combien de jours ? ")
  const jours = parseInt(joursStr)
  console.log(item.reserver(jours))
}

function actionVoirStatuts() {
  console.log("=== Statuts des objets ===")
  for (const item of catalog.values()) {
    console.log(`- ${item.getNom()} : ${item.getStatut()}`)
  }
}

async function main() {
  await initialiserCatalogue()
  await boucleMenu()
}

main()
