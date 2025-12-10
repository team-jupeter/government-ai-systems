// OpenHash 관리 시스템 - 명세서 기반 구현 (Hash Chain 포함)

class OpenHashManager {
    constructor() {
        this.storageKey = 'openhash_records';
    }

    // PDV 활동을 5개 단위로 그룹화하고 해시 생성
    async createHashGroups(events) {
        const groupSize = 5;
        const groups = [];
        
        // 일련번호 부여 (시간 순서대로)
        const sortedEvents = events.sort((a, b) => 
            new Date(a.timestamp) - new Date(b.timestamp)
        );
        
        sortedEvents.forEach((event, index) => {
            event.serialNumber = index + 1;
        });
        
        // 이전 해시 그룹들 가져오기
        const user = window.authManager?.getCurrentUser();
        const existingRecords = user ? this.getHashRecords(user.pdvId) : [];
        
        // 5개씩 그룹화
        for (let i = 0; i < sortedEvents.length; i += groupSize) {
            const groupEvents = sortedEvents.slice(i, i + groupSize);
            
            // 이전 해시 결정
            let prevHash;
            if (groups.length === 0 && existingRecords.length === 0) {
                // 첫 번째 그룹 (Genesis)
                prevHash = '0'.repeat(64);
            } else if (groups.length === 0) {
                // 기존 마지막 그룹의 해시
                prevHash = existingRecords[existingRecords.length - 1].finalHash;
            } else {
                // 바로 이전 그룹의 해시
                prevHash = groups[groups.length - 1].finalHash;
            }
            
            const group = await this.createHashGroup(groupEvents, prevHash, existingRecords.length + groups.length);
            groups.push(group);
        }
        
        return groups;
    }

    // 단일 그룹에 대한 해시 생성
    async createHashGroup(events, prevHash, blockHeight) {
        const startSerial = events[0].serialNumber;
        const endSerial = events[events.length - 1].serialNumber;
        
        // 확장 재무제표 형식으로 데이터 구조화
        const structuredData = events.map(event => ({
            serialNumber: event.serialNumber,
            timestamp: event.timestamp,
            type: event.type,
            subject: event.subject || 'N/A',
            counterparty: event.counterparty || 'N/A',
            location: event.location || 'N/A',
            content: event.content,
            method: event.method || 'N/A',
            purpose: event.purpose || 'N/A',
            amount: event.amount || 0
        }));
        
        // 데이터를 JSON 문자열로 직렬화
        const dataString = JSON.stringify(structuredData);
        
        // SHA-256 해시 생성 (명세서 Section 210)
        const hash = await this.sha256(dataString);
        
        // 타임스탬프와 결합하여 재해싱 (명세서 Section 220)
        const timestamp = new Date().toISOString();
        const combinedData = prevHash + hash + timestamp; // prevHash 포함
        const rehash1 = await this.sha256(combinedData);
        const finalHash = await this.sha256(rehash1);
        
        return {
            id: this.generateId(),
            blockHeight: blockHeight,
            serialRange: `${startSerial}-${endSerial}`,
            startSerial: startSerial,
            endSerial: endSerial,
            eventCount: events.length,
            prevHash: prevHash,
            originalHash: hash,
            finalHash: finalHash,
            timestamp: timestamp,
            createdAt: new Date().toISOString(),
            events: structuredData,
            layer: this.determineLayer(finalHash) // 확률적 계층 선택
        };
    }

    // SHA-256 해시 생성
    async sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // 확률적 계층 선택 (명세서 Section 230, 250)
    determineLayer(hash) {
        // 해시의 마지막 2자리를 숫자로 변환 (0-255)
        const lastByte = parseInt(hash.slice(-2), 16);
        const normalized = Math.floor((lastByte / 256) * 100); // 0-99로 정규화
        
        // 명세서 기준: Layer 1(70%), Layer 2(20%), Layer 3(10%)
        if (normalized < 70) return 1;
        if (normalized < 90) return 2;
        return 3;
    }

