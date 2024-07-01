export const KEY = 'secret';
const jwt = require('jsonwebtoken');

export function getUserId(req: any): string | undefined {
    const token = req.headers['authorization'];
    let userId = undefined;
    if (token) {
        jwt.verify(token, 'secret', (err: any, id: string) => {
            if (!err) userId = id;
        });
    }
    return userId;
}