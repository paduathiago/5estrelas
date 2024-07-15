import { ReviewService } from "../reviewService";

export const reviewService = new ReviewService();

test('Review created returns the correct review', async () => {
    const review = await reviewService.createReview('1','2',3,'teste');
    expect(review?.comment).toBe('teste');
})

test('Getting review', async () => {
    const review = await reviewService.getReview('1');
    expect(review?.comment).toBe('Muito bom restaurante');
})

test('Deleting review that does not exist.', async () => {
   
    try {
        expect(await reviewService.deleteReview('undefined','1')).toBe("Review não encontrada")
    } catch (error: any) {
        expect(error.message).toBe("Review não encontrada");
    }

})

test('User trying to delete another users review', async () => {
    try {
        expect(await reviewService.deleteReview('1','test')).toBe("Usuário não autorizado")
    } catch (error: any) {
        expect(error.message).toBe("Usuário não autorizado");
    }
})

test('Getting reviews of an establishment', async () => {
    const reviews = await reviewService.getReviewsByEstablishmentId('1');
    expect(reviews.length).toBe(5);
})

test('Getting detailed reviews of an establishment', async () => {
    const reviews = await reviewService.getReviewsFromEstablishment('1','1');
    expect(reviews.length).toBe(5);
})