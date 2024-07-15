import { UserService } from "../userService";

export const userService = new UserService();

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

test('Getting establishment that was added to favorites', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    await userService.addEstablishmentToFavorites(userCreated.id,"10");
    const establishment = await userService.getFavoriteEstablishments(userCreated.id)
    expect(establishment[0].id).toBe(10)
})

test('Establishment removed from favorites not found', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    await userService.addEstablishmentToFavorites(userCreated.id,"10");
    await userService.removeEstablishmentFromFavorites(userCreated.id,"10");
    const establishment = await userService.getFavoriteEstablishments(userCreated.id)
    expect(establishment.length).toBe(0)
})

test('Getting users establishments', async() => {
    const user = await userService.getUserByEmail('marianofernandes@email.com');
    const establishment = await userService.getUserEstablishments((user?.id || "1"))
    expect(establishment.length).toBe(10)
})
