import { Establishment } from '../entities'
import { EstablishmentRepositoryInterface } from "../../repositories/interfaces"
import { EstablishmentRepository } from "../../repositories/implementation/EstablishmentRepository"
import { userService } from '../../adapters/express/controllers/userController'

export class EstablishmentService {
    private establishmentRepository: EstablishmentRepositoryInterface
    constructor() {
        this.establishmentRepository = new EstablishmentRepository()
    }

    async createEstablishment(userId: string, name: string, address: string, category: string, description: string, images: string, mainImage: string, workingHours: string, daysOpen: string, phone: string): Promise<Establishment> {
        const establishmentData = { name, address, category, description, userId, images, mainImage, workingHours, daysOpen, phone }
        const newEstablishment = await this.establishmentRepository.create(establishmentData)
        return newEstablishment
    }

    async getEstablishment(id: string, userId?: string): Promise<Establishment & { isFromUser?: boolean } | null> {
        const establishment = await this.establishmentRepository.get(id)
        if (userId && establishment) {
            const favorites = await userService.getFavoriteEstablishments(userId);
            const favIds = favorites.map(fav => fav.id);
            establishment.favorited = favIds.includes(establishment.id);
        }
        if(!establishment?.id) return null;
        return { ...establishment, isFromUser: establishment?.userId === userId }
    }

    async getEstablishments(userId?: string): Promise<Establishment[]> {
        const establishments = await this.establishmentRepository.getAll()
        if (userId && establishments) {
            const favorites = await userService.getFavoriteEstablishments(userId);
            const favIds = favorites.map(fav => fav.id);
            return establishments.map(establishment => {
                establishment.favorited = favIds.includes(establishment.id);
                return establishment

            });
        }
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

    async deleteEstablishment(id: string): Promise<void> {
        return this.establishmentRepository.delete(id)
    }
}
