export type EventType = 'class' | 'exam';

export interface FixedEvent {
  id: string;
  user_id: string;
  title: string;
  event_type: EventType;
  start_time: string; // ISO 8601 UTC
  end_time: string;   // ISO 8601 UTC
  is_recurring: boolean;
  recurrence_until?: string | null;
  location?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'todo' | 'scheduled' | 'done';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  due_date: string; // ISO 8601 UTC
  estimated_duration: number; // In minutes, default 60 (BR4)
  priority: TaskPriority;
  difficulty: TaskDifficulty;
  status: TaskStatus;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SuggestedStudySlot {
  id: string;
  user_id: string;
  task_id?: string | null;
  title: string;
  start_time: string;
  end_time: string;
  is_confirmed: boolean;
}

export interface FreeBusyInterval {
  start_time: string;
  end_time: string;
  status: 'busy';
}

export interface TimeInterval {
  start: Date;
  end: Date;
  id?: string;
}

export interface WeekScheduleData {
  range: {
    start: string;
    end: string;
  };
  fixed_events: FixedEvent[];
  tasks: Task[];
  suggested_slots: SuggestedStudySlot[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
