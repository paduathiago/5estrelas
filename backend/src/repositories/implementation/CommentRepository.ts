import { Comment } from '../../core/entities';
import { CommentRepositoryInterface } from '../interfaces';
import sqlite3 from 'sqlite3';

export class CommentRepository implements CommentRepositoryInterface {
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
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reviewId TEXT NOT NULL,
        comment TEXT NOT NULL,
        timestamp DATETIME NOT NULL
      )
    `);
    }

    async create(commentData: { reviewId: string; comment: string, timestamp: Date }): Promise<Comment> {
        const { reviewId, comment, timestamp } = commentData;
        return new Promise<Comment>((resolve, reject) => {
            this.db.run(
                'INSERT INTO comments (reviewId, comment, timestamp) VALUES (?, ?, ?)',
                [reviewId, comment, timestamp],
                function (err) {
                    if (err) {
                        console.error('Error inserting comment:', err.message);
                        reject(err);
                    } else {
                        const newComment: Comment = {
                            id: this.lastID.toString(),
                            reviewId,
                            comment,
                            timestamp
                        }
                        resolve(newComment);
                    }
                }
            );
        });
    }

    async get(id: string): Promise<Comment | null> {
        return new Promise<Comment | null>((resolve, reject) => {
            this.db.get(
                'SELECT * FROM comments WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) {
                        console.error('Error fetching comment by id:', err.message);
                        reject(err);
                    } else {
                        resolve(row as Comment | null) ;
                    }
                }
            );
        });
    }
}