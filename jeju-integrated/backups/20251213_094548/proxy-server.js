const http = require('http');
const https = require('https');

const API_KEY = 'sk-17c1624e3b26497fbca6262419b032f5';
const PORT = 3001;

const server = http.createServer((req, res) => {
    // CORS 헤더
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.method !== 'POST') {
        res.writeHead(405);
        res.end('Method Not Allowed');
        return;
    }
    
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
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
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            
            proxyRes.pipe(res);
        });
        
        proxyReq.on('error', (error) => {
            console.error('Proxy error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Proxy error' }));
        });
        
        proxyReq.write(body);
        proxyReq.end();
    });
});

server.listen(PORT, () => {
    console.log(`DeepSeek Proxy Server running on port ${PORT}`);
});
