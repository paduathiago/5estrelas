import { User } from '../../core/entities';
import { Establishment } from '../../core/entities';
import { Review } from '../../core/entities';
import { ReviewFeedback } from '../../core/entities';
import { Comment } from '../../core/entities';


export interface UserRepositoryInterface {
    create(userData: { name: string; email: string, password: string, image: string }): Promise<User>;
    get(id: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    addEstablishmentToFavorites(userId: string, establishmentId: string): Promise<User | null>;
    getFavoriteEstablishments(userId: string): Promise<Establishment[]>;
    removeEstablishmentFromFavorites(userId: string, establishmentId: string): Promise<void>;
    getUserEstablishments(userId: string): Promise<Establishment[]>;
}

export interface EstablishmentRepositoryInterface {
    create(establishmentData: { name: string; address: string; category: string; description: string, userId: string }): Promise<Establishment>;
    get(id: string): Promise<Establishment | null>;
    getAll(): Promise<Establishment[]>;
    updateRatingOnDb(id: string, newRating: number): Promise<void>;
}

export interface ReviewRepositoryInterface {
    create(reviewData: { userId: string; establishmentId: string; rating: number; comment?: string; timestamp: Date; likes: number; dislikes: number }): Promise<Review>;
    get(id: string): Promise<Review | null>;
    delete(id: string): Promise<void>;
    getReviewsByEstablishmentId(establishmentId: string): Promise<Review[]>;
    updateLike(id: string, amountOfLikes: number): Promise<Review | null>;
    updateDislike(id: string, amountOfDislikes: number): Promise<Review | null>;
}

export interface ReviewFeedbackRepositoryInterface {
    create(reviewFeedbacktData: { userId: string, reviewId: string; feedback: 'LIKE' | 'DISLIKE'}): Promise<ReviewFeedback>;
    get(userId: string, reviewId: string): Promise<ReviewFeedback | null>;
}

export interface CommentRepositoryInterface {
    create(commentData: { reviewId: string; comment: string; timestamp: Date }): Promise<Comment>;
    get(id: string): Promise<Comment | null>;
    getCommentsByReview(reviewId: string): Promise<Comment[]>;
}