import {
  WeekScheduleData,
  FixedEvent,
  Task,
  FreeBusyInterval,
  SuggestedStudySlot,
} from '../types';
import {
  initialMockEvents,
  initialMockTasks,
  initialMockSlots,
  getMockWeekSchedule,
} from '../data/mockSchedule';

/**
 * =============================================================================
 * Pure Static Mock API (Dành riêng cho Báo cáo Giao diện tĩnh Sprint 0)
 * =============================================================================
 * Dữ liệu tĩnh độc lập, thuần giao diện, không chứa logic Backend hay bộ Parser.
 */
class MockApiService {
  private events: FixedEvent[] = [...initialMockEvents];
  private tasks: Task[] = [...initialMockTasks];
  private slots: SuggestedStudySlot[] = [...initialMockSlots];

  async getWeekSchedule(start?: string, end?: string): Promise<WeekScheduleData> {
    const data = getMockWeekSchedule(start, end);
    return {
      ...data,
      fixed_events: this.events,
      tasks: this.tasks,
      suggested_slots: this.slots,
    };
  }

  async getFreeBusy(_start: string, _end: string): Promise<FreeBusyInterval[]> {
    return this.events.map((e) => ({
      start_time: e.start_time,
      end_time: e.end_time,
      status: 'busy',
    }));
  }

  async createFixedEvent(data: {
    title: string;
    event_type: 'class' | 'exam';
    start_time: string;
    end_time: string;
    is_recurring?: boolean;
    recurrence_until?: string | null;
    location?: string | null;
    description?: string | null;
  }): Promise<FixedEvent> {
    const newEvent: FixedEvent = {
      id: `evt-${Date.now()}`,
      user_id: '00000000-0000-0000-0000-000000000001',
      title: data.title,
      event_type: data.event_type,
      start_time: data.start_time,
      end_time: data.end_time,
      is_recurring: data.is_recurring ?? false,
      recurrence_until: data.recurrence_until ?? null,
      location: data.location ?? null,
      description: data.description ?? null,
    };
    this.events.push(newEvent);
    return newEvent;
  }

  async updateFixedEvent(id: string, data: Partial<FixedEvent>): Promise<FixedEvent> {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      this.events[idx] = { ...this.events[idx], ...data };
      return this.events[idx];
    }
    throw new Error('Sự kiện không tồn tại');
  }

  async deleteFixedEvent(id: string): Promise<void> {
    this.events = this.events.filter((e) => e.id !== id);
  }

  async createTask(data: {
    title: string;
    due_date: string;
    estimated_duration?: number | null;
    priority?: Task['priority'];
    difficulty?: Task['difficulty'];
    status?: Task['status'];
    description?: string | null;
  }): Promise<Task> {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      user_id: '00000000-0000-0000-0000-000000000001',
      title: data.title,
      due_date: data.due_date,
      estimated_duration: data.estimated_duration || 60,
      priority: data.priority || 'medium',
      difficulty: data.difficulty || 'medium',
      status: data.status || 'todo',
      description: data.description ?? null,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx !== -1) {
      this.tasks[idx] = { ...this.tasks[idx], ...data };
      return this.tasks[idx];
    }
    throw new Error('Bài tập không tồn tại');
  }

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  async resetData(): Promise<void> {
    this.events = [...initialMockEvents];
    this.tasks = [...initialMockTasks];
    this.slots = [...initialMockSlots];
  }
}

export const api = new MockApiService();
