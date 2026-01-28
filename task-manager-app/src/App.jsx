import React, { useState } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TasksPage from './components/TasksPage';
import SettingsPage from './components/SettingsPage';
import UserManagement from './components/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';
import { mockTasks } from './data/mockData';
import { checkPermissions } from './utils/permissions';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [tasks, setTasks] = useState(mockTasks);
  const [userSettings, setUserSettings] = useState({
    theme: 'light',
    notifications: true,
    emailUpdates: false
  });

  if (!currentUser) {
    return (
      <Login 
        setCurrentUser={setCurrentUser} 
        setCurrentPage={setCurrentPage} 
      />
    );
  }

  // Define page permissions map
  const pagePermissionsMap = {
    'dashboard': ['dashboard:read'],
    'tasks': ['tasks:read'],
    'settings': ['settings:read'],
    'user-management': ['user-management:read'],
  };

  // Helper function to check if user has permission for a page
  const hasPagePermission = (pageId) => {
    const requiredPermissions = pagePermissionsMap[pageId];
    if (!requiredPermissions) return true;
    return checkPermissions(currentUser.permissions, requiredPermissions);
  };

  // Helper function to safely navigate to a page
  const canNavigateTo = (pageId) => {
    return hasPagePermission(pageId);
  };

  // Redirect to dashboard if user tries to access a page without permission
  const pageToRender = hasPagePermission(currentPage) ? currentPage : 'dashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentUser={currentUser}
        currentPage={pageToRender}
        setCurrentPage={setCurrentPage}
        setCurrentUser={setCurrentUser}
      />
      {pageToRender === 'dashboard' && hasPagePermission('dashboard') && (
        <Dashboard 
          currentUser={currentUser} 
          tasks={tasks} 
        />
      )}
      {pageToRender === 'tasks' && hasPagePermission('tasks') && (
        <ProtectedRoute 
          currentUser={currentUser}
          hasPermissions={['tasks:read']}
        >
          <TasksPage 
            currentUser={currentUser}
            tasks={tasks} 
            setTasks={setTasks} 
          />
        </ProtectedRoute>
      )}
      {pageToRender === 'settings' && hasPagePermission('settings') && (
        <ProtectedRoute 
          currentUser={currentUser}
          hasPermissions={['settings:read']}
        >
          <SettingsPage 
            currentUser={currentUser}
            userSettings={userSettings}
            setUserSettings={setUserSettings}
          />
        </ProtectedRoute>
      )}
      {pageToRender === 'user-management' && hasPagePermission('user-management') && (
        <ProtectedRoute 
          currentUser={currentUser}
          hasPermissions={['user-management:read']}
        >
          <UserManagement currentUser={currentUser} />
        </ProtectedRoute>
      )}
    </div>
  );
};

export default App;