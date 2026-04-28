import React, { useState } from 'react';
import { Button, Card, Input } from './UI';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleGetCode = () => {
    setPhoneError('');
    if (phone.length < 11) {
      setPhoneError('请输入11位手机号');
      return;
    }
    setStep('code');
  };

  const handleConfirm = () => {
    setCodeError('');
    if (code.length < 4) {
      setCodeError('请输入4-6位验证码');
      return;
    }
    // 模拟验证成功
    onSuccess(phone);
    handleClose();
  };

  const handleClose = () => {
    setStep('phone');
    setPhone('');
    setCode('');
    setPhoneError('');
    setCodeError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 space-y-6">
        <h2 className="text-h4 font-serif font-medium text-near-black">
          {step === 'phone' ? '手机号登录' : '验证码'}
        </h2>

        {step === 'phone' ? (
          <div className="space-y-4">
            <Input
              label="手机号"
              placeholder="请输入11位手机号"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.replace(/\D/g, ''));
                setPhoneError('');
              }}
              maxLength={11}
              error={phoneError}
            />
            <div className="flex gap-3">
              <Button variant="white" onClick={handleClose} className="flex-1">
                取消
              </Button>
              <Button variant="primary" onClick={handleGetCode} className="flex-1">
                获取验证码
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-body text-stone-gray">
              已发送验证码至 <span className="font-medium text-near-black">{phone}</span>
            </p>
            <Input
              label="验证码"
              placeholder="请输入4-6位验证码"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, ''));
                setCodeError('');
              }}
              maxLength={6}
              error={codeError}
            />
            <div className="flex gap-3">
              <Button variant="white" onClick={() => setStep('phone')} className="flex-1">
                返回
              </Button>
              <Button variant="primary" onClick={handleConfirm} className="flex-1">
                确认登录
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
