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

    async create(reviewData: { userId: string; establishmentId: string; rating: number; comment: string; timestamp: Date; likes: number; dislikes: number }): Promise<Review> {
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

    async getReviewsByEstablishmentId(establishmentId: string): Promise<Review[]> {
        return new Promise<Review[]>((resolve, reject) => {
            this.db.all(
                'SELECT * FROM reviews WHERE establishmentId = ?',
                [establishmentId],
                (err, rows) => {
                    if (err) {
                        console.error('Error fetching Reviews by establishmentId:', err.message);
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
                function(err) {
                    if (err) {
                        console.error('Error deleting Review by id:', err.message);
                        reject(err);
                    } else {
                        console.log(`Deleted review with id ${id}`);
                        resolve();
                    }
                }
            );
        });
    }

    async updateLike(id: string, amountOfLikes: number): Promise<Review | null> {
        return new Promise<Review | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM reviews WHERE id = ?',
                [id],
                (err, row: Review) => { 
                    if (err) {
                        console.error('Error retrieving review', err.message);
                        reject(err);
                    } else {
                        if (!row) {
                            resolve(null);
                        } else {
                            this.db.run(
                                'UPDATE reviews SET likes = ? WHERE id = ?',
                                [amountOfLikes, id],
                                (err) => {
                                    if (err) {
                                        console.error('Error updating review likes', err.message);
                                        reject(err);
                                    } else {
                                        this.db.get(
                                            'SELECT * FROM reviews WHERE id = ?',
                                            [id],
                                            (err, updatedRow: Review) => {
                                                if (err) {
                                                    console.error('Error retrieving updated review', err.message);
                                                    reject(err);
                                                } else {
                                                    if (!updatedRow) {
                                                        resolve(null);
                                                    } else {
                                                        const updatedReview: Review = {
                                                            ...updatedRow, 
                                                            likes: amountOfLikes 
                                                        };
                                                        resolve(updatedReview);
                                                    }
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                }
            );
        });
    }

    async updateDislike(id: string, amountOfDislikes: number): Promise<Review | null> {
        return new Promise<Review | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM reviews WHERE id = ?',
                [id],
                (err, row: Review) => {
                    if (err) {
                        console.error('Error retrieving review', err.message);
                        reject(err);
                    } else {
                        if (!row) {
                            resolve(null);
                        } else {
                            this.db.run(
                                'UPDATE reviews SET dislikes = ? WHERE id = ?',
                                [amountOfDislikes, id],
                                (err) => {
                                    if (err) {
                                        console.error('Error updating review dislikes', err.message);
                                        reject(err);
                                    } else {
                                        this.db.get(
                                            'SELECT * FROM reviews WHERE id = ?',
                                            [id],
                                            (err, updatedRow: Review) => {
                                                if (err) {
                                                    console.error('Error retrieving updated review', err.message);
                                                    reject(err);
                                                } else {
                                                    if (!updatedRow) {
                                                        resolve(null); 
                                                    } else {
                                                        const updatedReview: Review = {
                                                            ...updatedRow,
                                                            dislikes: amountOfDislikes
                                                        };
                                                        resolve(updatedReview);
                                                    }
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                }
            );
        });
    }
}