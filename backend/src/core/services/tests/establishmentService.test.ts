import test, { afterEach, beforeEach } from 'node:test';
import { EstablishmentService } from '../establishmentService';

export const establishmentService = new EstablishmentService();

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
        const establishment = await establishmentService.getEstablishment('1');
        expect(establishment?.name).toBe('test-name');
    });

    test('Invalid establishment id returns null', async () => {
        const establishment = await establishmentService.getEstablishment('2');
        expect(establishment).toBe(null);
    });

    test('Get all establishments', async () => {
        await establishmentService.createEstablishment(
            '996', 'test-name996', 'test-address996', 'test-category996',
            'test-description996', 'test-images996', 'test-mainImage996',
            'test-workingHours996', 'test-daysOpen996', 'test-phone996');

        await establishmentService.createEstablishment(
            '996', 'test-name996', 'test-address996', 'test-category996',
            'test-description996', 'test-images996', 'test-mainImage996',
            'test-workingHours996', 'test-daysOpen996', 'test-phone996');

        const establishments = await establishmentService.getEstablishments();
        expect(establishments.length).toBe(3);
        expect(establishments[0].name).toBe('test-name');
        expect(establishments[1].name).toBe('test-name996');
        expect(establishments[2].name).toBe('test-name996');

        await establishmentService.deleteEstablishment('996');
        await establishmentService.deleteEstablishment('3');
    });

    test('Rating is updated correctly', async () => {
        await establishmentService.updateRating('1', 5);
        await establishmentService.updateRating('1', 3);
        await establishmentService.updateRating('1', 3);
        await establishmentService.updateRating('1', 1);

        const establishment = await establishmentService.getEstablishment('1');
        expect(establishment?.rating).toBe(3);
    });

});