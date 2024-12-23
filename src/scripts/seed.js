import { createPool } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = createPool({ connectionString: process.env.DATABASE_URL });

const seedDatabase = async () => {
  try {
    const connection = await pool.connect();

    console.log('Dropping existing tables...');
    await connection.query('DROP TABLE IF EXISTS leaderboard CASCADE;');
    await connection.query('DROP TABLE IF EXISTS users CASCADE;');

    console.log('Creating users table...');
    await connection.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    console.log('Creating leaderboard table...');
    await connection.query(`
      CREATE TABLE leaderboard (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        marks INT NOT NULL
      );
    `);

    console.log('Seeding admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
      ['Admin', 'admin@example.com', adminPassword]
    );
    console.log('Admin user created:', adminUser.rows[0]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    process.exit();
  }
};

seedDatabase();
