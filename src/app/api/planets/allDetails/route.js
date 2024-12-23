import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'src/data');
    const files = await fs.readdir(dataDir);

    const allDetails = [];

    for (const file of files) {
      try {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

        if (data.planet) {
          allDetails.push(data.planet);
        }
      } catch (fileError) {
        console.error(`Error reading or parsing file: ${file}.`, fileError);
      }
    }

    if (allDetails.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No planet details found in any file.' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(allDetails), { status: 200 });
  } catch (error) {
    console.error('Error fetching planet details:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch planet details.' }),
      { status: 500 }
    );
  }
}
