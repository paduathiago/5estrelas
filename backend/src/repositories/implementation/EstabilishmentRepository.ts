import { Establishment } from "../../core/entities";
import { EstablishmentRepositoryInterface } from "../../repositories/interfaces";
import sqlite3 from 'sqlite3';

export class EstablishmentRepository implements EstablishmentRepositoryInterface {
    private db: sqlite3.Database;

    constructor() {
        this.db = new sqlite3.Database('./database.db', (err) => {
            if (err) {
                console.error('Error opening SQLite database:', err.message);
                throw err;
            }
            console.log('Connected to SQLite database');
        });

        this.db.run(`
      CREATE TABLE IF NOT EXISTS establishments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);
    }

    async create(establishmentData: { name: string; address: string; category: string; description: string }): Promise<Establishment> {
        const { name, address, category, description } = establishmentData;
        return new Promise<Establishment>((resolve, reject) => {
            this.db.run(
                'INSERT INTO establishments (name, address, category, description) VALUES (?, ?, ?, ?)',
                [name, address, category, description],
                function (err) {
                    if (err) {
                        console.error('Error inserting establishment:', err.message);
                        reject(err);
                    } else {
                        const newEstablishment: Establishment = {
                            id: this.lastID.toString(),
                            name,
                            address,
                            category,
                            description,
                            rating: 0,
                            numberOfReviews: 0
                        }
                        resolve(newEstablishment);
                    }
                }
            );
        });
    }

    async get(id: string): Promise<Establishment | null> {
        return new Promise<Establishment | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM establishments WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        console.error('Error fetching establishment by id:', err.message);
                        reject(err);
                    } else {
                        resolve(row as Establishment | null);
                    }
                }
            );
        });
    }

    async updateRating(id: string, newRating: number): Promise<Establishment | null> {
        return new Promise<Establishment | null>((resolve, reject) => {
            this.db.get('SELECT rating, numberOfReviews, FROM establishments WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error('Error fetching establishment rating:', err.message);
                    reject(err);
                    return;
                }
                if (!row) {
                    reject(new Error('Establishment not found'));
                    return;
                }

                const oldRating = row.rating;
                const numberOfReviews = row.numberOfReviews;
                const newGeneralRating = oldRating * numberOfReviews + newRating / (numberOfReviews + 1);
                this.db.run(
                    'UPDATE establishments SET rating = ?, numberOfReviews = ? WHERE id = ?',
                    [newGeneralRating, numberOfReviews + 1, id],
                    function (err) {
                        if (err) {
                            console.error('Error updating establishment rating:', err.message);
                            reject(err);
                        } else {
                            resolve(row as Establishment | null);
                        }
                    }
                );
            });
        });
    }
}