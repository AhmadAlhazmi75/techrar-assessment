'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  forAdmin?: boolean;
}

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
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
