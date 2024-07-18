import { open, Database } from 'sqlite';
import * as fs from 'fs';

export default async function () {
  fs.unlink('./test.db', (err => {
    if (!err) console.log("\nDeleted test database");
  }))

  const db: Database = await open({
    filename: './test.db',
    driver: require('sqlite3').verbose().Database
  });

  await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        image TEXT
      )
    `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reviewId TEXT NOT NULL,
      comment TEXT NOT NULL,
      timestamp DATETIME NOT NULL
    )
  `);


  await db.exec(`
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

  await db.exec(`
    CREATE TABLE IF NOT EXISTS reviewFeedbacks (
      userId TEXT NOT NULL,
      reviewId TEXT NOT NULL,
      feedback TEXT CHECK (feedback IN ('LIKE', 'DISLIKE')),
      PRIMARY KEY (userId, reviewId),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (reviewId) REFERENCES reviews(id)
      )
  `);

  await db.exec(`
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
  `)

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_favorite_establishments (
        userId INTEGER,
        establishmentId INTEGER,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (establishmentId) REFERENCES establishments(id)
    )
`)
}