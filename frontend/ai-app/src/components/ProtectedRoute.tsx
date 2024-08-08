'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRouteProps } from '@/types/types';
import { motion } from 'framer-motion';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, forAdmin = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (forAdmin && !user?.is_admin) {
      router.push('/');
    }
  }, [user, loading, router, forAdmin]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            width: '50px',
            height: '50px',
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #3498db',
            borderRadius: '50%',
          }}
        />
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
