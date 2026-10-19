import React, { useMemo } from 'react';
import { FixedEvent, SuggestedStudySlot } from '../../types';
import { BookOpen, AlertTriangle, Sparkles, Plus, Clock, MapPin } from 'lucide-react';

export interface HorizontalTimelineGridProps {
  currentWeekMonday: Date;
  events: FixedEvent[];
  suggestedSlots?: SuggestedStudySlot[];
  onCellClick: (date: Date, hour: number) => void;
  onEventClick: (event: FixedEvent) => void;
  onSlotClick?: (slot: SuggestedStudySlot) => void;
}

const START_HOUR = 7; // 07:00 sáng
const END_HOUR = 22; // 22:00 tối
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => i + START_HOUR);

const DAYS_OF_WEEK = [
  { dayIndex: 1, name: 'Thứ Hai', short: 'T2' },
  { dayIndex: 2, name: 'Thứ Ba', short: 'T3' },
  { dayIndex: 3, name: 'Thứ Tư', short: 'T4' },
  { dayIndex: 4, name: 'Thứ Năm', short: 'T5' },
  { dayIndex: 5, name: 'Thứ Sáu', short: 'T6' },
  { dayIndex: 6, name: 'Thứ Bảy', short: 'T7' },
  { dayIndex: 0, name: 'Chủ Nhật', short: 'CN' },
];

const HOUR_WIDTH = 92; // 92px cho mỗi giờ -> 1 tiết 4h dài ~365px (hình chữ nhật nằm ngang chuẩn mắt nhìn)
const ROW_HEIGHT = 74; // 74px chiều cao mỗi hàng ngày

