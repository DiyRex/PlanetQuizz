import { query } from '@/utils/dbConn';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, newPassword } = await req.json();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    await query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
    return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error resetting password' }), { status: 500 });
  }
}
