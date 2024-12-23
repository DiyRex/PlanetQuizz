'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar-logo';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();

        // Store the token in localStorage (or use cookies for production)
        localStorage.setItem('token', data.token);

        // Redirect to the user profile page
        router.push('/userProfile');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <>

      <Navbar />
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{
          backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/08/04/14/04/space-1569133_1280.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-md w-full mx-auto">
          <form
            className="bg-opacity-70 bg-white rounded-2xl p-6 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
            onSubmit={handleSubmit}
          >
            <div className="mb-12">
              <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleInputChange}
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <div>
                <Link href="/auth/forgot-password" legacyBehavior>
                  <a className="text-blue-600 text-sm font-semibold underline hover:no-underline">
                    Forgot Password?
                  </a>
                </Link>

              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                Sign in
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">
                Don't have an account?{' '}
                <Link href="/auth/signup" legacyBehavior>
                  <a className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
