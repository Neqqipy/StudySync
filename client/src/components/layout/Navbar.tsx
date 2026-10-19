import React, { useState } from 'react';
import { Menu, X, CalendarCheck2 } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-indigo-500 text-white flex items-center justify-center shadow-xs">
            <CalendarCheck2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">StudySync</span>
            <span className="text-[10px] ml-1 font-semibold text-primary-600">HCMUS</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Mở menu điều hướng"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile drawer overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-50 animate-in slide-in-from-left duration-200">
            <Sidebar onItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};
