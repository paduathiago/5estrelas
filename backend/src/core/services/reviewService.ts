import { Review, ReviewFeedback, Comment } from '../entities';
import { ReviewRepositoryInterface } from '../../repositories/interfaces';
import { ReviewRepository } from '../../repositories/implementation/ReviewRepository';
import { CommentService } from './commentService';
import { ReviewFeedbackService } from './reviewFeedbackService';

export class ReviewService {
    private reviewRepository: ReviewRepositoryInterface
    private commentService: CommentService
    private reviewFeedbackService: ReviewFeedbackService

    constructor() {
        this.reviewRepository = new ReviewRepository()
        this.commentService = new CommentService()
        this.reviewFeedbackService = new ReviewFeedbackService()
    }

    async createReview(userId: string, establishmentId: string, rating: number, comment: string): Promise<Review> {
        let likes = 0;
        let dislikes = 0;
        let timestamp = new Date();
        const newReview = await this.reviewRepository.create({ userId, establishmentId, rating, comment, timestamp, likes, dislikes})
        return newReview
    }

    async getReview(id: string): Promise<Review | null> {
        const review = await this.reviewRepository.get(id)
        return review
    }

    async deleteReview(id:string, userId: string): Promise<void> {
        const review = await this.getReview(id);
        if(!review) {
            throw new Error('Review não encontrada');
        }
        if (review.userId != userId) {
            throw new Error('Usuário não autorizado');
        } else {
            await this.reviewRepository.delete(id);
        }
    }

    async updateLike(id: string, reviewFeedback: ReviewFeedback): Promise<Review | null> {
        const currentReview = await this.getReview(id);
        if (!currentReview) {
            return null; 
        }
        
        const currentLikes = currentReview.likes;
        const updatedReview = await this.reviewRepository.updateLike(id,currentLikes+1)
        return updatedReview;
    }

    async updateDislike(id: string, reviewFeedback: ReviewFeedback): Promise<Review | null> {
        const currentReview = await this.getReview(id);
        if (!currentReview) {
            return null; 
        }
        
        const currentDislikes = currentReview.dislikes;
        const updatedReview = await this.reviewRepository.updateDislike(id,currentDislikes+1)
        return updatedReview;
    }

    async getReviewsByEstablishmentId(establishmentId: string): Promise<Review[]> {
        const reviews: Review[] = await this.reviewRepository.getReviewsByEstablishmentId(establishmentId);
        return reviews;
    }

    async getReviewsFromEstablishment(establishmentId: string, userId: string): Promise<Review[]> {
        const reviews = await this.getReviewsByEstablishmentId(establishmentId);
            const reviewsWithDetails: Review[] = await Promise.all(reviews.map(async (review) => {
            const comments = await this.commentService.getCommentsByReview(review.id);
            const userFeedback = await this.reviewFeedbackService.getReviewFeedback(userId,review.id);
            
            return {
                ...review,
                comments,
                userFeedback
            };
        }));
    
        return reviewsWithDetails;
    }
}
