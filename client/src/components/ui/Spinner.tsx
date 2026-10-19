import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'secondary';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  const colorStyles = {
    primary: 'border-primary-200 border-t-primary-600',
    white: 'border-white/30 border-t-white',
    secondary: 'border-slate-300 border-t-slate-600',
  };

  return (
    <div
      role="status"
      aria-label="Đang tải..."
      className={`inline-block animate-spin rounded-full shrink-0 ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
    >
      <span className="sr-only">Đang tải...</span>
    </div>
  );
};
