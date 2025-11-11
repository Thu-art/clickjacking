Demo về tấn công Clickjacking và cách phòng chống bằng CSP & X-Frame-Options.
Cấu Trúc Dự Án
clickjacking-demo/
│
├── index.html              # Trang chủ điều hướng
├── victim.html             # Trang ngân hàng (nạn nhân)
├── attacker.html           # Trang tấn công
├── server.js               # Server Node.js
├── package.json            # Dependencies
├── .gitignore              # Git ignore file
└── README.md               # File này
Hướng Dẫn Sử Dụng
 1. Mở Trang Chủ
Truy cập: http://localhost:3000
 
 2. Xem Trang Victim
- Click vào "Trang Victim"
- Thử các chế độ bảo vệ khác nhau
- Mở DevTools (F12) → Network → Xem Response Headers

 3. Xem Trang Attacker
- Click vào "Trang Attacker"
- Nhấn "KÍCH HOẠT TẤN CÔNG"
- Điều chỉnh các slider để căn chỉnh

4. Test Bảo Vệ
Thử các URL sau để test protection:

- http://localhost:3000/victim.html?protection=none (Không bảo vệ)
- http://localhost:3000/victim.html?protection=xframe (X-Frame-Options)
- http://localhost:3000/victim.html?protection=csp (CSP)
- http://localhost:3000/victim.html?protection=all (Đầy đủ)

   Kiểm Tra Headers
Dùng curl
curl -I http://localhost:3000/victim.html?protection=all

Dùng Browser DevTools
1. F12 → Network
2. Refresh trang
3. Click vào request đầu tiên
4. Xem Response Headers
