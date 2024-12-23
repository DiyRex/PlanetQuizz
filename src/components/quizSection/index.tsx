"use client";

import React from 'react';
import { useRouter } from "next/navigation";

const QuizAppSection = () => {
  const router = useRouter();
  return (
    <div
    className="px-4 sm:px-10 mt-2"
    style={{
      backgroundImage: "url('https://cdn.pixabay.com/photo/2012/08/25/22/22/saturn-54999_1280.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      padding: "50px 0",
      borderRadius: "10px",
      opacity: "1",
    }}
  >
      {/* Quiz App Main Section */}
      <div className="px-4 sm:px-10 mt-[14rem]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 md:leading-tight">
          Test Your Knowledge About Planets
        </h1>
        <p className="text-base text-gray-300">
          Challenge yourself with our exciting quizzes on various topics. Improve your skills while
          having fun!
        </p>
        <div className="mt-10">
          <button
            className="px-6 py-3 rounded-xl text-white bg-cyan-900 font-bold transition-all hover:bg-cyan-800"
            onClick={() => router.push("/quiz")}
          >
            Start Quiz
          </button>
        </div>
      </div>

        {/* Quiz Features
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">General Knowledge</h3>
              <p className="text-gray-600">
                Test your knowledge across various general topics. Perfect for sharpening your mind!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Science & Technology</h3>
              <p className="text-gray-600">
                Explore quizzes on science and tech to enhance your understanding of the modern world.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">History & Geography</h3>
              <p className="text-gray-600">
                Learn about historical events and geographical wonders through engaging quizzes.
              </p>
            </div>
          </div>
        </div> */}

        {/* Why Choose Our Quiz App */}
        <div className="mt-[18rem] max-w-7xl mx-auto text-center">
  <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Why Choose Our Quiz App?</h2>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden font-[sans-serif]" >
      <div className="min-h-[256px]">
        <img
          src="images/interaction.jpg"
          alt="Interactive Experience"
          className="max-w-full max-h-[300px] object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-gray-800 text-xl font-bold mb-2">Interactive Experience</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Enjoy a seamless and interactive quiz experience.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden font-[sans-serif]">
      <div className="min-h-[256px]">
      <img
          src="images/leaderboard.jpg"
          alt="Interactive Experience"
          className="max-w-full max-h-[300px] object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-gray-800 text-xl font-bold mb-2">Real-Time Scoring</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Track your progress instantly with real-time scoring.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-lg overflow-hidden font-[sans-serif]">
      <div className="min-h-[256px]">
      <img
          src="images/topics.jpg"
          alt="Interactive Experience"
          className="max-w-full max-h-[300px] object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="text-gray-800 text-xl font-bold mb-2">Variety of Topics</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Discover quizzes across a wide range of topics and difficulty levels.
        </p>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default QuizAppSection;
