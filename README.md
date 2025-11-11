# 🛡️ Demo Clickjacking Attack & Protection

Demo giáo dục về tấn công Clickjacking và cách phòng chống bằng CSP & X-Frame-Options.

## ⚠️ CẢNH BÁO

**ĐÂY LÀ DỰ ÁN GIÁO DỤC!** 

Mục đích: Hiểu về Clickjacking và cách bảo vệ ứng dụng web.
**KHÔNG** sử dụng vào mục đích tấn công thực tế!

---

## 📁 Cấu Trúc Dự Án
```
clickjacking-demo/
│
├── index.html              # Trang chủ điều hướng
├── victim.html             # Trang ngân hàng (nạn nhân)
├── attacker.html           # Trang tấn công
├── server.js               # Server Node.js
├── package.json            # Dependencies
├── .gitignore              # Git ignore file
└── README.md               # File này
```

---

## 🚀 Cài Đặt & Chạy

### Yêu Cầu

- Node.js >= 14.x
- npm >= 6.x

### Bước 1: Tải dự án
```bash
# Tạo thư mục
mkdir clickjacking-demo
cd clickjacking-demo

# Copy tất cả các file vào thư mục này
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Chạy server
```bash
npm start
```

Server sẽ chạy tại: **http://localhost:3000**

---

## 📖 Hướng Dẫn Sử Dụng

### 1. Mở Trang Chủ

Truy cập: http://localhost:3000

### 2. Xem Trang Victim

- Click vào "Trang Victim"
- Thử các chế độ bảo vệ khác nhau
- Mở DevTools (F12) → Network → Xem Response Headers

### 3. Xem Trang Attacker

- Click vào "Trang Attacker"
- Nhấn "KÍCH HOẠT TẤN CÔNG"
- Điều chỉnh các slider để căn chỉnh

### 4. Test Bảo Vệ

Thử các URL sau để test protection:

- http://localhost:3000/victim.html?protection=none (Không bảo vệ)
- http://localhost:3000/victim.html?protection=xframe (X-Frame-Options)
- http://localhost:3000/victim.html?protection=csp (CSP)
- http://localhost:3000/victim.html?protection=all (Đầy đủ)

---

## 🔧 Kiểm Tra Headers

### Dùng curl
```bash
curl -I http://localhost:3000/victim.html?protection=all
```

### Dùng Browser DevTools

1. F12 → Network
2. Refresh trang
3. Click vào request đầu tiên
4. Xem Response Headers

---

## 📚 Tài Liệu Tham Khảo

- [OWASP Clickjacking](https://owasp.org/www-community/attacks/Clickjacking)
- [MDN: X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
- [MDN: CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)

---

## 📄 License

MIT License - Chỉ sử dụng cho mục đích giáo dục