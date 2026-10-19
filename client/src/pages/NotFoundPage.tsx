import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">404 - Không tìm thấy trang</h1>
      <p className="text-xs text-slate-500 max-w-sm mb-6">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã được chuyển sang phân hệ khác.
      </p>
      <Button
        variant="primary"
        size="md"
        onClick={() => navigate('/schedule')}
        icon={<Home className="w-4 h-4" />}
      >
        Về Lịch cá nhân
      </Button>
    </div>
  );
};
