// 단체 PDV 관리 시스템

class OrganizationManager {
    constructor() {
        this.storageKey = 'jeju_org_pdv_data';
        
        // 단체 종류 목록
        this.organizationTypes = [
            // 영리법인
            { value: 'corporation_stock', label: '주식회사', category: '영리법인' },
            { value: 'corporation_limited', label: '유한회사', category: '영리법인' },
            { value: 'corporation_partnership', label: '합명회사', category: '영리법인' },
            { value: 'corporation_limited_partnership', label: '합자회사', category: '영리법인' },
            { value: 'corporation_llc', label: '유한책임회사', category: '영리법인' },
            
            // 비영리법인
            { value: 'nonprofit_association', label: '사단법인', category: '비영리법인' },
            { value: 'nonprofit_foundation', label: '재단법인', category: '비영리법인' },
            { value: 'nonprofit_school', label: '학교법인', category: '비영리법인' },
            { value: 'nonprofit_medical', label: '의료법인', category: '비영리법인' },
            { value: 'nonprofit_welfare', label: '사회복지법인', category: '비영리법인' },
            { value: 'nonprofit_religious', label: '종교법인', category: '비영리법인' },
            { value: 'nonprofit_public', label: '공익법인', category: '비영리법인' },
            
            // 협동조합
            { value: 'coop_general', label: '일반협동조합', category: '협동조합' },
            { value: 'coop_social', label: '사회적협동조합', category: '협동조합' },
            { value: 'coop_agriculture', label: '농업협동조합', category: '협동조합' },
            { value: 'coop_fishery', label: '수산업협동조합', category: '협동조합' },
            { value: 'coop_credit', label: '신용협동조합', category: '협동조합' },
            
            // 사회적 경제
            { value: 'social_enterprise', label: '사회적기업', category: '사회적경제' },
            { value: 'social_village', label: '마을기업', category: '사회적경제' },
            { value: 'social_self', label: '자활기업', category: '사회적경제' },
            
            // 공공기관
            { value: 'public_government', label: '정부기관', category: '공공기관' },
            { value: 'public_enterprise', label: '공기업', category: '공공기관' },
            { value: 'public_quasi', label: '준정부기관', category: '공공기관' },
            { value: 'public_local', label: '지방공사/공단', category: '공공기관' },
            
            // 개인사업자
            { value: 'individual_general', label: '개인사업자(일반)', category: '개인사업자' },
            { value: 'individual_simple', label: '개인사업자(간이)', category: '개인사업자' },
            
            // 전문직법인
            { value: 'professional_law', label: '법무법인', category: '전문직법인' },
            { value: 'professional_accounting', label: '회계법인', category: '전문직법인' },
            { value: 'professional_patent', label: '특허법인', category: '전문직법인' },
            { value: 'professional_tax', label: '세무법인', category: '전문직법인' }
        ];
        
        // 업종 목록
        this.industries = [
            '제조업', '건설업', '도소매업', '숙박 및 음식점업', '운수업',
            '정보통신업', '금융 및 보험업', '부동산업', '전문/과학/기술 서비스업',
            '교육 서비스업', '보건업 및 사회복지 서비스업', '예술/스포츠/여가',
            '협회 및 단체', '공공행정/국방/사회보장', '농업/임업/어업'
        ];
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    generateOrgData(phoneNumber, uniqueId, orgType, department) {
        const orgNames = [
            '제주테크', '한라산업', '돌담건설', '감귤유통', '오션리조트',
            '제주푸드', '아라웰니스', '성산물류', '서귀포제약', '탐라엔지니어링'
        ];
        
        const identifier = phoneNumber || uniqueId;
        const hash = this.hashString(identifier);
        
        const name = orgNames[hash % orgNames.length];
        const industry = this.industries[hash % this.industries.length];
        const establishYear = 2000 + (hash % 24);
        
        return {
            name: name,
            department: department || null,
            orgType: orgType,
            industry: industry,
            establishDate: `${establishYear}-${String((hash % 12) + 1).padStart(2, '0')}-${String((hash % 28) + 1).padStart(2, '0')}`,
            businessNumber: `${(hash % 900) + 100}-${(hash % 90) + 10}-${(hash % 90000) + 10000}`,
            phone: phoneNumber || `064-${(hash % 900) + 100}-${(hash % 9000) + 1000}`,
            address: `제주특별자치도 제주시 첨단로 ${(hash % 500) + 1}`,
            email: `${name.toLowerCase()}@company.co.kr`,
            fax: `064-${(hash % 900) + 100}-${(hash % 9000) + 1000}`,
            representative: this.generateRepName(hash)
        };
    }

    generateRepName(hash) {
        const surnames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임'];
        const names = ['영수', '민준', '서연', '지훈', '예은', '도윤', '하은', '시우', '수아', '준서'];
        return surnames[hash % surnames.length] + names[(hash * 7) % names.length];
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 주식회사 문서 생성
    async generateStockCorpDocs(orgData, progressCallback) {
        const docs = {};
        
        const corpName = orgData.department 
            ? `${orgData.name} 주식회사 ${orgData.department}`
            : `${orgData.name} 주식회사`;
        
        progressCallback('법인등기부등본 생성 중...');
        await this.delay(800);
        docs.corporateRegistry = {
            type: '법인등기부등본',
            corporateName: corpName,
            department: orgData.department,
            businessNumber: orgData.businessNumber,
            representative: orgData.representative,
            establishDate: orgData.establishDate,
            address: orgData.address,
            capital: `${((this.hashString(orgData.businessNumber) % 900) + 100) * 1000000}원`,
            purpose: '제조업, 도소매업 등',
            issuer: '대법원 인터넷등기소',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('사업자등록증 생성 중...');
        await this.delay(700);
        docs.businessLicense = {
            type: '사업자등록증',
            businessNumber: orgData.businessNumber,
            corporateName: corpName,
            department: orgData.department,
            representative: orgData.representative,
            address: orgData.address,
            businessType: orgData.industry,
            issueDate: orgData.establishDate,
            issuer: '제주시장',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('재무제표 생성 중...');
        await this.delay(1000);
        const revenue = (this.hashString(orgData.businessNumber) % 5000000000) + 1000000000;
        docs.financialStatement = {
            type: '재무제표',
            department: orgData.department,
            fiscalYear: new Date().getFullYear() - 1,
            revenue: revenue,
            operatingProfit: Math.floor(revenue * 0.15),
            netIncome: Math.floor(revenue * 0.08),
            totalAssets: Math.floor(revenue * 2.5),
            totalLiabilities: Math.floor(revenue * 1.2),
            totalEquity: Math.floor(revenue * 1.3),
            generatedAt: new Date().toISOString()
        };
        
        return docs;
    }

    // 사단법인 문서 생성
    async generateAssociationDocs(orgData, progressCallback) {
        const docs = {};
        
        const corpName = orgData.department 
            ? `사단법인 ${orgData.name} ${orgData.department}`
            : `사단법인 ${orgData.name}`;
        
        progressCallback('법인등기부등본 생성 중...');
        await this.delay(800);
        docs.corporateRegistry = {
            type: '법인등기부등본',
            corporateName: corpName,
            department: orgData.department,
            businessNumber: orgData.businessNumber,
            representative: orgData.representative,
            establishDate: orgData.establishDate,
            address: orgData.address,
            purpose: '학술, 문화, 예술 진흥',
            issuer: '대법원 인터넷등기소',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('정관 생성 중...');
        await this.delay(700);
        docs.articles = {
            type: '정관',
            name: corpName,
            department: orgData.department,
            totalChapters: 7,
            totalArticles: 45,
            lastAmended: '2023-03-15',
            mainPurpose: '제주지역 문화예술 진흥 및 보급',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('설립허가증 생성 중...');
        await this.delay(600);
        docs.permit = {
            type: '설립허가증',
            permitNumber: `제주-${(this.hashString(orgData.businessNumber) % 9000) + 1000}호`,
            corporateName: corpName,
            department: orgData.department,
            permitDate: orgData.establishDate,
            authority: '제주특별자치도지사',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('사업계획서 생성 중...');
        await this.delay(800);
        docs.businessPlan = {
            type: '사업계획서',
            department: orgData.department,
            fiscalYear: new Date().getFullYear(),
            mainProjects: ['문화행사 개최', '회원교육 프로그램', '지역사회 기여활동'],
            totalBudget: (this.hashString(orgData.businessNumber) % 500000000) + 50000000,
            generatedAt: new Date().toISOString()
        };
        
        return docs;
    }

    // 협동조합 문서 생성
    async generateCoopDocs(orgData, progressCallback) {
        const docs = {};
        
        const coopName = orgData.department 
            ? `${orgData.name} 협동조합 ${orgData.department}`
            : `${orgData.name} 협동조합`;
        
        progressCallback('협동조합 설립신고증 생성 중...');
        await this.delay(800);
        docs.coopCertificate = {
            type: '협동조합 설립신고증',
            coopName: coopName,
            department: orgData.department,
            businessNumber: orgData.businessNumber,
            reportNumber: `제주-${(this.hashString(orgData.businessNumber) % 9000) + 1000}`,
            establishDate: orgData.establishDate,
            address: orgData.address,
            issuer: '제주특별자치도지사',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('정관 생성 중...');
        await this.delay(700);
        docs.articles = {
            type: '정관',
            coopName: coopName,
            department: orgData.department,
            totalChapters: 8,
            totalArticles: 52,
            lastAmended: '2023-06-20',
            mainPurpose: '조합원 경제적 이익 증진',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('조합원 명부 생성 중...');
        await this.delay(600);
        const memberCount = (this.hashString(orgData.businessNumber) % 150) + 50;
        docs.memberList = {
            type: '조합원 명부',
            department: orgData.department,
            totalMembers: memberCount,
            regularMembers: Math.floor(memberCount * 0.9),
            associateMembers: Math.floor(memberCount * 0.1),
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('사업자등록증 생성 중...');
        await this.delay(700);
        docs.businessLicense = {
            type: '사업자등록증',
            businessNumber: orgData.businessNumber,
            coopName: coopName,
            department: orgData.department,
            representative: orgData.representative,
            address: orgData.address,
            businessType: orgData.industry,
            issueDate: orgData.establishDate,
            issuer: '제주시장',
            generatedAt: new Date().toISOString()
        };
        
        return docs;
    }

    // 정부기관 문서 생성
    async generateGovernmentDocs(orgData, progressCallback) {
        const docs = {};
        
        const agencyName = orgData.department 
            ? `${orgData.name} ${orgData.department}`
            : orgData.name;
        
        progressCallback('설립근거법 생성 중...');
        await this.delay(800);
        docs.legalBasis = {
            type: '설립근거법',
            agencyName: agencyName,
            department: orgData.department,
            legalBasis: '제주특별자치도 설치 및 국제자유도시 조성을 위한 특별법',
            establishDate: orgData.establishDate,
            authority: '제주특별자치도',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('조직도 생성 중...');
        await this.delay(700);
        docs.organizationChart = {
            type: '조직도',
            department: orgData.department,
            departments: orgData.department ? [orgData.department] : ['기획조정실', '행정지원과', '정책개발과', '사업추진과'],
            totalStaff: (this.hashString(orgData.businessNumber) % 80) + 20,
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('예산서 생성 중...');
        await this.delay(900);
        const budget = (this.hashString(orgData.businessNumber) % 10000000000) + 5000000000;
        docs.budget = {
            type: '예산서',
            department: orgData.department,
            fiscalYear: new Date().getFullYear(),
            totalBudget: budget,
            personnelExpenses: Math.floor(budget * 0.4),
            operatingExpenses: Math.floor(budget * 0.3),
            projectExpenses: Math.floor(budget * 0.3),
            generatedAt: new Date().toISOString()
        };
        
        return docs;
    }

    // 개인사업자 문서 생성
    async generateSoleProprietorDocs(orgData, progressCallback) {
        const docs = {};
        
        const businessName = orgData.department 
            ? `${orgData.name} ${orgData.department}`
            : orgData.name;
        
        progressCallback('사업자등록증 생성 중...');
        await this.delay(800);
        docs.businessLicense = {
            type: '사업자등록증',
            businessNumber: orgData.businessNumber,
            businessName: businessName,
            department: orgData.department,
            representative: orgData.representative,
            address: orgData.address,
            businessType: orgData.industry,
            taxType: orgData.orgType === 'individual_simple' ? '간이과세' : '일반과세',
            issueDate: orgData.establishDate,
            issuer: '제주시장',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('사업자신고증명 생성 중...');
        await this.delay(700);
        docs.businessReport = {
            type: '사업자신고증명',
            businessNumber: orgData.businessNumber,
            businessName: businessName,
            department: orgData.department,
            representative: orgData.representative,
            reportDate: orgData.establishDate,
            taxOffice: '제주세무서',
            generatedAt: new Date().toISOString()
        };
        
        if (orgData.orgType !== 'individual_simple') {
            progressCallback('재무제표 생성 중...');
            await this.delay(800);
            const revenue = (this.hashString(orgData.businessNumber) % 500000000) + 100000000;
            docs.financialStatement = {
                type: '재무제표',
                department: orgData.department,
                fiscalYear: new Date().getFullYear() - 1,
                revenue: revenue,
                expenses: Math.floor(revenue * 0.75),
                netIncome: Math.floor(revenue * 0.25),
                generatedAt: new Date().toISOString()
            };
        }
        
        return docs;
    }

    // 의료법인 문서 생성
    async generateMedicalCorpDocs(orgData, progressCallback) {
        const docs = {};
        
        const corpName = orgData.department 
            ? `의료법인 ${orgData.name} ${orgData.department}`
            : `의료법인 ${orgData.name}`;
        
        progressCallback('법인등기부등본 생성 중...');
        await this.delay(800);
        docs.corporateRegistry = {
            type: '법인등기부등본',
            corporateName: corpName,
            department: orgData.department,
            businessNumber: orgData.businessNumber,
            representative: orgData.representative,
            establishDate: orgData.establishDate,
            address: orgData.address,
            purpose: '의료업',
            issuer: '대법원 인터넷등기소',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('의료법인 허가증 생성 중...');
        await this.delay(700);
        docs.medicalPermit = {
            type: '의료법인 허가증',
            permitNumber: `제주보건-${(this.hashString(orgData.businessNumber) % 9000) + 1000}`,
            corporateName: corpName,
            department: orgData.department,
            permitDate: orgData.establishDate,
            authority: '제주특별자치도지사',
            generatedAt: new Date().toISOString()
        };
        
        progressCallback('의료기관 개설허가증 생성 중...');
        await this.delay(700);
        docs.hospitalPermit = {
            type: '의료기관 개설허가증',
            hospitalName: orgData.department ? `${orgData.name}병원 ${orgData.department}` : `${orgData.name}병원`,
            department: orgData.department,
            permitNumber: `제주-의료-${(this.hashString(orgData.businessNumber) % 9000) + 1000}`,
            address: orgData.address,
            medicalDepartments: ['내과', '외과', '정형외과', '소아과', '산부인과'],
            bedCount: (this.hashString(orgData.businessNumber) % 200) + 50,
            permitDate: orgData.establishDate,
            generatedAt: new Date().toISOString()
        };
        
        return docs;
    }

    async createOrgPDV(phoneNumber, uniqueId, orgType, department, progressCallback) {
        progressCallback('단체 PDV 생성을 시작합니다...');
        await this.delay(500);

        // PDV ID 생성 (부서가 있으면 부서 포함)
        let pdvId;
        if (uniqueId) {
            pdvId = department ? `ORG-PDV-${uniqueId}-${department.replace(/\s+/g, '')}` : `ORG-PDV-${uniqueId}`;
        } else {
            const phoneClean = phoneNumber.replace(/-/g, '');
            pdvId = department ? `ORG-PDV-${phoneClean}-${department.replace(/\s+/g, '')}` : `ORG-PDV-${phoneClean}`;
        }

        const orgData = this.generateOrgData(phoneNumber, uniqueId, orgType, department);

        const displayName = department ? `${orgData.name} ${department}` : orgData.name;
        progressCallback(`${displayName}의 정보를 생성 중입니다...`);
        await this.delay(500);

        let documents = {};

        // 단체 종류별 문서 생성
        if (orgType === 'corporation_stock' || orgType === 'corporation_limited') {
            documents = await this.generateStockCorpDocs(orgData, progressCallback);
        } else if (orgType === 'nonprofit_association') {
            documents = await this.generateAssociationDocs(orgData, progressCallback);
        } else if (orgType.startsWith('coop_')) {
            documents = await this.generateCoopDocs(orgData, progressCallback);
        } else if (orgType === 'public_government') {
            documents = await this.generateGovernmentDocs(orgData, progressCallback);
        } else if (orgType.startsWith('individual_')) {
            documents = await this.generateSoleProprietorDocs(orgData, progressCallback);
        } else if (orgType === 'nonprofit_medical') {
            documents = await this.generateMedicalCorpDocs(orgData, progressCallback);
        } else {
            documents = await this.generateStockCorpDocs(orgData, progressCallback);
        }

        // 공통 연락처 정보 추가
        progressCallback('연락처 정보 생성 중...');
        await this.delay(500);
        documents.contactInfo = {
            type: '연락처 정보',
            department: orgData.department,
            phone: orgData.phone,
            fax: orgData.fax,
            email: orgData.email,
            address: orgData.address,
            generatedAt: new Date().toISOString()
        };

        progressCallback('PDV 데이터를 저장하는 중...');
        await this.delay(600);

        const pdvData = {
            pdvId: pdvId,
            phoneNumber: phoneNumber,
            uniqueId: uniqueId,
            orgType: orgType,
            department: department,
            createdAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
            orgData: orgData,
            documents: documents,
            records: [
                {
                    timestamp: new Date().toISOString(),
                    type: 'ORG_PDV_CREATED',
                    description: department ? `${department} 부서 PDV가 생성되었습니다` : '단체 PDV가 생성되었습니다',
                    data: { pdvId: pdvId, orgType: orgType, department: department }
                }
            ],
            chatHistory: {
                general: [],
                departments: {}
            }
        };

        this.saveOrgPDV(pdvData);

        progressCallback(department ? `${department} 부서 PDV 생성이 완료되었습니다!` : '단체 PDV 생성이 완료되었습니다!');
        await this.delay(800);

        return pdvData;
    }

    saveOrgPDV(pdvData) {
        try {
            const allPDVs = this.getAllOrgPDVs();
            allPDVs[pdvData.pdvId] = pdvData;
            localStorage.setItem(this.storageKey, JSON.stringify(allPDVs));
            return true;
        } catch (e) {
            console.error('단체 PDV 저장 실패:', e);
            return false;
        }
    }

    loadOrgPDV(phoneNumber, uniqueId, department) {
        let pdvId;
        if (uniqueId) {
            pdvId = department ? `ORG-PDV-${uniqueId}-${department.replace(/\s+/g, '')}` : `ORG-PDV-${uniqueId}`;
        } else {
            const phoneClean = phoneNumber.replace(/-/g, '');
            pdvId = department ? `ORG-PDV-${phoneClean}-${department.replace(/\s+/g, '')}` : `ORG-PDV-${phoneClean}`;
        }

        const allPDVs = this.getAllOrgPDVs();
        const pdvData = allPDVs[pdvId];

        if (pdvData) {
            pdvData.lastAccessedAt = new Date().toISOString();
            this.saveOrgPDV(pdvData);
        }

        return pdvData;
    }

    getAllOrgPDVs() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('단체 PDV 불러오기 실패:', e);
            return {};
        }
    }

    // AI 상담 내역 저장
    saveConsultation(phoneNumber, uniqueId, department, consultation) {
        const pdv = this.loadOrgPDV(phoneNumber, uniqueId, department);
        if (!pdv) return false;
        
        if (!pdv.consultations) {
            pdv.consultations = [];
        }
        
        pdv.consultations.push({
            consultationId: "CONSULT-" + Date.now(),
            timestamp: new Date().toISOString(),
            department: consultation.department,
            organization: consultation.organization,
            messages: consultation.messages,
            summary: consultation.summary || ""
        });
        
        const data = localStorage.getItem(this.storageKey);
        const allData = data ? JSON.parse(data) : {};
        allData[pdv.pdvId] = pdv;
        localStorage.setItem(this.storageKey, JSON.stringify(allData));
        
        return true;
    }
}

window.organizationManager = new OrganizationManager();
