"use client"
import { useState } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email) {
      toast.error('Email is required!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      toast.success('Thank you for subscribing!');
      setFormData({ name: '', email: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#003554] text-white rounded-2xl shadow-md">
        <Image
          src="https://images.unsplash.com/photo-1601342550031-d6df73676153?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Newsletter"
          width={100}
          height={100}
          layout="responsive"
          className="mx-auto rounded-t-2xl"
        />
        <div className="p-5">
          <h3 className="text-xl font-semibold">Subscribe now!</h3>
          <p className="text-[12px] text-gray-300 mt-1">
            Enter your email address below and subscribe to our newsletter
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-lg bg-[#006494] text-white border-none focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email *"
              required
              className="w-full px-3 py-2 mt-2 rounded-lg bg-[#006494] text-white border-none focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-3 ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold py-2 rounded-lg transition-colors`}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer 
        position="top-right"
        autoClose={5000}
        className="mt-[70px]"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SubscribeForm;