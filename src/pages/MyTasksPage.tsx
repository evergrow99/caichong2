import React, { useState, useEffect } from 'react';
import { Button, Card, StatusBadge } from '../components/UI';
import { getUserTasks, Task, getCurrentUser } from '../lib/storage';
import { useNavigate } from 'react-router-dom';

export const MyTasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const userTasks = getUserTasks();
    setTasks(userTasks);
  }, []);

  const filteredTasks = filterStatus === 'all'
    ? tasks
    : tasks.filter(t => t.status === filterStatus);

  return (
    <div className="min-h-screen bg-parchment">
      {/* 顶部导航 */}
      <header className="sticky top-0 bg-pure-white border-b border-warm-sand shadow-level-1 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-h4 font-serif font-medium text-terracotta hover:opacity-80">
            ← 返回
          </button>
          <h1 className="text-h5 font-serif font-medium">我的任务</h1>
          <Button size="sm" onClick={() => navigate('/publish')}>新建任务</Button>
        </div>
      </header>

      {/* 筛选 */}
      <section className="bg-pure-white border-b border-warm-sand py-4 px-6">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          {[
            { value: 'all', label: '全部' },
            { value: 'pending', label: '待接单' },
            { value: 'progress', label: '进行中' },
            { value: 'review', label: '待验收' },
            { value: 'completed', label: '已完成' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`px-4 py-2 rounded-lg text-body font-medium transition-all ${
                filterStatus === filter.value
                  ? 'bg-terracotta text-pure-white'
                  : 'bg-warm-sand text-near-black hover:bg-stone-gray/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* 任务列表 */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredTasks.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-stone-gray text-body mb-4">暂无任务</p>
              <Button onClick={() => navigate('/publish')}>发布第一个任务</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map(task => (
                <Card
                  key={task.id}
                  className="cursor-pointer hover:shadow-level-3 transition-shadow p-6 flex items-center justify-between"
                  onClick={() => navigate(`/task/${task.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-h6 font-serif font-medium text-near-black">{task.title}</h4>
                      <StatusBadge status={task.status} />
                    </div>
                    <p className="text-body text-stone-gray mb-3 line-clamp-2">{task.description}</p>
                    <div className="flex gap-6 text-label text-stone-gray">
                      <span>💰 ¥{task.budget}</span>
                      <span>📅 {task.deadline}天</span>
                      <span>👥 {task.bidders.length}个接单</span>
                      <span>📝 {task.submissions.length}个方案</span>
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
