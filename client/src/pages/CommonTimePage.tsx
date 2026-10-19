import React, { useState } from 'react';
import {
  Users,
  Search,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  Calendar,
  Bell,
  Video,
  MapPin,
  Check,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const CommonTimePage: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [invitedSlotId, setInvitedSlotId] = useState<number | null>(null);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 500);
  };

  const handleSendInvite = (slotId: number) => {
    setInvitedSlotId(slotId);
  };

  // Ma trận nhiệt tuần (7 ngày x 3 buổi: số người rảnh / 5)
  const heatmapData = [
    { day: 'Thứ Hai', morning: '3/5', afternoon: '1/5', evening: '4/5' },
    { day: 'Thứ Ba', morning: '4/5', afternoon: '2/5', evening: '3/5' },
    { day: 'Thứ Tư', morning: '2/5', afternoon: '1/5', evening: '4/5' },
    { day: 'Thứ Năm', morning: '3/5', afternoon: '3/5', evening: '5/5' }, // 5/5 Vàng
    { day: 'Thứ Sáu', morning: '4/5', afternoon: '2/5', evening: '4/5' },
    { day: 'Thứ Bảy', morning: '4/5', afternoon: '4/5', evening: '3/5' },
    { day: 'Chủ Nhật', morning: '5/5', afternoon: '4/5', evening: '4/5' }, // 5/5 Sáng
  ];

  return (
    <div className="space-y-6 w-full">
      {/* 1. Header Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tìm giờ họp chung & Nhắc việc nhóm</h1>
              <Badge variant="warning">Module TV4 · Đỗ Quỳnh Anh Thư</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự động đối chiếu lịch cá nhân TV2 của tất cả thành viên, tìm khung giờ rảnh nhiều nhất mà không lộ tên môn học (BR2)
            </p>
          </div>
          <Badge variant="success" size="md">Sprint 0 Prototype</Badge>
        </div>

        {/* 2. Thống kê nhanh hiệu quả tìm giờ họp */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Thành viên nhóm</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">5 / 5</span>
              <span className="text-xs text-slate-500">đã liên kết TKB</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Dữ liệu đồng bộ tự động</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-600" />
              <span>Thời gian chốt giờ</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-600">~ 2 giây</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Thay vì chờ lập poll 4-6 tiếng</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bảo mật riêng tư BR2</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-700">100%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Chỉ chia sẻ trạng thái Bận/Rảnh</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-purple-600" />
              <span>Hệ thống nhắc việc</span>
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-purple-700">Đang bật</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Nhắc trước deadline 24h & 3h</p>
          </div>
        </div>

        {/* 3. Tình huống 1: Tìm giờ họp nhóm 5 bạn */}
        <div className="mt-6 p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-600 text-white shadow-2xs">
                <Users className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Kịch bản Demo Tình huống 1: Tìm giờ họp nhóm 5 người (Tuân thủ BR2)
                </h3>
                <p className="text-xs text-amber-800">
                  Tổng hợp lịch cá nhân từ API `GET /api/v1/schedule/free-busy` của An, Kiên, Nhi, Thư, Thư.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-amber-200 text-xs">
                {[45, 60, 90].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDuration(d)}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      selectedDuration === d
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {d}p
                  </button>
                ))}
              </div>

              <Button
                variant="primary"
                size="sm"
                isLoading={isSearching}
                onClick={handleSearch}
                icon={<Search className="w-3.5 h-3.5" />}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Quét giờ rảnh
              </Button>
            </div>
          </div>

          {/* Kết quả 3 Khung giờ đề xuất */}
          {hasSearched && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-white border border-emerald-300 shadow-2xs space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Tối ưu nhất (5/5 bạn rảnh)
                    </span>
                    <Badge variant="success" size="sm">100%</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">Thứ Năm (22/10) · 20:00 – 21:00</h4>
                  <p className="text-xs text-slate-600 mt-1">Giờ họp định kỳ D5. Sau ca học của An và Nhi, cả 5 bạn đều trống lịch.</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <Video className="w-3.5 h-3.5 text-primary-600" />
                    <span>Hình thức: Google Meet (Online)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Button
                    variant={invitedSlotId === 1 ? 'secondary' : 'primary'}
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleSendInvite(1)}
                    icon={invitedSlotId === 1 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
                  >
                    {invitedSlotId === 1 ? 'Đã gửi lời mời tới 5 bạn' : 'Chốt giờ & Gửi lời mời (1 chạm)'}
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
                      Khung giờ dự phòng 1
                    </span>
                    <Badge variant="warning" size="sm">4/5 bạn rảnh (80%)</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">Thứ Bảy (24/10) · 14:00 – 15:30</h4>
                  <p className="text-xs text-slate-600 mt-1">Kiên vướng ca làm thêm part-time, 4 bạn An, Nhi, Thư, Thư đều rảnh.</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>Hình thức: Thư viện Cơ sở 1</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Button
                    variant={invitedSlotId === 2 ? 'secondary' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => handleSendInvite(2)}
                    icon={invitedSlotId === 2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
                  >
                    {invitedSlotId === 2 ? 'Đã gửi lời mời' : 'Chọn khung giờ này'}
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                      Khung giờ dự phòng 2
                    </span>
                    <Badge variant="secondary" size="sm">4/5 bạn rảnh (80%)</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">Chủ Nhật (25/10) · 09:00 – 10:30</h4>
                  <p className="text-xs text-slate-600 mt-1">Buổi sáng cuối tuần, phù hợp review lại slide trước buổi báo cáo đồ án.</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <Video className="w-3.5 h-3.5 text-primary-600" />
                    <span>Hình thức: Google Meet (Online)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Button
                    variant={invitedSlotId === 3 ? 'secondary' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => handleSendInvite(3)}
                    icon={invitedSlotId === 3 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Send className="w-3.5 h-3.5" />}
                  >
                    {invitedSlotId === 3 ? 'Đã gửi lời mời' : 'Chọn khung giờ này'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Ma trận Nhiệt Rảnh/Bận của nhóm (Weekly Availability Heatmap) */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span>Ma trận Mức độ Rảnh theo tuần (Weekly Heatmap 5 thành viên)</span>
            </h4>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> 5/5 Rảnh (100%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-200" /> 4/5 Rảnh (80%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-200" /> 3/5 Rảnh (60%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-200" /> Bận nhiều (&lt;50%)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 px-3 text-left font-bold">Thứ / Ngày</th>
                  <th className="py-2 px-3 font-bold">Sáng (07:00 – 12:00)</th>
                  <th className="py-2 px-3 font-bold">Chiều (12:30 – 17:30)</th>
                  <th className="py-2 px-3 font-bold">Tối (18:00 – 22:00)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {heatmapData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-left font-bold text-slate-800">{row.day}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                        row.morning === '5/5' ? 'bg-emerald-500 text-white' : row.morning === '4/5' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.morning}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                        row.afternoon === '5/5' ? 'bg-emerald-500 text-white' : row.afternoon === '4/5' ? 'bg-emerald-100 text-emerald-800' : row.afternoon === '3/5' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {row.afternoon}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                        row.evening === '5/5' ? 'bg-emerald-500 text-white shadow-xs' : row.evening === '4/5' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {row.evening}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Trung tâm Cài đặt Nhắc việc tự động (Notification Center) */}
        <div className="mt-6 p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-purple-600" />
            <span>Kênh thông báo & Nhắc việc tự động trước hạn</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-800">Email sinh viên HCMUS</span>
              <p className="text-[11px] text-slate-500">Gửi tóm tắt công việc mỗi 07:00 sáng hàng ngày</p>
              <Badge variant="success" size="sm">Đã kích hoạt</Badge>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-800">Thông báo Trình duyệt (Web Push)</span>
              <p className="text-[11px] text-slate-500">Nhắc nhở trước giờ học hoặc deadline 30 phút</p>
              <Badge variant="success" size="sm">Đã cấp quyền</Badge>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200/70 space-y-1">
              <span className="font-bold text-slate-800">Webhook Nhóm Telegram</span>
              <p className="text-[11px] text-slate-500">Tự động báo giờ họp chung vào nhóm chat</p>
              <Badge variant="primary" size="sm">Kết nối sẵn</Badge>
            </div>
          </div>
        </div>

        {/* 6. BR2 Privacy Guarantee Banner */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
          <h4 className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cam kết tuân thủ Quy định nghiệp vụ BR2 (Bảo vệ tính riêng tư):</span>
          </h4>
          <p>
            Endpoint <code>GET /api/v1/schedule/free-busy</code> do thành viên TV2 cung cấp tuyệt đối chỉ trả về các khoảng thời gian <code>{"{ start_time, end_time, status: 'busy' }"}</code>. Hệ thống hoàn toàn loại bỏ tên môn học, phòng học hay thông tin cá nhân của bạn khi chia sẻ trong nhóm.
          </p>
        </div>
      </div>
    </div>
  );
};
