import React, { useMemo } from 'react';
import { FixedEvent, SuggestedStudySlot } from '../../types';
import { BookOpen, AlertTriangle, Sparkles, Plus, Clock, MapPin } from 'lucide-react';

export interface WeeklyCalendarGridProps {
  currentWeekMonday: Date;
  events: FixedEvent[];
  suggestedSlots?: SuggestedStudySlot[];
  onCellClick: (date: Date, hour: number) => void;
  onEventClick: (event: FixedEvent) => void;
  onSlotClick?: (slot: SuggestedStudySlot) => void;
}

const START_HOUR = 7;
const END_HOUR = 21;
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => i + START_HOUR); // 07:00 to 21:00
const DAYS_OF_WEEK = [
  { dayIndex: 1, name: 'Thứ Hai' },
  { dayIndex: 2, name: 'Thứ Ba' },
  { dayIndex: 3, name: 'Thứ Tư' },
  { dayIndex: 4, name: 'Thứ Năm' },
  { dayIndex: 5, name: 'Thứ Sáu' },
  { dayIndex: 6, name: 'Thứ Bảy' },
  { dayIndex: 0, name: 'Chủ Nhật' },
];

const HOUR_HEIGHT = 56; // Tỉ lệ 56px giúp thẻ sự kiện (1.5h - 2h) là hình chữ nhật nằm ngang (~2:1) chuẩn mắt nhìn

