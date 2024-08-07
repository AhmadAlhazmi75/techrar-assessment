'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, redirectIfAuthenticated = false }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && redirectIfAuthenticated) {
      router.push('/profile');
    }
  }, [user, loading, router, redirectIfAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PublicRoute;
