import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  CheckCircle,
  Clock,
  Sliders,
  BookOpen,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const AutoSchedulePage: React.FC = () => {
  const [confirmedSlots, setConfirmedSlots] = useState<number[]>([]);
  const [preferredSession, setPreferredSession] = useState<'morning' | 'afternoon' | 'evening'>('evening');
  const [pomodoroMinutes, setPomodoroMinutes] = useState<number>(60);

  const handleConfirmSlot = (id: number) => {
    if (!confirmedSlots.includes(id)) {
      setConfirmedSlots([...confirmedSlots, id]);
    }
  };

  const suggestedSlots = [
    {
      id: 1,
      title: 'Ôn tập Kiến trúc phần mềm & Design Patterns',
      subject: 'Nhập môn Công nghệ phần mềm',
      time: 'Thứ Năm (22/10) · 19:30 – 21:30 (120 phút)',
      priority: 'Khẩn cấp',
      difficulty: 'Khó',
      reason: 'Bù lịch cho buổi tối Thứ Ba bị lỡ; khung giờ tối có năng suất tập trung cao.',
      score: '98%',
      status: 'recommended',
    },
    {
      id: 2,
      title: 'Làm bài tập Lập chỉ mục & Tối ưu truy vấn SQL',
      subject: 'Cơ sở dữ liệu nâng cao',
      time: 'Thứ Bảy (24/10) · 08:30 – 10:30 (120 phút)',
      priority: 'Ưu tiên cao',
      difficulty: 'Trung bình',
      reason: 'Khoảng thời gian trống sáng cuối tuần trước buổi họp nhóm đồ án.',
      score: '94%',
      status: 'alternative',
    },
    {
      id: 3,
      title: 'Đọc tài liệu Giao thức TCP/IP và Socket Programming',
      subject: 'Mạng máy tính',
      time: 'Chủ Nhật (25/10) · 14:00 – 15:30 (90 phút)',
      priority: 'Trung bình',
      difficulty: 'Vừa',
      reason: 'Chuẩn bị bài lab tuần 4, không va chạm với lịch thi hay deadline nào.',
      score: '88%',
      status: 'alternative',
    },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* 1. Header Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Engine Xếp lịch học tự động</h1>
              <Badge variant="study">Module TV3 · Trịnh Nguyễn Huỳnh Nhi</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự động phân bổ khung giờ tự học tối ưu theo độ ưu tiên bài tập, độ khó môn học và giải quyết xung đột (BR3)
            </p>
          </div>
          <Badge variant="success" size="md">Sprint 0 Prototype</Badge>
        </div>

        {/* 2. Thống kê nhanh hiệu năng Engine */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>Slot tự học tuần này</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">12</span>
              <span className="text-xs text-slate-500">khung giờ</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Đạt 100% mục tiêu bài tập</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Điểm phù hợp sinh học</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-purple-700">96.4</span>
              <span className="text-xs text-slate-500">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Ưu tiên ca tối theo thói quen của An</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-600" />
              <span>Tổng giờ đề xuất</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">15.5</span>
              <span className="text-xs text-slate-500">giờ</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Đã trừ các ca học cố định TV2</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>Tái xếp lịch 1 chạm (BR3)</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600">Sẵn sàng</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Tự bù giờ khi lỡ buổi</p>
          </div>
        </div>

        {/* 3. Kịch bản Tình huống 2: Tái xếp lịch khi phát sinh việc đột xuất (BR3) */}
        <div className="mt-6 p-5 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-purple-950">
                  Kịch bản Tình huống 2: Tái xếp lịch tự động khi sinh viên lỡ buổi (Quy định BR3)
                </h3>
                <p className="text-xs text-purple-800">
                  Sinh viên An thông báo: <span className="font-semibold underline">"Bị đột xuất tăng ca tối Thứ Ba, lỡ buổi ôn thi CSDL"</span>. Engine tự động quét và đề xuất lịch bù:
                </p>
              </div>
            </div>
            <Badge variant="study" size="sm">Thuật toán BR3 kích hoạt</Badge>
          </div>

          {/* Danh sách 3 Khung giờ đề xuất bù */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-1">
            {suggestedSlots.map((slot) => {
              const isConfirmed = confirmedSlots.includes(slot.id);

              return (
                <div
                  key={slot.id}
                  className={`p-4 rounded-xl bg-white border transition-all duration-200 shadow-2xs flex flex-col justify-between ${
                    isConfirmed ? 'border-emerald-400 ring-2 ring-emerald-500/20' : 'border-purple-200 hover:border-purple-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
                        Độ phù hợp: {slot.score}
                      </span>
                      <Badge variant={slot.priority === 'Khẩn cấp' ? 'danger' : 'warning'} size="sm">
                        {slot.priority}
                      </Badge>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{slot.title}</h4>
                    <p className="text-[11px] font-semibold text-primary-700">{slot.subject}</p>
                    <p className="text-xs font-bold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{slot.time}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{slot.reason}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <Button
                      variant={isConfirmed ? 'secondary' : 'primary'}
                      size="sm"
                      className="w-full"
                      onClick={() => handleConfirmSlot(slot.id)}
                      icon={<CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      {isConfirmed ? 'Đã xếp vào TKB TV2' : 'Xác nhận áp dụng (1 chạm)'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Cấu hình Tham số Thuật toán (Engine Parameters) */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-white space-y-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-primary-600" />
            <span>Tùy chỉnh Thuật toán & Trọng số Sinh học cá nhân</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Buổi học yêu thích nhất</label>
              <div className="grid grid-cols-3 gap-1">
                {(['morning', 'afternoon', 'evening'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPreferredSession(s)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      preferredSession === s
                        ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s === 'morning' ? 'Sáng' : s === 'afternoon' ? 'Chiều' : 'Tối'}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">Engine ưu tiên xếp các môn khó vào buổi này</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Thời lượng 1 phiên tự học</label>
              <div className="grid grid-cols-3 gap-1">
                {[45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setPomodoroMinutes(mins)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      pomodoroMinutes === mins
                        ? 'bg-primary-600 text-white border-primary-600 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {mins} phút
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">Theo phương pháp Pomodoro chống mệt mỏi</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Quy tắc chống va chạm BR1</label>
              <div className="flex items-center gap-2 pt-1 text-xs text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Bảo vệ 100% lịch lớp & lịch thi</span>
              </div>
              <p className="text-[10px] text-slate-400">Tuyệt đối không xếp đè lên các sự kiện cố định của TV2</p>
            </div>
          </div>
        </div>

        {/* 5. Ghi chú Kiến trúc Kỹ thuật */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-primary-600" />
            <span>Mô hình thuật toán TV3 (Đặc tả thiết kế Sprint 0):</span>
          </div>
          <p>
            • Hàm mục tiêu: Tối đa hóa tổng điểm phù hợp (Độ ưu tiên × Độ khó × Nhịp sinh học) với ràng buộc không giao cắt khoảng thời gian bận từ TV2.
          </p>
          <p>
            • Khi sinh viên nhấn "Xác nhận áp dụng", slot đề xuất sẽ được lưu vào danh sách `suggested_slots` và đồng bộ tức thì sang Thời khóa biểu ma trận của Module TV2.
          </p>
        </div>
      </div>
    </div>
  );
};
