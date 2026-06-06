import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.css';
import { ParkProvider, usePark } from './context/ParkContext';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import DirectoryPage from './pages/DirectoryPage';
import InspectionsPage from './pages/InspectionsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import TreesPage from './pages/TreesPage';

function ProtectedRoutes() {
  const { isAuthenticated } = usePark();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AppLayout />;
}

function AppRoutes() {
  const { isAuthenticated } = usePark();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/trees" element={<TreesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route
          path="/inspections"
          element={<InspectionsPage />}
        />
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? '/' : '/login'}
            replace
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ParkProvider>
      <AppRoutes />
    </ParkProvider>
  );
}

export default App;
