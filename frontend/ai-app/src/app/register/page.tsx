'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register as apiRegister } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { InputField } from '../../components/InputField';
import { Heading } from '../../components/Heading';
import { CornerGrid } from '../../components/CornerGrid';
import PublicRoute from '@/components/PublicRoute';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const { token } = await apiRegister(formData.username, formData.email, formData.password);
      await login(formData.username, formData.password);
      toast.success('Registered successfully');
      router.push('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
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
          <Heading signin={true}/>
          <form onSubmit={handleSubmit}>
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="Your username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="your.email@provider.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
            >
              Sign up
            </button>
          </form>
        </motion.div>
        <CornerGrid />
      </div>
    </PublicRoute>
  );
};

export default Register;
