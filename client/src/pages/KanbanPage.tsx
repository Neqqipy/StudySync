import React, { useState } from 'react';
import {
  Kanban,
  BarChart3,
  Clock,
  CheckSquare,
  TrendingUp,
  Plus,
  Filter,
  Calendar,
  User,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const KanbanPage: React.FC = () => {
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const kanbanColumns = [
    {
      id: 'backlog',
      title: 'Backlog',
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      tasks: [
        {
          id: 't1',
          title: 'Khảo sát nhu cầu người dùng sinh viên HCMUS',
          subject: 'NMCNPM',
          assignee: 'Lê Huỳnh Anh Thư',
          priority: 'Trung bình',
          due: '30/10',
          subtasks: '1/3',
        },
        {
          id: 't2',
          title: 'Tối ưu hóa chỉ mục B-Tree CSDL lớn',
          subject: 'CSDL',
          assignee: 'Đào Ngọc Hưng',
          priority: 'Thấp',
          due: '05/11',
          subtasks: '0/2',
        },
      ],
    },
    {
      id: 'todo',
      title: 'Cần làm (Todo)',
      color: 'bg-sky-100 text-sky-800 border-sky-200',
      tasks: [
        {
          id: 't3',
          title: 'Viết test case tự động cho thuật toán BR2',
          subject: 'NMCNPM',
          assignee: 'Đỗ Quỳnh Anh Thư',
          priority: 'Ưu tiên cao',
          due: '23/10',
          subtasks: '2/4',
        },
        {
          id: 't4',
          title: 'Thiết kế slide thuyết trình Sprint 0',
          subject: 'NMCNPM',
          assignee: 'Nguyễn Đình Trung Kiên',
          priority: 'Trung bình',
          due: '25/10',
          subtasks: '1/2',
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'Đang làm (In Progress)',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      tasks: [
        {
          id: 't5',
          title: 'Hoàn thiện giao diện Thời khóa biểu TV2',
          subject: 'NMCNPM',
          assignee: 'Đào Ngọc Hưng',
          priority: 'Khẩn cấp',
          due: 'Hôm nay',
          subtasks: '4/4',
        },
        {
          id: 't6',
          title: 'Mô phỏng thuật toán xếp lịch TV3 (BR3)',
          subject: 'NMCNPM',
          assignee: 'Trịnh Nguyễn Huỳnh Nhi',
          priority: 'Ưu tiên cao',
          due: '22/10',
          subtasks: '3/4',
        },
      ],
    },
    {
      id: 'review',
      title: 'Đang Review (In Review)',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      tasks: [
        {
          id: 't7',
          title: 'Review Schema PostgreSQL cho TV2',
          subject: 'NMCNPM',
          assignee: 'Lê Huỳnh Anh Thư',
          priority: 'Trung bình',
          due: '21/10',
          subtasks: '2/2',
        },
      ],
    },
    {
      id: 'done',
      title: 'Hoàn thành (Done)',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      tasks: [
        {
          id: 't8',
          title: 'Khởi tạo khung dự án React + Tailwind',
          subject: 'NMCNPM',
          assignee: 'Đào Ngọc Hưng',
          priority: 'Ưu tiên cao',
          due: '15/10',
          subtasks: '3/3',
        },
        {
          id: 't9',
          title: 'Biên soạn tài liệu yêu cầu phần mềm SRS',
          subject: 'NMCNPM',
          assignee: 'Nguyễn Đình Trung Kiên',
          priority: 'Ưu tiên cao',
          due: '16/10',
          subtasks: '5/5',
        },
      ],
    },
  ];

  const subjectsDistribution = [
    { name: 'Nhập môn Công nghệ phần mềm', hours: 7.5, percent: 40, color: 'bg-primary-600' },
    { name: 'Cơ sở dữ liệu nâng cao', hours: 4.5, percent: 25, color: 'bg-purple-600' },
    { name: 'Mạng máy tính (Lý thuyết & Lab)', hours: 4.0, percent: 22, color: 'bg-sky-600' },
    { name: 'Tiếng Anh chuyên ngành CNTT', hours: 2.5, percent: 13, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* 1. Header Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Bảng Kanban & Thống kê học tập</h1>
              <Badge variant="primary">Module TV5 · Nguyễn Đình Trung Kiên</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Phân công công việc nhóm 5 người theo sprint và biểu đồ theo dõi giờ học thực tế theo tuần
            </p>
          </div>
          <Badge variant="success" size="md">Sprint 0 Prototype</Badge>
        </div>

        {/* 2. Thống kê năng suất học tập (4 KPI Cards) */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-600" />
              <span>Tổng giờ học tuần này</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">18.5</span>
              <span className="text-xs text-slate-500">giờ</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Đạt 115% mục tiêu 16h/tuần</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Công việc hoàn thành</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">8 / 10</span>
              <span className="text-xs text-slate-500">tasks</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Còn 2 task trước hạn Thứ Sáu</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Điểm năng suất Sprint 0</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-purple-700">94</span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium">Đúng tiến độ nộp bài 100%</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Trung bình tự học</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">2.6</span>
              <span className="text-xs text-slate-500">giờ / ngày</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Cao nhất vào Thứ Tư & Thứ Bảy</p>
          </div>
        </div>

        {/* 3. Phân bổ giờ học theo môn học (Subject Distribution Progress) */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-primary-600" />
              <span>Phân bổ thời gian học tập theo môn (Tuần 19/10 – 25/10)</span>
            </h4>
            <span className="text-xs font-semibold text-slate-500">Tổng cộng: 18.5 giờ</span>
          </div>

          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
            {subjectsDistribution.map((s, idx) => (
              <div
                key={idx}
                style={{ width: `${s.percent}%` }}
                className={`${s.color} transition-all`}
                title={`${s.name}: ${s.hours}h (${s.percent}%)`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {subjectsDistribution.map((s, idx) => (
              <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                  <span className="text-xs font-bold text-slate-800 truncate">{s.name}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-900">{s.hours} giờ</span>
                  <span>{s.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Bảng Kanban 5 Cột Hoàn chỉnh */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Kanban className="w-3.5 h-3.5 text-primary-600" />
              <span>Bảng công việc nhóm Kanban (Sprint 0 · 5 Cột)</span>
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Môn:
              </span>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
              >
                <option value="all">Tất cả môn học</option>
                <option value="NMCNPM">NMCNPM</option>
                <option value="CSDL">Cơ sở dữ liệu</option>
              </select>
              <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                + Thêm task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {kanbanColumns.map((col) => (
              <div
                key={col.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between min-h-[380px]"
              >
                {/* Header Cột */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800">{col.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${col.color}`}>
                      {col.tasks.length}
                    </span>
                  </div>

                  {/* Danh sách thẻ task trong cột */}
                  <div className="mt-2.5 space-y-2.5">
                    {col.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-grab space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-50 text-primary-700">
                            {task.subject}
                          </span>
                          <Badge
                            variant={
                              task.priority === 'Khẩn cấp'
                                ? 'danger'
                                : task.priority === 'Ưu tiên cao'
                                ? 'warning'
                                : 'secondary'
                            }
                            size="sm"
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        <h5 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-primary-700 transition-colors">
                          {task.title}
                        </h5>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span className="flex items-center gap-1 text-slate-600 font-medium">
                            <User className="w-3 h-3 text-slate-400" />
                            {task.assignee.split(' ').slice(-1)[0]}
                          </span>
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                            ✓ {task.subtasks}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer kéo thả */}
                <div className="mt-3 pt-2 border-t border-dashed border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Kéo thả thẻ vào cột này
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
