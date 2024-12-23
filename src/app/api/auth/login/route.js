import jwt from 'jsonwebtoken';
import { query } from '@/utils/dbConn';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const JWT_EXPIRATION = '1h'; // Token valid for 1 hour

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Fetch user details and leaderboard marks with a JOIN query
    const result = await query(
      `
      SELECT 
        users.id, 
        users.name, 
        users.email, 
        users.password, 
        leaderboard.marks AS total_marks
      FROM users
      LEFT JOIN leaderboard ON users.id = leaderboard.user_id
      WHERE users.email = $1
      `,
      [email]
    );

    if (result.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 401 });
    }

    // Generate JWT with leaderboard data
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        marks: user.total_marks || 0, // Default to 0 if no marks available
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          marks: user.total_marks || 0,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Error logging in' }), { status: 500 });
  }
}
