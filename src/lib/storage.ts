// 数据类型定义
export interface Task {
  id: string;
  title: string;
  type: 'text' | 'audio' | 'video';
  description: string;
  budget: number;
  deadline: number; // 天数
  publisherId: string;
  status: 'pending' | 'progress' | 'review' | 'completed' | 'cancelled';
  createdAt: number;
  attachments: string[];
  bidders: Bidder[];
  submissions: Submission[];
}

export interface Bidder {
  agentId: string;
  agentName: string;
  bidTime: number;
  status: 'bidding' | 'accepted' | 'rejected';
}

export interface Submission {
  id: string;
  agentId: string;
  agentName: string;
  content: string;
  submittedAt: number;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
}

export interface User {
  id: string;
  name: string;
  type: 'human' | 'agent';
  phone?: string;
  isLoggedIn?: boolean;
  loginTime?: number;
}

// 存储键
const TASKS_KEY = 'caichong_tasks';
const USER_KEY = 'caichong_user';

// 获取当前用户
export function getCurrentUser(): User {
  const stored = localStorage.getItem(USER_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const user: User = {
    id: `user_${Date.now()}`,
    name: '人类用户',
    type: 'human'
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

// 获取所有任务
export function getAllTasks(): Task[] {
  const stored = localStorage.getItem(TASKS_KEY);
  return stored ? JSON.parse(stored) : [];
}

// 获取用户的任务
export function getUserTasks(): Task[] {
  const user = getCurrentUser();
  return getAllTasks().filter(task => task.publisherId === user.id);
}

// 创建任务
export function createTask(data: Omit<Task, 'id' | 'createdAt' | 'status' | 'bidders' | 'submissions'>): Task {
  const task: Task = {
    ...data,
    id: `task_${Date.now()}`,
    createdAt: Date.now(),
    status: 'pending',
    bidders: [],
    submissions: []
  };

  const tasks = getAllTasks();
  tasks.push(task);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

  return task;
}

// 获取单个任务
export function getTask(id: string): Task | null {
  const tasks = getAllTasks();
  return tasks.find(t => t.id === id) || null;
}

// 更新任务
export function updateTask(id: string, updates: Partial<Task>): Task | null {
  const tasks = getAllTasks();
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return null;

  tasks[index] = { ...tasks[index], ...updates };
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

  return tasks[index];
}

// 添加投标
export function addBidder(taskId: string, bidder: Bidder): Task | null {
  const task = getTask(taskId);
  if (!task) return null;

  task.bidders.push(bidder);
  task.status = 'progress';

  return updateTask(taskId, task);
}

// 提交方案
export function submitSolution(taskId: string, submission: Submission): Task | null {
  const task = getTask(taskId);
  if (!task) return null;

  task.submissions.push(submission);
  task.status = 'review';

  return updateTask(taskId, task);
}

// 审核方案
export function reviewSubmission(taskId: string, submissionId: string, approved: boolean, feedback?: string): Task | null {
  const task = getTask(taskId);
  if (!task) return null;

  const submission = task.submissions.find(s => s.id === submissionId);
  if (submission) {
    submission.status = approved ? 'approved' : 'rejected';
    submission.feedback = feedback;

    if (approved) {
      task.status = 'completed';
    }
  }

  return updateTask(taskId, task);
}

// 模拟数据初始化
export function initializeMockData() {
  if (getAllTasks().length === 0) {
    const mockTasks: Task[] = [
      {
        id: 'task_demo_1',
        title: '写一篇1000字的产品评测文章',
        type: 'text',
        description: '需要撰写关于新款智能手机的专业评测文章，要求包括外观、性能、续航等方面的评测。',
        budget: 500,
        deadline: 3,
        publisherId: 'demo_user',
        status: 'pending',
        createdAt: Date.now() - 86400000,
        attachments: [],
        bidders: [
          {
            agentId: 'agent_1',
            agentName: '文案大师 AI',
            bidTime: Date.now() - 3600000,
            status: 'accepted'
          }
        ],
        submissions: []
      },
      {
        id: 'task_demo_2',
        title: '配音5分钟企业宣传视频',
        type: 'audio',
        description: '需要为企业宣传视频提供专业配音，普通话标准，男性声音，温暖沉稳的风格。',
        budget: 800,
        deadline: 2,
        publisherId: 'demo_user',
        status: 'progress',
        createdAt: Date.now() - 172800000,
        attachments: [],
        bidders: [
          {
            agentId: 'agent_2',
            agentName: '音频大师',
            bidTime: Date.now() - 86400000,
            status: 'accepted'
          }
        ],
        submissions: [
          {
            id: 'sub_1',
            agentId: 'agent_2',
            agentName: '音频大师',
            content: '已完成配音，文件已提交。质量清晰，节奏适中。',
            submittedAt: Date.now() - 3600000,
            status: 'pending'
          }
        ]
      }
    ];

    localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
  }
}

// 用户登录相关函数
export function loginUser(phone: string): User {
  const user: User = {
    id: `user_${Date.now()}`,
    name: `用户${phone.slice(-4)}`,
    type: 'human',
    phone,
    isLoggedIn: true,
    loginTime: Date.now()
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser(): void {
  const user = getCurrentUser();
  if (user) {
    user.isLoggedIn = false;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function isUserLoggedIn(): boolean {
  const user = getCurrentUser();
  return user?.isLoggedIn ?? false;
}

