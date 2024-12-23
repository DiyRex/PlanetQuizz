'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export interface User {
  id: number;
  name: string;
  email: string;
  marks?: number;
}

export default function UserProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    fetch('/api/auth/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid token');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/auth/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    router.push('/auth/login'); // Redirect to login
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found. Please log in again.</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Profile Picture */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-full lg:w-1/3 flex items-center justify-center">
              <img
                src={`https://via.placeholder.com/150?text=${user.name.charAt(0)}`}
                alt="User Avatar"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            {/* Profile Details */}
            <div className="w-full lg:w-2/3 p-6">
              <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 mt-2">Email: {user.email}</p>
              <p className="text-gray-600 mt-1">Marks: {user.marks ?? 'N/A'}</p>

              <div className="mt-6 flex flex-col lg:flex-row gap-4">
                <button
                  onClick={() => router.push('/quiz')}
                  className="w-full lg:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => router.push('/leaderboard')}
                  className="w-full lg:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Leaderboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full lg:w-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
