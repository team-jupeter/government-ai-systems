// 시민용 서류 종류 데이터베이스

const citizenDocuments = {
    // 주민등록 관련
    '주민등록등본': {
        category: '주민등록',
        description: '주소지를 같이하는 세대 구성원 전체 정보',
        issuer: '행정안전부',
        onlineAvailable: true
    },
    '주민등록초본': {
        category: '주민등록',
        description: '개인의 상세한 주민등록 사항',
        issuer: '행정안전부',
        onlineAvailable: true
    },
    '주민등록증명서': {
        category: '주민등록',
        description: '주민등록 사실 증명',
        issuer: '행정안전부',
        onlineAvailable: true
    },
    '전입신고확인서': {
        category: '주민등록',
        description: '전입신고 사실 확인',
        issuer: '행정안전부',
        onlineAvailable: true
    },
    
    // 가족관계 관련
    '가족관계증명서': {
        category: '가족관계',
        description: '본인, 배우자, 부모, 자녀의 관계 증명',
        issuer: '대법원',
        onlineAvailable: true
    },
    '기본증명서': {
        category: '가족관계',
        description: '출생, 사망 등 기본 신분사항',
        issuer: '대법원',
        onlineAvailable: true
    },
    '혼인관계증명서': {
        category: '가족관계',
        description: '혼인, 이혼 등 혼인관계 사항',
        issuer: '대법원',
        onlineAvailable: true
    },
    '입양관계증명서': {
        category: '가족관계',
        description: '입양 관련 사항',
        issuer: '대법원',
        onlineAvailable: true
    },
    '제적등본': {
        category: '가족관계',
        description: '2007년 이전 호적 정보',
        issuer: '대법원',
        onlineAvailable: true
    },
    
    // 인감 및 서명
    '인감증명서': {
        category: '인감/서명',
        description: '인감 사실 증명',
        issuer: '행정안전부',
        onlineAvailable: false
    },
    '본인서명사실확인서': {
        category: '인감/서명',
        description: '본인 서명 확인',
        issuer: '행정안전부',
        onlineAvailable: false
    },
    
    // 세금 관련
    '소득금액증명원': {
        category: '세금',
        description: '종합소득세 신고 소득',
        issuer: '국세청',
        onlineAvailable: true
    },
    '사업자등록증명원': {
        category: '세금',
        description: '사업자등록 증명',
        issuer: '국세청',
        onlineAvailable: true
    },
    '납세증명서': {
        category: '세금',
        description: '국세 납부 증명',
        issuer: '국세청',
        onlineAvailable: true
    },
    '재산세납세증명서': {
        category: '세금',
        description: '재산세 납부 증명',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '지방세납세증명서': {
        category: '세금',
        description: '지방세 납부 증명',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '지방세세목별과세증명서': {
        category: '세금',
        description: '재산세, 자동차세 등 세목별 증명',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '소득금액증명': {
        category: '세금',
        description: '근로소득, 사업소득 증명',
        issuer: '국세청',
        onlineAvailable: true
    },
    
    // 건강보험
    '건강보험자격득실확인서': {
        category: '건강보험',
        description: '건강보험 가입 이력',
        issuer: '국민건강보험공단',
        onlineAvailable: true
    },
    '건강보험료납부확인서': {
        category: '건강보험',
        description: '건강보험료 납부 이력',
        issuer: '국민건강보험공단',
        onlineAvailable: true
    },
    
    // 토지/건축물
    '토지대장': {
        category: '토지/건축',
        description: '토지의 소재, 지번, 면적, 소유자',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '임야대장': {
        category: '토지/건축',
        description: '임야의 소재, 지번, 면적, 소유자',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '건축물대장': {
        category: '토지/건축',
        description: '건축물의 표시, 소유자 등',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '지적도': {
        category: '토지/건축',
        description: '토지의 경계선 표시',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '임야도': {
        category: '토지/건축',
        description: '임야의 경계선 표시',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    
    // 등기
    '부동산등기부등본': {
        category: '등기',
        description: '부동산의 권리관계',
        issuer: '대법원',
        onlineAvailable: true
    },
    '법인등기부등본': {
        category: '등기',
        description: '법인의 등기사항',
        issuer: '대법원',
        onlineAvailable: true
    },
    
    // 차량
    '자동차등록증': {
        category: '차량',
        description: '자동차 등록 증명',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    '자동차등록원부': {
        category: '차량',
        description: '자동차 상세 등록정보',
        issuer: '지방자치단체',
        onlineAvailable: true
    },
    
    // 병역
    '병적증명서': {
        category: '병역',
        description: '병역 이행 사실 증명',
        issuer: '병무청',
        onlineAvailable: true
    },
    
    // 교육
    '졸업증명서': {
        category: '교육',
        description: '학교 졸업 증명',
        issuer: '교육기관',
        onlineAvailable: true
    },
    '성적증명서': {
        category: '교육',
        description: '학업 성적 증명',
        issuer: '교육기관',
        onlineAvailable: true
    },
    '재학증명서': {
        category: '교육',
        description: '학교 재학 증명',
        issuer: '교육기관',
        onlineAvailable: true
    },
    
    // 금융
    '통장사본': {
        category: '금융',
        description: '금융거래 내역',
        issuer: '금융기관',
        onlineAvailable: false
    },
    '잔액증명서': {
        category: '금융',
        description: '예금잔액 증명',
        issuer: '금융기관',
        onlineAvailable: false
    },
    '거래내역서': {
        category: '금융',
        description: '금융거래 상세내역',
        issuer: '금융기관',
        onlineAvailable: false
    },
    
    // 기타
    '경력증명서': {
        category: '기타',
        description: '경력 사항 증명',
        issuer: '근무처',
        onlineAvailable: false
    },
    '재직증명서': {
        category: '기타',
        description: '재직 사실 증명',
        issuer: '근무처',
        onlineAvailable: false
    },
    '급여명세서': {
        category: '기타',
        description: '급여 지급 내역',
        issuer: '근무처',
        onlineAvailable: false
    },
    '임대차계약서': {
        category: '기타',
        description: '부동산 임대차 계약',
        issuer: '개인',
        onlineAvailable: false
    },
    '사진': {
        category: '기타',
        description: '증명사진',
        issuer: '사진관',
        onlineAvailable: false
    }
};

// 카테고리별 정렬
const documentCategories = {
    '주민등록': [],
    '가족관계': [],
    '인감/서명': [],
    '세금': [],
    '건강보험': [],
    '토지/건축': [],
    '등기': [],
    '차량': [],
    '병역': [],
    '교육': [],
    '금융': [],
    '기타': []
};

// 서류를 카테고리별로 분류
Object.keys(citizenDocuments).forEach(docName => {
    const category = citizenDocuments[docName].category;
    if (documentCategories[category]) {
        documentCategories[category].push(docName);
    }
});

// 전역 변수로 export
if (typeof window !== 'undefined') {
    window.citizenDocuments = citizenDocuments;
    window.documentCategories = documentCategories;
}