export const WeeklyCalendarGrid: React.FC<WeeklyCalendarGridProps> = ({
  currentWeekMonday,
  events,
  suggestedSlots = [],
  onCellClick,
  onEventClick,
  onSlotClick,
}) => {
  // Tính danh sách 7 ngày trong tuần từ Thứ Hai
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(currentWeekMonday);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentWeekMonday]);

  // Kiểm tra ngày hôm nay
  const today = new Date();
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  /**
   * Chuyển đổi timestamp ISO UTC sang ngày giờ hiển thị theo chuẩn Giờ Việt Nam (UTC+7)
   */
  const getVietnamTimeComponents = (isoString: string) => {
    const utcDate = new Date(isoString);
    // Cộng 7 tiếng để ra giờ Việt Nam
    const vnTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
    const hours = vnTime.getUTCHours();
    const minutes = vnTime.getUTCMinutes();
    return {
      year: vnTime.getUTCFullYear(),
      month: vnTime.getUTCMonth(),
      date: vnTime.getUTCDate(),
      day: vnTime.getUTCDay(),
      hours,
      minutes,
      totalMinutes: hours * 60 + minutes,
      timeFormatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
    };
  };

  // Tính vị trí vạch đỏ hiển thị giờ hiện tại (Now line indicator)
  const nowVietnamMinutes = today.getHours() * 60 + today.getMinutes();
  const nowTopPx = Math.max(0, ((nowVietnamMinutes - START_HOUR * 60) / 60) * HOUR_HEIGHT);
  const isNowInScheduleRange = nowVietnamMinutes >= START_HOUR * 60 && nowVietnamMinutes <= (END_HOUR + 1) * 60;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* 1. Header: 7 cột thứ ngày */}
      <div className="grid grid-cols-[68px_repeat(7,minmax(0,1fr))] border-b border-slate-200 bg-slate-50/80 select-none sticky top-0 z-20">
        {/* Cột trục giờ rỗng */}
        <div className="p-3 text-center text-xs font-semibold text-slate-400 border-r border-slate-200/60 flex items-center justify-center">
          <Clock className="w-4 h-4 text-slate-400" />
        </div>

        {/* 7 Cột ngày */}
        {weekDays.map((date, idx) => {
          const todayActive = isToday(date);
          const dayName = DAYS_OF_WEEK[idx].name;
          const dayNumber = date.getDate();
          const monthNumber = date.getMonth() + 1;

          return (
            <div
              key={idx}
              className={`p-3 text-center border-r border-slate-200/60 last:border-r-0 transition-colors ${
                todayActive ? 'bg-primary-50/70' : ''
              }`}
            >
              <p className={`text-xs font-semibold ${todayActive ? 'text-primary-600' : 'text-slate-500'}`}>
                {dayName}
              </p>
              <div className="mt-1 flex items-center justify-center">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 text-sm font-bold rounded-full transition-all ${
                    todayActive
                      ? 'bg-primary-600 text-white shadow-xs ring-4 ring-primary-100'
                      : 'text-slate-800'
                  }`}
                >
                  {dayNumber}
                </span>
                <span className="text-[11px] text-slate-400 ml-1">/{monthNumber}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Grid thân lịch cuộn theo trục giờ */}
      <div className="relative overflow-y-auto max-h-[720px] divide-y divide-slate-100">
        <div className="grid grid-cols-[68px_repeat(7,minmax(0,1fr))] relative min-w-[760px]">
          {/* Trục giờ dọc bên trái */}
          <div className="border-r border-slate-200/80 bg-slate-50/50 select-none">
            {HOURS.map((hour) => (
              <div
                key={hour}
                style={{ height: `${HOUR_HEIGHT}px` }}
                className="pr-2.5 pt-1.5 text-right text-[11px] font-medium text-slate-400 border-b border-slate-100 relative"
              >
                <span>{`${hour.toString().padStart(2, '0')}:00`}</span>
              </div>
            ))}
          </div>

          {/* 7 Cột nội dung ngày */}
          {weekDays.map((dayDate, dayColIdx) => {
            const todayActive = isToday(dayDate);

            // Lọc các sự kiện diễn ra trong ngày này (tính theo giờ Việt Nam)
            const dayEvents = events.filter((e) => {
              const comp = getVietnamTimeComponents(e.start_time);
              return (
                comp.year === dayDate.getFullYear() &&
                comp.month === dayDate.getMonth() &&
                comp.date === dayDate.getDate()
              );
            });

            // Lọc các slot đề xuất tự học TV3 trong ngày này
            const daySlots = suggestedSlots.filter((s) => {
              const comp = getVietnamTimeComponents(s.start_time);
              return (
                comp.year === dayDate.getFullYear() &&
                comp.month === dayDate.getMonth() &&
                comp.date === dayDate.getDate()
              );
            });

            return (
              <div
                key={dayColIdx}
                className={`relative border-r border-slate-200/60 last:border-r-0 ${
                  todayActive ? 'bg-primary-50/15' : ''
                }`}
              >
                {/* Vạch đỏ chỉ giờ hiện tại (Now Line) */}
                {todayActive && isNowInScheduleRange && (
                  <div
                    style={{ top: `${nowTopPx}px` }}
                    className="absolute inset-x-0 z-30 pointer-events-none flex items-center"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs ring-4 ring-rose-200 -ml-1.5 shrink-0" />
                    <div className="flex-1 h-[2px] bg-rose-500" />
                  </div>
                )}

                {/* Các ô giờ (Click-to-create) */}
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    style={{ height: `${HOUR_HEIGHT}px` }}
                    onClick={() => onCellClick(dayDate, hour)}
                    className="border-b border-slate-100 group cursor-pointer transition-colors hover:bg-slate-50/90 relative"
                    title={`Bấm để thêm sự kiện lúc ${hour}:00`}
                  >
                    {/* Đường phân chia mờ 30 phút (Google Calendar style) */}
                    <div className="absolute inset-x-0 top-1/2 border-b border-slate-100/60 pointer-events-none" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-1 px-2 rounded-md bg-white border border-slate-200 text-slate-600 shadow-2xs text-[11px] flex items-center gap-1 font-medium">
                        <Plus className="w-3 h-3 text-primary-600" />
                        <span>Thêm</span>
                      </span>
                    </div>
                  </div>
                ))}

                {/* Render Thẻ Sự kiện cố định (Fixed Events: Class & Exam) */}
                {dayEvents.map((evt) => {
                  const startComp = getVietnamTimeComponents(evt.start_time);
                  const endComp = getVietnamTimeComponents(evt.end_time);

                  // Vị trí top tính từ START_HOUR:00
                  const startHourFraction = (startComp.totalMinutes - START_HOUR * 60) / 60;
                  const endHourFraction = (endComp.totalMinutes - START_HOUR * 60) / 60;
                  const durationHours = Math.max(endHourFraction - startHourFraction, 0.5);

                  const topPx = Math.max(0, startHourFraction * HOUR_HEIGHT);
                  // Chiều cao tỉ lệ 82px mỗi giờ (có khoảng hở 3px)
                  const heightPx = Math.max(durationHours * HOUR_HEIGHT - 3, 36);

                  const isExam = evt.event_type === 'exam';

                  return (
                    <div
                      key={evt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(evt);
                      }}
                      style={{
                        top: `${topPx}px`,
                        height: `${heightPx}px`,
                      }}
                      className={`
                        absolute inset-x-1 rounded-xl p-2.5 z-10 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden flex flex-col justify-between group
                        ${isExam
                          ? 'bg-gradient-to-br from-rose-50/95 to-red-100/90 border border-rose-200/90 border-l-[4px] border-l-rose-600 text-rose-950 shadow-2xs'
                          : 'bg-gradient-to-br from-indigo-50/95 to-blue-100/90 border border-indigo-200/90 border-l-[4px] border-l-indigo-600 text-indigo-950 shadow-2xs'
                        }
                      `}
                    >
                      <div className="min-w-0">
                        {/* Header: Nhãn loại sự kiện + Khoảng giờ (chống tràn lề) */}
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                              isExam ? 'bg-rose-600 text-white shadow-2xs' : 'bg-indigo-600 text-white shadow-2xs'
                            }`}
                          >
                            {isExam ? (
                              <>
                                <AlertTriangle className="w-2.5 h-2.5 shrink-0" />
                                <span>Thi</span>
                              </>
                            ) : (
                              <>
                                <BookOpen className="w-2.5 h-2.5 shrink-0" />
                                <span>Lớp học</span>
                              </>
                            )}
                          </span>

                          <span className={`text-[10px] font-bold whitespace-nowrap tabular-nums ${isExam ? 'text-rose-900' : 'text-indigo-900'}`}>
                            {startComp.timeFormatted} - {endComp.timeFormatted}
                          </span>
                        </div>

                        {/* Tên môn học */}
                        <h4 className="text-xs font-bold leading-snug line-clamp-2 text-slate-900 group-hover:text-primary-700 transition-colors">
                          {evt.title}
                        </h4>
                      </div>

                      {/* Địa điểm / Phòng học (Luôn hiển thị nếu có vị trí và thẻ đủ cao) */}
                      {evt.location && heightPx >= 54 && (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mt-auto pt-1 truncate">
                          <MapPin className={`w-3 h-3 shrink-0 ${isExam ? 'text-rose-500' : 'text-indigo-500'}`} />
                          <span className="truncate">{evt.location}</span>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Render Khung giờ tự học đề xuất (TV3 Mock) */}
                {daySlots.map((slot) => {
                  const startComp = getVietnamTimeComponents(slot.start_time);
                  const endComp = getVietnamTimeComponents(slot.end_time);

                  const startHourFraction = (startComp.totalMinutes - START_HOUR * 60) / 60;
                  const endHourFraction = (endComp.totalMinutes - START_HOUR * 60) / 60;
                  const durationHours = Math.max(endHourFraction - startHourFraction, 0.5);

                  const topPx = Math.max(0, startHourFraction * HOUR_HEIGHT);
                  const heightPx = Math.max(durationHours * HOUR_HEIGHT - 3, 36);

                  return (
                    <div
                      key={slot.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSlotClick && onSlotClick(slot);
                      }}
                      style={{
                        top: `${topPx}px`,
                        height: `${heightPx}px`,
                      }}
                      className="absolute inset-x-1 rounded-xl p-2.5 z-10 cursor-pointer shadow-2xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border border-dashed border-purple-300 border-l-[4px] border-l-purple-600 bg-purple-50/90 text-purple-950 overflow-hidden flex flex-col justify-between group"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white whitespace-nowrap shadow-2xs">
                            <Sparkles className="w-2.5 h-2.5 shrink-0" />
                            <span>Gợi ý TV3</span>
                          </span>
                          <span className="text-[10px] font-bold text-purple-900 whitespace-nowrap tabular-nums">
                            {startComp.timeFormatted} - {endComp.timeFormatted}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold leading-snug line-clamp-2 text-purple-950">
                          {slot.title}
                        </h4>
                      </div>
                      <p className="text-[10px] font-medium text-purple-600 italic mt-auto pt-1">
                        Bấm để xác nhận giờ học
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
