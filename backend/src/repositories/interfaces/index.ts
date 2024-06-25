import { User } from '../../core/entities';

export interface UserRepositoryInterface {
    create(userData: { name: string; email: string }): Promise<User>;
    get(id: string): Promise<User | null>;
}
