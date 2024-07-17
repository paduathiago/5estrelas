import { Review } from '../../core/entities';
import { database } from '../database';
import { ReviewRepositoryInterface } from '../interfaces';
import sqlite3 from 'sqlite3';

export class ReviewRepository implements ReviewRepositoryInterface {
    private db: sqlite3.Database;

    constructor() {
        this.db = database;

        this.db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        establishmentId TEXT NOT NULL,
        rating INTEGER  NOT NULL,
        comment TEXT,
        establishmentResponse TEXT,
        timestamp DATETIME NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL
      )
    `);
    }

    async create(reviewData: { userId: string; establishmentId: string; rating: number; comment: string; timestamp: Date; likes: number; dislikes: number }): Promise<Review> {
        const { userId, establishmentId, rating, comment, timestamp, likes, dislikes } = reviewData;
        return new Promise<Review>((resolve, reject) => {
            this.db.run(
                'INSERT INTO reviews (userId, establishmentId, rating, comment, timestamp, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, establishmentId, rating, comment, timestamp, likes, dislikes],
                function (err) {
                    if (err) {
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
                        reject(err);
                    } else {
                        resolve(row as Review | null);
                    }
                }
            );
        });
    }

    async getReviewsByEstablishmentId(establishmentId: string): Promise<Review[]> {
        return new Promise<Review[]>((resolve, reject) => {
            this.db.all(
                'SELECT * FROM reviews WHERE establishmentId = ?',
                [establishmentId],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        const reviews: Review[] = rows.map((row: any) => row as Review);
                        resolve(reviews);
                    }
                }
            );
        });
    }

    async delete(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(
                'DELETE FROM reviews WHERE id = ?',
                [id],
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
}