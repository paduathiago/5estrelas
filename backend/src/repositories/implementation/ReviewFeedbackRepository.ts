import { Review, ReviewFeedback } from '../../core/entities';
import { ReviewFeedbackRepositoryInterface } from '../interfaces';
import sqlite3 from 'sqlite3';

export class ReviewFeedbackRepository implements ReviewFeedbackRepositoryInterface {
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

    async create(reviewFeedbackData: { userId: string; reviewId: string; feedback: 'LIKE' | 'DISLIKE'}): Promise<ReviewFeedback> {
        const { userId, reviewId, feedback } = reviewFeedbackData;
        return new Promise<ReviewFeedback>((resolve, reject) => {
            this.db.run(
                'INSERT INTO reviewFeedbacks (userId, reviewId, feedback) VALUES (?, ?, ?)',
                [userId, reviewId, feedback],
                function (err) {
                    if (err) {
                        console.error('Error inserting comment:', err.message);
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

    async get(id: string): Promise<ReviewFeedback | null> {
        return new Promise<ReviewFeedback | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM comments WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        console.error('Error fetching reviewFeedback by id:', err.message);
                        reject(err);
                    } else {
                        resolve(row as ReviewFeedback | null) ;
                    }
                }
            );
        });
    }

    async getFeedbacksByReview(reviewId: string): Promise<ReviewFeedback[]> {
        return new Promise<ReviewFeedback[]>((resolve, reject) => {
            this.db.all(
                'SELECT * FROM review_feedbacks WHERE reviewId = ?',
                [reviewId],
                (err, rows) => {
                    if (err) {
                        console.error('Error fetching review feedbacks by reviewId:', err.message);
                        reject(err);
                    } else {
                        const feedbacks: ReviewFeedback[] = rows.map((row: any) => row as ReviewFeedback);
                        resolve(feedbacks);
                    }
                }
            );
        });
    }
}