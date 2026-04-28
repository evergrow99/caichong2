import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'font-sans font-medium rounded-lg transition-all duration-200 cursor-pointer';

  const variantClasses: Record<string, string> = {
    primary: 'bg-terracotta text-pure-white hover:opacity-90 active:opacity-80',
    secondary: 'bg-warm-sand text-near-black hover:opacity-90 active:opacity-80',
    white: 'bg-pure-white text-near-black border border-warm-sand hover:border-stone-gray',
    dark: 'bg-near-black text-pure-white hover:opacity-90 active:opacity-80'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-3 py-2 text-label',
    md: 'px-4 py-2.5 text-body',
    lg: 'px-6 py-3 text-h6'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-label font-medium mb-2 text-near-black">{label}</label>}
      <input
        className={`w-full px-3 py-2 border rounded-lg font-sans text-body transition-colors
          ${error ? 'border-error-crimson' : 'border-warm-sand'}
          focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent
          placeholder-stone-gray`}
        {...props}
      />
      {error && <p className="text-error-crimson text-label mt-1">{error}</p>}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-label font-medium mb-2 text-near-black">{label}</label>}
      <textarea
        className={`w-full px-3 py-2 border rounded-lg font-sans text-body transition-colors resize-vertical
          ${error ? 'border-error-crimson' : 'border-warm-sand'}
          focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent
          placeholder-stone-gray`}
        {...props}
      />
      {error && <p className="text-error-crimson text-label mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-label font-medium mb-2 text-near-black">{label}</label>}
      <select
        className={`w-full px-3 py-2 border rounded-lg font-sans text-body transition-colors
          ${error ? 'border-error-crimson' : 'border-warm-sand'}
          focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent`}
        {...props}
      >
        <option value="">请选择</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error-crimson text-label mt-1">{error}</p>}
    </div>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-ivory border border-warm-sand rounded-lg p-6 shadow-level-1 ${className}`}>
      {children}
    </div>
  );
};

interface Badge {
  status: 'pending' | 'progress' | 'review' | 'completed' | 'cancelled' | 'accepted' | 'rejected' | 'approved';
  text: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: 'bg-warm-sand', text: 'text-near-black' },
  progress: { bg: 'bg-focus-blue/10', text: 'text-focus-blue' },
  review: { bg: 'bg-coral/10', text: 'text-coral' },
  completed: { bg: 'bg-green-100', text: 'text-green-700' },
  cancelled: { bg: 'bg-stone-gray/10', text: 'text-stone-gray' },
  accepted: { bg: 'bg-green-100', text: 'text-green-700' },
  rejected: { bg: 'bg-error-crimson/10', text: 'text-error-crimson' },
  approved: { bg: 'bg-green-100', text: 'text-green-700' }
};

const statusLabels: Record<string, string> = {
  pending: '待接单',
  progress: '进行中',
  review: '待验收',
  completed: '已完成',
  cancelled: '已取消',
  accepted: '已接受',
  rejected: '已拒绝',
  approved: '已批准'
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors = statusColors[status] || statusColors.pending;
  const label = statusLabels[status] || status;

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-label font-medium ${colors.bg} ${colors.text}`}>
      {label}
    </span>
  );
};
