const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// =======================================================
// ❗❗ DI CHUYỂN static xuống sau ROUTE victim.html
//    Nếu đặt ở đây → nó OVERRIDE route và phá CSP!
// =======================================================

// Route favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// TRANG CHỦ
// ============================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// TRANG VICTIM - BẮT BUỘC đặt TRƯỚC static
// ============================================
app.get('/victim.html', (req, res) => {
    const protection = req.query.protection || 'all';

    switch (protection) {
        case 'none':
            console.log('⚠️ Victim page: NO PROTECTION');
            break;

        case 'xframe':
            res.setHeader('X-Frame-Options', 'DENY');
            console.log('🛡️ Victim page: X-Frame-Options DENY');
            break;

        case 'csp':
            res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
            console.log('🛡️ Victim page: CSP frame-ancestors none');
            break;

        case 'sameorigin':
            res.setHeader('X-Frame-Options', 'SAMEORIGIN');
            res.setHeader('Content-Security-Policy', "frame-ancestors 'self'");
            console.log('🛡️ Victim page: SAMEORIGIN');
            break;

        case 'all':
        default:
            res.setHeader('X-Frame-Options', 'DENY');
            res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
            console.log('🛡️ FULL PROTECTION (X-Frame + CSP)');
            break;
    }

    res.sendFile(path.join(__dirname, 'victim.html'));
});

// ============================================
// TRANG ATTACKER
// ============================================
app.get('/attacker.html', (req, res) => {
    console.log('🎯 Attacker page loaded');
    res.sendFile(path.join(__dirname, 'attacker.html'));
});

// ============================================
// API: Check headers
// ============================================
app.get('/api/check-headers', (req, res) => {
    const protection = req.query.protection || 'all';
    const headers = {};

    switch (protection) {
        case 'none':
            headers.xFrameOptions = null;
            headers.csp = null;
            break;
        case 'xframe':
            headers.xFrameOptions = 'DENY';
            break;
        case 'csp':
            headers.csp = "frame-ancestors 'none'";
            break;
        case 'sameorigin':
            headers.xFrameOptions = 'SAMEORIGIN';
            headers.csp = "frame-ancestors 'self'";
            break;
        case 'all':
        default:
            headers.xFrameOptions = 'DENY';
            headers.csp = "frame-ancestors 'none'";
            break;
    }

    res.json({
        protection,
        headers,
        timestamp: new Date().toISOString()
    });
});

// ============================================
// API: Transfer
// ============================================
app.post('/api/transfer', (req, res) => {
    const { recipient, amount, note } = req.body;

    console.log('💰 Transfer Request:', { recipient, amount, note });

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
});

// ============================================
// ❗❗ CUỐI CÙNG MỚI static — KHÔNG ĐƯỢC ĐỂ TRÊN!!!
// ============================================
app.use(express.static(__dirname, { extensions: ['html'] }));

// ============================================
// 404
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
});
