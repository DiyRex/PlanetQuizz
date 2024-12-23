import { query } from '@/utils/dbConn';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { name, email, password } = await req.json();

  // Validate the input
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
  }

  try {
    // Check if the email already exists
    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ error: 'Email is already registered' }),
        { status: 409 } // Conflict
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [
      name,
      email,
      hashedPassword,
    ]);

    return new Response(
      JSON.stringify({
        message: 'User registered successfully. Redirecting to login...',
        redirectTo: '/auth/login',
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during user registration:', error);
    return new Response(
      JSON.stringify({ error: 'Error creating user. Please try again later.' }),
      { status: 500 }
    );
  }
}
