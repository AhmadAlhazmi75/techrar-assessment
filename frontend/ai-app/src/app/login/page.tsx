'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import { login as apiLogin } from '@/utils/api';

import toast from 'react-hot-toast';
import { motion } from "framer-motion";

// Components
import { Heading } from '@/components/Heading';
import { InputField } from '@/components/InputField';
import { CornerGrid } from '@/components/CornerGrid';
import PublicRoute from '@/components/PublicRoute';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await apiLogin(formData.username, formData.password);
      await login(token);
      toast.success('Logged in successfully');
      router.push('/profile');
    } catch (error) {
      toast.error('Failed to login');
    }
  };

  return (
    <PublicRoute redirectIfAuthenticated={true}>
    <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Heading signin={false}/>
        <form onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Username"
            type="text"
            placeholder="Your username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-8 w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
          >
            Sign in
          </button>
        </form>
      </motion.div>
      <CornerGrid />
      </div>
    </PublicRoute>
  );
};

export default Login;
