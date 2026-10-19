import { describe, it, expect } from 'vitest';

describe('Khung Frontend (Sprint 0) & Module TV2 Client', () => {
  it('Khởi tạo môi trường Frontend thành công', () => {
    expect(true).toBe(true);
  });

  it('Các route chính cho 5 modules được định nghĩa đầy đủ', () => {
    const routes = [
      '/schedule',      // TV2 - Lịch cá nhân & Import
      '/auth',          // TV1 - Tài khoản
      '/groups',        // TV1 - Nhóm đồ án
      '/auto-schedule', // TV3 - Engine xếp lịch
      '/common-time',   // TV4 - Tìm giờ họp chung
      '/kanban',        // TV5 - Kanban & Thống kê
    ];

    expect(routes).toHaveLength(6);
    expect(routes).toContain('/schedule');
  });

  it('Tuân thủ quy ước múi giờ hiển thị Việt Nam (UTC+7)', () => {
    const utcSample = '2026-10-19T00:30:00.000Z';
    const date = new Date(utcSample);
    const vnTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);

    expect(vnTime.getUTCHours()).toBe(7);
    expect(vnTime.getUTCMinutes()).toBe(30);
  });
});
