import { UserService } from "../userService";

export const userService = new UserService();

test('User created returns the correct user', async () => {
    const userCreated = await userService.createUser('test-user', 'testemail@email.com', 'test-password', 'test-image');
    expect(userCreated.image).toBe('test-image');
})

test('User created returns the correct user', async () => {
    const userCreated = await userService.getUser('randomId');
    expect(userCreated).toBe(undefined);
})