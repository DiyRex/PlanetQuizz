import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: 'No token provided' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return new Response(JSON.stringify({ user: decoded }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
}
