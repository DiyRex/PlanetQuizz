import { createPool } from '@vercel/postgres';

const pool = createPool();

export const query = async (sql, params) => {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.connect();
    const result = await connection.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    // Always release the connection back to the pool
    if (connection) connection.release();
  }
};

// Function to verify database connection
export const verifyDbConnection = async () => {
  let connection;
  try {
    // Get a connection to verify if the pool works
    connection = await pool.connect();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    // Release the connection if it was acquired
    if (connection) connection.release();
  }
};

// Run the connection verification during initialization
verifyDbConnection();
