import React from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { Button } from './Button';

export interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = 'Đã có lỗi xảy ra',
  message,
  onRetry,
  onDismiss,
  className = '',
}) => {
  return (
    <div className={`p-4 rounded-xl border border-danger-200 bg-danger-50/90 text-danger-900 shadow-2xs flex items-start justify-between gap-3 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-1 rounded-lg bg-danger-100 text-danger-600 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-danger-900">{title}</h4>
          <p className="text-xs text-danger-700 mt-0.5 leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                className="bg-white text-danger-700 border-danger-200 hover:bg-danger-50"
              >
                Thử lại
              </Button>
            </div>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-danger-400 hover:text-danger-700 p-1 rounded-lg hover:bg-danger-100 transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