    // 고유 ID 생성
    generateId() {
        return 'OH-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    // OpenHash 기록 저장
    saveHashRecord(group, userId) {
        const records = this.getHashRecords(userId) || [];
        records.push(group);
        
        const allRecords = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        allRecords[userId] = records;
        localStorage.setItem(this.storageKey, JSON.stringify(allRecords));
        
        return group;
    }

    // OpenHash 기록 조회
    getHashRecords(userId) {
        const allRecords = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        return allRecords[userId] || [];
    }

    // 모든 사용자의 OpenHash 기록 조회
    getAllHashRecords() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }

    // Hash Chain 검증
    async verifyHashChain(userId) {
        const records = this.getHashRecords(userId);
        
        if (!records || records.length === 0) {
            return { valid: true, message: '검증할 체인이 없습니다.' };
        }
        
        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            
            // 첫 번째 블록의 prevHash 검증
            if (i === 0) {
                if (record.prevHash !== '0'.repeat(64)) {
                    return { 
                        valid: false, 
                        message: `블록 ${i}: Genesis 블록의 prevHash가 올바르지 않습니다.`,
                        blockHeight: i
                    };
                }
            } else {
                // 이전 블록의 finalHash와 현재 블록의 prevHash 비교
                const prevRecord = records[i - 1];
                if (record.prevHash !== prevRecord.finalHash) {
                    return { 
                        valid: false, 
                        message: `블록 ${i}: Hash Chain이 끊어졌습니다.\n이전 블록의 finalHash와 일치하지 않습니다.`,
                        blockHeight: i,
                        expected: prevRecord.finalHash,
                        actual: record.prevHash
                    };
                }
            }
            
            // 데이터 무결성 검증
            const dataString = JSON.stringify(record.events);
            const recalculatedHash = await this.sha256(dataString);
            
            if (recalculatedHash !== record.originalHash) {
                return { 
                    valid: false, 
                    message: `블록 ${i}: 데이터가 변조되었습니다.`,
                    blockHeight: i
                };
            }
        }
        
        return { 
            valid: true, 
            message: `전체 Hash Chain 검증 성공 (${records.length}개 블록)`,
            chainLength: records.length
        };
    }

    // 특정 해시 기록 검증
    async verifyHashRecord(recordId, userId) {
        const records = this.getHashRecords(userId);
        const index = records.findIndex(r => r.id === recordId);
        const record = records[index];
        
        if (!record) {
            return { valid: false, message: '기록을 찾을 수 없습니다.' };
        }
        
        // 데이터 무결성 검증
        const dataString = JSON.stringify(record.events);
        const recalculatedHash = await this.sha256(dataString);
        
        if (recalculatedHash !== record.originalHash) {
            return { 
                valid: false, 
                message: '해시 불일치 - 데이터가 변조되었을 수 있습니다.'
            };
        }
        
        // prevHash 검증
        if (index === 0) {
            if (record.prevHash !== '0'.repeat(64)) {
                return { 
                    valid: false, 
                    message: 'Genesis 블록의 prevHash가 올바르지 않습니다.'
                };
            }
        } else {
            const prevRecord = records[index - 1];
            if (record.prevHash !== prevRecord.finalHash) {
                return { 
                    valid: false, 
                    message: 'Hash Chain이 끊어졌습니다.'
                };
            }
        }
        
        return { 
            valid: true, 
            message: '해시 검증 성공 (데이터 무결성 + Hash Chain 연결 확인)',
            record: record
        };
    }

    // 교차 검증 (명세서 Section 122, 도 5)
    async crossVerify(recordId1, userId1, recordId2, userId2) {
        const record1 = this.getHashRecords(userId1).find(r => r.id === recordId1);
        const record2 = this.getHashRecords(userId2).find(r => r.id === recordId2);
        
        if (!record1 || !record2) {
            return { match: false, message: '기록을 찾을 수 없습니다.' };
        }
        
        // 교차 검증 해시 생성
        const crossHash1 = await this.sha256(record1.finalHash + record2.finalHash);
        const crossHash2 = await this.sha256(record2.finalHash + record1.finalHash);
        
        return {
            match: crossHash1 === crossHash2,
            hash1: record1.finalHash,
            hash2: record2.finalHash,
            crossHash: crossHash1
        };
    }
}

// 전역 인스턴스 생성
window.openHashManager = new OpenHashManager();
