import { ReviewFeedback } from '../../core/entities';
import { database } from '../database';
import { ReviewFeedbackRepositoryInterface } from '../interfaces';
import sqlite3 from 'sqlite3';

export class ReviewFeedbackRepository implements ReviewFeedbackRepositoryInterface {
    private db: sqlite3.Database;

    constructor() {
        this.db = database;

        this.db.run(`
      CREATE TABLE IF NOT EXISTS reviewFeedbacks (
        userId TEXT NOT NULL,
        reviewId TEXT NOT NULL,
        feedback TEXT CHECK (feedback IN ('LIKE', 'DISLIKE')),
        PRIMARY KEY (userId, reviewId),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (reviewId) REFERENCES reviews(id)
        )
    `);
    }

    async create(reviewFeedbackData: { userId: string; reviewId: string; feedback: 'LIKE' | 'DISLIKE' }): Promise<ReviewFeedback> {
        const { userId, reviewId, feedback } = reviewFeedbackData;
        return new Promise<ReviewFeedback>((resolve, reject) => {
            this.db.run(
                'INSERT INTO reviewFeedbacks (userId, reviewId, feedback) VALUES (?, ?, ?)',
                [userId, reviewId, feedback],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        const newReviewFeedback: ReviewFeedback = {
                            userId,
                            reviewId,
                            feedback
                        }
                        resolve(newReviewFeedback);
                    }
                }
            );
        });
    }

    async get(userId: string, reviewId: string): Promise<ReviewFeedback | null> {
        return new Promise<ReviewFeedback | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM reviewFeedbacks WHERE userId = ? AND reviewId = ?',
                [userId, reviewId],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row as ReviewFeedback | null);
                    }
                }
            );
        });
    }
}