/* const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware để serve static files
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// TRANG CHỦ - Không có bảo vệ đặc biệt
// ============================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// TRANG VICTIM - CÓ BẢO VỆ (Mặc định)
// ============================================
app.get('/victim.html', (req, res) => {
    // Lấy tham số protection từ query string
    const protection = req.query.protection || 'all';
    
    // Áp dụng bảo vệ dựa trên tham số
    switch(protection) {
        case 'none':
            // KHÔNG bảo vệ - cho phép iframe
            console.log('⚠️  Victim page: NO PROTECTION');
            break;
            
        case 'xframe':
            // CHỈ X-Frame-Options
            res.setHeader('X-Frame-Options', 'DENY');
            console.log('🛡️  Victim page: X-Frame-Options DENY');
            break;
            
        case 'csp':
            // CHỈ CSP
            res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
            console.log('🛡️  Victim page: CSP frame-ancestors none');
            break;
            
        case 'sameorigin':
            // Cho phép cùng origin
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
            console.log('🛡️  Victim page: SAMEORIGIN protection');
            break;
            
        case 'all':
        default:
            // TẤT CẢ bảo vệ (Recommended)
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
            console.log('🛡️  Victim page: FULL PROTECTION (X-Frame + CSP)');
            break;
    }
    
    res.sendFile(path.join(__dirname, 'victim.html'));
});

// ============================================
// TRANG ATTACKER - Không có bảo vệ
// ============================================
app.get('/attacker.html', (req, res) => {
    // Attacker page KHÔNG có bảo vệ để có thể nhúng victim
    console.log('🎯 Attacker page loaded');
    res.sendFile(path.join(__dirname, 'attacker.html'));
});

// ============================================
// API: Kiểm tra headers của victim
// ============================================
app.get('/api/check-headers', (req, res) => {
    const protection = req.query.protection || 'all';
    const headers = {};
    
    switch(protection) {
        case 'none':
            headers.xFrameOptions = null;
            headers.csp = null;
            headers.protected = false;
            break;
        case 'xframe':
            headers.xFrameOptions = 'DENY';
            headers.csp = null;
            headers.protected = true;
            break;
        case 'csp':
            headers.xFrameOptions = null;
            headers.csp = "frame-ancestors 'none'";
            headers.protected = true;
            break;
        case 'sameorigin':
            headers.xFrameOptions = 'SAMEORIGIN';
            headers.csp = "frame-ancestors 'self'";
            headers.protected = true;
            break;
        case 'all':
        default:
            headers.xFrameOptions = 'DENY';
            headers.csp = "frame-ancestors 'none'";
            headers.protected = true;
            break;
    }
    
    res.json({
        protection,
        headers,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// API: Xử lý chuyển tiền (Demo)
// ============================================
app.post('/api/transfer', (req, res) => {
    const { recipient, amount, note } = req.body;
    
    console.log('💰 Transfer Request:', {
        recipient,
        amount,
        note,
        timestamp: new Date().toISOString()
    });
    
    // Giả lập xử lý chuyển tiền
    setTimeout(() => {
        res.json({
            success: true,
            message: 'Chuyển khoản thành công!',
            data: {
                recipient,
                amount,
                note,
                transactionId: 'TXN' + Date.now()
            }
        });
    }, 1000);
});

// ============================================
// Error handling
// ============================================
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Not Found</h1>
        <p>Page not found. <a href="/">Go back home</a></p>
    `);
});

// ============================================
// Start server
// ============================================
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Clickjacking Demo Server Started!');
    console.log('='.repeat(50));
    console.log(`📍 Main page:    http://localhost:${PORT}`);
    console.log(`🏦 Victim page:  http://localhost:${PORT}/victim.html`);
    console.log(`🎯 Attacker page: http://localhost:${PORT}/attacker.html`);
    console.log('='.repeat(50));
    console.log('');
    console.log('📋 Available protection modes:');
    console.log('   - /victim.html?protection=none       (No protection)');
    console.log('   - /victim.html?protection=xframe     (X-Frame-Options only)');
    console.log('   - /victim.html?protection=csp        (CSP only)');
    console.log('   - /victim.html?protection=sameorigin (Same origin)');
    console.log('   - /victim.html?protection=all        (Full protection - default)');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('='.repeat(50));
}); */

// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Avoid favicon 404 spam (return 204 if not present)
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Victim page with protection modes
app.get('/victim.html', (req, res) => {
  const protection = req.query.protection || 'all';
  switch (protection) {
    case 'none':
      console.log('⚠️ Victim: NO PROTECTION');
      break;
    case 'xframe':
      res.setHeader('X-Frame-Options', 'DENY');
      console.log('🛡️ Victim: X-Frame-Options DENY');
      break;
    case 'csp':
      res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
      console.log('🛡️ Victim: CSP frame-ancestors none');
      break;
    case 'sameorigin':
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
      console.log('🛡️ Victim: SAMEORIGIN');
      break;
    case 'all':
    default:
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
      console.log('🛡️ Victim: FULL PROTECTION');
      break;
  }
  res.sendFile(path.join(__dirname, 'public', 'victim.html'));
});

// Attacker page (no protection)
app.get('/attacker.html', (req, res) => {
  console.log('🎯 Attacker page');
  res.sendFile(path.join(__dirname, 'public', 'attacker.html'));
});

// API demo
app.post('/api/transfer', (req, res) => {
  const { recipient, amount, note } = req.body;
  console.log('💰 Transfer request', { recipient, amount, note });
  setTimeout(() => {
    res.json({ success: true, message: 'OK', data: { transactionId: 'TXN' + Date.now() }});
  }, 500);
});

app.use((req, res) => res.status(404).send('<h1>404 - Not Found</h1><a href="/">Home</a>'));

app.listen(PORT, () => {
  console.log(`Server started http://localhost:${PORT}`);
});
