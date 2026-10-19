import React, { useState } from 'react';
import { Task } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, Circle, Clock, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';

export interface TasksSidebarProps {
  tasks: Task[];
  onToggleStatus: (task: Task) => void;
  onAddTask: () => void;
  onDeleteTask: (taskId: string) => void;
}

export const TasksSidebar: React.FC<TasksSidebarProps> = ({
  tasks,
  onToggleStatus,
  onAddTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'todo' | 'done'>('all');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'todo') return t.status !== 'done';
    if (filter === 'done') return t.status === 'done';
    return true;
  });

  const priorityLabels = {
    urgent: { label: 'Khẩn cấp', variant: 'danger' as const },
    high: { label: 'Ưu tiên cao', variant: 'warning' as const },
    medium: { label: 'Trung bình', variant: 'primary' as const },
    low: { label: 'Thấp', variant: 'secondary' as const },
  };

  const difficultyLabels = {
    hard: { label: 'Khó', variant: 'study' as const },
    medium: { label: 'Vừa', variant: 'secondary' as const },
    easy: { label: 'Dễ', variant: 'success' as const },
  };

  const formatDueDate = (isoString: string) => {
    const d = new Date(isoString);
    const vnTime = new Date(d.getTime() + 7 * 60 * 60 * 1000);
    const day = vnTime.getUTCDate().toString().padStart(2, '0');
    const month = (vnTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const hours = vnTime.getUTCHours().toString().padStart(2, '0');
    const minutes = vnTime.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} - ${day}/${month}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-primary-600" />
            <span>Deadlines & Việc cần làm</span>
          </h3>
          <p className="text-[11px] text-slate-400">Đầu vào cho TV3 xếp lịch tự động</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={onAddTask}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Thêm
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mt-3 p-1 bg-slate-100 rounded-lg text-xs font-medium">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1 rounded-md transition-all ${filter === 'all' ? 'bg-white shadow-2xs text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Tất cả ({tasks.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('todo')}
          className={`flex-1 py-1 rounded-md transition-all ${filter === 'todo' ? 'bg-white shadow-2xs text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Chưa xong ({tasks.filter(t => t.status !== 'done').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('done')}
          className={`flex-1 py-1 rounded-md transition-all ${filter === 'done' ? 'bg-white shadow-2xs text-slate-800 font-semibold' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Đã xong ({tasks.filter(t => t.status === 'done').length})
        </button>
      </div>

      {/* List items */}
      <div className="mt-3 flex-1 overflow-y-auto space-y-2.5 max-h-[580px] pr-1">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Không có công việc nào trong danh sách.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'done';
            const priorityInfo = priorityLabels[task.priority] || priorityLabels.medium;
            const diffInfo = difficultyLabels[task.difficulty] || difficultyLabels.medium;

            return (
              <div
                key={task.id}
                className={`p-3 rounded-xl border transition-all duration-150 group ${
                  isDone
                    ? 'bg-slate-50 border-slate-200/60 opacity-60'
                    : 'bg-white border-slate-200/90 shadow-2xs hover:border-primary-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(task)}
                    className="mt-0.5 text-slate-400 hover:text-primary-600 focus:outline-none transition-colors shrink-0"
                    title={isDone ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-xs font-semibold leading-snug line-clamp-2 ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {/* Metadata tags: Priority, Difficulty, Estimated Duration */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <Badge variant={priorityInfo.variant} size="sm">
                        {priorityInfo.label}
                      </Badge>
                      <Badge variant={diffInfo.variant} size="sm">
                        {diffInfo.label}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{task.estimated_duration} phút</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-danger-600 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>Hạn: {formatDueDate(task.due_date)}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => onDeleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-danger-600 p-0.5 rounded transition-all"
                        title="Xóa deadline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
