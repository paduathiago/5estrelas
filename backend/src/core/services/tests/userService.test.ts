import { EstablishmentService } from "../establishmentService";
import { UserService } from "../userService";

export const userService = new UserService();
export const establishmentService = new EstablishmentService();

test('User created returns the correct user', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    expect(userCreated.image).toBe('test-image');
})

test('Inserting random id doesnt return an user', async () => {
    const userCreated = await userService.getUser('randomId');
    expect(userCreated).toBe(undefined);
})

test('Getting user by email', async () => {
    const user = await userService.getUserByEmail('testemail@email.com');
    expect(user?.email).toBe("testemail@email.com");
})

test('Invalid email doesnt return an user', async () => {
    const user = await userService.getUserByEmail('testemailnaoexiste@email.com');
    expect(user?.email).toBe(undefined);
})

test('Getting establishment that was added to favorites', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    const establishmentCreated = await establishmentService.createEstablishment(
        '750', 'test-name', 'test-address', 'test-category',
        'test-description', 'test-images', 'test-mainImage',
        'test-workingHours', 'test-daysOpen', 'test-phone');
    await userService.addEstablishmentToFavorites(userCreated.id, establishmentCreated.id);
    const establishment = await userService.getFavoriteEstablishments(userCreated.id)
    expect(establishment[0].id).toBe(parseInt(establishmentCreated.id))
})

test('Establishment removed from favorites not found', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    await userService.addEstablishmentToFavorites(userCreated.id, "10");
    await userService.removeEstablishmentFromFavorites(userCreated.id, "10");
    const establishment = await userService.getFavoriteEstablishments(userCreated.id)
    expect(establishment.length).toBe(0)
})

test('Getting users establishments', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    const establishment = await userService.getUserEstablishments(userCreated.id)
    expect(establishment.length).toBe(0)
})
