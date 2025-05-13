import { format } from 'date-fns'

export class LocationItem {
  private nom: string
  private estReserve: boolean = false
  private dateFinReservation: Date | null = null

  constructor(nom: string) {
    this.nom = nom
  }

  public getNom(): string {
    return this.nom
  }

  public estDisponible(): boolean {
    if (!this.estReserve) return true

    const maintenant = new Date()
    if (this.dateFinReservation && maintenant > this.dateFinReservation) {
      this.estReserve = false
      this.dateFinReservation = null
      return true
    }

    return false
  }

  public reserver(jours: number): string {
    if (jours < 1) {
      return "La réservation doit durer au moins 1 jour."
    }

    if (!this.estDisponible()) {
      return `L'objet '${this.nom}' est déjà réservé jusqu’au ${format(this.dateFinReservation!, 'dd/MM/yyyy')}.`
    }

    this.estReserve = true
    const now = new Date()
    this.dateFinReservation = new Date(now.getTime() + jours * 24 * 60 * 60 * 1000)

    return `✅ Réservation de '${this.nom}' pour ${jours} jour(s).`
  }

  public getStatut(): string {
    this.estDisponible()
    if (!this.estReserve) {
      return "Disponible"
    }

    return `Réservé jusqu’au ${format(this.dateFinReservation!, 'dd/MM/yyyy')}`
  }
}
