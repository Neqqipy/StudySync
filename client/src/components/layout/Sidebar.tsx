import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Calendar,
  Sparkles,
  Users,
  Kanban,
  FolderGit2,
  UserCheck,
  GraduationCap,
  CalendarCheck2,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const navItems = [
    {
      to: '/schedule',
      label: 'Thời khóa biểu sinh viên',
      icon: <Calendar className="w-5 h-5" />,
      badge: <Badge variant="success" size="sm">TV2</Badge>,
    },
    {
      to: '/auto-schedule',
      label: 'Xếp lịch tự động',
      icon: <Sparkles className="w-5 h-5" />,
      badge: <Badge variant="study" size="sm">TV3</Badge>,
    },
    {
      to: '/common-time',
      label: 'Tìm giờ họp chung',
      icon: <Users className="w-5 h-5" />,
      badge: <Badge variant="warning" size="sm">TV4</Badge>,
    },
    {
      to: '/kanban',
      label: 'Kanban & Thống kê',
      icon: <Kanban className="w-5 h-5" />,
      badge: <Badge variant="primary" size="sm">TV5</Badge>,
    },
    {
      to: '/groups',
      label: 'Nhóm đồ án',
      icon: <FolderGit2 className="w-5 h-5" />,
      badge: <Badge variant="secondary" size="sm">TV1</Badge>,
    },
    {
      to: '/auth',
      label: 'Tài khoản sinh viên',
      icon: <UserCheck className="w-5 h-5" />,
      badge: <Badge variant="secondary" size="sm">TV1</Badge>,
    },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200/80 flex flex-col justify-between select-none">
      {/* Brand & Logo */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-primary-500/20">
            <CalendarCheck2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-base tracking-tight">StudySync</span>
              <span className="text-[10px] font-semibold bg-primary-100 text-primary-700 px-1.5 py-0.2 rounded-md">v0.1</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate">HCMUS · NMCNPM</p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="p-3 space-y-1">
          <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Các phân hệ (5 Modules)
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onItemClick}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                ${isActive
                  ? 'bg-primary-50 text-primary-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400 group-hover:text-primary-600 transition-colors">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              <div>{item.badge}</div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* User profile card (Mock bạn An - kịch bản demo) */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-primary-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
            NA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 truncate">Nguyễn Văn An</p>
            <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-primary-500" />
              <span>24120000 · K24 CNTT</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
