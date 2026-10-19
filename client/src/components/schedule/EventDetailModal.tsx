import React, { useState } from 'react';
import { FixedEvent } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { AlertTriangle, Clock, MapPin, Trash2, Edit3, CheckCircle, Repeat } from 'lucide-react';

export interface EventDetailModalProps {
  event: FixedEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateEvent: (id: string, data: Partial<FixedEvent>) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onUpdateEvent,
  onDeleteEvent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form edit states
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<'class' | 'exam'>('class');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  React.useEffect(() => {
    if (event) {
      setTitle(event.title);
      setEventType(event.event_type);
      setLocation(event.location || '');
      setDescription(event.description || '');
      setIsEditing(false);
      setErrorMessage(null);
    }
  }, [event, isOpen]);

  if (!event) return null;

  const isExam = event.event_type === 'exam';

  // Format ngày giờ Việt Nam
  const formatVnTime = (isoString: string) => {
    const d = new Date(isoString);
    const vn = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const day = vn.getUTCDate().toString().padStart(2, '0');
    const month = (vn.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = vn.getUTCFullYear();
    const hours = vn.getUTCHours().toString().padStart(2, '0');
    const minutes = vn.getUTCMinutes().toString().padStart(2, '0');
    return {
      time: `${hours}:${minutes}`,
      date: `${day}/${month}/${year}`,
    };
  };

  const startInfo = formatVnTime(event.start_time);
  const endInfo = formatVnTime(event.end_time);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Tên sự kiện không được để trống');
      return;
    }
    if (title.length > 150) {
      setErrorMessage('Tên sự kiện không được vượt quá 150 ký tự');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await onUpdateEvent(event.id, {
        title: title.trim(),
        event_type: eventType,
        location: location.trim() || null,
        description: description.trim() || null,
      });
      setIsEditing(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi cập nhật sự kiện');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sự kiện "${event.title}" khỏi lịch học?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDeleteEvent(event.id);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi xóa sự kiện');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Chỉnh sửa sự kiện' : 'Chi tiết sự kiện cố định'}
      maxWidth="md"
    >
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-danger-50 border border-danger-200 text-xs text-danger-700 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-danger-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Tên môn học / Sự kiện"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={150}
            helperText="Tối đa 150 ký tự"
          />

          <Select
            label="Loại sự kiện"
            value={eventType}
            onChange={(e) => setEventType(e.target.value as 'class' | 'exam')}
            options={[
              { value: 'class', label: 'Lớp học cố định' },
              { value: 'exam', label: 'Lịch thi' },
            ]}
          />

          <Input
            label="Địa điểm / Phòng học"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={150}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ghi chú
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button
              variant="ghost"
              size="md"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmitting}
              icon={<CheckCircle className="w-4 h-4" />}
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-left">
          {/* Header Title & Badge */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant={isExam ? 'danger' : 'primary'} size="sm" hasDot>
                  {isExam ? 'Lịch thi cố định' : 'Lớp học định kỳ'}
                </Badge>
                {event.is_recurring && (
                  <Badge variant="secondary" size="sm">
                    <Repeat className="w-3 h-3 mr-1 inline" />
                    Hàng tuần
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900">{event.title}</h3>
            </div>
          </div>

          {/* Time & Date */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-primary-600 shrink-0" />
              <span className="font-semibold text-slate-900">
                {startInfo.time} - {endInfo.time}
              </span>
              <span className="text-slate-400">({startInfo.date})</span>
            </div>

            {event.location && (
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-medium">{event.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Ghi chú
              </h4>
              <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                {event.description}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={isDeleting}
              icon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Xóa sự kiện
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Đóng
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                icon={<Edit3 className="w-3.5 h-3.5" />}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
