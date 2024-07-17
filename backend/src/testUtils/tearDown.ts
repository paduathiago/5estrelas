import * as fs from 'fs';

export default async function () {
    fs.unlink('./test.db', (err => {
        if (!err) console.log("\nDeleted test database");
    }))
}