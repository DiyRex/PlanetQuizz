'use client';

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 py-10 px-10 font-sans tracking-wide">
      <div className="max-w-2xl mx-auto text-center">
      <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          PlanetQuiz
        </Link>
        <p className="text-sm mt-8 text-gray-300">
        "Explore the universe with our interactive and engaging quiz app. Dive into fascinating topics, enhance your knowledge, and challenge your friends. Learning has never been this fun and exciting!"
        </p>

        <ul className="flex flex-wrap justify-center gap-6 mt-8">
          <li>
            <a href="javascript:void(0)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-blue-600 w-8 h-8"
                viewBox="0 0 49.652 49.652"
              >
                <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" />
              </svg>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                viewBox="0 0 112.196 112.196"
              >
                <circle cx="56.098" cy="56.097" r="56.098" fill="#007ab9" />
                <path
                  fill="#fff"
                  d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z"
                />
              </svg>
            </a>
          </li>
          {/* Additional social icons here */}
        </ul>
      </div>

      <ul className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4 gap-12 mt-15">
        <li className="flex items-center">
          
          
        </li>
        {/* Additional contact details here */}
      </ul>

      <hr className="my-5 border-gray-500" />

      <div className="flex max-md:flex-col gap-4">
        <ul className="flex flex-wrap gap-4">
          <li className="text-sm">
            <a href="javascript:void(0)" className="text-gray-300 font-semibold hover:underline">
              Terms of Service
            </a>
          </li>
          {/* Additional links here */}
        </ul>
        <p className="text-sm text-gray-300 md:ml-auto">© PlanetQuiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
