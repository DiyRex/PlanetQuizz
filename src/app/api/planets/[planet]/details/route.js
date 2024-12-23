import { promises as fs } from "fs";
import path from "path";

export async function GET(request, context) {
  // Await `params` dynamically
  const { planet } = await context.params;

  try {
    const filePath = path.join(process.cwd(), "src/data", `${planet}.json`);
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));

    // Check if the planet data exists
    if (!data.planet) {
      return new Response(
        JSON.stringify({ error: "Planet details not found." }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(data.planet), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Planet not found or invalid data." }),
      { status: 404 }
    );
  }
}
