import sqlite3 from 'sqlite3';

const databasePath = process.env.NODE_ENV === 'test' ? './test.db' : './database.db';

export const database = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
        throw err;
    }
});