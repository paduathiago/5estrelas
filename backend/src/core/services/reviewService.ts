import { Review } from '../entities';
import { ReviewRepositoryInterface } from '../../repositories/interfaces';
import { ReviewRepository } from '../../repositories/implementation/ReviewRepository';

export class ReviewService {
    private reviewRepository: ReviewRepositoryInterface
    constructor() {
        this.reviewRepository = new ReviewRepository()
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
}
