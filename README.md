# StudySync – Xếp lịch học và đồ án nhóm tự động

> **Môn học:** Nhập môn Công nghệ Phần mềm (HCMUS - Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM)  
> **Nhóm thực hiện:** Nhóm 5 thành viên (HK1/2026-2027)  
> **Giai đoạn:** **Sprint 0 – Khung Frontend (Giao diện tĩnh / Prototype) & Phân hệ TV2**  
> **Thành viên phụ trách:** **Đào Ngọc Hưng (MSSV: 24120319)**

---

## 1. Giới thiệu dự án & Mục tiêu Sprint 0

Sinh viên thường xuyên đối mặt với việc thời khóa biểu, lịch thi, deadline bài tập và việc làm thêm nằm rải rác trên nhiều nền tảng. Khi làm đồ án môn học theo nhóm 5 người, việc chốt giờ họp chung tốn rất nhiều thời gian.

**StudySync** là giải pháp toàn diện giúp sinh viên quản lý lịch học, tự động xếp lịch tự học và tìm giờ họp nhóm tối ưu.

Trong giai đoạn **Sprint 0 (Báo cáo Tiến độ Giao diện tĩnh)**:
- Xây dựng **toàn bộ khung giao diện ứng dụng (Frontend Web App)** chuẩn UI/UX, hỗ trợ Responsive trên cả máy tính và thiết bị di động.
- Triển khai hoàn chỉnh giao diện **Phân hệ TV2: Lịch cá nhân, Deadline & Nhập file thời khóa biểu**.
- Ứng dụng chạy theo kiến trúc **Thuần Frontend (Standalone Client / Static UI)** với dữ liệu mẫu (mock data) đầy đủ, **không yêu cầu cài đặt máy chủ Backend hay Database**.

---

## 2. Phân chia 5 Module trong dự án

| Phân hệ (Module) | Tên tính năng | Nội dung chính | Thành viên phụ trách | Trạng thái Sprint 0 |
|---|---|---|---|---|
| **TV1** | Tài khoản và nhóm | Đăng ký, đăng nhập, hồ sơ sinh viên, tạo nhóm đồ án, mời qua link | Lê Huỳnh Anh Thư (24120226) | Giao diện Prototype |
| **TV2** | **Lịch cá nhân sinh viên** | **Thời khóa biểu ma trận 3 buổi, lưới tuần, deadline bài tập, bộ chọn lịch thông minh** | **Đào Ngọc Hưng (24120319)** | **Hoàn thành 100% (Giao diện & Tương tác)** |
| **TV3** | Xếp lịch (Engine) | Đề xuất giờ học theo độ ưu tiên, độ khó; tái xếp lịch khi lỡ buổi (BR3) | Trịnh Nguyễn Huỳnh Nhi (24120404) | Giao diện Prototype |
| **TV4** | Giờ chung, nhắc việc | Tìm giờ họp nhóm nhiều người rảnh nhất (BR2); nhắc việc sắp đến hạn | Đỗ Quỳnh Anh Thư (24120143) | Giao diện Prototype |
| **TV5** | Kanban & Thống kê | Bảng Kanban giao task nhóm 5 cột; thống kê giờ học theo tuần | Nguyễn Đình Trung Kiên (24120195) | Giao diện Prototype |

---

## 3. Các tính năng nổi bật trên Giao diện TV2

1. **Thời khóa biểu Ma trận 3 Buổi (Sáng – Chiều – Tối):**
   - Thiết kế chuẩn theo định dạng thời khóa biểu quen thuộc của trường ĐH Khoa học Tự nhiên (HCMUS).
   - Thứ 2 đến Chủ nhật dàn ngang tạo cấu trúc chữ nhật trực quan, dễ quan sát toàn bộ tuần.
2. **Lưới lịch tuần thời gian thực (Weekly Timeline Grid):**
   - Lưới giờ từ 06:00 đến 23:00, hiển thị các khối sự kiện, lớp học, lịch thi và các slot gợi ý tự học.
3. **Bộ chọn lịch tương tác (Interactive Week Picker Popover):**
   - Nhấp trực tiếp vào tiêu đề `Tuần: DD/MM – DD/MM/YYYY` để mở lịch tháng tương tác.
   - Hỗ trợ nhảy nhanh qua các Tháng, Năm, hoặc các mốc học kỳ (+1 Tháng, +3 Tháng, +6 Tháng).
   - Chọn ngày cụ thể qua ô date picker.
4. **Thanh quản lý Hạn chót & Bài tập (Deadline Sidebar):**
   - Liệt kê các bài tập môn học với nhãn độ ưu tiên, độ khó và thời lượng ước tính (quy tắc BR4: mặc định 60 phút nếu chưa nhập).
   - Hỗ trợ thu gọn/mở rộng sidebar để tối ưu diện tích xem lịch.
