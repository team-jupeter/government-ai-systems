// PDV 데이터 관리 시스템

class PDVManager {
    constructor() {
        this.storageKey = 'jeju_pdv_data';
    }

    // 문자열을 숫자로 해시화 (간단한 해시 함수)
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 32비트 정수로 변환
        }
        return Math.abs(hash);
    }

    // 가상 인물 데이터 생성 (전화번호에 따라 결정론적)
    generatePersonData(phoneNumber, uniqueId) {
        const names = ['김민준', '이서윤', '박지호', '최수아', '정민성', '강예은', '조현우', '윤지민', '장서준', '임하은'];
        const addresses = [
            '제주특별자치도 제주시 첨단로 213',
            '제주특별자치도 제주시 연동 1234-5',
            '제주특별자치도 서귀포시 중문로 123',
            '제주특별자치도 제주시 애월읍 고성리 456',
            '제주특별자치도 서귀포시 성산읍 일출로 789'
        ];

        // 전화번호 또는 ID를 해시화하여 일관된 인덱스 생성
        const identifier = phoneNumber || uniqueId;
        const hash = this.hashString(identifier);
        
        // 해시값으로 배열 인덱스 결정 (항상 동일한 결과)
        const nameIndex = hash % names.length;
        const addressIndex = hash % addresses.length;
        
        const name = names[nameIndex];
        
        // 생년월일도 해시 기반으로 일관되게 생성
        const birthYear = 1970 + (hash % 35);
        const birthMonth = String((hash % 12) + 1).padStart(2, '0');
        const birthDay = String((hash % 28) + 1).padStart(2, '0');
        const gender = (hash % 2) + 1; // 1 또는 2
        const residentNumber = `${birthYear.toString().slice(2)}${birthMonth}${birthDay}-${gender}******`;

        return {
            name: name,
            residentNumber: residentNumber,
            birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
            gender: gender === 1 ? '남성' : '여성',
            address: addresses[addressIndex],
            phoneNumber: phoneNumber || '010-****-****',
            nationality: '대한민국',
            issueDate: new Date().toISOString().split('T')[0]
        };
    }

    // 주민등록증 데이터 생성
    async generateResidentCard(personData, progressCallback) {
        progressCallback('주민등록증 정보 생성 중...');
        await this.delay(800);

        return {
            type: '주민등록증',
            name: personData.name,
            residentNumber: personData.residentNumber,
            address: personData.address,
            issueDate: personData.issueDate,
            issuer: '제주특별자치도지사',
            photo: '(사진 데이터)',
            generatedAt: new Date().toISOString()
        };
    }

    // 등본 데이터 생성
    async generateFamilyRegister(personData, progressCallback) {
        progressCallback('주민등록등본 정보 생성 중...');
        await this.delay(1000);

        return {
            type: '주민등록등본',
            householder: personData.name,
            address: personData.address,
            familyMembers: [
                {
                    name: personData.name,
                    residentNumber: personData.residentNumber,
                    relationship: '본인',
                    reportDate: '2010-03-15',
                    changeReason: '전입'
                }
            ],
            issueDate: new Date().toISOString().split('T')[0],
            issuer: '제주시장',
            purpose: 'PDV 등록용',
            generatedAt: new Date().toISOString()
        };
    }

    // 초본 데이터 생성
    async generateAbstractRegister(personData, progressCallback) {
        progressCallback('주민등록초본 정보 생성 중...');
        await this.delay(900);

        return {
            type: '주민등록초본',
            name: personData.name,
            residentNumber: personData.residentNumber,
            addressHistory: [
                {
                    address: personData.address,
                    reportDate: '2020-01-15',
                    changeReason: '전입'
                },
                {
                    address: '제주특별자치도 제주시 구도심로 456',
                    reportDate: '2015-06-20',
                    changeReason: '전입'
                }
            ],
            issueDate: new Date().toISOString().split('T')[0],
            issuer: '제주시장',
            generatedAt: new Date().toISOString()
        };
    }

    // 인감증명 데이터 생성
    async generateSealCertificate(personData, progressCallback) {
        progressCallback('인감증명서 정보 생성 중...');
        await this.delay(700);

        return {
            type: '인감증명서',
            name: personData.name,
            residentNumber: personData.residentNumber,
            address: personData.address,
            sealImage: '(인감 이미지 데이터)',
            registrationDate: '2018-05-10',
            issueDate: new Date().toISOString().split('T')[0],
            issuer: '제주시장',
            purpose: 'PDV 등록용',
            generatedAt: new Date().toISOString()
        };
    }

    // 재산세 정보 생성 (해시 기반으로 일관된 값)
    async generatePropertyTax(personData, phoneNumber, uniqueId, progressCallback) {
        progressCallback('재산세 정보 생성 중...');
        await this.delay(1100);

        const identifier = phoneNumber || uniqueId;
        const hash = this.hashString(identifier);
        
        // 해시 기반으로 재산 가액 결정 (150만~500만 사이)
        const propertyValue = 150000000 + (hash % 350000000);
        const taxRate = 0.001 + ((hash % 300) / 100000); // 0.001~0.004 사이
        const taxAmount = Math.floor(propertyValue * taxRate);

        return {
            type: '재산세 정보',
            taxpayerName: personData.name,
            residentNumber: personData.residentNumber,
            properties: [
                {
                    type: '토지',
                    address: personData.address,
                    area: '120㎡',
                    assessedValue: Math.floor(propertyValue * 0.3),
                    taxAmount: Math.floor(taxAmount * 0.3)
                },
                {
                    type: '건물',
                    address: personData.address,
                    area: '85㎡',
                    assessedValue: Math.floor(propertyValue * 0.7),
                    taxAmount: Math.floor(taxAmount * 0.7)
                }
            ],
            totalAssessedValue: propertyValue,
            totalTaxAmount: taxAmount,
            taxYear: new Date().getFullYear(),
            paymentStatus: '납부완료',
            paymentDate: `${new Date().getFullYear()}-07-31`,
            generatedAt: new Date().toISOString()
        };
    }

    // 자동차 등록 정보 생성 (해시 기반)
    async generateVehicleInfo(personData, phoneNumber, uniqueId, progressCallback) {
        progressCallback('자동차 등록 정보 생성 중...');
        await this.delay(800);

        const identifier = phoneNumber || uniqueId;
        const hash = this.hashString(identifier);
        
        const carModels = ['소나타', '그랜저', '아반떼', 'K5', '투싼'];
        const carModel = carModels[hash % carModels.length];
        
        const carNumber = `제주${(hash % 90) + 10}가${(hash % 9000) + 1000}`;

        return {
            type: '자동차 등록 정보',
            ownerName: personData.name,
            residentNumber: personData.residentNumber,
            vehicleNumber: carNumber,
            manufacturer: '현대',
            model: carModel,
            year: 2020 + (hash % 5),
            registrationDate: '2021-03-15',
            purpose: '자가용',
            generatedAt: new Date().toISOString()
        };
    }

    // 건강보험 정보 생성 (해시 기반)
    async generateHealthInsurance(personData, phoneNumber, uniqueId, progressCallback) {
        progressCallback('건강보험 정보 생성 중...');
        await this.delay(900);

        const identifier = phoneNumber || uniqueId;
        const hash = this.hashString(identifier);

        return {
            type: '건강보험 정보',
            insuredName: personData.name,
            residentNumber: personData.residentNumber,
            insuranceNumber: `${1000000000 + (hash % 9000000000)}`,
            insuranceType: '직장가입자',
            workplace: '(주)제주테크',
            monthlyPremium: 85000 + (hash % 50000),
            qualificationDate: '2015-01-01',
            status: '자격유지',
            generatedAt: new Date().toISOString()
        };
    }

    // 완전한 PDV 생성
    async createPDV(phoneNumber, uniqueId, progressCallback) {
        progressCallback('PDV 생성을 시작합니다...');
        await this.delay(500);

        const pdvId = uniqueId || `PDV-${phoneNumber.replace(/-/g, '')}`;
        const personData = this.generatePersonData(phoneNumber, uniqueId);

        progressCallback(`${personData.name}님의 개인정보를 생성 중입니다...`);
        await this.delay(500);

        const documents = {};

        documents.residentCard = await this.generateResidentCard(personData, progressCallback);
        documents.familyRegister = await this.generateFamilyRegister(personData, progressCallback);
        documents.abstractRegister = await this.generateAbstractRegister(personData, progressCallback);
        documents.sealCertificate = await this.generateSealCertificate(personData, progressCallback);
        documents.propertyTax = await this.generatePropertyTax(personData, phoneNumber, uniqueId, progressCallback);
        documents.vehicleInfo = await this.generateVehicleInfo(personData, phoneNumber, uniqueId, progressCallback);
        documents.healthInsurance = await this.generateHealthInsurance(personData, phoneNumber, uniqueId, progressCallback);

        progressCallback('PDV 데이터를 저장하는 중...');
        await this.delay(600);

        const pdvData = {
            pdvId: pdvId,
            phoneNumber: phoneNumber,
            uniqueId: uniqueId,
            createdAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
            personData: personData,
            documents: documents,
            records: [
                {
                    timestamp: new Date().toISOString(),
                    type: 'PDV_CREATED',
                    description: 'PDV가 생성되었습니다',
                    data: { pdvId: pdvId }
                }
            ],
            chatHistory: {
                general: [],
                departments: {}
            }
        };

        this.savePDV(pdvData);

        progressCallback('PDV 생성이 완료되었습니다!');
        await this.delay(800);

        return pdvData;
    }

    // Local Storage에 PDV 저장
    savePDV(pdvData) {
        try {
            const allPDVs = this.getAllPDVs();
            allPDVs[pdvData.pdvId] = pdvData;
            localStorage.setItem(this.storageKey, JSON.stringify(allPDVs));
            return true;
        } catch (e) {
            console.error('PDV 저장 실패:', e);
            return false;
        }
    }

    // Local Storage에서 PDV 불러오기
    loadPDV(phoneNumber, uniqueId) {
        const pdvId = uniqueId || `PDV-${phoneNumber.replace(/-/g, '')}`;
        const allPDVs = this.getAllPDVs();
        const pdvData = allPDVs[pdvId];

        if (pdvData) {
            pdvData.lastAccessedAt = new Date().toISOString();
            this.savePDV(pdvData);
        }

        return pdvData;
    }

    // 모든 PDV 데이터 가져오기
    getAllPDVs() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('PDV 불러오기 실패:', e);
            return {};
        }
    }

    // PDV에 레코드 추가
    addRecord(pdvId, type, description, data) {
        const allPDVs = this.getAllPDVs();
        const pdvData = allPDVs[pdvId];

        if (pdvData) {
            pdvData.records.push({
                timestamp: new Date().toISOString(),
                type: type,
                description: description,
                data: data
            });
            this.savePDV(pdvData);
            return true;
        }
        return false;
    }

    // 채팅 기록 저장 (일반 상담)
    saveGeneralChat(pdvId, message, role) {
        const allPDVs = this.getAllPDVs();
        const pdvData = allPDVs[pdvId];

        if (pdvData) {
            pdvData.chatHistory.general.push({
                timestamp: new Date().toISOString(),
                role: role,
                content: message
            });
            this.savePDV(pdvData);
            return true;
        }
        return false;
    }

    // 채팅 기록 저장 (부서별 상담)
    saveDepartmentChat(pdvId, deptName, message, role) {
        const allPDVs = this.getAllPDVs();
        const pdvData = allPDVs[pdvId];

        if (pdvData) {
            if (!pdvData.chatHistory.departments[deptName]) {
                pdvData.chatHistory.departments[deptName] = [];
            }
            pdvData.chatHistory.departments[deptName].push({
                timestamp: new Date().toISOString(),
                role: role,
                content: message
            });
            this.savePDV(pdvData);
            return true;
        }
        return false;
    }

    // 유틸리티: 딜레이
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // AI 상담 내역 저장
    saveConsultation(phoneNumber, uniqueId, consultation) {
        const pdv = this.loadPDV(phoneNumber, uniqueId);
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

// 전역 PDV Manager 인스턴스
window.pdvManager = new PDVManager();
