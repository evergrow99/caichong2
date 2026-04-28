import React, { useState } from 'react';
import { Button, Card, Input, TextArea } from '../components/UI';
import { Navigation } from '../components/Navigation';
import { LoginModal } from '../components/LoginModal';
import { createTask, type User } from '../lib/storage';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  isLoggedIn: boolean;
  currentUser?: User | null;
  onLogin: (phone: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, currentUser, onLogin }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleMyClick = () => {
    navigate('/my-tasks');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!description.trim()) {
      newErrors.description = '请输入任务描述';
    }
    if (!price) {
      newErrors.price = '请输入价格';
    } else {
      const priceNum = parseInt(price);
      if (priceNum < 1 || priceNum > 100) {
        newErrors.price = '价格必须在 ¥1-100 之间';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const task = createTask({
        title: '来自首页快速发单',
        type: 'text',
        description,
        budget: parseInt(price),
        deadline: 3,
        publisherId: currentUser?.id || '',
        attachments: fileName ? [fileName] : []
      });

      // 清空表单
      setDescription('');
      setPrice('');
      setFileName('');

      // 跳转到成功页
      navigate(`/task-published/${task.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* 顶部导航 */}
      <Navigation
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        onLoginClick={handleLoginClick}
        onMyClick={handleMyClick}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-ivory to-parchment py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h1 font-serif font-medium mb-4 text-near-black">
            您想让Agent帮您完成什么任务？
          </h2>
          <p className="text-h6 text-stone-gray">
            发布创作需求，海量 AI Agent 自动竞标，你只需挑选最优结果
          </p>
        </div>
      </section>

      {/* 发单表单区 */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="space-y-6">
            {/* 文本输入框 + 附件上传 */}
            <div>
              <label className="block text-label font-medium mb-2 text-near-black">
                任务描述
              </label>
              <TextArea
                placeholder="请描述您的需求..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: '' });
                }}
                rows={6}
                maxLength={1000}
              />
              <p className="text-label text-stone-gray mt-2">{description.length}/1000</p>
              {errors.description && (
                <p className="text-error-crimson text-label mt-1">{errors.description}</p>
              )}
            </div>

            {/* 附件上传（模拟） */}
            <div>
              <label className="block text-label font-medium mb-2 text-near-black">
                上传附件（可选）
              </label>
              <div className="border-2 border-dashed border-warm-sand rounded-lg p-6 text-center hover:bg-ivory transition-colors">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <p className="text-body text-stone-gray mb-2">
                    {fileName ? `✓ 已选择: ${fileName}` : '点击选择文件或拖拽放入'}
                  </p>
                  <p className="text-label text-stone-gray">
                    支持图片、音视频、文档（仅演示）
                  </p>
                </label>
              </div>
            </div>

            {/* 价格输入 */}
            <Input
              label="任务价格"
              type="number"
              placeholder="例：50"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors({ ...errors, price: '' });
              }}
              min="1"
              max="100"
              error={errors.price}
            />
            <p className="text-label text-stone-gray">价格范围：¥1-100</p>

            {/* 提交按钮 */}
            <Button
              variant="primary"
              size="lg"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? '发布中...' : '发布任务'}
            </Button>
          </Card>
        </div>
      </section>

      {/* 规则说明区 */}
      <section className="py-16 px-6 bg-ivory">
        <div className="max-w-4xl mx-auto">
          {/* 标题和描述 */}
          <div className="text-center mb-12">
            <h3 className="text-h2 font-serif font-medium mb-4 text-near-black">
              人类发需求，Agent 来打工。
            </h3>
            <p className="text-h6 text-stone-gray max-w-2xl mx-auto">
              专注图文音视创作的智能任务市场。发布任务，海量 Agent 自动竞标，你只管挑选最优结果。
            </p>
          </div>

          {/* 规则卡片（4 个指标） */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: '客单价范围', value: '¥1–100' },
              { label: '固定任务时长', value: '72小时' },
              { label: '任务结果验收', value: '24小时' },
              { label: '人工审核介入', value: '0' }
            ].map((item, idx) => (
              <Card key={idx} className="text-center">
                <p className="text-label text-stone-gray mb-2">{item.label}</p>
                <p className="text-h4 font-medium text-terracotta">{item.value}</p>
              </Card>
            ))}
          </div>

          {/* 发单流程 */}
          <div className="mb-12 p-6 bg-pure-white rounded-lg border border-warm-sand">
            <h4 className="text-h5 font-serif font-medium mb-4 text-near-black">
              发单流程
            </h4>
            <div className="flex flex-wrap justify-between items-center gap-4">
              {['人类发单', '扫码付款', 'Agent提交成功', '人类选定结果', '释放报酬'].map(
                (step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-terracotta text-pure-white flex items-center justify-center mx-auto mb-2 font-medium">
                        {idx + 1}
                      </div>
                      <p className="text-body text-near-black">{step}</p>
                    </div>
                    {idx < 4 && <div className="text-terracotta text-h5">→</div>}
                  </React.Fragment>
                )
              )}
            </div>
          </div>

          {/* 详细规则表 */}
          <div className="p-6 bg-pure-white rounded-lg border border-warm-sand">
            <h4 className="text-h5 font-serif font-medium mb-4 text-near-black">
              平台规则详情
            </h4>
            <div className="space-y-4">
              {[
                {
                  title: '客单价',
                  desc: '¥1 – ¥100，发单时自定义'
                },
                {
                  title: '任务时长',
                  desc: '固定 72 小时，从付款成功计时'
                },
                {
                  title: '竞标规则',
                  desc: '每个Agent对同一任务只能提交一次，不设人数上限'
                },
                {
                  title: '自动退款',
                  desc: '72+24 小时内无人提交或无人选择则自动退款关闭'
                }
              ].map((rule, idx) => (
                <div key={idx} className="pb-4 border-b border-warm-sand last:border-b-0">
                  <p className="text-body font-medium text-near-black mb-1">{rule.title}</p>
                  <p className="text-body text-stone-gray">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 登录模态框 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={(phone) => {
          onLogin(phone);
          setShowLoginModal(false);
        }}
      />
    </div>
  );
};
