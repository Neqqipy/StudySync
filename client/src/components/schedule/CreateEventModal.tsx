import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { BookOpen, AlertTriangle, Clock, Calendar, CheckCircle } from 'lucide-react';
import { TaskPriority, TaskDifficulty } from '../../types';

export interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date | null;
  initialHour?: number;
  onCreateFixedEvent: (data: {
    title: string;
    event_type: 'class' | 'exam';
    start_time: string;
    end_time: string;
    is_recurring?: boolean;
    recurrence_until?: string | null;
    location?: string | null;
    description?: string | null;
  }) => Promise<void>;
  onCreateTask: (data: {
    title: string;
    due_date: string;
    estimated_duration?: number;
    priority?: TaskPriority;
    difficulty?: TaskDifficulty;
    description?: string | null;
  }) => Promise<void>;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  initialDate,
  initialHour = 8,
  onCreateFixedEvent,
  onCreateTask,
}) => {
  const [activeTab, setActiveTab] = useState<'fixed' | 'task'>('fixed');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State cho Sự kiện cố định (Fixed Event)
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState<'class' | 'exam'>('class');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceUntil, setRecurrenceUntil] = useState('');
  const [location, setLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  // Form State cho Deadline / Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskDueTime, setTaskDueTime] = useState('23:59');
  const [estimatedDuration, setEstimatedDuration] = useState<number | string>(60); // Mặc định 60p theo BR4
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('medium');
  const [taskDescription, setTaskDescription] = useState('');

  // Cập nhật ngày giờ khi initialDate / initialHour thay đổi
  useEffect(() => {
    if (initialDate) {
      const year = initialDate.getFullYear();
      const month = (initialDate.getMonth() + 1).toString().padStart(2, '0');
      const day = initialDate.getDate().toString().padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      setEventDate(dateStr);
      setTaskDueDate(dateStr);

      const startH = initialHour.toString().padStart(2, '0');
      const endH = Math.min(initialHour + 2, 23).toString().padStart(2, '0');
      setStartTime(`${startH}:00`);
      setEndTime(`${endH}:00`);
    } else {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      setEventDate(dateStr);
      setTaskDueDate(dateStr);
    }
    setErrorMessage(null);
  }, [initialDate, initialHour, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (activeTab === 'fixed') {
        if (!eventTitle.trim()) {
          setErrorMessage('Vui lòng nhập tên môn học hoặc kỳ thi');
          setIsSubmitting(false);
          return;
        }
        if (eventTitle.length > 150) {
          setErrorMessage('Tên sự kiện không được vượt quá 150 ký tự');
          setIsSubmitting(false);
          return;
        }

        // Quy đổi từ ngày + giờ (Việt Nam UTC+7) sang ISO UTC
        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);
        const [year, month, day] = eventDate.split('-').map(Number);

        // Giờ VN -> UTC
        const startUtc = new Date(Date.UTC(year, month - 1, day, startH - 7, startM, 0));
        const endUtc = new Date(Date.UTC(year, month - 1, day, endH - 7, endM, 0));

        if (endUtc.getTime() <= startUtc.getTime()) {
          setErrorMessage('Giờ kết thúc phải lớn hơn giờ bắt đầu');
          setIsSubmitting(false);
          return;
        }

        let untilUtc: string | null = null;
        if (isRecurring && recurrenceUntil) {
          const [uY, uM, uD] = recurrenceUntil.split('-').map(Number);
          untilUtc = new Date(Date.UTC(uY, uM - 1, uD, 23 - 7, 59, 59)).toISOString();
        }

        await onCreateFixedEvent({
          title: eventTitle.trim(),
          event_type: eventType,
          start_time: startUtc.toISOString(),
          end_time: endUtc.toISOString(),
          is_recurring: isRecurring,
          recurrence_until: untilUtc,
          location: location.trim() || null,
          description: eventDescription.trim() || null,
        });

        // Reset & đóng modal
        setEventTitle('');
        onClose();
      } else {
        // Tab Deadline / Task
        if (!taskTitle.trim()) {
          setErrorMessage('Vui lòng nhập tên công việc hoặc deadline');
          setIsSubmitting(false);
          return;
        }
        if (taskTitle.length > 150) {
          setErrorMessage('Tên công việc không được vượt quá 150 ký tự');
          setIsSubmitting(false);
          return;
        }
        if (!taskDueDate) {
          setErrorMessage('Hạn chót là bắt buộc theo quy định BR4');
          setIsSubmitting(false);
          return;
        }

        const [dueH, dueM] = taskDueTime.split(':').map(Number);
        const [year, month, day] = taskDueDate.split('-').map(Number);
        const dueUtc = new Date(Date.UTC(year, month - 1, day, dueH - 7, dueM, 0));

        // BR4: Nếu không nhập hoặc <= 0, gán mặc định là 60 phút
        const dur = Number(estimatedDuration);
        const finalDuration = !isNaN(dur) && dur > 0 ? dur : 60;

        await onCreateTask({
          title: taskTitle.trim(),
          due_date: dueUtc.toISOString(),
          estimated_duration: finalDuration,
          priority,
          difficulty,
          description: taskDescription.trim() || null,
        });

        setTaskTitle('');
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Đã có lỗi xảy ra khi lưu sự kiện');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Thêm mới vào lịch học"
      description="Tạo nhanh sự kiện cố định hoặc deadline đồ án"
      maxWidth="lg"
    >
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 mb-5">
        <button
          type="button"
          onClick={() => {
            setActiveTab('fixed');
            setErrorMessage(null);
          }}
          className={`flex-1 pb-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'fixed'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Sự kiện cố định (Lớp / Lịch thi)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('task');
            setErrorMessage(null);
          }}
          className={`flex-1 pb-3 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'task'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Deadline / Việc cần làm</span>
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-danger-50 border border-danger-200 text-xs text-danger-700 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-danger-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'fixed' ? (
          <>
            <Input
              label="Tên môn học / Kỳ thi"
              placeholder="VD: Nhập môn Công nghệ phần mềm"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
              maxLength={150}
              helperText="Tối đa 150 ký tự"
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Loại sự kiện"
                value={eventType}
                onChange={(e) => setEventType(e.target.value as 'class' | 'exam')}
                options={[
                  { value: 'class', label: 'Lớp học cố định (Thứ 2 - CN)' },
                  { value: 'exam', label: 'Lịch thi (Giữa kỳ / Cuối kỳ)' },
                ]}
              />

              <Input
                label="Ngày diễn ra"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Giờ bắt đầu (GMT+7)"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <Input
                label="Giờ kết thúc (GMT+7)"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            {/* Lặp lại hàng tuần */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="rounded border-slate-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-slate-800">
                  Lặp lại hàng tuần (Thời khóa biểu học kỳ)
                </span>
              </label>

              {isRecurring && (
                <div className="pl-6 pt-1">
                  <Input
                    label="Lặp lại đến ngày"
                    type="date"
                    value={recurrenceUntil}
                    onChange={(e) => setRecurrenceUntil(e.target.value)}
                    helperText="Ví dụ ngày kết thúc học kỳ"
                  />
                </div>
              )}
            </div>

            <Input
              label="Địa điểm / Phòng học (Tùy chọn)"
              placeholder="VD: Phòng C.31 - Cơ sở 1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={150}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ghi chú thêm
              </label>
              <textarea
                rows={2}
                placeholder="Giảng viên, tài liệu cần chuẩn bị..."
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              />
            </div>
          </>
        ) : (
          <>
            <Input
              label="Tên việc cần làm / Deadline"
              placeholder="VD: Nộp báo cáo Đồ án Sprint 0"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              maxLength={150}
              helperText="Tối đa 150 ký tự"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Ngày hạn chót (BR4)"
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                required
              />
              <Input
                label="Giờ hạn chót"
                type="time"
                value={taskDueTime}
                onChange={(e) => setTaskDueTime(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Thời lượng ước tính"
                type="number"
                min={15}
                max={480}
                step={15}
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                helperText="Mặc định 60p (BR4)"
                leftIcon={<Clock className="w-3.5 h-3.5 text-slate-400" />}
              />

              <Select
                label="Độ ưu tiên (TV3)"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                options={[
                  { value: 'urgent', label: 'Khẩn cấp' },
                  { value: 'high', label: 'Cao' },
                  { value: 'medium', label: 'Trung bình' },
                  { value: 'low', label: 'Thấp' },
                ]}
              />

              <Select
                label="Độ khó (TV3)"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as TaskDifficulty)}
                options={[
                  { value: 'easy', label: 'Dễ' },
                  { value: 'medium', label: 'Vừa' },
                  { value: 'hard', label: 'Khó' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mô tả chi tiết yêu cầu
              </label>
              <textarea
                rows={2}
                placeholder="Tiêu chí đánh giá, link tài liệu mẫu..."
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
          <Button variant="ghost" size="md" onClick={onClose} type="button">
            Hủy bỏ
          </Button>
          <Button
            variant="primary"
            size="md"
            type="submit"
            isLoading={isSubmitting}
            icon={<CheckCircle className="w-4 h-4" />}
          >
            {activeTab === 'fixed' ? 'Thêm sự kiện' : 'Thêm deadline'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
