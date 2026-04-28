import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeMockData } from './lib/storage';
import { HomePage } from './pages/HomePage';
import { PublishTaskPage } from './pages/PublishTaskPage';
import { TaskPublishedPage } from './pages/TaskPublishedPage';
import { MyTasksPage } from './pages/MyTasksPage';
import { TaskDetailPage } from './pages/TaskDetailPage';
import './index.css';

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <Router basename="/caichong2/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publish" element={<PublishTaskPage />} />
        <Route path="/task-published/:taskId" element={<TaskPublishedPage />} />
        <Route path="/my-tasks" element={<MyTasksPage />} />
        <Route path="/task/:taskId" element={<TaskDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
