import React, { useMemo } from 'react';
import { FixedEvent, SuggestedStudySlot } from '../../types';
import { BookOpen, AlertTriangle, Sparkles, Plus, Clock, MapPin, SunMedium, Sun, Moon } from 'lucide-react';

export interface SessionMatrixGridProps {
  currentWeekMonday: Date;
  events: FixedEvent[];
  suggestedSlots?: SuggestedStudySlot[];
  onCellClick: (date: Date, hour: number) => void;
  onEventClick: (event: FixedEvent) => void;
  onSlotClick?: (slot: SuggestedStudySlot) => void;
}

const DAYS_OF_WEEK = [
  { dayIndex: 1, name: 'Thứ Hai', short: 'T2' },
  { dayIndex: 2, name: 'Thứ Ba', short: 'T3' },
  { dayIndex: 3, name: 'Thứ Tư', short: 'T4' },
  { dayIndex: 4, name: 'Thứ Năm', short: 'T5' },
  { dayIndex: 5, name: 'Thứ Sáu', short: 'T6' },
  { dayIndex: 6, name: 'Thứ Bảy', short: 'T7' },
  { dayIndex: 0, name: 'Chủ Nhật', short: 'CN' },
];

interface SessionDef {
  id: 'morning' | 'afternoon' | 'evening';
  name: string;
  subtext: string;
  timeRange: string;
  defaultHour: number;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
}

