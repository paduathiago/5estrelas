import { EstablishmentService } from '../establishmentService';

export const establishmentService = new EstablishmentService();

test('Establishment is created correctly', async () => {
    const establishment = await establishmentService.createEstablishment(
        '750', 'test-name', 'test-address', 'test-category',
        'test-description', 'test-images', 'test-mainImage',
        'test-workingHours', 'test-daysOpen', 'test-phone');
    expect(establishment.name).toBe('test-name');
})

describe('EstablishmentService', () => {
    test('Invalid establishment id returns null', async () => {
        const establishmentCreated = await establishmentService.createEstablishment(
            '750', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone');
        await establishmentService.deleteEstablishment(establishmentCreated.id)
        const establishment = await establishmentService.getEstablishment(establishmentCreated.id);
        expect(establishment).toBe(null);
    });

    test('Get all establishments', async () => {
        const establishments = await establishmentService.getEstablishments('1');
        expect(establishments.length).toBeGreaterThan(0);
    });

    test('Rating is updated correctly', async () => {
        const establishment = await establishmentService.createEstablishment(
            '750', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone');
        await establishmentService.updateRating(establishment.id, 5);
        await establishmentService.updateRating(establishment.id, 3);
        await establishmentService.updateRating(establishment.id, 3);
        await establishmentService.updateRating(establishment.id, 1);

        const establishmentUpdated = await establishmentService.getEstablishment(establishment.id);
        expect(establishmentUpdated?.rating).toBe(3);
    });

});