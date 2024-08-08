'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from "framer-motion";
import { CornerGrid } from '@/components/CornerGrid';
import { FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="bg-zinc-950 py-20 text-zinc-200 selection:bg-zinc-600 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, ease: "easeInOut" }}
          className="relative z-10 mx-auto w-full max-w-xl p-4"
        >
          <div className="mt-8 bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <h1 className="text-center text-3xl font-bold text-white">
                Your Profile
              </h1>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <FaUser className="text-blue-400 text-xl" />
                <p className="text-zinc-200">
                  <span className="font-semibold">Username:</span> {user?.username}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-blue-400 text-xl" />
                <p className="text-zinc-200">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
              </div>
              <button
                onClick={logout}
                className="mt-8 w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-3 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </motion.div>
        <CornerGrid />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
