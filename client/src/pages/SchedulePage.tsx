import React, { useState, useEffect, useCallback } from 'react';
import { FixedEvent, Task, SuggestedStudySlot } from '../types';
import { api } from '../services/api';
import { WeeklyCalendarGrid } from '../components/schedule/WeeklyCalendarGrid';
import { SessionMatrixGrid } from '../components/schedule/SessionMatrixGrid';
import { TasksSidebar } from '../components/schedule/TasksSidebar';
import { CreateEventModal } from '../components/schedule/CreateEventModal';
import { EventDetailModal } from '../components/schedule/EventDetailModal';
import { WeekPickerPopover } from '../components/schedule/WeekPickerPopover';
import { ImportModal } from '../components/schedule/ImportModal';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  RotateCcw,
  Info,
  PanelRightClose,
  PanelRightOpen,
  LayoutGrid,
  Columns3,
  Upload,
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  // Lấy Thứ Hai của tuần hiện tại (chuẩn theo lịch Việt Nam GMT+7)
  const getMondayOfCurrentWeek = () => {
    const d = new Date();
    const vnTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const dayVn = vnTime.getUTCDay();
    const diffToMonday = dayVn === 0 ? -6 : 1 - dayVn;

    const mondayVnDate = vnTime.getUTCDate() + diffToMonday;
    const mondayVnMonth = vnTime.getUTCMonth();
    const mondayVnYear = vnTime.getUTCFullYear();

    return new Date(mondayVnYear, mondayVnMonth, mondayVnDate, 0, 0, 0, 0);
  };

  const [currentWeekMonday, setCurrentWeekMonday] = useState<Date>(getMondayOfCurrentWeek);
  const [fixedEvents, setFixedEvents] = useState<FixedEvent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [suggestedSlots, setSuggestedSlots] = useState<SuggestedStudySlot[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'matrix' | 'timeline'>('matrix');

  // 3 Trạng thái bắt buộc (Loading, Error, Empty)
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createInitialDate, setCreateInitialDate] = useState<Date | null>(null);
  const [createInitialHour, setCreateInitialHour] = useState<number>(8);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<FixedEvent | null>(null);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Tải dữ liệu lịch từ Backend
  const loadScheduleData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const y = currentWeekMonday.getFullYear();
      const m = currentWeekMonday.getMonth();
      const d = currentWeekMonday.getDate();
      // Bắt đầu tuần: Thứ Hai 00:00:00 (giờ VN) = UTC - 7 giờ
      const startUtc = new Date(Date.UTC(y, m, d, -7, 0, 0, 0)).toISOString();
      // Kết thúc tuần: Chủ Nhật 23:59:59 (giờ VN) = UTC + 7 ngày - 7 giờ
      const endUtc = new Date(Date.UTC(y, m, d + 7, -7, 0, 0, 0)).toISOString();

      const data = await api.getWeekSchedule(startUtc, endUtc);
      setFixedEvents(data.fixed_events || []);
      setTasks(data.tasks || []);
      setSuggestedSlots(data.suggested_slots || []);
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể tải dữ liệu thời khóa biểu');
    } finally {
      setIsLoading(false);
    }
  }, [currentWeekMonday]);

  useEffect(() => {
    loadScheduleData();
  }, [loadScheduleData]);

  // Điều hướng tuần
  const handlePrevWeek = () => {
    const d = new Date(currentWeekMonday);
    d.setDate(d.getDate() - 7);
    setCurrentWeekMonday(d);
  };

  const handleNextWeek = () => {
    const d = new Date(currentWeekMonday);
    d.setDate(d.getDate() + 7);
    setCurrentWeekMonday(d);
  };

  const handleToday = () => {
    setCurrentWeekMonday(getMondayOfCurrentWeek());
  };

  // Click vào ô trống trên lịch
  const handleCellClick = (date: Date, hour: number) => {
    setCreateInitialDate(date);
    setCreateInitialHour(hour);
    setIsCreateModalOpen(true);
  };

  // Click vào sự kiện để xem chi tiết
  const handleEventClick = (event: FixedEvent) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  // Tạo sự kiện cố định mới (BR1)
  const handleCreateFixedEvent = async (data: any) => {
    await api.createFixedEvent(data);
    await loadScheduleData();
  };

  // Cập nhật sự kiện cố định (BR1)
  const handleUpdateFixedEvent = async (id: string, data: any) => {
    await api.updateFixedEvent(id, data);
    await loadScheduleData();
  };

  // Xóa sự kiện cố định
  const handleDeleteFixedEvent = async (id: string) => {
    await api.deleteFixedEvent(id);
    await loadScheduleData();
  };

  // Tạo task mới (BR4)
  const handleCreateTask = async (data: any) => {
    await api.createTask(data);
    await loadScheduleData();
  };

  // Toggle hoàn thành task
  const handleToggleTask = async (task: Task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    try {
      await api.updateTask(task.id, { status: newStatus });
      await loadScheduleData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi cập nhật trạng thái');
    }
  };

  // Xóa task
  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa deadline này?')) return;
    try {
      await api.deleteTask(taskId);
      await loadScheduleData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi xóa công việc');
    }
  };

  // Reset dữ liệu về ban đầu (Dành cho demo)
  const handleResetData = async () => {
    if (!window.confirm('Đặt lại toàn bộ dữ liệu mẫu ban đầu cho sinh viên An?')) return;
    try {
      await api.resetData();
      await loadScheduleData();
    } catch (err: any) {
      alert(err.message || 'Lỗi khi đặt lại dữ liệu');
    }
  };

  // Format nhãn tiêu đề khoảng ngày trong tuần
  const formatWeekRangeLabel = () => {
    const monday = currentWeekMonday;
    const sunday = new Date(currentWeekMonday);
    sunday.setDate(sunday.getDate() + 6);

    const mD = monday.getDate().toString().padStart(2, '0');
    const mM = (monday.getMonth() + 1).toString().padStart(2, '0');
    const sD = sunday.getDate().toString().padStart(2, '0');
    const sM = (sunday.getMonth() + 1).toString().padStart(2, '0');
    const year = monday.getFullYear();

    return `${mD}/${mM} – ${sD}/${sM}/${year}`;
  };

  const hasNoEventsInWeek = fixedEvents.length === 0 && suggestedSlots.length === 0;

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 md:p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Lịch cá nhân & Thời khóa biểu
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Module TV2 · Sprint 0 Prototype
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Bản mẫu giao diện Thời khóa biểu sinh viên, quản lý lớp học cố định và hạn chót bài tập (Prototype)
          </p>
        </div>

        {/* Buttons Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
            icon={<Upload className="w-3.5 h-3.5 text-primary-600" />}
            title="Bản mẫu giao diện nhập file thời khóa biểu (Sprint 0 Prototype)"
          >
            Nhập file (.ics/.csv)
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetData}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            title="Khôi phục dữ liệu mẫu sinh viên An"
          >
            Dữ liệu mẫu
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            icon={isSidebarOpen ? <PanelRightClose className="w-3.5 h-3.5 text-slate-500" /> : <PanelRightOpen className="w-3.5 h-3.5 text-primary-600" />}
            title={isSidebarOpen ? "Thu gọn thanh Deadline để mở rộng lịch sang 100%" : "Mở thanh Deadline"}
          >
            {isSidebarOpen ? "Thu gọn Deadline" : `Hiện Deadline (${tasks.filter(t => t.status !== 'done').length})`}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setCreateInitialDate(new Date());
              setCreateInitialHour(8);
              setIsCreateModalOpen(true);
            }}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Thêm mới
          </Button>
        </div>
      </div>

      {/* 2. Navigation bar: < Tuần này > & Jump to Today */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200/80 shadow-2xs select-none">
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleToday}
            className="font-semibold text-slate-700"
          >
            Hôm nay
          </Button>

          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              onClick={handlePrevWeek}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              aria-label="Tuần trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-200" />
            <button
              type="button"
              onClick={handleNextWeek}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
              aria-label="Tuần sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="ml-2">
            <WeekPickerPopover
              currentWeekMonday={currentWeekMonday}
              onSelectMonday={(newMonday) => setCurrentWeekMonday(newMonday)}
              formatWeekLabel={formatWeekRangeLabel}
            />
          </div>
        </div>

        {/* Chuyển đổi chế độ xem: Ma trận 3 Buổi (Sáng - Chiều - Tối) vs Lưới giờ */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80">
          <button
            type="button"
            onClick={() => setViewMode('matrix')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'matrix'
                ? 'bg-white text-primary-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Thời khóa biểu Ma trận 3 Buổi (Sáng - Chiều - Tối) chuẩn HCMUS: T2..CN nằm ngang, toàn bảng hình chữ nhật nằm ngang"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>TKB 3 Buổi (Sáng - Chiều - Tối)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              viewMode === 'timeline'
                ? 'bg-white text-primary-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Lưới lịch tuần theo trục giờ (Google Calendar)"
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Lưới giờ (Google Calendar)</span>
          </button>
        </div>

        {/* Legend chú thích màu sắc */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-600 shrink-0" />
            <span>Lớp học cố định</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-600 shrink-0" />
            <span>Lịch thi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border-2 border-dashed border-purple-500 bg-purple-100 shrink-0" />
            <span>Gợi ý tự học (TV3)</span>
          </div>
        </div>
      </div>

      {/* 3. Banner thông báo lỗi nếu có (Error State) */}
      {errorMessage && (
        <ErrorBanner
          title="Không thể tải dữ liệu lịch"
          message={errorMessage}
          onRetry={loadScheduleData}
          onDismiss={() => setErrorMessage(null)}
        />
      )}

      {/* 4. Nội dung chính: Lưới lịch tuần + Sidebar Deadline */}
      {isLoading ? (
        // Loading Skeleton State
        <div className="flex flex-col lg:flex-row gap-5 items-start animate-pulse">
          <div className="flex-1 h-[600px] bg-slate-200/70 rounded-2xl w-full" />
          <div className="w-full lg:w-80 xl:w-[340px] h-[600px] bg-slate-200/70 rounded-2xl shrink-0" />
        </div>
      ) : hasNoEventsInWeek ? (
        // Empty State: Khi tuần chưa có sự kiện nào
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <div className="flex-1 w-full min-w-0">
            <EmptyState
              icon={<Calendar className="w-8 h-8" />}
              title="Tuần này bạn chưa có lịch học nào!"
              description="Hãy bắt đầu bằng cách thêm thủ công môn học/lịch thi hoặc khôi phục dữ liệu mẫu sinh viên An."
              action={{
                label: 'Thêm sự kiện ngay',
                icon: <Plus className="w-4 h-4" />,
                onClick: () => {
                  setCreateInitialDate(currentWeekMonday);
                  setCreateInitialHour(8);
                  setIsCreateModalOpen(true);
                },
              }}
              secondaryAction={{
                label: 'Dữ liệu mẫu sinh viên',
                icon: <RotateCcw className="w-4 h-4" />,
                onClick: handleResetData,
              }}
            />
          </div>
          <div className="w-full lg:w-80 xl:w-[340px] shrink-0">
            <TasksSidebar
              tasks={tasks}
              onToggleStatus={handleToggleTask}
              onAddTask={() => {
                setCreateInitialDate(new Date());
                setIsCreateModalOpen(true);
              }}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      ) : (
        // Lưới lịch tuần bình thường - Kéo dãn tối đa chiều ngang
        <div className="flex flex-col lg:flex-row gap-5 items-start transition-all">
          <div className="flex-1 min-w-0 w-full">
            {viewMode === 'matrix' ? (
              <SessionMatrixGrid
                currentWeekMonday={currentWeekMonday}
                events={fixedEvents}
                suggestedSlots={suggestedSlots}
                onCellClick={handleCellClick}
                onEventClick={handleEventClick}
                onSlotClick={(slot) => {
                  alert(`Khung giờ tự học đề xuất từ TV3: "${slot.title}"\nSẵn sàng tích hợp xác nhận lịch bù 1 chạm theo kịch bản tình huống 2!`);
                }}
              />
            ) : (
              <WeeklyCalendarGrid
                currentWeekMonday={currentWeekMonday}
                events={fixedEvents}
                suggestedSlots={suggestedSlots}
                onCellClick={handleCellClick}
                onEventClick={handleEventClick}
                onSlotClick={(slot) => {
                  alert(`Khung giờ tự học đề xuất từ TV3: "${slot.title}"\nSẵn sàng tích hợp xác nhận lịch bù 1 chạm theo kịch bản tình huống 2!`);
                }}
              />
            )}
          </div>

          {isSidebarOpen && (
            <div className="w-full lg:w-80 xl:w-[340px] shrink-0 lg:sticky lg:top-4 transition-all">
              <TasksSidebar
                tasks={tasks}
                onToggleStatus={handleToggleTask}
                onAddTask={() => {
                  setCreateInitialDate(new Date());
                  setIsCreateModalOpen(true);
                }}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          )}
        </div>
      )}

      {/* Thông tin nghiệp vụ trợ giúp */}
      <div className="p-4 rounded-xl bg-primary-50/60 border border-primary-100 flex items-start gap-3 text-xs text-primary-900">
        <Info className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">
            Đặc tả giao diện Phân hệ TV2 (Sprint 0 · Khung Prototype tĩnh):
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-primary-800">
            <li><strong>Giao diện Thời khóa biểu:</strong> Bố cục ma trận 3 buổi và lưới thời gian thực thể hiện các lớp học mẫu và lịch thi của sinh viên An.</li>
            <li><strong>Khung nhập bài tập & Deadline:</strong> Giao diện hiển thị danh sách bài tập kèm mức độ ưu tiên, phục vụ kết nối với Engine TV3.</li>
            <li><strong>Kế hoạch triển khai chức năng:</strong> Các quy tắc nghiệp vụ BR1 (chống trùng lịch) và backend lưu trữ sẽ được thực hiện ở các Sprint sau theo kế hoạch đồ án.</li>
          </ul>
        </div>
      </div>

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialDate={createInitialDate}
        initialHour={createInitialHour}
        onCreateFixedEvent={handleCreateFixedEvent}
        onCreateTask={handleCreateTask}
      />

      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEvent}
        onUpdateEvent={handleUpdateFixedEvent}
        onDeleteEvent={handleDeleteFixedEvent}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};
