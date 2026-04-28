import React, { useState } from 'react';
import { Button, Input, TextArea, Select, Card } from './UI';
import { createTask, getCurrentUser } from '../lib/storage';
import { useNavigate } from 'react-router-dom';

export const PublishTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    type: 'text' as 'text' | 'audio' | 'video',
    description: '',
    budget: '',
    deadline: '3',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const typeOptions = [
    { value: 'text', label: '图文创作' },
    { value: 'audio', label: '音频制作' },
    { value: 'video', label: '视频制作' }
  ];

  const deadlineOptions = [
    { value: '1', label: '1天' },
    { value: '2', label: '2天' },
    { value: '3', label: '3天' },
    { value: '5', label: '5天' },
    { value: '7', label: '7天' }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = '任务标题不能为空';
    if (!formData.description.trim()) newErrors.description = '任务描述不能为空';
    if (!formData.budget || parseInt(formData.budget) < 10) {
      newErrors.budget = '预算不能低于¥10';
    }
    if (parseInt(formData.budget) > 10000) {
      newErrors.budget = '预算不能超过¥10,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const task = createTask({
        title: formData.title,
        type: formData.type,
        description: formData.description,
        budget: parseInt(formData.budget),
        deadline: parseInt(formData.deadline),
        publisherId: user.id,
        attachments: []
      });

      navigate(`/task-published/${task.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* 顶部导航 */}
      <header className="sticky top-0 bg-pure-white border-b border-warm-sand shadow-level-1 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-h4 font-serif font-medium text-terracotta hover:opacity-80">
            ← 返回
          </button>
          <h1 className="text-h5 font-serif font-medium">发布新任务</h1>
          <div className="w-12"></div>
        </div>
      </header>

      {/* 表单区域 */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 任务类型 */}
              <Select
                label="任务类型"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                options={typeOptions}
              />

              {/* 任务标题 */}
              <Input
                label="任务标题"
                placeholder="例：写一篇1000字的产品评测文章"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                maxLength={100}
                error={errors.title}
              />

              {/* 任务描述 */}
              <TextArea
                label="任务描述"
                placeholder="详细描述任务要求、创意方向、参考资料等..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={2000}
                rows={8}
                error={errors.description}
              />
              <p className="text-label text-stone-gray">{formData.description.length}/2000</p>

              {/* 预算 */}
              <Input
                label="预算（¥）"
                type="number"
                placeholder="例：500"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                min="10"
                max="10000"
                error={errors.budget}
              />
              <p className="text-label text-stone-gray">预算范围：¥10 - ¥10,000</p>

              {/* 期限 */}
              <Select
                label="完成期限"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                options={deadlineOptions}
              />

              {/* 提交按钮 */}
              <div className="flex gap-4 pt-6 border-t border-warm-sand">
                <Button variant="white" onClick={() => navigate('/')} disabled={isSubmitting}>
                  取消
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? '发布中...' : '确认发布'}
                </Button>
              </div>
            </form>
          </Card>

          {/* 说明 */}
          <div className="mt-8 bg-ivory rounded-lg p-6">
            <h3 className="text-h6 font-serif font-medium mb-3 text-near-black">发单须知</h3>
            <ul className="space-y-2 text-body text-stone-gray">
              <li>✓ 任务发布后可在1小时内修改或取消</li>
              <li>✓ Agent接单后进入进行中状态</li>
              <li>✓ 验收通过后任务完成，费用到账</li>
              <li>✓ 所有任务都受平台规则保护</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
