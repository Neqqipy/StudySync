import { FixedEvent, Task, SuggestedStudySlot, WeekScheduleData } from '../types';

export const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

/**
 * Tạo ngày mẫu cho tuần hiện tại (chuẩn múi giờ Việt Nam UTC+7)
 */
function createDateForCurrentWeek(dayOffset: number, hourVn: number, minuteVn: number): string {
  const now = new Date();
  const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const dayVn = vnTime.getUTCDay();
  const diffToMonday = dayVn === 0 ? -6 : 1 - dayVn;

  const mondayDate = vnTime.getUTCDate() + diffToMonday;
  const mondayMonth = vnTime.getUTCMonth();
  const mondayYear = vnTime.getUTCFullYear();

  const utcTimestamp = Date.UTC(mondayYear, mondayMonth, mondayDate + dayOffset, hourVn - 7, minuteVn, 0);
  return new Date(utcTimestamp).toISOString();
}

export const initialMockEvents: FixedEvent[] = [
  {
    id: 'e1111111-1111-1111-1111-111111111111',
    user_id: DEFAULT_USER_ID,
    title: 'Nhập môn Công nghệ phần mềm',
    event_type: 'class',
    start_time: createDateForCurrentWeek(0, 7, 30), // Sáng Thứ Hai
    end_time: createDateForCurrentWeek(0, 11, 30),
    is_recurring: true,
    recurrence_until: createDateForCurrentWeek(70, 23, 59),
    location: 'Phòng F.201 - Cơ sở 1',
    description: 'Lý thuyết kiến trúc phần mềm, Sprint 0 & TV2',
  },
  {
    id: 'e2222222-2222-2222-2222-222222222222',
    user_id: DEFAULT_USER_ID,
    title: 'Mạng máy tính (Lý thuyết)',
    event_type: 'class',
    start_time: createDateForCurrentWeek(2, 13, 30), // Chiều Thứ Tư
    end_time: createDateForCurrentWeek(2, 16, 45),
    is_recurring: true,
    recurrence_until: createDateForCurrentWeek(70, 23, 59),
    location: 'Phòng I.41 - Cơ sở 1',
    description: 'Chương 3: Tầng Giao vận & TCP/UDP',
  },
  {
    id: 'e3333333-3333-3333-3333-333333333333',
    user_id: DEFAULT_USER_ID,
    title: 'Thi Giữa kỳ môn Cơ sở dữ liệu',
    event_type: 'exam',
    start_time: createDateForCurrentWeek(5, 13, 30), // Chiều Thứ Bảy
    end_time: createDateForCurrentWeek(5, 15, 30),
    is_recurring: false,
    recurrence_until: null,
    location: 'Giảng đường 1 - Cơ sở 1',
    description: 'Thi trắc nghiệm + tự luận 90 phút. Mang theo thẻ sinh viên.',
  },
];

export const initialMockTasks: Task[] = [
  {
    id: 't1111111-1111-1111-1111-111111111111',
    user_id: DEFAULT_USER_ID,
    title: 'Nộp Project Proposal môn NMCNPM (Hạn chót 20/10)',
    due_date: createDateForCurrentWeek(1, 23, 59), // Hạn Thứ Ba
    estimated_duration: 120,
    priority: 'urgent',
    difficulty: 'medium',
    status: 'todo',
    description: 'Hoàn thiện tài liệu SRS và phân rã WBS cho 5 thành viên nhóm 05',
  },
  {
    id: 't2222222-2222-2222-2222-222222222222',
    user_id: DEFAULT_USER_ID,
    title: 'Bài tập tuần 3: Thiết kế ERD Cơ sở dữ liệu',
    due_date: createDateForCurrentWeek(3, 22, 0), // Hạn Thứ Năm
    estimated_duration: 60,
    priority: 'high',
    difficulty: 'hard',
    status: 'todo',
    description: 'Vẽ sơ đồ quan hệ thực thể mức ý niệm và chuyển đổi sang mô hình quan hệ',
  },
];

export const initialMockSlots: SuggestedStudySlot[] = [
  {
    id: 's1111111-1111-1111-1111-111111111111',
    user_id: DEFAULT_USER_ID,
    task_id: 't1111111-1111-1111-1111-111111111111',
    title: 'Tự học: Viết Proposal NMCNPM',
    start_time: createDateForCurrentWeek(1, 19, 30), // Tối Thứ Ba
    end_time: createDateForCurrentWeek(1, 21, 30),
    is_confirmed: false,
  },
];

export function getMockWeekSchedule(start?: string, end?: string): WeekScheduleData {
  const rangeStart = start || createDateForCurrentWeek(0, 0, 0);
  const rangeEnd = end || createDateForCurrentWeek(6, 23, 59);

  return {
    range: {
      start: rangeStart,
      end: rangeEnd,
    },
    fixed_events: initialMockEvents,
    tasks: initialMockTasks,
    suggested_slots: initialMockSlots,
  };
}
