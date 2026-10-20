import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('StudySync ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = (): void => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = (): void => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/schedule';
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-card text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-danger-50 border border-danger-100 flex items-center justify-center text-danger-600 mb-5 shadow-2xs">
              <AlertOctagon className="w-7 h-7" />
            </div>

            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              Đã xảy ra lỗi ngoài ý muốn
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Ứng dụng gặp sự cố khi xử lý dữ liệu. Bạn có thể tải lại trang hoặc quay về trang chính để tiếp tục sử dụng.
            </p>

            {this.state.error?.message && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-left">
                <p className="text-xs font-mono text-slate-600 break-all line-clamp-3">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                onClick={this.handleReload}
                icon={<RefreshCw className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Tải lại trang
              </Button>
              <Button
                variant="secondary"
                onClick={this.handleGoHome}
                icon={<Home className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Về trang chính
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
