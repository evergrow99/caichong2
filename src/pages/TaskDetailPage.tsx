import React, { useEffect, useState } from 'react';
import { Button, Card, StatusBadge, TextArea } from '../components/UI';
import { getTask, type Task, reviewSubmission } from '../lib/storage';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [feedback, setFeedback] = useState('');
  const [reviewingSubmissionId, setReviewingSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    if (taskId) {
      const t = getTask(taskId);
      setTask(t);
    }
  }, [taskId]);

  const handleApproveSubmission = (submissionId: string) => {
    if (taskId && task) {
      const updated = reviewSubmission(taskId, submissionId, true, feedback);
      if (updated) {
        setTask(updated);
        setFeedback('');
        setReviewingSubmissionId(null);
        alert('已批准该方案，任务完成！');
      }
    }
  };

  const handleRejectSubmission = (submissionId: string) => {
    if (taskId && task) {
      const updated = reviewSubmission(taskId, submissionId, false, feedback);
      if (updated) {
        setTask(updated);
        setFeedback('');
        setReviewingSubmissionId(null);
        alert('已驳回，请等待Agent重新提交');
      }
    }
  };

  if (!task) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* 顶部导航 */}
      <header className="sticky top-0 bg-pure-white border-b border-warm-sand shadow-level-1 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/my-tasks')} className="text-h4 font-serif font-medium text-terracotta hover:opacity-80">
            ← 返回
          </button>
          <h1 className="text-h5 font-serif font-medium">任务详情</h1>
          <StatusBadge status={task.status} />
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 任务信息 */}
          <Card>
            <div className="space-y-6">
              <div>
                <h2 className="text-h2 font-serif font-medium text-near-black mb-3">{task.title}</h2>
                <p className="text-h6 text-stone-gray">{task.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-warm-sand">
                <div>
                  <p className="text-label text-stone-gray mb-1">任务类型</p>
                  <p className="text-body font-medium text-near-black">
                    {task.type === 'text' ? '图文创作' : task.type === 'audio' ? '音频制作' : '视频制作'}
                  </p>
                </div>
                <div>
                  <p className="text-label text-stone-gray mb-1">预算</p>
                  <p className="text-h5 font-medium text-terracotta">¥{task.budget}</p>
                </div>
                <div>
                  <p className="text-label text-stone-gray mb-1">期限</p>
                  <p className="text-body font-medium text-near-black">{task.deadline}天</p>
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

          {/* 接单者列表 */}
          <div>
            <h3 className="text-h4 font-serif font-medium mb-4 text-near-black">接单者 ({task.bidders.length})</h3>
            {task.bidders.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-stone-gray text-body">暂无Agent接单</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {task.bidders.map(bidder => (
                  <Card key={bidder.agentId} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-h6 font-serif font-medium text-near-black">{bidder.agentName}</p>
                      <p className="text-label text-stone-gray">
                        接单于 {new Date(bidder.bidTime).toLocaleString('zh-CN')}
                      </p>
                    </div>
                    <StatusBadge status={bidder.status} />
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* 提交的方案 */}
          <div>
            <h3 className="text-h4 font-serif font-medium mb-4 text-near-black">提交的方案 ({task.submissions.length})</h3>
            {task.submissions.length === 0 ? (
              <Card className="text-center py-8">
                <p className="text-stone-gray text-body">还没有Agent提交方案</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {task.submissions.map(submission => (
                  <Card key={submission.id} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-h6 font-serif font-medium text-near-black">{submission.agentName}</p>
                        <p className="text-label text-stone-gray">
                          提交于 {new Date(submission.submittedAt).toLocaleString('zh-CN')}
                        </p>
                      </div>
                      <StatusBadge status={submission.status} />
                    </div>

                    <p className="text-body text-near-black bg-ivory p-4 rounded-lg">
                      {submission.content}
                    </p>

                    {submission.feedback && (
                      <div className="bg-warm-sand p-4 rounded-lg">
                        <p className="text-label font-medium text-stone-gray mb-1">你的反馈</p>
                        <p className="text-body text-near-black">{submission.feedback}</p>
                      </div>
                    )}

                    {/* 验收操作 */}
                    {submission.status === 'pending' && (
                      <div className="pt-4 border-t border-warm-sand">
                        {reviewingSubmissionId === submission.id ? (
                          <div className="space-y-3">
                            <TextArea
                              placeholder="输入你的反馈或修改建议..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button
                                variant="white"
                                onClick={() => {
                                  setReviewingSubmissionId(null);
                                  setFeedback('');
                                }}
                              >
                                取消
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => handleApproveSubmission(submission.id)}
                              >
                                ✓ 批准
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => handleRejectSubmission(submission.id)}
                              >
                                ✕ 驳回
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => setReviewingSubmissionId(submission.id)}
                          >
                            验收此方案
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
