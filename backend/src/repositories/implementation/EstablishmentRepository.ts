import { Establishment } from "../../core/entities";
import { database } from "../database";
import { EstablishmentRepositoryInterface } from "../interfaces";
import sqlite3 from 'sqlite3';

export class EstablishmentRepository implements EstablishmentRepositoryInterface {
    private db: sqlite3.Database;

    constructor() {
        this.db = database;
        this.db.run(`
      CREATE TABLE IF NOT EXISTS establishments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        images TEXT,
        daysOpen TEXT,
        workingHours TEXT,
        phone TEXT,
        mainImage TEXT,
        rating REAL NOT NULL DEFAULT 0,
        numberOfReviews INTEGER NOT NULL DEFAULT 0,
        userId TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `);
    }

    async create(establishmentData: { name: string; address: string; category: string; description: string; userId: string, mainImage: string, images: string, workingHours: string, daysOpen: string, phone: string }): Promise<Establishment> {
        const { name, address, category, description, userId, mainImage, images, workingHours, daysOpen, phone } = establishmentData;
        return new Promise<Establishment>((resolve, reject) => {
            this.db.run(
                'INSERT INTO establishments (name, address, category, description, userId, mainImage, images, workingHours, daysOpen, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, address, category, description, userId, mainImage, images, workingHours, daysOpen, phone],
                function (err) {
                    if (err) {

                        reject(err);
                    } else {
                        const newEstablishment: Establishment = {
                            id: this.lastID.toString(),
                            name,
                            address,
                            category,
                            description,
                            rating: 0,
                            numberOfReviews: 0,
                            mainImage,
                            images,
                            userId: userId,
                            workingHours,
                            daysOpen,
                            phone
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
                        reject(err);
                    } else {
                        resolve(row as Establishment | null);
                    }
                }
            );
        });
    }

    async getAll(): Promise<Establishment[]> {
        return new Promise<Establishment[]>((resolve, reject) => {
            this.db.all(
                'SELECT * FROM establishments',
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

    async updateRatingOnDb(id: string, newRating: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(
                'UPDATE establishments SET rating = ?, numberOfReviews = numberOfReviews + 1 WHERE id = ?',
                [newRating, id],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    async delete(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(
                'DELETE FROM establishments WHERE id = ?',
                [id],
                (err) => {
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
