import { query } from '@/utils/dbConn';

export const GET = async () => {
  try {
    // Fetch leaderboard with dynamically calculated positions
    const leaderboardData = await query(`
      SELECT
        l.id,
        l.user_id,
        SUM(l.marks) AS total_marks,
        RANK() OVER (ORDER BY SUM(l.marks) DESC) AS position,
        u.name,
        u.email
      FROM leaderboard l
      INNER JOIN users u ON l.user_id = u.id
      GROUP BY l.id, u.id
      ORDER BY position ASC;
    `);

    return new Response(JSON.stringify(leaderboardData), { status: 200 });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch leaderboard' }),
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { userId, marks } = body;

    if (!userId || marks === undefined) {
      return new Response(
        JSON.stringify({ error: 'userId and marks are required' }),
        { status: 400 }
      );
    }

    // Check if user already exists in the leaderboard
    const existingEntry = await query(
      'SELECT * FROM leaderboard WHERE user_id = $1;',
      [userId]
    );

    if (existingEntry.length > 0) {
      // Add the new marks to the existing marks
      await query(
        'UPDATE leaderboard SET marks = marks + $1 WHERE user_id = $2;',
        [marks, userId]
      );
    } else {
      // Insert new leaderboard entry
      await query(
        'INSERT INTO leaderboard (user_id, marks) VALUES ($1, $2);',
        [userId, marks]
      );
    }

    return new Response(JSON.stringify({ message: 'Leaderboard updated successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update leaderboard' }),
      { status: 500 }
    );
  }
};
