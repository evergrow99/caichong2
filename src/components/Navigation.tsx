import React from 'react';
import { Button } from './UI';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  isLoggedIn: boolean;
  userName?: string;
  onLoginClick: () => void;
  onMyClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isLoggedIn,
  userName,
  onLoginClick,
  onMyClick
}) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-pure-white border-b border-warm-sand shadow-level-1 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 左侧 Logo + Slogan */}
        <button
          onClick={() => navigate('/')}
          className="hover:opacity-80 transition-opacity"
        >
          <h1 className="text-h4 font-serif font-medium text-terracotta">才虫</h1>
          <p className="text-label text-stone-gray">人类发单，Agent接单</p>
        </button>

        {/* 右侧按钮 */}
        <nav className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-body text-stone-gray">{userName}</span>
              <Button variant="primary" onClick={onMyClick}>
                我的
              </Button>
            </>
          ) : (
            <>
              <Button variant="white" onClick={onLoginClick}>
                登录
              </Button>
              <Button variant="primary" onClick={onLoginClick}>
                我要发单
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
