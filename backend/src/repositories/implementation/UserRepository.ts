import { Establishment, User } from '../../core/entities';
import { database } from '../database';
import { UserRepositoryInterface } from '../interfaces';
import sqlite3 from 'sqlite3';

export class UserRepository implements UserRepositoryInterface {
    private db: sqlite3.Database;

    constructor() {
        this.db = database;

        this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        image TEXT
      )
    `);

        this.db.run(`
        CREATE TABLE IF NOT EXISTS user_favorite_establishments (
            userId INTEGER,
            establishmentId INTEGER,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (establishmentId) REFERENCES establishments(id)
        )
    `);
    }

    async create(userData: { name: string; email: string; password: string; image: string }): Promise<User> {
        const { name, email, password, image } = userData;
        return new Promise<User>((resolve, reject) => {
            this.db.run(
                'INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)',
                [name, email, password, image],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        const newUser: User = {
                            id: this.lastID.toString(),
                            name,
                            email,
                            password,
                            image,
                            favoriteEstablishments: []
                        }
                        resolve(newUser);
                    }
                }
            );
        });
    }

    async get(id: string): Promise<User | null> {
        return new Promise<User | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM users WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row as User | null);
                    }
                }
            );
        });
    }

    async getByEmail(email: string): Promise<User | null> {
        return new Promise<User | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row as User | null);
                    }
                }
            );
        });
    }

    async addEstablishmentToFavorites(userId: string, establishmentId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(
                'INSERT INTO user_favorite_establishments (userId, establishmentId) VALUES (?, ?)',
                [userId, establishmentId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    async getFavoriteEstablishments(userId: string): Promise<Establishment[]> {
        return new Promise<Establishment[]>((resolve, reject) => {
            this.db.all(
                `SELECT e.* 
                 FROM establishments e
                 INNER JOIN user_favorite_establishments ufe ON e.id = ufe.establishmentId
                 WHERE ufe.userId = ?`,
                [userId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows as Establishment[]);
                    }
                }
            );
        });
    }

    async removeEstablishmentFromFavorites(userId: string, establishmentId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(
                'DELETE FROM user_favorite_establishments WHERE userId = ? AND establishmentId = ?',
                [userId, establishmentId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    async getUserEstablishments(userId: string): Promise<Establishment[]> {
        return new Promise<Establishment[]>((resolve, reject) => {
            this.db.all(
                'SELECT * FROM establishments WHERE userId = ?',
                [userId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows as Establishment[]);
                    }
                }
            );
        });
    }

}
