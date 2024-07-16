import test, { beforeEach } from 'node:test';
import { EstablishmentService } from '../establishmentService';

export const establishmentService = new EstablishmentService();

describe('EstablishmentService', () => {

    beforeEach(async () => {
        await establishmentService.createEstablishment(
            '1', 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone');
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
            '2', 'test-name2', 'test-address2', 'test-category2',
            'test-description2', 'test-images2', 'test-mainImage2',
            'test-workingHours2', 'test-daysOpen2', 'test-phone2');

        await establishmentService.createEstablishment(
            '3', 'test-name3', 'test-address3', 'test-category3',
            'test-description3', 'test-images3', 'test-mainImage3',
            'test-workingHours3', 'test-daysOpen3', 'test-phone3');

        const establishments = await establishmentService.getEstablishments();
        expect(establishments.length).toBe(3);
        expect(establishments[0].name).toBe('test-name');
        expect(establishments[1].name).toBe('test-name2');
        expect(establishments[2].name).toBe('test-name3');
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