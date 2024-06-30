import { User } from '../entities';
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

    async addEstablishmentToFavorites(userId: string, establishmentId: string): Promise<User | null> {
        const user = await this.userRepository.addEstablishmentToFavorites(userId, establishmentId)
        return user
    }