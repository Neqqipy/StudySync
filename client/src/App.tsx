import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { SchedulePage } from './pages/SchedulePage';
import { AuthPage } from './pages/AuthPage';
import { GroupsPage } from './pages/GroupsPage';
import { AutoSchedulePage } from './pages/AutoSchedulePage';
import { CommonTimePage } from './pages/CommonTimePage';
import { KanbanPage } from './pages/KanbanPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Mặc định chuyển hướng về Module TV2: Lịch cá nhân */}
          <Route index element={<Navigate to="/schedule" replace />} />
          
          {/* Module TV2: Lịch cá nhân, deadline & import (Hoàn chỉnh) */}
          <Route path="schedule" element={<SchedulePage />} />

          {/* Module TV1: Tài khoản & Nhóm (Sprint 0 placeholder) */}
          <Route path="auth" element={<AuthPage />} />
          <Route path="groups" element={<GroupsPage />} />

          {/* Module TV3: Engine xếp lịch tự động (Sprint 0 placeholder) */}
          <Route path="auto-schedule" element={<AutoSchedulePage />} />

          {/* Module TV4: Tìm giờ họp chung & nhắc việc (Sprint 0 placeholder) */}
          <Route path="common-time" element={<CommonTimePage />} />

          {/* Module TV5: Bảng Kanban & thống kê giờ học (Sprint 0 placeholder) */}
          <Route path="kanban" element={<KanbanPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
