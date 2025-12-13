// JSON 파싱 전용 모듈
window.GeneratorJSONParser = {
    // AI 응답에서 JSON 추출 및 파싱
    extractAndParse: function(aiMessage, siteData) {
        try {
            // 여러 패턴으로 JSON_DATA 찾기
            const patterns = [
                /JSON_DATA:\s*(\{[\s\S]*?\})\s*$/m,           // 마지막 JSON
                /JSON_DATA:\s*(\{[^{}]*\{[^{}]*\}[^{}]*\})/,  // 중첩 객체
                /JSON_DATA:\s*(\{[^{}]+\})/                    // 단순 객체
            ];
            
            let jsonStr = null;
            let matchedPattern = null;
            
            for (const pattern of patterns) {
                const match = aiMessage.match(pattern);
                if (match && match[1]) {
                    jsonStr = match[1];
                    matchedPattern = pattern;
                    break;
                }
            }
            
            if (!jsonStr) {
                console.log('JSON_DATA 없음');
                return null;
            }
            
            // JSON 정규화
            jsonStr = this.normalizeJSON(jsonStr);
            
            // 파싱 시도
            const parsedData = JSON.parse(jsonStr);
            
            // siteData 병합
            Object.assign(siteData, parsedData);
            
            console.log('✅ JSON 파싱 성공:', parsedData);
            return parsedData;
            
        } catch (error) {
            console.error('❌ JSON 파싱 실패:', error);
            console.error('원본 메시지:', aiMessage);
            
            // 수동 파싱 시도
            return this.manualParse(aiMessage, siteData);
        }
    },
    
    // JSON 정규화
    normalizeJSON: function(jsonStr) {
        return jsonStr
            .replace(/'/g, '"')                    // 작은따옴표 → 큰따옴표
            .replace(/(\w+):/g, '"$1":')          // 키에 따옴표 추가
            .replace(/,\s*}/g, '}')               // trailing comma 제거
            .replace(/,\s*]/g, ']')               // 배열 trailing comma 제거
            .replace(/"\s*:\s*"([^"]*)"(?=[,}])/g, '":"$1"')  // 값 정규화
            .trim();
    },
    
    // 수동 파싱 (정규식 실패 시)
    manualParse: function(aiMessage, siteData) {
        try {
            // 키-값 쌍 추출
            const pairs = aiMessage.match(/"(\w+)"\s*:\s*"([^"]*)"/g);
            if (!pairs) return null;
            
            const result = {};
            pairs.forEach(pair => {
                const [key, value] = pair.split(':').map(s => s.trim().replace(/"/g, ''));
                if (key && value) {
                    result[key] = value;
                }
            });
            
            Object.assign(siteData, result);
            console.log('✅ 수동 파싱 성공:', result);
            return result;
            
        } catch (error) {
            console.error('❌ 수동 파싱도 실패:', error);
            return null;
        }
    },
    
    // JSON_DATA 제거 (표시용)
    removeJSON: function(text) {
        return text
            .replace(/JSON_DATA:\s*\{[\s\S]*?\}\s*$/m, '')
            .replace(/JSON_DATA:\s*\{[^{}]*\{[^{}]*\}[^{}]*\}/g, '')
            .replace(/JSON_DATA:\s*\{[^{}]+\}/g, '')
            .trim();
    }
};
