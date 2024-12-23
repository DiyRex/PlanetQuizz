'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React, { useEffect, useState } from 'react';

interface LeaderboardUser {
  id: number;
  user_id: number;
  total_marks: string;
  position: string;
  name: string;
  email: string;
}

const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center">Loading leaderboard...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-md p-4 mx-auto max-w-sm">
          <h2 className="text-3xl text-center mb-10 mt-10 font-bold mb-4 text-sky-800">Leaderboard</h2>
          <ul>
            {leaderboard.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between py-2 border-b border-gray-300 pb-5"
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold mr-4">{user.position}</span>
                  <img
                    src={`https://via.placeholder.com/48?text=${user.name.charAt(0)}`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  <span className="text-gray-800 font-semibold">{user.name}</span>
                </div>
                <span className="text-green-500 font-semibold">
                  {user.total_marks} Points
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
