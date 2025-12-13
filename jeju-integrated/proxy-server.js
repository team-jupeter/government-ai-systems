const http = require('http');
const https = require('https');

const API_KEY = 'sk-17c1624e3b26497fbca6262419b032f5';
const PORT = 3001;

const server = http.createServer((req, res) => {
    // CORS 헤더
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // OPTIONS 요청 처리
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // POST 요청만 허용
    if (req.method !== 'POST') {
        res.writeHead(405);
        res.end('Method Not Allowed');
        return;
    }
    
    // /chat 경로 체크 (선택적)
    if (req.url !== '/chat' && req.url !== '/') {
        console.log(`⚠️ Unknown path: ${req.url}`);
    }
    
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        console.log(`📨 Request received: ${req.url}`);
        console.log(`📦 Body: ${body.substring(0, 100)}...`);
        
        const options = {
            hostname: 'api.deepseek.com',
            path: '/v1/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Length': Buffer.byteLength(body)
            }
        };
        
        const proxyReq = https.request(options, (proxyRes) => {
            console.log(`✅ DeepSeek API response: ${proxyRes.statusCode}`);
            
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            
            let responseBody = '';
            
            proxyRes.on('data', chunk => {
                responseBody += chunk;
            });
            
            proxyRes.on('end', () => {
                console.log(`📤 Response sent: ${responseBody.substring(0, 100)}...`);
                res.end(responseBody);
            });
        });
        
        proxyReq.on('error', (error) => {
            console.error('❌ Proxy error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Proxy error', details: error.message }));
        });
        
        proxyReq.write(body);
        proxyReq.end();
    });
});

server.listen(PORT, () => {
    console.log(`🚀 DeepSeek Proxy Server running on port ${PORT}`);
});
