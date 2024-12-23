'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar-logo';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = async () => {
    if (step === 1 && !formData.email) {
      setError('Email is required');
      return;
    }
    if (step === 2 && !formData.otp) {
      setError('OTP is required');
      return;
    }
    if (step === 3) {
      if (!formData.newPassword || formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        const res = await fetch('/api/auth/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            newPassword: formData.newPassword,
          }),
        });

        if (res.ok) {
          setModalVisible(true); 
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'Failed to reset password. Please try again.');
        }
      } catch (err) {
        console.error('Error resetting password:', err);
        setError('An unexpected error occurred. Please try again later.');
      }
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const closeModal = () => {
    setModalVisible(false);
    router.push('/auth/login');
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
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-12">
              <h3 className="text-gray-800 text-3xl font-extrabold">
                {step === 1
                  ? 'Forgot Password'
                  : step === 2
                  ? 'Enter OTP'
                  : 'Reset Password'}
              </h3>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {step === 1 && (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                  placeholder="Enter your email"
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                  placeholder="Enter OTP sent to your email"
                  required
                />
              </>
            )}

            {step === 3 && (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                  placeholder="Enter new password"
                  required
                />
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                  placeholder="Confirm new password"
                  required
                />
              </>
            )}

            <button
              type="button"
              onClick={handleNextStep}
              className="w-full mt-6 py-2.5 px-4 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
            >
              {step === 1
                ? 'Next'
                : step === 2
                ? 'Verify OTP'
                : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Password Updated</h3>
            <p className="text-gray-700 mb-6">Your password has been successfully updated.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={closeModal}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
