import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeMockData, getCurrentUser, loginUser, type User } from './lib/storage';
import { HomePage } from './pages/HomePage';
import { PublishTaskPage } from './pages/PublishTaskPage';
import { TaskPublishedPage } from './pages/TaskPublishedPage';
import { MyTasksPage } from './pages/MyTasksPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    initializeMockData();

    // 检查是否有已登录用户
    const savedUser = getCurrentUser();
    if (savedUser?.isLoggedIn) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogin = (phone: string) => {
    const user = loginUser(phone);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  return (
    <Router basename="/caichong2/">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogin={handleLogin}
            />
          }
        />
        <Route path="/publish" element={<PublishTaskPage />} />
        <Route path="/task-published/:taskId" element={<TaskPublishedPage />} />
        <Route path="/my-tasks" element={<MyTasksPage />} />
        <Route path="/task/:taskId" element={<TaskDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

