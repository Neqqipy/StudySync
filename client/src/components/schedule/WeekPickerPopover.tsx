import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface WeekPickerPopoverProps {
  currentWeekMonday: Date;
  onSelectMonday: (monday: Date) => void;
  formatWeekLabel: () => string;
}

export const WeekPickerPopover: React.FC<WeekPickerPopoverProps> = ({
  currentWeekMonday,
  onSelectMonday,
  formatWeekLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tháng và năm đang xem trong mini calendar (mặc định theo tuần hiện tại đang chọn)
  const [viewYear, setViewYear] = useState<number>(currentWeekMonday.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(currentWeekMonday.getMonth());

  // Đồng bộ viewYear/viewMonth khi currentWeekMonday thay đổi từ bên ngoài
  useEffect(() => {
    setViewYear(currentWeekMonday.getFullYear());
    setViewMonth(currentWeekMonday.getMonth());
  }, [currentWeekMonday]);

  // Đóng popover khi click ra ngoài hoặc bấm phím Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Tính Thứ Hai của một ngày bất kỳ
  const getMondayOfDate = (date: Date): Date => {
    const day = date.getDay(); // 0 is Sunday, 1 is Monday
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff, 0, 0, 0, 0);
    return monday;
  };

  // Điều hướng tháng
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Điều hướng năm
  const handlePrevYear = () => setViewYear((y) => y - 1);
  const handleNextYear = () => setViewYear((y) => y + 1);

  // Nhảy tới ngày hôm nay
  const handleJumpToday = () => {
    const today = new Date();
    const monday = getMondayOfDate(today);
    onSelectMonday(monday);
    setViewYear(monday.getFullYear());
    setViewMonth(monday.getMonth());
    setIsOpen(false);
  };

  // Nhảy nhanh +1 Tháng hoặc +3 Tháng (Học kỳ mới)
  const handleJumpMonths = (deltaMonths: number) => {
    const newDate = new Date(currentWeekMonday);
    newDate.setMonth(newDate.getMonth() + deltaMonths);
    const monday = getMondayOfDate(newDate);
    onSelectMonday(monday);
    setViewYear(monday.getFullYear());
    setViewMonth(monday.getMonth());
    setIsOpen(false);
  };

  // Chọn ngày cụ thể từ input type="date"
  const handleDirectDateInput = (dateStr: string) => {
    if (!dateStr) return;
    const [y, m, d] = dateStr.split('-').map(Number);
    const selectedDate = new Date(y, m - 1, d);
    const monday = getMondayOfDate(selectedDate);
    onSelectMonday(monday);
    setViewYear(monday.getFullYear());
    setViewMonth(monday.getMonth());
    setIsOpen(false);
  };

  // Chọn một ngày trên lưới lịch (tự tính ra tuần của ngày đó)
  const handleSelectDay = (dayDate: Date) => {
    const monday = getMondayOfDate(dayDate);
    onSelectMonday(monday);
    setIsOpen(false);
  };

  // Sinh danh sách 42 ngày (6 tuần) cho tháng đang xem
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const dayOfWeek = firstDay.getDay(); // 0 is Sunday, 1 is Monday
    const startOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startDate = new Date(viewYear, viewMonth, 1 + startOffset);

    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
      days.push(d);
    }
    return days;
  }, [viewYear, viewMonth]);

  // Xác định tuần hiện tại đang chọn để highlight
  const currentSelectedMondayTime = currentWeekMonday.getTime();
  const currentSelectedSundayTime = currentSelectedMondayTime + 6 * 24 * 60 * 60 * 1000;
  const todayStr = new Date().toDateString();

  // Format value cho input date (YYYY-MM-DD)
  const dateInputValue = `${currentWeekMonday.getFullYear()}-${String(
    currentWeekMonday.getMonth() + 1
  ).padStart(2, '0')}-${String(currentWeekMonday.getDate()).padStart(2, '0')}`;

  const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Nút bấm hiển thị Tuần có thể tương tác click */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg border transition-all cursor-pointer group shadow-2xs select-none ${
          isOpen
            ? 'bg-primary-50 text-primary-700 border-primary-300 ring-2 ring-primary-500/20'
            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
        }`}
        title="Nhấp để mở bộ chọn lịch, dễ dàng nhảy đến ngày/tháng/năm bất kỳ"
        aria-expanded={isOpen}
      >
        <CalendarIcon className="w-4 h-4 text-primary-600 group-hover:scale-110 transition-transform" />
        <span className="tracking-tight">Tuần: {formatWeekLabel()}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-primary-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary-600' : ''
          }`}
        />
      </button>

      {/* Popover Lịch tương tác nhảy ngày tháng */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-[340px] sm:w-[360px] bg-white rounded-2xl shadow-xl border border-slate-200/90 z-50 p-4 animate-in fade-in zoom-in-95 duration-150">
          {/* Header chọn Tháng & Năm */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevYear}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Năm trước"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Tháng trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Dropdown chọn Tháng & Năm trực tiếp */}
            <div className="flex items-center gap-1.5">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {monthNames.map((name, idx) => (
                  <option key={idx} value={idx}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                {Array.from({ length: 11 }, (_, i) => 2022 + i).map((yr) => (
                  <option key={yr} value={yr}>
                    Năm {yr}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Tháng sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextYear}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Năm sau"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Phím tắt nhảy nhanh thời gian dài */}
          <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              type="button"
              onClick={handleJumpToday}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors shrink-0"
            >
              <RotateCcw className="w-3 h-3 text-primary-500" />
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => handleJumpMonths(1)}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors shrink-0"
              title="Nhảy nhanh tới 1 tháng sau"
            >
              +1 Tháng
            </button>
            <button
              type="button"
              onClick={() => handleJumpMonths(3)}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors shrink-0"
              title="Nhảy nhanh sang Học kỳ mới (3 tháng)"
            >
              +3 Tháng (Học kỳ)
            </button>
            <button
              type="button"
              onClick={() => handleJumpMonths(6)}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium transition-colors shrink-0"
              title="Nhảy nhanh tới nửa năm sau"
            >
              +6 Tháng
            </button>
          </div>

          {/* Nhãn Thứ trong tuần: T2 - CN */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 py-1">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span className="text-rose-400">CN</span>
          </div>

          {/* Lưới ngày (42 ô / 6 tuần) */}
          <div className="grid grid-cols-7 gap-1 mt-1">
            {calendarDays.map((day, idx) => {
              const isCurrentMonth = day.getMonth() === viewMonth;
              const isToday = day.toDateString() === todayStr;
              const dayTime = day.getTime();
              const isSelectedWeek =
                dayTime >= currentSelectedMondayTime && dayTime <= currentSelectedSundayTime;
              const isMonday = day.getDay() === 1;
              const isSunday = day.getDay() === 0;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`h-8 rounded-md text-xs font-medium transition-all relative flex items-center justify-center cursor-pointer ${
                    isSelectedWeek
                      ? 'bg-primary-600 text-white font-bold shadow-xs hover:bg-primary-700'
                      : isCurrentMonth
                      ? 'text-slate-800 hover:bg-primary-50 hover:text-primary-700'
                      : 'text-slate-300 hover:bg-slate-50 hover:text-slate-600'
                  } ${isMonday && isSelectedWeek ? 'rounded-l-lg' : ''} ${
                    isSunday && isSelectedWeek ? 'rounded-r-lg' : ''
                  }`}
                  title={`Chọn tuần của ngày ${day.toLocaleDateString('vi-VN')}`}
                >
                  <span>{day.getDate()}</span>
                  {isToday && !isSelectedWeek && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer: Nhập ngày tùy ý chính xác */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Hoặc nhập ngày:
            </span>
            <input
              type="date"
              defaultValue={dateInputValue}
              onChange={(e) => handleDirectDateInput(e.target.value)}
              className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
              title="Nhập ngày cụ thể để chuyển tuần tức thì"
            />
          </div>
        </div>
      )}
    </div>
  );
};
