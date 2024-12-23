'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const [userName, setUserName] = useState('Guest'); // Default user name
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUserName(decoded.name || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false);
    setDropdownOpen(false);
    router.push('/auth/login'); // Redirect to login
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
        >
          PlanetQuiz
        </Link>

        {/* Navigation Links */}
        <div
          id="collapseMenu"
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:!block max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50`}
        >
          <ul className="lg:flex gap-x-5 max-lg:space-y-3">
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <Link href="/" className="hover:text-blue-500 text-gray-700 block font-semibold text-[15px]">
                Home
              </Link>
            </li>
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <Link href="/quiz" className="hover:text-blue-500 text-gray-700 block font-semibold text-[15px]">
                Quizzes
              </Link>
            </li>
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <Link href="/leaderboard" className="hover:text-blue-500 text-gray-700 block font-semibold text-[15px]">
                Leaderboard
              </Link>
            </li>
            <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
              <Link href="/planets" className="hover:text-blue-500 text-gray-700 block font-semibold text-[15px]">
                Planets
              </Link>
            </li>
          </ul>
        </div>

        {/* User Dropdown */}
        <div className="relative flex max-lg:ml-auto">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 px-4 py-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" fill="#007bff" />
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5z"
                fill="#007bff"
              />
            </svg>
            <span className="text-gray-700 font-semibold text-sm">{isLoggedIn ? userName : 'Guest'}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <ul className="py-2 text-sm text-gray-700">
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link
                        href="/userProfile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button id="toggleOpen" onClick={toggleMenu} className="lg:hidden">
          <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