export const HorizontalTimelineGrid: React.FC<HorizontalTimelineGridProps> = ({
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

  // Tính vị trí vạch chỉ thời gian thực theo trục ngang
  const nowVnMinutes = today.getHours() * 60 + today.getMinutes();
  const nowLeftPx = Math.max(0, ((nowVnMinutes - START_HOUR * 60) / 60) * HOUR_WIDTH);
  const isNowInRange = nowVnMinutes >= START_HOUR * 60 && nowVnMinutes <= (END_HOUR + 1) * 60;

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Khung cuộn ngang mượt mà */}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="min-w-[1200px]">
          {/* 1. Header: Trục thời gian từ 07:00 đến 22:00 */}
          <div className="flex border-b border-slate-200 bg-slate-50/90 sticky top-0 z-20 select-none">
            {/* Cột cố định: Tên Thứ / Ngày */}
            <div className="w-40 shrink-0 p-3 border-r border-slate-200/80 bg-slate-100/70 font-semibold text-xs text-slate-600 flex items-center justify-between sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-600" />
                <span>Thứ & Ngày</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">GMT+7</span>
            </div>

            {/* Các mốc giờ ngang */}
            <div className="flex flex-1">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  style={{ width: `${HOUR_WIDTH}px` }}
                  className="shrink-0 p-2 text-center text-xs font-semibold text-slate-500 border-r border-slate-200/60 last:border-r-0 relative"
                >
                  <span>{`${hour.toString().padStart(2, '0')}:00`}</span>
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-200/50" />
                </div>
              ))}
            </div>
          </div>

          {/* 2. Thân lịch: 7 Hàng ngang cho Thứ Hai -> Chủ Nhật */}
          <div className="divide-y divide-slate-100">
            {weekDays.map((dayDate, dayIdx) => {
              const todayActive = isToday(dayDate);
              const dayMeta = DAYS_OF_WEEK[dayIdx];
              const dayNumber = dayDate.getDate();
              const monthNumber = dayDate.getMonth() + 1;

              // Lọc sự kiện trong ngày (theo giờ Việt Nam)
              const dayEvents = events.filter((e) => {
                const comp = getVietnamTimeComponents(e.start_time);
                return (
                  comp.year === dayDate.getFullYear() &&
                  comp.month === dayDate.getMonth() &&
                  comp.date === dayDate.getDate()
                );
              });

              // Lọc slot đề xuất tự học TV3
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
                  key={dayIdx}
                  style={{ height: `${ROW_HEIGHT}px` }}
                  className={`flex relative group/row transition-colors ${
                    todayActive ? 'bg-primary-50/20' : 'hover:bg-slate-50/40'
                  }`}
                >
                  {/* Cột ngày bên trái (Sticky) */}
                  <div
                    className={`w-40 shrink-0 p-2.5 px-3 border-r border-slate-200/80 flex items-center justify-between sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)] transition-colors ${
                      todayActive ? 'bg-primary-50/90' : 'bg-white group-hover/row:bg-slate-50/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold ${todayActive ? 'text-primary-700' : 'text-slate-800'}`}>
                          {dayMeta.name}
                        </span>
                        {todayActive && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-primary-600 text-white">
                            Nay
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {dayNumber.toString().padStart(2, '0')}/{monthNumber.toString().padStart(2, '0')}
                      </p>
                    </div>

                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {dayEvents.length + daySlots.length} lịch
                    </span>
                  </div>

                  {/* Vùng lưới giờ ngang */}
                  <div className="flex flex-1 relative">
                    {/* Các ô giờ (Click để thêm sự kiện) */}
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        style={{ width: `${HOUR_WIDTH}px` }}
                        onClick={() => onCellClick(dayDate, hour)}
                        className="shrink-0 h-full border-r border-slate-100 group/cell cursor-pointer transition-colors hover:bg-primary-50/40 relative"
                        title={`Bấm để thêm sự kiện ${dayMeta.name} lúc ${hour}:00`}
                      >
                        {/* Đường kẻ mờ 30 phút */}
                        <div className="absolute inset-y-0 left-1/2 border-r border-slate-100/60 pointer-events-none" />

                        {/* Nút cộng hover nhẹ */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity">
                          <span className="w-5 h-5 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-primary-600">
                            <Plus className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Vạch đỏ chỉ giờ thực (Now line) */}
                    {todayActive && isNowInRange && (
                      <div
                        style={{ left: `${nowLeftPx}px` }}
                        className="absolute inset-y-0 z-30 pointer-events-none flex flex-col items-center"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs ring-4 ring-rose-200 -mt-1 shrink-0" />
                        <div className="flex-1 w-[2px] bg-rose-500" />
                      </div>
                    )}

                    {/* Render Thẻ Sự kiện Cố định dạng HÌNH CHỮ NHẬT NẰM NGANG */}
                    {dayEvents.map((evt) => {
                      const startComp = getVietnamTimeComponents(evt.start_time);
                      const endComp = getVietnamTimeComponents(evt.end_time);

                      const startHourFraction = (startComp.totalMinutes - START_HOUR * 60) / 60;
                      const endHourFraction = (endComp.totalMinutes - START_HOUR * 60) / 60;
                      const durationHours = Math.max(endHourFraction - startHourFraction, 0.5);

                      const leftPx = Math.max(0, startHourFraction * HOUR_WIDTH);
                      const widthPx = Math.max(durationHours * HOUR_WIDTH - 4, 110);

                      const isExam = evt.event_type === 'exam';

                      return (
                        <div
                          key={evt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(evt);
                          }}
                          style={{
                            left: `${leftPx}px`,
                            width: `${widthPx}px`,
                            top: '8px',
                            height: `${ROW_HEIGHT - 16}px`,
                          }}
                          className={`
                            absolute z-10 rounded-xl px-3 py-1.5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-between gap-3 overflow-hidden group
                            ${isExam
                              ? 'bg-gradient-to-r from-rose-50 via-rose-100/70 to-red-50 border border-rose-200/90 border-l-[5px] border-l-rose-600 text-rose-950 shadow-2xs'
                              : 'bg-gradient-to-r from-indigo-50 via-blue-100/70 to-indigo-50 border border-indigo-200/90 border-l-[5px] border-l-indigo-600 text-indigo-950 shadow-2xs'
                            }
                          `}
                          title={`${evt.title} (${startComp.timeFormatted} - ${endComp.timeFormatted}${evt.location ? ` - ${evt.location}` : ''})`}
                        >
                          {/* Bên trái: Icon, Badge và Tên môn học nằm ngang thoải mái */}
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
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

                            <h4 className="text-xs font-bold truncate text-slate-900 group-hover:text-primary-700 transition-colors">
                              {evt.title}
                            </h4>
                          </div>

                          {/* Bên phải: Giờ và Phòng học (nằm ngang thẳng hàng) */}
                          <div className="flex items-center gap-3 shrink-0 text-right">
                            {evt.location && widthPx >= 220 && (
                              <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-600 truncate max-w-[140px]">
                                <MapPin className={`w-3 h-3 shrink-0 ${isExam ? 'text-rose-500' : 'text-indigo-500'}`} />
                                <span className="truncate">{evt.location}</span>
                              </div>
                            )}

                            <span className={`text-xs font-bold whitespace-nowrap tabular-nums px-2 py-0.5 rounded bg-white/80 border border-slate-200/60 shadow-2xs ${isExam ? 'text-rose-900' : 'text-indigo-900'}`}>
                              {startComp.timeFormatted} - {endComp.timeFormatted}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Render Khung giờ tự học TV3 dạng HÌNH CHỮ NHẬT NẰM NGANG */}
                    {daySlots.map((slot) => {
                      const startComp = getVietnamTimeComponents(slot.start_time);
                      const endComp = getVietnamTimeComponents(slot.end_time);

                      const startHourFraction = (startComp.totalMinutes - START_HOUR * 60) / 60;
                      const endHourFraction = (endComp.totalMinutes - START_HOUR * 60) / 60;
                      const durationHours = Math.max(endHourFraction - startHourFraction, 0.5);

                      const leftPx = Math.max(0, startHourFraction * HOUR_WIDTH);
                      const widthPx = Math.max(durationHours * HOUR_WIDTH - 4, 110);

                      return (
                        <div
                          key={slot.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSlotClick && onSlotClick(slot);
                          }}
                          style={{
                            left: `${leftPx}px`,
                            width: `${widthPx}px`,
                            top: '8px',
                            height: `${ROW_HEIGHT - 16}px`,
                          }}
                          className="absolute z-10 rounded-xl px-3 py-1.5 cursor-pointer shadow-2xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border border-dashed border-purple-300 border-l-[5px] border-l-purple-600 bg-purple-50/95 text-purple-950 flex items-center justify-between gap-3 overflow-hidden group"
                          title={`Gợi ý tự học: ${slot.title} (${startComp.timeFormatted} - ${endComp.timeFormatted})`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white shrink-0 shadow-2xs">
                              <Sparkles className="w-2.5 h-2.5 shrink-0" />
                              <span>TV3</span>
                            </span>
                            <h4 className="text-xs font-bold truncate text-purple-950">
                              {slot.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-purple-600 italic hidden md:inline">
                              Bấm nhận lịch
                            </span>
                            <span className="text-xs font-bold text-purple-900 whitespace-nowrap tabular-nums px-2 py-0.5 rounded bg-white/80 border border-purple-200">
                              {startComp.timeFormatted} - {endComp.timeFormatted}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
