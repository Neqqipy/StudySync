import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  GraduationCap,
  KeyRound,
  Smartphone,
  Laptop,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const AuthPage: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div className="space-y-6 w-full">
      {/* 1. Header Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tài khoản sinh viên & Phân quyền</h1>
              <Badge variant="secondary">Module TV1 · Lê Huỳnh Anh Thư</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quản lý hồ sơ học tập sinh viên HCMUS, bảo mật 2 lớp và phân quyền trong nhóm đồ án
            </p>
          </div>
          <Badge variant="success" size="md">Sprint 0 Prototype</Badge>
        </div>

        {/* 2. Thẻ hồ sơ sinh viên chính (Profile Hero Card) */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-primary-50/20 to-indigo-50/30 border border-slate-200/80 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 text-white font-bold text-3xl flex items-center justify-center shadow-lg shadow-primary-500/20 shrink-0">
            NA
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="text-lg font-bold text-slate-900">Nguyễn Văn An</h3>
              <Badge variant="primary" size="sm">Sinh viên chính thức</Badge>
              <Badge variant="success" size="sm">Tài khoản đã xác thực</Badge>
            </div>

            <p className="text-xs text-slate-600 flex items-center justify-center md:justify-start gap-2">
              <GraduationCap className="w-4 h-4 text-primary-600 shrink-0" />
              <span>MSSV: 24120000 · Lớp: 24KTPM · Khoa Công nghệ Thông tin · ĐH Khoa học Tự nhiên</span>
            </p>

            <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>an.nguyen@studysync.local (Email trường: 24120000@student.hcmus.edu.vn)</span>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-700">
              <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                Tín chỉ HK1: <strong className="text-primary-700 font-bold">18 tín chỉ</strong>
              </span>
              <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                Điểm rèn luyện: <strong className="text-emerald-700 font-bold">95 (Xuất sắc)</strong>
              </span>
              <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                Nhóm đồ án: <strong className="text-indigo-700 font-bold">Nhóm 05</strong>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex md:flex-col gap-2">
            <Button variant="outline" size="sm">
              Chỉnh sửa hồ sơ
            </Button>
          </div>
        </div>

        {/* 3. Trung tâm Cài đặt Bảo mật & Đổi mật khẩu (Security Settings) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cột trái: Đổi mật khẩu */}
          <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-primary-600" />
              <span>Đổi mật khẩu tài khoản sinh viên</span>
            </h4>

            <form onSubmit={handleSavePassword} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mật khẩu mới (tối thiểu 8 ký tự)</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới an toàn..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Xác nhận lại mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button variant="primary" size="sm" type="submit">
                  Lưu thay đổi mật khẩu
                </Button>
                {passwordSaved && (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã cập nhật mật khẩu an toàn!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Cột phải: Bảo mật 2 lớp & Thiết bị đăng nhập */}
          <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Xác thực 2 bước (2FA) & Phiên đăng nhập</span>
              </h4>

              {/* Toggle 2FA */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-800">Xác thực 2 bước (2FA)</p>
                  <p className="text-[11px] text-slate-500">Mã OTP gửi qua ứng dụng Authenticator hoặc Email trường</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    is2FAEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      is2FAEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Danh sách thiết bị đăng nhập */}
              <div className="space-y-2 text-xs">
                <p className="font-semibold text-slate-600">Thiết bị đang hoạt động:</p>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-primary-600" />
                    <div>
                      <p className="font-bold text-slate-800">Chrome on Windows 11</p>
                      <p className="text-[10px] text-slate-400">TP. Hồ Chí Minh · Thiết bị này</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Đang hoạt động</Badge>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="font-bold text-slate-800">Safari on iPhone 15 Pro</p>
                      <p className="text-[10px] text-slate-400">Hoạt động 3 giờ trước</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">Đăng xuất</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Cài đặt Múi giờ & Ngôn ngữ hệ thống */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-primary-600" />
            <span>Quy ước Múi giờ & Định dạng hiển thị thời gian</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-slate-400 block mb-0.5">Múi giờ chuẩn hệ thống:</span>
              <span className="font-bold text-slate-800">Asia/Ho_Chi_Minh (UTC+7)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-slate-400 block mb-0.5">Định dạng ngày tháng:</span>
              <span className="font-bold text-slate-800">DD/MM/YYYY (Chuẩn Việt Nam)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-slate-400 block mb-0.5">Ngày đầu tuần:</span>
              <span className="font-bold text-slate-800">Thứ Hai (Monday)</span>
            </div>
          </div>
        </div>

        {/* 5. Ghi chú Kiến trúc CSDL & Quy định bảo mật TV1 */}
        <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Quy định bảo mật & Kiến trúc CSDL Module TV1 (SRS Mục 4.8):</span>
          </h4>
          <p>• Mật khẩu sinh viên được băm bằng thuật toán an toàn bcrypt / argon2 với salt ngẫu nhiên, tuyệt đối không lưu plain text.</p>
          <p>• Phân quyền RBAC (Role-Based Access Control): Sinh viên thường chỉ có quyền đọc/ghi lịch của mình; Trưởng nhóm có quyền tạo phiên họp chung và quản lý sprint đồ án.</p>
        </div>
      </div>
    </div>
  );
};
