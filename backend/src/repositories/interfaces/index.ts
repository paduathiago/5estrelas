import { User } from '../../core/entities';
import { Establishment } from '../../core/entities';

export interface UserRepositoryInterface {
    create(userData: { name: string; email: string }): Promise<User>;
    get(id: string): Promise<User | null>;
}

export interface EstablishmentRepositoryInterface {
    create(establishmentData: { name: string; address: string; category: string; description: string }): Promise<Establishment>;
    get(id: string): Promise<Establishment | null>;
    updateRating(id: string, newRating: number): Promise<Establishment | null>;
}
