import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FocusTimerProvider } from '@/context/FocusTimerContext';
import { LangProvider } from '@/context/LangContext';
// Add page imports here
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Home from '@/pages/Home';
import FocusPomo from '@/pages/FocusPomo';
import FocusSettings from '@/pages/FocusSettings';
import FocusCalendar from '@/pages/FocusCalendar';
import FocusAnalytics from '@/pages/FocusAnalytics';
import TaskBoard from '@/pages/TaskBoard';
import ComingSoon from '@/pages/ComingSoon';
import Habits from '@/pages/Habits';
import HabitsManage from '@/pages/HabitsManage';
import HabitsAnalytics from '@/pages/HabitsAnalytics';
import HabitsRewards from '@/pages/HabitsRewards';
import Deadlines from '@/pages/Deadlines';
import Chat from '@/pages/Chat';
import ArchivedNotes from '@/pages/ArchivedNotes';
import Profile from '@/pages/Profile';
import Notes from '@/pages/Notes';
import NoteEditor from '@/pages/NoteEditor';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import SharedTasksView from '@/pages/SharedTasksView';
import LandingPage from '@/pages/LandingPage';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div data-source-location="App:36:6" data-dynamic-content="false" className="fixed inset-0 flex items-center justify-center bg-cream">
        <div data-source-location="App:37:8" data-dynamic-content="false" className="flex flex-col items-center gap-4">
          <div data-source-location="App:38:10" data-dynamic-content="false" className="w-14 h-14 rounded-[20px] bg-[#E87A5A] shadow-lg shadow-[#E87A5A]/25 flex items-center justify-center">
            <span data-source-location="App:39:12" data-dynamic-content="false" className="text-3xl">🍊</span>
          </div>
          <div data-source-location="App:41:10" data-dynamic-content="false" className="w-6 h-6 border-[3px] border-[#E87A5A]/20 border-t-[#E87A5A] rounded-full animate-spin" />
        </div>
      </div>);

  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError data-source-location="App:49:13" data-dynamic-content="false" />;
    } else if (authError.type === 'auth_required') {
      return <Navigate data-source-location="App:51:13" data-dynamic-content="false" to="/login" replace />;
    }
  }

  return (
    <FocusTimerProvider data-source-location="App:56:4" data-dynamic-content="true">
    <Routes data-source-location="App:57:4" data-dynamic-content="true">
      <Route data-source-location="App:58:6" data-dynamic-content="true" path="/login" element={<Login data-source-location="App:58:36" data-dynamic-content="false" />} />
      <Route data-source-location="App:59:6" data-dynamic-content="true" path="/register" element={<Register data-source-location="App:59:39" data-dynamic-content="false" />} />
      <Route data-source-location="App:60:6" data-dynamic-content="true" path="/forgot-password" element={<ForgotPassword data-source-location="App:60:46" data-dynamic-content="false" />} />
      <Route data-source-location="App:61:6" data-dynamic-content="true" path="/reset-password" element={<ResetPassword data-source-location="App:61:45" data-dynamic-content="false" />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route data-source-location="App:62:6" data-dynamic-content="true" element={<ProtectedRoute data-source-location="App:62:22" data-dynamic-content="true" unauthenticatedElement={<Navigate data-source-location="App:62:62" data-dynamic-content="false" to="/login" replace />} />}>
        <Route data-source-location="App:63:8" data-dynamic-content="true" path="/" element={<Home data-source-location="App:63:33" data-dynamic-content="false" />} />
        <Route data-source-location="App:64:8" data-dynamic-content="true" path="/focus" element={<FocusPomo data-source-location="App:64:38" data-dynamic-content="false" />} />
        <Route data-source-location="App:65:8" data-dynamic-content="true" path="/focus/settings" element={<FocusSettings data-source-location="App:65:47" data-dynamic-content="false" />} />
        <Route data-source-location="App:66:8" data-dynamic-content="true" path="/focus/calendar" element={<FocusCalendar data-source-location="App:66:47" data-dynamic-content="false" />} />
        <Route data-source-location="App:67:8" data-dynamic-content="true" path="/focus/analytics" element={<FocusAnalytics data-source-location="App:67:48" data-dynamic-content="false" />} />
        <Route data-source-location="App:68:8" data-dynamic-content="true" path="/tasks" element={<TaskBoard data-source-location="App:68:38" data-dynamic-content="false" />} />
        <Route data-source-location="App:69:8" data-dynamic-content="true" path="/habits" element={<Habits data-source-location="App:69:39" data-dynamic-content="false" />} />
        <Route data-source-location="App:70:8" data-dynamic-content="true" path="/habits/manage" element={<HabitsManage data-source-location="App:70:46" data-dynamic-content="false" />} />
        <Route data-source-location="App:71:8" data-dynamic-content="true" path="/habits/analytics" element={<HabitsAnalytics data-source-location="App:71:49" data-dynamic-content="false" />} />
        <Route data-source-location="App:72:8" data-dynamic-content="true" path="/habits/rewards" element={<HabitsRewards data-source-location="App:72:47" data-dynamic-content="false" />} />
        <Route data-source-location="App:73:8" data-dynamic-content="true" path="/coming-soon" element={<ComingSoon data-source-location="App:73:44" data-dynamic-content="false" />} />
        <Route data-source-location="App:74:8" data-dynamic-content="true" path="/deadlines" element={<Deadlines data-source-location="App:74:42" data-dynamic-content="false" />} />
        <Route path="/meeting-ai" element={<Navigate to="/coming-soon" replace />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/archived" element={<ArchivedNotes />} />
        <Route path="/notes/:id" element={<NoteEditor />} />
        <Route path="/tasks/shared/:ownerId" element={<SharedTasksView />} />
      </Route>
      <Route data-source-location="App:78:6" data-dynamic-content="true" path="*" element={<PageNotFound data-source-location="App:78:31" data-dynamic-content="false" />} />
    </Routes>
    </FocusTimerProvider>);

};

function App() {
  return (
    <LangProvider>
    <AuthProvider data-source-location="App:86:4" data-dynamic-content="true">
      <QueryClientProvider data-source-location="App:87:6" data-dynamic-content="true" client={queryClientInstance}>
        <Router data-source-location="App:88:8" data-dynamic-content="false">
          <ScrollToTop data-source-location="App:89:10" data-dynamic-content="false" />
          <AuthenticatedApp data-source-location="App:90:10" data-dynamic-content="false" />
        </Router>
        <Toaster data-source-location="App:92:8" data-dynamic-content="false" />
      </QueryClientProvider>
    </AuthProvider>
    </LangProvider>);

}

export default App;