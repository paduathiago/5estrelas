import {Establishment} from '../entities'
import {EstablishmentRepositoryInterface} from "../../repositories/interfaces"
import {EstablishmentRepository} from "../../repositories/implementation/EstablishmentRepository"

export class EstablishmentService {
    private establishmentRepository: EstablishmentRepositoryInterface
    constructor() {
        this.establishmentRepository = new EstablishmentRepository()
    }

    async createEstablishment(userId: string, name: string, address: string, category: string, description: string, images: string, mainImage: string, workingHours: string, daysOpen: string, phone: string): Promise<Establishment> {
        const establishmentData = {name, address, category, description, userId, images, mainImage, workingHours, daysOpen, phone}
        const newEstablishment = await this.establishmentRepository.create(establishmentData)
        return newEstablishment
    }

    async getEstablishment(id: string): Promise<Establishment | null> {
        const establishment = await this.establishmentRepository.get(id)
        return establishment
    }

    async getEstablishments(): Promise<Establishment[]> {
        const establishments = await this.establishmentRepository.getAll()
        return establishments
    }

    async updateRating(id: string, newRating: number): Promise<void> {
        let establishment = await this.getEstablishment(id)
        if (!establishment) {
            return
        }
        const oldRating = establishment.rating
        const numberOfReviews = establishment.numberOfReviews
        const newGeneralRating = ((oldRating * numberOfReviews) + newRating) / (numberOfReviews + 1);

        await this.establishmentRepository.updateRatingOnDb(id, newGeneralRating)
    }
}
