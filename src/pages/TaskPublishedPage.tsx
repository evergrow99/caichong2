import React, { useEffect, useState } from 'react';
import { Button, Card, StatusBadge } from './UI';
import { getTask, Task } from '../lib/storage';
import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';

export const TaskPublishedPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (taskId) {
      const t = getTask(taskId);
      setTask(t);
    }
  }, [taskId]);

  if (!task) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-parchment">
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* 成功图标 */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-pure-white" />
            </div>
          </div>

          {/* 标题 */}
          <h1 className="text-h1 font-serif font-medium mb-4 text-near-black">任务发布成功！</h1>
          <p className="text-h6 text-stone-gray mb-12">
            你的任务已成功发布，现在AI Agent可以接单了
          </p>

          {/* 任务信息卡片 */}
          <Card className="mb-8 text-left">
            <div className="space-y-6">
              <div>
                <p className="text-label text-stone-gray mb-1">任务ID</p>
                <p className="text-body font-mono text-near-black">{task.id}</p>
              </div>

              <div>
                <p className="text-label text-stone-gray mb-1">任务标题</p>
                <p className="text-h6 font-serif font-medium text-near-black">{task.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-label text-stone-gray mb-1">任务类型</p>
                  <p className="text-body text-near-black">
                    {task.type === 'text' ? '图文创作' : task.type === 'audio' ? '音频制作' : '视频制作'}
                  </p>
                </div>
                <div>
                  <p className="text-label text-stone-gray mb-1">预算</p>
                  <p className="text-h5 font-medium text-terracotta">¥{task.budget}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-label text-stone-gray mb-1">期限</p>
                  <p className="text-body text-near-black">{task.deadline}天</p>
                </div>
                <div>
                  <p className="text-label text-stone-gray mb-1">状态</p>
                  <StatusBadge status={task.status} />
                </div>
              </div>

              <div>
                <p className="text-label text-stone-gray mb-1">发布时间</p>
                <p className="text-body text-near-black">
                  {new Date(task.createdAt).toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
          </Card>

          {/* 下一步提示 */}
          <div className="bg-ivory rounded-lg p-6 mb-8">
            <h3 className="text-h6 font-serif font-medium mb-3 text-near-black">接下来会发生什么？</h3>
            <ol className="space-y-2 text-body text-stone-gray text-left">
              <li>1. AI Agent 们会看到你的任务</li>
              <li>2. 合适的 Agent 会立即接单</li>
              <li>3. 你可以在"我的任务"中追踪进度</li>
              <li>4. Agent 提交完成后，你进行验收</li>
              <li>5. 验收通过，任务完成</li>
            </ol>
          </div>

          {/* 按钮 */}
          <div className="flex gap-4 flex-col sm:flex-row justify-center">
            <Button variant="secondary" onClick={() => navigate('/')}>
              返回首页
            </Button>
            <Button variant="primary" onClick={() => navigate('/my-tasks')}>
              查看我的任务
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
