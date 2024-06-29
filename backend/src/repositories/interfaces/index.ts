import { User } from '../../core/entities';
import { Establishment } from '../../core/entities';
import { Review } from '../../core/entities';
import { Comment } from '../../core/entities';

export interface UserRepositoryInterface {
    create(userData: { name: string; email: string, password: string }): Promise<User>;
    get(id: string): Promise<User | null>;
}

export interface EstablishmentRepositoryInterface {
    create(establishmentData: { name: string; address: string; category: string; description: string }): Promise<Establishment>;
    get(id: string): Promise<Establishment | null>;
    updateRating(id: string, newRating: number): Promise<Establishment | null>;
}

export interface ReviewRepositoryInterface {
    create(reviewData: { userId: string; establishmentId: string; rating: number; comment?: string; timestamp: Date; likes: number; dislikes: number }): Promise<Review>;
    get(id: string): Promise<Review | null>;
    updateLike(id: string, amountOfLikes: number): Promise<Review | null>;
    updateDislike(id: string, amountOfDislikes: number): Promise<Review | null>;
}

export interface CommentRepositoryInterface {
    create(commentData: { reviewId: string; comment: string; timestamp: Date }): Promise<Comment>;
    get(id: string): Promise<Comment | null>;
}