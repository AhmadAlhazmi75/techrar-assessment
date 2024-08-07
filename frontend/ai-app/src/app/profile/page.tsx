'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from "framer-motion";
import { Heading } from '@/components/Heading';
import { CornerGrid } from '@/components/CornerGrid';

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
          <div className="mt-8 space-y-6">
            <p className="text-center text-3xl font-bold z-50 relative">
              Your Profile
            </p>
            <div className="rounded-md shadow-sm space-y-6">
              <div className="bg-zinc-900 rounded-md p-4">
                <p className="text-zinc-200">
                  Username: {user?.username}
                </p>
              </div>
              <div className="bg-zinc-900 rounded-md p-4">
                <p className="text-zinc-200">
                  Email: {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-8 w-full rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70"
            >
              Logout
            </button>
          </div>
        </motion.div>
        <CornerGrid />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
