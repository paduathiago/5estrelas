import test, { afterEach, beforeEach } from 'node:test';
import { EstablishmentService } from '../establishmentService';

export const establishmentService = new EstablishmentService();

test('Establishment is created correctly', async () => {
    const establishment = await establishmentService.createEstablishment(
        '750', 'test-name', 'test-address', 'test-category',
        'test-description', 'test-images', 'test-mainImage',
        'test-workingHours', 'test-daysOpen', 'test-phone');
    expect(establishment.name).toBe('test-name');
    await establishmentService.deleteEstablishment('750');
});

describe('EstablishmentService', () => {

    beforeEach(async () => {
        await establishmentService.createEstablishment(
            '995', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone');
    });

    afterEach(async () => {
        await establishmentService.deleteEstablishment('995');
    });

    test('Get establishment by id', async () => {
        const establishment = await establishmentService.getEstablishment('995');
        expect(establishment?.name).toBe('test-name');
    });

    test('Invalid establishment id returns null', async () => {
        const establishment = await establishmentService.getEstablishment('2');
        expect(establishment).toBe(null);
    });

    test('Get all establishments', async () => {
        await establishmentService.createEstablishment(
            '996', 'test-name998', 'test-address998', 'test-category998',
            'test-description998', 'test-images998', 'test-mainImage998',
            'test-workingHours998', 'test-daysOpen998', 'test-phone998');

        await establishmentService.createEstablishment(
            '996', 'test-name996', 'test-address996', 'test-category996',
            'test-description996', 'test-images996', 'test-mainImage996',
            'test-workingHours996', 'test-daysOpen996', 'test-phone996');

        const establishments = await establishmentService.getEstablishments();
        expect(establishments[0].name).toBe('test-name');
        expect(establishments[1].name).toBe('test-name998');
        expect(establishments[2].name).toBe('test-name996');

        await establishmentService.deleteEstablishment('996');
        await establishmentService.deleteEstablishment('998');
    });

    test('Rating is updated correctly', async () => {
        await establishmentService.updateRating('995', 5);
        await establishmentService.updateRating('995', 3);
        await establishmentService.updateRating('995', 3);
        await establishmentService.updateRating('995', 1);

        const establishment = await establishmentService.getEstablishment('995');
        expect(establishment?.rating).toBe(3);
    });

});