// JSON 데이터 로더
// 모든 정적 데이터를 JSON에서 로드

class DataLoader {
    constructor() {
        this.cache = {};
    }

    /**
     * JSON 파일 로드
     * @param {string} path - JSON 파일 경로
     * @returns {Promise<Object>} - 파싱된 JSON 객체
     */
    async loadJSON(path) {
        // 캐시 확인
        if (this.cache[path]) {
            console.log(`DataLoader: 캐시에서 로드 - ${path}`);
            return this.cache[path];
        }

        try {
            console.log(`DataLoader: JSON 로드 중 - ${path}`);
            const response = await fetch(path);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${path}`);
            }
            
            const data = await response.json();
            
            // 캐시 저장
            this.cache[path] = data;
            
            console.log(`DataLoader: 로드 완료 - ${path}`);
            return data;
            
        } catch (error) {
            console.error(`DataLoader: 로드 실패 - ${path}`, error);
            throw error;
        }
    }

    /**
     * 시민 서류 데이터 로드
     */
    async loadCitizenDocuments() {
        return await this.loadJSON('src/data/citizen-documents.json');
    }

    /**
     * 조직 타입 데이터 로드
     */
    async loadOrganizationTypes() {
        return await this.loadJSON('src/data/organization-types.json');
    }

    /**
     * 부서 데이터 로드
     * @param {string} department - 'dochung', 'jejusi', 'seogwipo'
     */
    async loadDepartment(department) {
        return await this.loadJSON(`src/data/departments/${department}.json`);
    }

    /**
     * 모든 데이터 한번에 로드
     */
    async loadAll() {
        console.log('DataLoader: 모든 데이터 로드 시작...');
        
        const [citizenDocs, orgTypes, dochung, jejusi, seogwipo] = await Promise.all([
            this.loadCitizenDocuments(),
            this.loadOrganizationTypes(),
            this.loadDepartment('dochung'),
            this.loadDepartment('jejusi'),
            this.loadDepartment('seogwipo')
        ]);

        console.log('DataLoader: 모든 데이터 로드 완료');

        return {
            citizenDocuments: citizenDocs,
            organizationTypes: orgTypes,
            departments: {
                dochung: dochung,
                jejusi: jejusi,
                seogwipo: seogwipo
            }
        };
    }

    /**
     * 캐시 초기화
     */
    clearCache() {
        this.cache = {};
        console.log('DataLoader: 캐시 초기화');
    }
}

// 전역 인스턴스 생성
window.dataLoader = new DataLoader();

console.log('DataLoader 초기화 완료');
