import { Establishment, User } from "../../entities";
import { EstablishmentService } from "../establishmentService";
import { UserService } from "../userService";

export const userService = new UserService();
export const establishmentService = new EstablishmentService();


describe('User Service Tests', () => {
    let testUser: User;

    beforeAll(async () => {
        testUser = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    });

    test('User created returns the correct user', async () => {
        expect(testUser.image).toBe('test-image');
    });

    test('Inserting inexistent id does not return a user', async () => {
        const user = await userService.getUser('inexistentId');
        expect(user).toBe(undefined);
    });

    test('Getting user by email', async () => {
        const user = await userService.getUserByEmail('testemail@email.com');
        expect(user?.email).toBe("testemail@email.com");
    });

    test('Invalid email does not return a user', async () => {
        const user = await userService.getUserByEmail('testemailnaoexiste@email.com');
        expect(user).toBe(undefined);
    });
});

describe('Establishment Service Tests', () => {
    let testUser: User;
    let establishmentCreated: Establishment;

    beforeAll(async () => {
        testUser = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
        establishmentCreated = await establishmentService.createEstablishment(
            testUser.id, 'test-name', 'test-address', 'test-category',
            'test-description', 'test-images', 'test-mainImage',
            'test-workingHours', 'test-daysOpen', 'test-phone'
        );
    });

    test('Getting establishment that was added to favorites', async () => {
        await userService.addEstablishmentToFavorites(testUser.id, establishmentCreated.id);
        const establishment = await userService.getFavoriteEstablishments(testUser.id);
        expect(establishment[0].id).toBe(parseInt(establishmentCreated.id));
    });

    test('Establishment removed from favorites not found', async () => {
        await userService.addEstablishmentToFavorites(testUser.id, establishmentCreated.id);
        await userService.removeEstablishmentFromFavorites(testUser.id, establishmentCreated.id);
        const establishment = await userService.getFavoriteEstablishments(testUser.id);
        expect(establishment.length).toBe(0);
    });

    test('Getting user establishments', async () => {
        const establishments = await userService.getUserEstablishments(testUser.id);
        expect(establishments.length).toBe(1);
        expect(establishments[0].name).toBe('test-name');
    });
});
