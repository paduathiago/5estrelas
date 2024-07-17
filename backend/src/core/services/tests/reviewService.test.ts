import { EstablishmentService } from "../establishmentService";
import { ReviewService } from "../reviewService";
import { UserService } from "../userService";

export const reviewService = new ReviewService();
export const establishmentService = new EstablishmentService();
export const userService = new UserService();

describe('Review Service Tests', () => {
    test('Review created returns the correct review', async () => {
        const review = await reviewService.createReview('1', '2', 3, 'teste');
        expect(review?.comment).toBe('teste');
    });

    test('Getting review', async () => {
        const reviewCreated = await reviewService.createReview('1', '2', 3, 'Muito bom restaurante');
        const review = await reviewService.getReview(reviewCreated.id);
        expect(review?.comment).toBe('Muito bom restaurante');
    });

    test('Deleting review that does not exist', async () => {
        try {
            expect(await reviewService.deleteReview('undefined', '1')).toBe("Review não encontrada");
        } catch (error: any) {
            expect(error.message).toBe("Review não encontrada");
        }
    });

    test('User trying to delete another user\'s review', async () => {
        try {
            expect(await reviewService.deleteReview('1', 'test')).toBe("Usuário não autorizado");
        } catch (error: any) {
            expect(error.message).toBe("Usuário não autorizado");
        }
    });

    test('User trying to delete his review', async () => {
        const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
        const establishment = await establishmentService.createEstablishment(
            '750', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone'
        );

        const reviewCreated = await reviewService.createReview(userCreated.id, establishment.id, 3, 'Muito bom restaurante');

        expect(async () => {
            await reviewService.deleteReview(reviewCreated.id, userCreated.id);
        }).not.toThrow();
    });

    test('Getting reviews of an establishment', async () => {
        const establishmentCreated = await establishmentService.createEstablishment(
            '750', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone'
        );
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        const reviews = await reviewService.getReviewsByEstablishmentId(establishmentCreated.id);
        expect(reviews.length).toBe(3);
    });

    test('Getting detailed reviews of an establishment', async () => {
        const establishmentCreated = await establishmentService.createEstablishment(
            '750', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone'
        );
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        await reviewService.createReview('1', establishmentCreated.id, 3, 'Muito bom restaurante');
        const reviews = await reviewService.getReviewsFromEstablishment(establishmentCreated.id, '1');
        expect(reviews.length).toBe(4);
    });
});
