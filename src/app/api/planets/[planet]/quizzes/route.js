import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req, { params }) {
  const { planet } = params;

  try {
    const filePath = path.join(process.cwd(), 'src/data', `${planet}.json`);
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    if (!data.quizzes) {
      return new Response(
        JSON.stringify({ error: 'No quizzes found for this planet.' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(data.quizzes), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Planet not found or invalid data.' }),
      { status: 404 }
    );
  }
}
