// System Prompts 관리
window.GeneratorPrompts = {
    // 업종별 구조
    structures: {
        food: {
            name: '음식점',
            sections: ['hero', 'menu', 'facilities', 'chef', 'gallery', 'hours', 'reservations', 'contact'],
            questions: [
                '대표 메뉴는 무엇인가요?',
                '메뉴를 카테고리별로 알려주세요',
                '각 메뉴의 가격은?',
                '주차 가능 대수는?',
                '예약 필수인가요?',
                '주요 고객 리뷰를 알려주세요'
            ]
        },
        government: {
            name: '관공서',
            sections: ['hero', 'departments', 'services', 'documents', 'hours', 'contact', 'faq'],
            questions: [
                '부서의 주요 업무는?',
                '제공하는 민원 서비스는?',
                '각 서비스의 처리 시간은?',
                '필요한 서류는?',
                '온라인 신청 가능한가요?'
            ]
        },
        medical: {
            name: '의료기관',
            sections: ['hero', 'specialties', 'doctors', 'services', 'facilities', 'insurance', 'hours', 'appointments'],
            questions: [
                '전문 진료 과목은?',
                '의료진 구성은?',
                '주요 진료 서비스는?',
                '보유 의료 장비는?',
                '예약은 어떻게?'
            ]
        },
        retail: {
            name: '소매업',
            sections: ['hero', 'products', 'brands', 'delivery', 'payment', 'gallery', 'hours', 'returns'],
            questions: [
                '주력 상품 카테고리는?',
                '각 카테고리별 대표 상품은?',
                '상품별 가격대는?',
                '배송 방법과 기간은?',
                '베스트셀러 상품은?'
            ]
        }
    },
    
    // System Prompt 생성
    getSystemPrompt: function(siteData) {
        const collected = Object.entries(siteData)
            .filter(([k, v]) => v !== null && v !== '')
            .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
            .join(', ');
        
        const structure = siteData.industry ? this.structures[siteData.industry] : null;
        
        let prompt = `당신은 정부 표준 웹사이트 생성 AI입니다.

【 중요 규칙 】
1. 정보를 파악하면 반드시 JSON_DATA 형식으로 출력하세요
2. JSON은 반드시 한 줄로 작성하세요 (줄바꿈 금지)
3. JSON 형식: JSON_DATA: {"key": "value"}
4. 배열은 피하고 단순 키-값으로만 저장하세요

예시:
사용자: "다사랑 횟집이고 전화번호는 064-123-4567입니다"
AI: 좋습니다! JSON_DATA: {"business_name": "다사랑 횟집", "phone": "064-123-4567"}
`;

        if (!siteData.industry) {
            prompt += `
【 1단계: 업종 파악 】
질문: "어떤 업종이신가요? (음식점/관공서/의료/소매)"
`;
        } else {
            prompt += `
【 현재 업종: ${structure.name} 】
【 필요한 정보 】
${structure.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

한 번에 2-3개씩 자연스럽게 질문하세요.
`;
        }

        prompt += `
【 수집된 정보 】
${collected || '없음'}

【 JSON 예시 】
JSON_DATA: {"menu": "광어회, 우럭회", "price": "30000"}
`;

        return prompt;
    }
};
