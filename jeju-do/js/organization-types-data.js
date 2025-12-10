// 한국의 단체 종류 및 필요 서류 데이터

const ORGANIZATION_TYPES = {
    // 영리 법인
    "주식회사": {
        category: "영리법인",
        documents: [
            "법인등기부등본",
            "사업자등록증",
            "법인인감증명서",
            "정관",
            "주주명부",
            "재무제표",
            "법인세신고서",
            "법인통장사본"
        ]
    },
    "유한회사": {
        category: "영리법인",
        documents: [
            "법인등기부등본",
            "사업자등록증",
            "법인인감증명서",
            "정관",
            "사원명부",
            "재무제표",
            "법인세신고서"
        ]
    },
    "유한책임회사": {
        category: "영리법인",
        documents: [
            "법인등기부등본",
            "사업자등록증",
            "법인인감증명서",
            "정관",
            "사원명부",
            "재무제표"
        ]
    },
    
    // 비영리 법인
    "사단법인": {
        category: "비영리법인",
        documents: [
            "법인등기부등본",
            "법인설립허가증",
            "정관",
            "사업계획서",
            "수입지출계산서",
            "임원명부",
            "회원명부",
            "고유번호증"
        ]
    },
    "재단법인": {
        category: "비영리법인",
        documents: [
            "법인등기부등본",
            "법인설립허가증",
            "정관",
            "사업계획서",
            "재산목록",
            "수입지출계산서",
            "임원명부",
            "고유번호증"
        ]
    },
    "학교법인": {
        category: "비영리법인",
        documents: [
            "법인등기부등본",
            "법인설립허가증",
            "정관",
            "사업계획서",
            "재무제표",
            "임원명부",
            "교육부인가서"
        ]
    },
    "사회복지법인": {
        category: "비영리법인",
        documents: [
            "법인등기부등본",
            "법인설립허가증",
            "정관",
            "사업계획서",
            "재무제표",
            "임원명부",
            "사회복지사업허가증"
        ]
    },
    "의료법인": {
        category: "비영리법인",
        documents: [
            "법인등기부등본",
            "법인설립허가증",
            "정관",
            "사업계획서",
            "재무제표",
            "임원명부",
            "의료기관개설허가증"
        ]
    },
    "공익법인": {
        category: "비영리법인",
        documents: [
            "법인등기부등본",
            "법인설립허가증",
            "정관",
            "사업계획서",
            "수입지출계산서",
            "임원명부",
            "고유번호증",
            "공익법인결산서류"
        ]
    },
    
    // 비영리 단체
    "비영리민간단체": {
        category: "비영리단체",
        documents: [
            "고유번호증",
            "정관(회칙)",
            "회원명부",
            "사업계획서",
            "임원명부",
            "수입지출내역서",
            "등록증"
        ]
    },
    "비영리임의단체": {
        category: "비영리단체",
        documents: [
            "고유번호증",
            "정관(회칙)",
            "회원명부",
            "임원명부",
            "수입지출내역서"
        ]
    },
    "사회적협동조합": {
        category: "협동조합",
        documents: [
            "고유번호증",
            "설립인가증",
            "정관",
            "조합원명부",
            "사업계획서",
            "재무제표",
            "사업자등록증"
        ]
    },
    "협동조합": {
        category: "협동조합",
        documents: [
            "고유번호증",
            "설립신고증",
            "정관",
            "조합원명부",
            "사업계획서",
            "재무제표"
        ]
    },
    
    // 협회
    "사업자협회": {
        category: "협회",
        documents: [
            "고유번호증",
            "정관",
            "회원명부",
            "사업계획서",
            "임원명부",
            "수입지출내역서"
        ]
    },
    "직능단체": {
        category: "협회",
        documents: [
            "고유번호증",
            "정관",
            "회원명부",
            "임원명부",
            "수입지출내역서"
        ]
    },
    
    // 기타
    "개인사업자": {
        category: "기타",
        documents: [
            "사업자등록증",
            "신분증",
            "사업장임대차계약서",
            "통장사본"
        ]
    },
    "소상공인": {
        category: "기타",
        documents: [
            "사업자등록증",
            "신분증",
            "소상공인확인서",
            "통장사본"
        ]
    }
};

// 개인 필요 서류
const CITIZEN_DOCUMENTS = [
    "주민등록증",
    "주민등록표 등본",
    "주민등록표 초본",
    "인감증명서",
    "본인서명사실확인서",
    "가족관계증명서",
    "건강보험자격득실확인서",
    "소득금액증명원",
    "재산세납세증명서"
];

// 카테고리별 분류
const ORGANIZATION_CATEGORIES = {
    "영리법인": ["주식회사", "유한회사", "유한책임회사", "합자회사", "합명회사"],
    "비영리법인": ["사단법인", "재단법인", "학교법인", "사회복지법인", "의료법인", "공익법인"],
    "비영리단체": ["비영리민간단체", "비영리임의단체"],
    "협동조합": ["사회적협동조합", "협동조합", "농협", "수협", "산림조합"],
    "협회": ["사업자협회", "직능단체", "학회", "연구회"],
    "기타": ["개인사업자", "소상공인"]
};

// 전역 export
window.ORGANIZATION_TYPES = ORGANIZATION_TYPES;
window.CITIZEN_DOCUMENTS = CITIZEN_DOCUMENTS;
window.ORGANIZATION_CATEGORIES = ORGANIZATION_CATEGORIES;

// 소문자 버전도 export (하위 호환성)
window.organizationTypes = {};

// documents를 requiredDocuments로 매핑
Object.keys(ORGANIZATION_TYPES).forEach(orgType => {
    window.organizationTypes[orgType] = {
        ...ORGANIZATION_TYPES[orgType],
        requiredDocuments: ORGANIZATION_TYPES[orgType].documents
    };
});

console.log("organizationTypes 로드됨:", Object.keys(window.organizationTypes).length, "종류");
