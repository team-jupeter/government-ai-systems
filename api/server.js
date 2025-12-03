const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 환경변수에서 API 키 가져오기
const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;

console.log('✅ 서버 시작 중...');
console.log('API 키:', CLAUDE_API_KEY ? `${CLAUDE_API_KEY.substring(0, 20)}...` : '❌ 없음');

app.post('/api/chat', async (req, res) => {
    try {
        const { message, department, pageUrl, userInfo } = req.body;
        
        console.log(`📨 요청: ${message}`);
        
        if (!CLAUDE_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'API 키가 설정되지 않았습니다'
            });
        }
        
        const user = userInfo || {
            name: '공무원',
            position: '담당관',
            rank: '5급'
        };
        
        const systemPrompt = `당신은 대한민국 정부 ${department}의 AI 업무 지원 시스템입니다.

현재 상황:
- 기관/부서: ${department}
- 사용자: ${user.name} ${user.position} (${user.rank})

사용자가 "누구세요?" 또는 자기소개를 요청하면:
- 자신의 역할과 기능을 소개
- 현재 부서명을 명확히 언급
- 할 수 있는 일을 간단히 나열

사용자 요청: ${message}

한국어로 친절하고 전문적으로 답변하세요.`;

        const postData = JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            messages: [{
                role: 'user',
                content: systemPrompt
            }]
        });

        const options = {
            hostname: 'api.anthropic.com',
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const apiReq = https.request(options, (apiRes) => {
            let data = '';
            
            apiRes.on('data', (chunk) => {
                data += chunk;
            });
            
            apiRes.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    
                    if (result.content && result.content[0]) {
                        console.log('✅ 응답 성공');
                        res.json({
                            success: true,
                            reply: result.content[0].text,
                            hash: generateHash(),
                            timestamp: new Date().toISOString()
                        });
                    } else {
                        console.error('❌ API 응답:', result);
                        res.status(500).json({
                            success: false,
                            error: 'API 응답 형식 오류',
                            details: result
                        });
                    }
                } catch (e) {
                    console.error('❌ JSON 파싱 오류:', e, data);
                    res.status(500).json({
                        success: false,
                        error: 'JSON 파싱 실패'
                    });
                }
            });
        });

        apiReq.on('error', (error) => {
            console.error('❌ API 요청 오류:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        });

        apiReq.write(postData);
        apiReq.end();
        
    } catch (error) {
        console.error('❌ 서버 오류:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

function generateHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

// 0.0.0.0으로 명시적 바인딩
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Government AI API running on http://0.0.0.0:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
});
