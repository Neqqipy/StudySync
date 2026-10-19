import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  FolderGit2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const GroupsPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const members = [
    {
      name: 'Nguyễn Đình Trung Kiên',
      role: 'Team Leader · Quản lý Sprint & TV5',
      id: '24120195',
      email: 'kien.nguyen@studysync.local',
      avatar: 'TK',
      status: 'Online',
    },
    {
      name: 'Trịnh Nguyễn Huỳnh Nhi',
      role: 'Backend & Engine Xếp lịch (TV3)',
      id: '24120404',
      email: 'nhi.trinh@studysync.local',
      avatar: 'HN',
      status: 'Online',
    },
    {
      name: 'Lê Huỳnh Anh Thư',
      role: 'System Architect & TV1 (Tài khoản)',
      id: '24120226',
      email: 'thu.le@studysync.local',
      avatar: 'AT',
      status: 'Vừa hoạt động',
    },
    {
      name: 'Đỗ Quỳnh Anh Thư',
      role: 'QA/Tester & TV4 (Giờ họp nhóm)',
      id: '24120143',
      email: 'thu.do@studysync.local',
      avatar: 'QA',
      status: 'Offline',
    },
    {
      name: 'Đào Ngọc Hưng',
      role: 'Developer phụ trách TV2 (Lịch & Import)',
      id: '24120319',
      email: 'hung.dao@studysync.local',
      avatar: 'NH',
      status: 'Online',
    },
  ];

  const otherGroups = [
    {
      name: 'Nhóm 08 · Môn Mạng máy tính',
      code: 'MMT_24_1',
      membersCount: 3,
      role: 'Thành viên',
      topic: 'Xây dựng ứng dụng Chat Client-Server đa luồng bằng Socket C++',
      deadline: '28/10/2026',
    },
    {
      name: 'Nhóm 02 · Hệ cơ sở dữ liệu nâng cao',
      code: 'CSDL_24_1',
      membersCount: 4,
      role: 'Thành viên',
      topic: 'Thiết kế cơ sở dữ liệu phân tán & Tối ưu hóa truy vấn',
      deadline: '05/11/2026',
    },
  ];

  const activities = [
    { user: 'Đào Ngọc Hưng', action: 'Đã hoàn thành module TV2 và kiểm tra 35 unit test', time: '10 phút trước' },
    { user: 'Nguyễn Đình Trung Kiên', action: 'Đã cập nhật bảng Kanban mục tiêu Sprint 0', time: '1 giờ trước' },
    { user: 'Trịnh Nguyễn Huỳnh Nhi', action: 'Đã tạo kịch bản mô phỏng tái xếp lịch BR3', time: 'Hôm qua' },
    { user: 'Đỗ Quỳnh Anh Thư', action: 'Đã kiểm thử thuật toán BR2 bảo mật dữ liệu', time: '2 ngày trước' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* 1. Header Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý Nhóm đồ án sinh viên</h1>
              <Badge variant="secondary">Module TV1 · Lê Huỳnh Anh Thư</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tạo nhóm môn học, mời thành viên tham gia qua liên kết và quản trị phân quyền nhóm đồ án
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" icon={<UserPlus className="w-4 h-4" />}>
              + Tạo nhóm mới
            </Button>
          </div>
        </div>

        {/* 2. Thống kê nhanh nhóm */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary-600" />
              <span>Số nhóm tham gia</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">3</span>
              <span className="text-xs text-slate-500">nhóm đồ án</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Đang hoạt động trong học kỳ này</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thành viên nhóm chính</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">5 / 5</span>
              <span className="text-xs text-slate-500">đủ thành viên</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">Nhóm 05 - NMCNPM</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Tiến độ Sprint 0</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-purple-700">100%</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">Sẵn sàng nộp báo cáo</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Vai trò của An</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-800">Developer</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Phụ trách phân hệ TV2</p>
          </div>
        </div>

        {/* 3. Nhóm chính: Nhóm 05 - Đồ án StudySync */}
        <div className="mt-6 p-5 rounded-2xl border border-primary-200 bg-primary-50/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-primary-600 text-white">
                  <FolderGit2 className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-slate-900">Nhóm 05 – Đồ án môn học StudySync</h3>
                <Badge variant="success" size="sm">Nhóm chính · 5 Thành viên</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Môn: Nhập môn Công nghệ Phần mềm · Giảng viên hướng dẫn: Thầy TS. Huỳnh Bằng Phát
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              icon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-primary-600" />}
            >
              {copiedLink ? 'Đã sao chép link mời!' : 'Sao chép link mời nhóm'}
            </Button>
          </div>

          {/* Danh sách 5 thành viên nhóm */}
          <div className="border-t border-slate-200/70 pt-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-primary-600" />
              <span>Danh sách thành viên & Phân công vai trò Sprint 0 (5/5)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3 hover:border-primary-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {m.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{m.name}</p>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${m.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    </div>
                    <p className="text-[11px] font-semibold text-primary-700 truncate">{m.role}</p>
                    <p className="text-[10px] text-slate-400 font-mono">MSSV: {m.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Các nhóm môn học khác (Multi-groups support) */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-white space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4 text-slate-500" />
            <span>Các nhóm môn học khác của bạn (Học kỳ 1/2026-2027)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherGroups.map((g, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{g.name}</span>
                  <Badge variant="secondary" size="sm">{g.code}</Badge>
                </div>
                <p className="text-xs text-slate-600 leading-snug">{g.topic}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>Quy mô: {g.membersCount} bạn</span>
                  <span className="text-rose-600 font-semibold">Hạn: {g.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Nhật ký hoạt động nhóm gần đây (Activity Feed) */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary-600" />
            <span>Nhật ký hoạt động đồ án gần đây</span>
          </h4>

          <div className="space-y-2 text-xs">
            {activities.map((a, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />
                  <span className="font-bold text-slate-800">{a.user}</span>
                  <span className="text-slate-600">{a.action}</span>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