5. **Modal Thêm lịch mới & Chi tiết môn học:**
   - Hỗ trợ thêm sự kiện lặp lại hàng tuần (lớp học) hoặc sự kiện đơn lẻ (lịch thi).
   - Xem chi tiết thông tin phòng học, thời gian, mô tả và ghi chú.

---

## 4. Hướng dẫn Cài đặt & Trải nghiệm

Ứng dụng được đóng gói độc lập, chỉ cần Node.js để chạy dev server cục bộ:

### Yêu cầu hệ thống:
- **Node.js:** $\ge$ 18.x (khuyên dùng Node 20.x hoặc 22.x)
- **npm:** $\ge$ 9.x

### Bước 1: Cài đặt thư viện
Tại thư mục gốc của dự án, mở Terminal và chạy:
```bash
npm run setup
```
*(Hoặc `cd client && npm install`)*

### Bước 2: Chạy ứng dụng
```bash
npm run dev
```

### Bước 3: Mở trình duyệt
Truy cập địa chỉ: **`http://localhost:5173`**  
*(Hệ thống sẽ tự động chuyển hướng vào màn hình Thời khóa biểu TV2 với đầy đủ dữ liệu mẫu của sinh viên An)*

---

## 5. Các lệnh kiểm thử & Đóng gói (CI / CD)

Tất cả các lệnh đều được tự động hóa qua GitHub Actions CI (`.github/workflows/ci.yml`):

| Lệnh | Mục đích |
| :--- | :--- |
| `npm run lint` | Kiểm tra cú pháp và kiểu dữ liệu TypeScript nghiêm ngặt (`strict: true`) |
| `npm run test` | Chạy bộ kiểm thử tự động của Frontend |
| `npm run build` | Đóng gói sản phẩm thành các file tĩnh HTML/CSS/JS tại `client/dist/` |
| `npm run preview` | Xem trước bản build tĩnh trên trình duyệt |

---

## 6. Cấu trúc thư mục dự án

```text
StudySync/
├── .github/
│   └── workflows/ci.yml          # GitHub Actions CI tự động kiểm tra Lint, Test, Build
├── client/                       # Toàn bộ mã nguồn Frontend (React + Vite + Tailwind CSS)
│   ├── public/
│   │   ├── sample_tkb.ics        # File mẫu thời khóa biểu .ics
│   │   └── sample_tkb.csv        # File mẫu bảng tính .csv
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/           # Sidebar, Navbar, AppLayout
│   │   │   ├── schedule/         # SessionMatrixGrid, WeeklyCalendarGrid, WeekPickerPopover, Modals
│   │   │   └── ui/               # Button, Modal, Badge, Input, Select, Spinner
│   │   ├── pages/                # SchedulePage (TV2), AuthPage, GroupsPage, KanbanPage...
│   │   ├── services/             # Client-side storage (localStorage) & API adapter
│   │   ├── utils/                # In-browser icsParser, csvParser, intervals calculation
│   │   ├── types.ts              # Data models & TypeScript interfaces
│   │   └── App.tsx               # App routes sử dụng HashRouter (tương thích GitHub Pages)
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts            # Cấu hình base relative path './' cho static hosting
│
├── _backup_logic/                # Thư mục lưu trữ độc lập toàn bộ Backend & Logic
│   ├── README.md                 # Hướng dẫn tái sử dụng Backend cho các Sprint sau
│   ├── database/schema.sql       # Mã DDL PostgreSQL tạo bảng fixed_events, tasks
│   ├── parsers/                  # Mã nguồn bộ đọc file độc lập
│   ├── pure-logic/               # Thuật toán thuần BR1 (conflict) & BR4 (duration)
│   ├── tests/                    # 35 Unit tests Vitest độc lập
│   ├── migrations/               # Database migrations
│   └── server/                   # Toàn bộ mã nguồn backend Express.js lưu trữ an toàn
│
├── package.json                  # Root scripts điều phối Frontend
└── README.md                     # Tài liệu báo cáo đồ án
```

---

## 7. Lưu ý dành cho Giảng viên & Người chấm đồ án

1. **Không cần cài đặt CSDL hay Backend:** Toàn bộ dữ liệu hiển thị đã được nạp sẵn dưới dạng dữ liệu sinh viên mẫu (An - HCMUS).
2. **Khôi phục dữ liệu bất kỳ lúc nào:** Trên giao diện có nút **"Dữ liệu mẫu"**, bấm vào để đưa lịch học về trạng thái chuẩn ban đầu.
3. **Mã nguồn Backend:** Toàn bộ logic Backend, lược đồ cơ sở dữ liệu PostgreSQL và 35 unit test tự động đã được lưu trữ an toàn trong thư mục `_backup_logic/` để tiếp tục tái sử dụng trong các Sprint tiếp theo.
