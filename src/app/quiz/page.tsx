'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar-logo';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  const NoQuizz = 5; // Number of questions to display
  const placeholderImage = 'https://cdn.pixabay.com/photo/2016/08/04/14/04/space-1569133_1280.jpg';

  // Utility to shuffle array
  const shuffleArray = (array: Question[]): Question[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch and randomize questions
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/api/planets/allQuizzes');
      const data = await response.json();
      const shuffledQuestions = shuffleArray(data).slice(0, NoQuizz);
      setQuestions(shuffleArray(shuffledQuestions));
    };

    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { user } = await response.json();
        setUserId(user.id);
      } else {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    };

    fetchQuestions();
    verifyToken();
  }, [router]);

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentQuestionIndex].answer) {
        setCorrectAnswers((prev) => prev + 1);
      }
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const submitResults = async () => {
    if (!userId) return;

    await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId, marks: correctAnswers }),
    });
  };

  // Show results modal and submit results
  useEffect(() => {
    if (showModal) {
      submitResults();
    }
  }, [showModal]);

  const currentQuestion = questions[currentQuestionIndex] || null;

  if (questions.length === 0) {
    return <div className="text-center text-gray-700">Loading questions...</div>;
  }

  if (currentQuestionIndex >= questions.length && !showModal) {
    setShowModal(true);
    return null;
  }

  return (
    <>
    <Navbar/>
    
    <div
      className="flex justify-center mt-5 font-[sans-serif] h-[20rem] min-h-[38rem] p-4"
      style={{ backgroundImage: 'linear-gradient(to bottom, #f0f4f8, #d9e2ec)' }}
    >
      {currentQuestion ? (
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h1>
          <div className="mb-4">
            <img
              src={placeholderImage}
              alt="Quiz visual"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-lg text-gray-800">{currentQuestion.question}</p>
          </div>
          <form className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </form>
          <div className="flex justify-end mt-6">
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className={`px-4 py-2 rounded-md ${
                selectedOption
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : null}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Quiz Completed</h2>
            <p className="text-lg mb-4 text-center">
              Correct Answers: <strong>{correctAnswers}</strong> / {NoQuizz}
            </p>
            <div className="flex justify-center">
              <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Go to Home Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default QuizPage;
