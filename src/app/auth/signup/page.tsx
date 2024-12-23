'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar-logo';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Signup successful! You can now log in.');
      } else {
        const errorData = await res.json();
        alert(`Signup failed: ${errorData.error}`);
      }
    } catch (err) {
      alert('Error during signup. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
   
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
            <h3 className="text-gray-800 text-3xl font-extrabold">Register</h3>
          </div>

          <div>
            <div className="relative flex items-center">
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleInputChange}
                className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                placeholder="Enter name"
              />
            </div>
          </div>

          <div className="mt-6">
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

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              Register
            </button>
            <p className="text-gray-800 text-sm text-center mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" legacyBehavior>
                <a className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Sign in here</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
