import { Establishment, User } from '../entities';
import { UserRepositoryInterface } from '../../repositories/interfaces';
import { UserRepository } from '../../repositories/implementation/UserRepository';

export class UserService {
    private userRepository: UserRepositoryInterface
    constructor() {
        this.userRepository = new UserRepository()
    }

    async createUser(name: string, email: string, password: string, image: string): Promise<User> {
        const newUser = await this.userRepository.create({ name, email, password, image })
        return newUser
    }

    async getUser(id: string): Promise<User | null> {
        const user = await this.userRepository.get(id)
        return user
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.getByEmail(email)
        return user;
    }

    async addEstablishmentToFavorites(userId: string, establishmentId: string): Promise<void> {
        const favorites = await this.getFavoriteEstablishments(userId);
        const favIds = favorites.map(fav => fav.id);
        if (favIds.includes(establishmentId)) return;
        await this.userRepository.addEstablishmentToFavorites(userId, establishmentId);
    }

    async getFavoriteEstablishments(userId: string): Promise<Establishment[]> {
        const establishments = await this.userRepository.getFavoriteEstablishments(userId)
        return establishments.map(establishment => {

            establishment.favorited = true;
            return establishment

        });
    }

    async removeEstablishmentFromFavorites(userId: string, establishmentId: string): Promise<void> {
        await this.userRepository.removeEstablishmentFromFavorites(userId, establishmentId)
    }

    async getUserEstablishments(userId: string): Promise<Establishment[]> {
        const establishments = await this.userRepository.getUserEstablishments(userId)
        const favorites = await this.getFavoriteEstablishments(userId);
        const favIds = favorites.map(fav => fav.id);

        return establishments.map(establishment => {
            establishment.favorited = favIds.includes(establishment.id);
            return establishment
        });
    }

}