import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () =>
<div data-source-location="components/ProtectedRoute:7:2" data-dynamic-content="false" className="fixed inset-0 flex items-center justify-center">
    <div data-source-location="components/ProtectedRoute:8:4" data-dynamic-content="false" className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>;


export default function ProtectedRoute({ fallback = <DefaultFallback data-source-location="components/ProtectedRoute:12:52" data-dynamic-content="false" />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError data-source-location="components/ProtectedRoute:27:13" data-dynamic-content="false" />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  return <Outlet data-source-location="components/ProtectedRoute:36:9" data-dynamic-content="false" />;
}