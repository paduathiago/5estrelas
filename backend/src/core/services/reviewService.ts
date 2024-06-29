import { Review } from '../entities';
import { ReviewRepositoryInterface } from '../../repositories/interfaces';
import { ReviewRepository } from '../../repositories/implementation/ReviewRepository';
import { ReviewFeedback } from '../entities';
import { ReviewFeedbackRepositoryInterface } from '../../repositories/interfaces';
import { ReviewFeedbackRepository } from '../../repositories/implementation/ReviewFeedbackRepository';

export class ReviewService {
    private reviewRepository: ReviewRepositoryInterface
    private reviewFeedbackRepository: ReviewFeedbackRepositoryInterface
    constructor() {
        this.reviewRepository = new ReviewRepository()
        this.reviewFeedbackRepository = new ReviewFeedbackRepository()
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
}