const SESSIONS: SessionDef[] = [
  {
    id: 'morning',
    name: 'Sáng',
    subtext: 'Tiết 1 – 5',
    timeRange: '07:00 – 12:00',
    defaultHour: 8,
    icon: SunMedium,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    id: 'afternoon',
    name: 'Chiều',
    subtext: 'Tiết 6 – 10',
    timeRange: '12:30 – 17:30',
    defaultHour: 13,
    icon: Sun,
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
  },
  {
    id: 'evening',
    name: 'Tối',
    subtext: 'Tiết 11 – 14',
    timeRange: '18:00 – 22:00',
    defaultHour: 18,
    icon: Moon,
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
];

export const SessionMatrixGrid: React.FC<SessionMatrixGridProps> = ({
  currentWeekMonday,
  events,
  suggestedSlots = [],
  onCellClick,
  onEventClick,
  onSlotClick,
}) => {
  // Tính 7 ngày trong tuần từ Thứ Hai
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
   * Chuyển đổi timestamp ISO UTC sang Giờ Việt Nam (UTC+7)
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

  /**
   * Xác định sự kiện thuộc buổi nào (Sáng: < 12h, Chiều: 12h-17h30, Tối: > 17h30)
   */
  const getSessionForHour = (hours: number, minutes: number): 'morning' | 'afternoon' | 'evening' => {
    const totalMinutes = hours * 60 + minutes;
    if (totalMinutes < 12 * 60) return 'morning';
    if (totalMinutes < 17 * 60 + 30) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto w-full">
        <div className="min-w-[960px] w-full">
          {/* 1. Header: 7 Cột T2, T3, T4, T5, T6, T7, CN NẰM NGANG Ở TRÊN CÙNG */}
          <div className="grid grid-cols-[115px_repeat(7,minmax(0,1fr))] border-b border-slate-200 bg-slate-50/90 select-none sticky top-0 z-20">
            {/* Góc trên trái: Nhãn Buổi */}
            <div className="p-3.5 text-center text-xs font-bold text-slate-500 border-r border-slate-200/80 flex items-center justify-center gap-1.5 bg-slate-100/70">
              <Clock className="w-3.5 h-3.5 text-primary-600" />
              <span>Buổi / Tiết</span>
            </div>

            {/* 7 Cột Thứ Hai -> Chủ Nhật nằm ngang */}
            {weekDays.map((date, idx) => {
              const todayActive = isToday(date);
              const dayMeta = DAYS_OF_WEEK[idx];
              const dayNumber = date.getDate();
              const monthNumber = date.getMonth() + 1;

              return (
                <div
                  key={idx}
                  className={`p-3 text-center border-r border-slate-200/70 last:border-r-0 transition-colors ${
                    todayActive ? 'bg-primary-50/80' : ''
                  }`}
                >
                  <p className={`text-xs font-bold tracking-tight ${todayActive ? 'text-primary-700' : 'text-slate-600'}`}>
                    {dayMeta.name}
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 text-sm font-bold rounded-full transition-all ${
                        todayActive
                          ? 'bg-primary-600 text-white shadow-xs ring-4 ring-primary-100'
                          : 'text-slate-900 font-extrabold'
                      }`}
                    >
                      {dayNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">/{monthNumber}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Thân bảng: 3 Hàng Buổi (Sáng - Chiều - Tối) */}
          <div className="divide-y divide-slate-200/80">
            {SESSIONS.map((session) => {
              const Icon = session.icon;

              return (
                <div key={session.id} className="grid grid-cols-[115px_repeat(7,minmax(0,1fr))] min-h-[145px] divide-x divide-slate-200/70">
                {/* Cột nhãn Buổi ở bên trái */}
                <div className="p-3 bg-slate-50/50 flex flex-col justify-center items-center text-center select-none border-r border-slate-200/80">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200/70 flex items-center justify-center text-primary-600 mb-1.5">
                    <Icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800">{session.name}</h3>
                  <span className="text-[10px] text-slate-500 font-medium">{session.timeRange}</span>
                  <span className="text-[10px] font-semibold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded-full mt-1">
                    {session.subtext}
                  </span>
                </div>

                {/* 7 Ô của 7 Ngày tương ứng với Buổi này */}
                {weekDays.map((dayDate, dayIdx) => {
                  const todayActive = isToday(dayDate);

                  // Lọc sự kiện rơi vào ngày này VÀ buổi này
                  const sessionEvents = events.filter((e) => {
                    const comp = getVietnamTimeComponents(e.start_time);
                    if (
                      comp.year !== dayDate.getFullYear() ||
                      comp.month !== dayDate.getMonth() ||
                      comp.date !== dayDate.getDate()
                    ) {
                      return false;
                    }
                    return getSessionForHour(comp.hours, comp.minutes) === session.id;
                  });

                  // Lọc slot đề xuất TV3 rơi vào buổi này
                  const sessionSlots = suggestedSlots.filter((s) => {
                    const comp = getVietnamTimeComponents(s.start_time);
                    if (
                      comp.year !== dayDate.getFullYear() ||
                      comp.month !== dayDate.getMonth() ||
                      comp.date !== dayDate.getDate()
                    ) {
                      return false;
                    }
                    return getSessionForHour(comp.hours, comp.minutes) === session.id;
                  });

                  const hasItems = sessionEvents.length > 0 || sessionSlots.length > 0;

                  return (
                    <div
                      key={dayIdx}
                      onClick={() => onCellClick(dayDate, session.defaultHour)}
                      className={`p-2 relative flex flex-col gap-2 group transition-colors cursor-pointer ${
                        todayActive ? 'bg-primary-50/15 hover:bg-primary-50/30' : 'hover:bg-slate-50/80'
                      }`}
                      title={`Bấm để thêm sự kiện vào ${session.name} ${DAYS_OF_WEEK[dayIdx].name}`}
                    >
                      {/* Thẻ Sự Kiện Cố Định (Hình chữ nhật nằm ngang: tỉ lệ ~2:1) */}
                      {sessionEvents.map((evt) => {
                        const startComp = getVietnamTimeComponents(evt.start_time);
                        const endComp = getVietnamTimeComponents(evt.end_time);
                        const isExam = evt.event_type === 'exam';

                        return (
                          <div
                            key={evt.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(evt);
                            }}
                            className={`
                              rounded-xl p-2.5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group/card overflow-hidden
                              ${isExam
                                ? 'bg-gradient-to-r from-rose-50 to-red-100/80 border border-rose-200/90 border-l-[4px] border-l-rose-600 shadow-2xs text-rose-950'
                                : 'bg-gradient-to-r from-indigo-50 to-blue-100/80 border border-indigo-200/90 border-l-[4px] border-l-indigo-600 shadow-2xs text-indigo-950'
                              }
                            `}
                          >
                            {/* Dòng 1: Badge loại sự kiện */}
                            <div className="flex items-center justify-between gap-1 mb-1">
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
                            </div>

                            {/* Dòng 2: Khoảng giờ học (đặt riêng dòng có icon Clock, không tràn ra ngoài) */}
                            <div className="flex items-center gap-1 text-[11px] font-bold tabular-nums mb-1 truncate">
                              <Clock className={`w-3 h-3 shrink-0 ${isExam ? 'text-rose-600' : 'text-indigo-600'}`} />
                              <span className={isExam ? 'text-rose-900' : 'text-indigo-900'}>
                                {startComp.timeFormatted} - {endComp.timeFormatted}
                              </span>
                            </div>

                            {/* Dòng 3: Tên môn học */}
                            <h4 className="text-xs font-bold leading-snug line-clamp-2 text-slate-900 group-hover/card:text-primary-700 transition-colors">
                              {evt.title}
                            </h4>

                            {/* Dòng 4: Phòng học / Địa điểm */}
                            {evt.location && (
                              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600 mt-1.5 pt-1 border-t border-slate-200/50 truncate">
                                <MapPin className={`w-3 h-3 shrink-0 ${isExam ? 'text-rose-500' : 'text-indigo-500'}`} />
                                <span className="truncate">{evt.location}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Thẻ Khung Giờ Tự Học Đề Xuất TV3 (Hình chữ nhật nằm ngang) */}
                      {sessionSlots.map((slot) => {
                        const startComp = getVietnamTimeComponents(slot.start_time);
                        const endComp = getVietnamTimeComponents(slot.end_time);

                        return (
                          <div
                            key={slot.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSlotClick && onSlotClick(slot);
                            }}
                            className="rounded-xl p-2.5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer border border-dashed border-purple-300 border-l-[4px] border-l-purple-600 bg-purple-50/90 text-purple-950 shadow-2xs flex flex-col justify-between overflow-hidden"
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white whitespace-nowrap shadow-2xs">
                                <Sparkles className="w-2.5 h-2.5 shrink-0" />
                                <span>Gợi ý TV3</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-bold text-purple-900 tabular-nums mb-1 truncate">
                              <Clock className="w-3 h-3 shrink-0 text-purple-600" />
                              <span>{startComp.timeFormatted} - {endComp.timeFormatted}</span>
                            </div>
                            <h4 className="text-xs font-bold leading-snug line-clamp-2 text-purple-950">
                              {slot.title}
                            </h4>
                            <p className="text-[10px] font-medium text-purple-600 italic mt-1">
                              Bấm để nhận lịch học
                            </p>
                          </div>
                        );
                      })}

                      {/* Nút cộng thêm khi hover vào ô trống */}
                      {!hasItems && (
                        <div className="flex-1 min-h-[90px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="p-1 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-500 shadow-2xs text-[11px] flex items-center gap-1 font-semibold group-hover:text-primary-600 group-hover:border-primary-300">
                            <Plus className="w-3.5 h-3.5 text-primary-600" />
                            <span>Thêm môn</span>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
};
