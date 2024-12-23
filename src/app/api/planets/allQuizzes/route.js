import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src/data');
    const files = await fs.readdir(dataDir);

    const allQuizzes = [];

    for (const file of files) {
      try {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        if (data.quizzes) {
          allQuizzes.push(...data.quizzes);
        }
      } catch (fileError) {
        console.error(`Error reading or parsing file: ${file}.`, fileError);
      }
    }

    if (allQuizzes.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No quizzes found in any planet file.' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(allQuizzes), { status: 200 });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch quizzes.' }),
      { status: 500 }
    );
  }
}
