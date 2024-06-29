import {Establishment} from '../entities'
import {EstablishmentRepositoryInterface} from "../../repositories/interfaces/"
import {EstablishmentRepository} from "../../repositories/implementation/EstabilishmentRepository"

export class EstablishmentService {
    private establishmentRepository: EstablishmentRepositoryInterface
    constructor() {
        this.establishmentRepository = new EstablishmentRepository()
    }

    async createEstablishment(name: string, address: string, category: string, description: string): Promise<Establishment> {
        const newEstablishment = await this.establishmentRepository.create({ name, address, category, description })
        return newEstablishment
    }

    async getEstablishment(id: string): Promise<Establishment | null> {
        const establishment = await this.establishmentRepository.get(id)
        return establishment
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