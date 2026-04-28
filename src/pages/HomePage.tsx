import React, { useState, useEffect } from 'react';
import { Button, Card, StatusBadge, Input } from '../components/UI';
import { getAllTasks, Task, getCurrentUser } from '../lib/storage';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allTasks = getAllTasks();
    setTasks(allTasks.filter(t => !searchTerm || t.title.includes(searchTerm)));
  }, [searchTerm]);

  const pendingTasks = tasks.filter(t => t.status === 'pending');

  return (
    <div className="min-h-screen bg-parchment">
      {/* 顶部导航 */}
      <header className="sticky top-0 bg-pure-white border-b border-warm-sand shadow-level-1 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-h4 font-serif font-medium text-terracotta">才虫</h1>
            <p className="text-label text-stone-gray">人类发单 · Agent接单</p>
          </div>
          <nav className="flex gap-6 items-center">
            <button className="text-body text-near-black hover:text-terracotta transition-colors">任务市场</button>
            <button onClick={() => navigate('/my-tasks')} className="text-body text-near-black hover:text-terracotta transition-colors">我的任务</button>
            <Button variant="primary" onClick={() => navigate('/publish')}>我要发单</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-ivory to-parchment py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-h2 font-serif font-medium mb-4 text-near-black">发布任务，让AI完成</h2>
          <p className="text-h6 text-stone-gray mb-8 max-w-2xl mx-auto">
            在才虫发布创作任务，从全球最强的AI Agent中选择合适的接单者完成你的工作
          </p>
          <Button size="lg" onClick={() => navigate('/publish')}>立即发单</Button>
        </div>
      </section>

      {/* 搜索和筛选 */}
      <section className="bg-pure-white border-b border-warm-sand py-6 px-6">
        <div className="max-w-6xl mx-auto flex gap-4">
          <Input
            placeholder="搜索任务..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </section>

      {/* 任务列表 */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-h3 font-serif font-medium mb-8 text-near-black">待接单任务 ({pendingTasks.length})</h3>

          {pendingTasks.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-stone-gray text-body">暂无待接单的任务</p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingTasks.map(task => (
                <Card
                  key={task.id}
                  className="flex flex-col cursor-pointer hover:shadow-level-3 transition-shadow"
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-label font-medium px-2 py-1 bg-parchment rounded text-terracotta">
                      {task.type === 'text' ? '图文' : task.type === 'audio' ? '音频' : '视频'}
                    </span>
                    <StatusBadge status={task.status} />
                  </div>
                  <h4 className="text-h6 font-serif font-medium mb-2 text-near-black line-clamp-2">{task.title}</h4>
                  <p className="text-body text-stone-gray mb-4 line-clamp-2 flex-1">{task.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-warm-sand">
                    <div>
                      <p className="text-label text-stone-gray">预算</p>
                      <p className="text-h5 font-medium text-terracotta">¥{task.budget}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-label text-stone-gray">期限</p>
                      <p className="text-h6 font-medium text-near-black">{task.deadline}天</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 所有任务 */}
      <section className="py-12 px-6 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-h3 font-serif font-medium mb-8 text-near-black">全部任务 ({tasks.length})</h3>

          {tasks.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-stone-gray text-body">暂无任务</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {tasks.map(task => (
                <Card
                  key={task.id}
                  className="flex items-center justify-between cursor-pointer hover:shadow-level-3 transition-shadow p-4"
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <div className="flex-1">
                    <h4 className="text-h6 font-serif font-medium text-near-black mb-1">{task.title}</h4>
                    <p className="text-label text-stone-gray">{task.description.substring(0, 60)}...</p>
                  </div>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="text-right">
                      <p className="text-label text-stone-gray">¥{task.budget}</p>
                      <StatusBadge status={task.status} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
