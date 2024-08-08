'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { PublicRouteProps } from '@/types/types';
import { motion } from 'framer-motion';

const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectIfAuthenticated = false}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && redirectIfAuthenticated) {
      router.push('/profile');
    }
  }, [user, loading, router, redirectIfAuthenticated]);

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

  return <>{children}</>;
};

export default PublicRoute;
