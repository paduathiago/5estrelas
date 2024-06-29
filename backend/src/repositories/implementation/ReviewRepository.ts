import { Review } from '../../core/entities';
import { ReviewRepositoryInterface } from '../interfaces';
import sqlite3 from 'sqlite3';

export class ReviewRepository implements ReviewRepositoryInterface {
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
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        establishmentId TEXT NOT NULL,
        rating INTEGER  NOT NULL,
        comment TEXT,
        timestamp DATETIME NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL
      )
    `);
    }

    async create(reviewData: { userId: string; establishmentId: string, rating: number; comment?: string, timestamp: Date, likes: number, dislikes: number }): Promise<Review> {
        const { userId, establishmentId, rating, comment, timestamp, likes, dislikes } = reviewData;
        return new Promise<Review>((resolve, reject) => {
            this.db.run(
                'INSERT INTO reviews (userId, establishmentId, rating, comment, timestamp, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, establishmentId, rating, comment, timestamp, likes, dislikes],
                function (err) {
                    if (err) {
                        console.error('Error inserting Review:', err.message);
                        reject(err);
                    } else {
                        const newReview: Review = {
                            id: this.lastID.toString(),
                            userId,
                            establishmentId,
                            rating,
                            comment,
                            timestamp,
                            likes,
                            dislikes
                        }
                        resolve(newReview);
                    }
                }
            );
        });
    }

    async get(id: string): Promise<Review | null> {
        return new Promise<Review | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM reviews WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        console.error('Error fetching Review by id:', err.message);
                        reject(err);
                    } else {
                        resolve(row as Review | null) ;
                    }
                }
            );
        });
    }

    async updateLike(id: string, amountOfLikes: number): Promise<Review | null> {
        return new Promise<Review | null>((resolve, reject) => {
            this.db.run(
                'UPDATE reviews SET likes = ? WHERE id = ?',
                [amountOfLikes, id],
                function (err) {
                    if (err) {
                        console.error('Error updating review likes', err.message);
                        reject(err);
                    } else {
                        // Simplesmente resolve com null após a atualização bem-sucedida
                        resolve(null);
                    }
                }
            );
        });
    }

    async updateDislike(id: string, amountOfDislikes: number): Promise<Review | null> {
        return new Promise<Review | null>((resolve, reject) => {
            this.db.run(
                'UPDATE reviews SET likes = ? WHERE id = ?',
                [amountOfDislikes, id],
                function (err) {
                    if (err) {
                        console.error('Error updating review likes', err.message);
                        reject(err);
                    } else {
                        // Simplesmente resolve com null após a atualização bem-sucedida
                        resolve(null);
                    }
                }
            );
        });
    }
}