import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  UploadCloud,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose }) => {
  const [selectedMockFile, setSelectedMockFile] = useState<string | null>(null);

  // Dữ liệu mẫu xem trước để minh họa giao diện prototype
  const mockPreviewItems = [
    {
      title: 'Nhập môn Công nghệ phần mềm (Lý thuyết)',
      type: 'Lớp học',
      time: 'Thứ Hai · 07:30 – 11:30',
      location: 'Phòng F.201 - Cơ sở 1',
      status: 'Hợp lệ',
    },
    {
      title: 'Mạng máy tính (Lý thuyết & Bài tập)',
      type: 'Lớp học',
      time: 'Thứ Tư · 13:30 – 16:45',
      location: 'Phòng I.41 - Cơ sở 1',
      status: 'Hợp lệ',
    },
    {
      title: 'Thi Giữa kỳ môn Cơ sở dữ liệu',
      type: 'Lịch thi',
      time: 'Thứ Bảy · 13:30 – 15:30',
      location: 'Giảng đường 1 - Cơ sở 1',
      status: 'Hợp lệ',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nhập thời khóa biểu (.ics / .csv)"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Banner thông báo trạng thái Prototype Sprint 0 */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold flex items-center gap-1.5">
              <span>Bản mẫu thiết kế giao diện (Sprint 0 Prototype UI)</span>
              <Badge variant="warning" size="sm">Chưa kích hoạt logic</Badge>
            </p>
            <p className="text-amber-800 leading-relaxed">
              Đây là khung giao diện mô phỏng quy trình kéo thả file và xem trước dữ liệu thời khóa biểu. Bộ phân tích file <code>.ics</code> / <code>.csv</code> cùng thuật toán kiểm tra trùng lịch (BR1) sẽ được hiện thực hóa ở <strong>Sprint 1</strong> theo đúng kế hoạch đồ án.
            </p>
          </div>
        </div>

        {/* Khung Kéo thả tải file mô phỏng */}
        <div
          onClick={() => setSelectedMockFile('thoikhoabieu_hk1_2026.ics')}
          className="border-2 border-dashed border-slate-300 hover:border-primary-400 hover:bg-primary-50/20 rounded-2xl p-6 text-center transition-all cursor-pointer group"
          title="Bấm để xem thử trạng thái đã chọn file"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-bold text-slate-800">
            Kéo thả file thời khóa biểu vào đây, hoặc <span className="text-primary-600 underline">chọn từ máy tính</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Hỗ trợ định dạng iCalendar chuẩn (<code>.ics</code>) và bảng tính (<code>.csv</code>) · Dung lượng tối đa 5MB
          </p>

          {selectedMockFile && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Đã chọn file mô phỏng: {selectedMockFile}</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          )}
        </div>

        {/* Bảng xem trước dữ liệu mẫu (Mockup Preview Table) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary-600" />
              <span>Xem trước dữ liệu sau khi phân tích (Minh họa giao diện)</span>
            </h4>
            <Badge variant="success" size="sm">3 môn hợp lệ</Badge>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Tên môn học / Sự kiện</th>
                  <th className="py-2.5 px-3 font-bold">Phân loại</th>
                  <th className="py-2.5 px-3 font-bold">Thời gian học</th>
                  <th className="py-2.5 px-3 font-bold">Địa điểm</th>
                  <th className="py-2.5 px-3 font-bold text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockPreviewItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-3 font-semibold text-slate-900">{item.title}</td>
                    <td className="py-2 px-3">
                      <Badge variant={item.type === 'Lịch thi' ? 'danger' : 'primary'} size="sm">
                        {item.type}
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-slate-700">{item.time}</td>
                    <td className="py-2 px-3 text-slate-500">{item.location}</td>
                    <td className="py-2 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 italic">
            * Tính năng sẽ được kích hoạt xử lý thực tế ở Sprint 1
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Đóng
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled
              title="Chức năng sẽ được hoàn thiện ở Sprint 1 theo kế hoạch"
              icon={<Sparkles className="w-3.5 h-3.5 text-slate-400" />}
            >
              Xác nhận nhập (Sprint 1)
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
