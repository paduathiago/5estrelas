import { ReviewFeedbackService } from "../reviewFeedbackService";
import { ReviewService } from "../reviewService";

export const reviewFeedbackService = new ReviewFeedbackService();
export const reviewService = new ReviewService();

describe('Review Feedback Service Tests', () => {
    test('Review feedback with Like created returns the correct review feedback', async () => {
        const review = await reviewService.createReview('1', '2', 3, 'teste');
        const reviewFeedback = await reviewFeedbackService.createReviewFeedback('1', review.id, 'LIKE');
        expect(reviewFeedback.feedback).toBe('LIKE');
    });

    test('Review feedback with Dislike created returns the correct review feedback', async () => {
        const review = await reviewService.createReview('1', '2', 3, 'teste');
        const reviewFeedback = await reviewFeedbackService.createReviewFeedback('1', review.id, 'DISLIKE');
        expect(reviewFeedback.feedback).toBe('DISLIKE');
    });

    test('Get correct review feedback', async () => {
        const review = await reviewService.createReview('1', '2', 3, 'teste');
        await reviewFeedbackService.createReviewFeedback('1', review.id, 'LIKE');
        const reviewFeedbackCreated = await reviewFeedbackService.getReviewFeedback('1', review.id);
        expect(reviewFeedbackCreated?.feedback).toBe('LIKE');
    });
});
