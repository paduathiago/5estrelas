import { ReviewFeedback } from '../entities';
import { ReviewFeedbackRepositoryInterface } from '../../repositories/interfaces';
import { ReviewFeedbackRepository } from '../../repositories/implementation/ReviewFeedbackRepository';

export class ReviewFeedbackService {
    private reviewFeedbackRepository: ReviewFeedbackRepositoryInterface
    constructor() {
        this.reviewFeedbackRepository = new ReviewFeedbackRepository()
    }

    async createReviewFeedback(userId: string, reviewId: string, feedback: 'LIKE' | 'DISLIKE'): Promise<ReviewFeedback> {
        const newReviewFeedback = await this.reviewFeedbackRepository.create({ userId, reviewId, feedback })
        return newReviewFeedback
    }

    async getReviewFeedback(userId: string, reviewId: string): Promise<ReviewFeedback | null> {
        const reviewFeedback = await this.reviewFeedbackRepository.get(userId, reviewId)
        return reviewFeedback
    }

}