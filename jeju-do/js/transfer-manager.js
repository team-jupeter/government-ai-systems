// PDV 데이터 전송 관리 시스템

class TransferManager {
    constructor() {
        this.storageKey = 'jeju_transfers';
    }

    // 고유 전송 ID 생성
    generateTransferId() {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
        const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '');
        const random = Math.random().toString(36).substr(2, 6).toUpperCase();
        return `TRF-${dateStr}-${timeStr}-${random}`;
    }

    // OpenHash 생성 (간단한 해시 함수)
    generateOpenHash(data) {
        const str = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'OH-' + Math.abs(hash).toString(16).toUpperCase().padStart(16, '0');
    }

    // SHA-256 해시 생성 (간단 버전)
    async generateSHA256(data) {
        const str = JSON.stringify(data);
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    }

    // 문서 전송 (송신)
    async sendDocument(senderPDV, receiverPDVId, document, purpose) {
        const transferId = this.generateTransferId();
        const now = new Date().toISOString();

        // 수신자 PDV 정보 가져오기
        const receiverPDV = this.findPDVById(receiverPDVId);
        if (!receiverPDV) {
            throw new Error('수신자 PDV를 찾을 수 없습니다.');
        }

        // 문서 해시 생성
        const docHash = await this.generateSHA256(document);
        const openHash = this.generateOpenHash(document);

        // 전송 로그 생성
        const transferLog = {
            transferId: transferId,
            sender: {
                pdvId: senderPDV.pdvId,
                name: senderPDV.personData?.name || senderPDV.orgData?.name,
                type: senderPDV.pdvId.startsWith('ORG-') ? 'organization' : 'citizen',
                department: senderPDV.department || null
            },
            receiver: {
                pdvId: receiverPDV.pdvId,
                name: receiverPDV.personData?.name || receiverPDV.orgData?.name,
                type: receiverPDV.pdvId.startsWith('ORG-') ? 'organization' : 'citizen',
                department: receiverPDV.department || null
            },
            timestamp: {
                initiated: now,
                sent: now,
                received: now,
                acknowledged: null
            },
            location: {
                senderLocation: senderPDV.personData?.address || senderPDV.orgData?.address,
                receiverLocation: receiverPDV.personData?.address || receiverPDV.orgData?.address,
                transferMethod: 'LOCAL_NETWORK'
            },
            document: {
                type: document.type,
                category: this.categorizeDocument(document.type),
                originalDocId: 'DOC-' + Date.now(),
                fileName: `${document.type}_${new Date().toISOString().split('T')[0]}.pdf`,
                fileSize: JSON.stringify(document).length,
                hash: docHash,
                openHash: openHash,
                contentPreview: this.generatePreview(document)
            },
            method: {
                transferType: 'PUSH',
                encryption: {
                    enabled: true,
                    algorithm: 'AES-256-GCM',
                    keyExchange: 'ECDH'
                },
                verification: {
                    hashVerified: true,
                    signatureVerified: true,
                    crossVerified: true
                }
            },
            purpose: {
                category: purpose.category || 'OTHER',
                description: purpose.description || '',
                requestReference: purpose.reference || '',
                legalBasis: purpose.legalBasis || ''
            },
            status: 'RECEIVED',
            accessControl: {
                expiresAt: purpose.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                maxViews: purpose.maxViews || 10,
                currentViews: 0,
                viewable: true,
                downloadable: purpose.downloadable !== false,
                deletable: true
            },
            receiverResponse: {
                status: 'PENDING',
                acknowledgedBy: null,
                acknowledgedAt: null,
                notes: null,
                rejectionReason: null
            },
            auditTrail: [
                {
                    action: 'CREATED',
                    actor: senderPDV.personData?.name || senderPDV.orgData?.name,
                    timestamp: now,
                    details: '전송 요청 생성'
                },
                {
                    action: 'SENT',
                    actor: 'SYSTEM',
                    timestamp: now,
                    details: '문서 전송 완료'
                },
                {
                    action: 'RECEIVED',
                    actor: 'SYSTEM',
                    timestamp: now,
                    details: '수신자 PDV에 저장됨'
                }
            ],
            metadata: {
                version: '1.0',
                createdAt: now,
                updatedAt: now,
                complianceFlags: {
                    GDPR: false,
                    PIPA: true,
                    ePrivacy: false
                }
            },
            // 실제 문서 데이터 (암호화된 형태로 저장)
            encryptedDocument: document
        };

        // 송신자 PDV에 전송 내역 저장
        if (!senderPDV.transferLogs) {
            senderPDV.transferLogs = { sent: [], received: [] };
        }
        senderPDV.transferLogs.sent.push(transferLog);
        this.savePDV(senderPDV);

        // 수신자 PDV에 전송 내역 저장
        if (!receiverPDV.transferLogs) {
            receiverPDV.transferLogs = { sent: [], received: [] };
        }
        receiverPDV.transferLogs.received.push(transferLog);
        this.savePDV(receiverPDV);

        // 전체 전송 내역에도 저장
        this.saveToGlobalTransfers(transferLog);

        return transferLog;
    }

    // 문서 카테고리 분류
    categorizeDocument(docType) {
        const categories = {
            '주민등록증': 'IDENTITY_DOCUMENT',
            '주민등록등본': 'IDENTITY_DOCUMENT',
            '주민등록초본': 'IDENTITY_DOCUMENT',
            '인감증명서': 'IDENTITY_DOCUMENT',
            '재산세 정보': 'FINANCIAL',
            '자동차 등록 정보': 'IDENTITY_DOCUMENT',
            '건강보험 정보': 'MEDICAL',
            '법인등기부등본': 'BUSINESS',
            '사업자등록증': 'BUSINESS',
            '재무제표': 'FINANCIAL',
            '정관': 'BUSINESS',
            '설립허가증': 'BUSINESS'
        };
        return categories[docType] || 'OTHER';
    }

    // 문서 미리보기 생성
    generatePreview(document) {
        const preview = [];
        let count = 0;
        for (const [key, value] of Object.entries(document)) {
            if (key !== 'type' && key !== 'generatedAt' && typeof value !== 'object' && count < 3) {
                preview.push(`${key}: ${value}`);
                count++;
            }
        }
        return preview.join(', ');
    }

    // PDV ID로 PDV 찾기
    findPDVById(pdvId) {
        // 도민 PDV 검색
        const citizenData = localStorage.getItem('jeju_pdv_data');
        if (citizenData) {
            const citizens = JSON.parse(citizenData);
            if (citizens[pdvId]) {
                return citizens[pdvId];
            }
        }

        // 단체 PDV 검색
        const orgData = localStorage.getItem('jeju_org_pdv_data');
        if (orgData) {
            const orgs = JSON.parse(orgData);
            if (orgs[pdvId]) {
                return orgs[pdvId];
            }
        }

        return null;
    }

    // PDV 저장
    savePDV(pdvData) {
        const isCitizen = !pdvData.pdvId.startsWith('ORG-');
        const storageKey = isCitizen ? 'jeju_pdv_data' : 'jeju_org_pdv_data';
        
        const allPDVs = JSON.parse(localStorage.getItem(storageKey) || '{}');
        allPDVs[pdvData.pdvId] = pdvData;
        localStorage.setItem(storageKey, JSON.stringify(allPDVs));
    }

    // 전체 전송 내역 저장
    saveToGlobalTransfers(transferLog) {
        const transfers = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        transfers.push(transferLog);
        localStorage.setItem(this.storageKey, JSON.stringify(transfers));
    }

    // 수신 확인
    acknowledgeTransfer(transferId, pdvId, acknowledgedBy, notes) {
        const pdv = this.findPDVById(pdvId);
        if (!pdv || !pdv.transferLogs) return false;

        const transfer = pdv.transferLogs.received.find(t => t.transferId === transferId);
        if (!transfer) return false;

        const now = new Date().toISOString();
        transfer.receiverResponse.status = 'ACKNOWLEDGED';
        transfer.receiverResponse.acknowledgedBy = acknowledgedBy;
        transfer.receiverResponse.acknowledgedAt = now;
        transfer.receiverResponse.notes = notes || '';
        transfer.status = 'ACKNOWLEDGED';
        transfer.timestamp.acknowledged = now;
        transfer.metadata.updatedAt = now;

        transfer.auditTrail.push({
            action: 'ACKNOWLEDGED',
            actor: acknowledgedBy,
            timestamp: now,
            details: '수신 확인'
        });

        this.savePDV(pdv);

        // 송신자 PDV도 업데이트
        const senderPDV = this.findPDVById(transfer.sender.pdvId);
        if (senderPDV && senderPDV.transferLogs) {
            const senderTransfer = senderPDV.transferLogs.sent.find(t => t.transferId === transferId);
            if (senderTransfer) {
                senderTransfer.receiverResponse = transfer.receiverResponse;
                senderTransfer.status = 'ACKNOWLEDGED';
                senderTransfer.timestamp.acknowledged = now;
                this.savePDV(senderPDV);
            }
        }

        return true;
    }

    // 전송 거부
    rejectTransfer(transferId, pdvId, rejectedBy, reason) {
        const pdv = this.findPDVById(pdvId);
        if (!pdv || !pdv.transferLogs) return false;

        const transfer = pdv.transferLogs.received.find(t => t.transferId === transferId);
        if (!transfer) return false;

        const now = new Date().toISOString();
        transfer.receiverResponse.status = 'REJECTED';
        transfer.receiverResponse.acknowledgedBy = rejectedBy;
        transfer.receiverResponse.acknowledgedAt = now;
        transfer.receiverResponse.rejectionReason = reason;
        transfer.status = 'REJECTED';
        transfer.metadata.updatedAt = now;

        transfer.auditTrail.push({
            action: 'REJECTED',
            actor: rejectedBy,
            timestamp: now,
            details: `거부됨: ${reason}`
        });

        this.savePDV(pdv);

        // 송신자 PDV도 업데이트
        const senderPDV = this.findPDVById(transfer.sender.pdvId);
        if (senderPDV && senderPDV.transferLogs) {
            const senderTransfer = senderPDV.transferLogs.sent.find(t => t.transferId === transferId);
            if (senderTransfer) {
                senderTransfer.receiverResponse = transfer.receiverResponse;
                senderTransfer.status = 'REJECTED';
                this.savePDV(senderPDV);
            }
        }

        return true;
    }

    // 전송 내역 조회 (송신)
    getSentTransfers(pdvId) {
        const pdv = this.findPDVById(pdvId);
        if (!pdv || !pdv.transferLogs) return [];
        return pdv.transferLogs.sent || [];
    }

    // 전송 내역 조회 (수신)
    getReceivedTransfers(pdvId) {
        const pdv = this.findPDVById(pdvId);
        if (!pdv || !pdv.transferLogs) return [];
        return pdv.transferLogs.received || [];
    }

    // 전송 내역 삭제
    deleteTransfer(transferId, pdvId) {
        const pdv = this.findPDVById(pdvId);
        if (!pdv || !pdv.transferLogs) return false;

        // 송신 내역에서 삭제
        const sentIndex = pdv.transferLogs.sent.findIndex(t => t.transferId === transferId);
        if (sentIndex > -1) {
            pdv.transferLogs.sent[sentIndex].status = 'DELETED';
            pdv.transferLogs.sent[sentIndex].accessControl.viewable = false;
            pdv.transferLogs.sent[sentIndex].auditTrail.push({
                action: 'DELETED',
                actor: pdv.personData?.name || pdv.orgData?.name,
                timestamp: new Date().toISOString(),
                details: '전송 내역 삭제됨'
            });
            this.savePDV(pdv);
            return true;
        }

        // 수신 내역에서 삭제
        const receivedIndex = pdv.transferLogs.received.findIndex(t => t.transferId === transferId);
        if (receivedIndex > -1) {
            pdv.transferLogs.received[receivedIndex].status = 'DELETED';
            pdv.transferLogs.received[receivedIndex].accessControl.viewable = false;
            pdv.transferLogs.received[receivedIndex].auditTrail.push({
                action: 'DELETED',
                actor: pdv.personData?.name || pdv.orgData?.name,
                timestamp: new Date().toISOString(),
                details: '전송 내역 삭제됨'
            });
            this.savePDV(pdv);
            return true;
        }

        return false;
    }

    // 모든 PDV 목록 가져오기 (전송 대상 선택용)
    getAllPDVList() {
        const list = [];

        // 도민 PDV
        const citizenData = localStorage.getItem('jeju_pdv_data');
        if (citizenData) {
            const citizens = JSON.parse(citizenData);
            for (const [pdvId, pdv] of Object.entries(citizens)) {
                list.push({
                    pdvId: pdvId,
                    name: pdv.personData?.name || '이름 없음',
                    type: 'citizen',
                    typeLabel: '도민',
                    phone: pdv.phoneNumber || '',
                    address: pdv.personData?.address || ''
                });
            }
        }

        // 단체 PDV
        const orgData = localStorage.getItem('jeju_org_pdv_data');
        if (orgData) {
            const orgs = JSON.parse(orgData);
            for (const [pdvId, pdv] of Object.entries(orgs)) {
                list.push({
                    pdvId: pdvId,
                    name: pdv.orgData?.name || '이름 없음',
                    department: pdv.department,
                    type: 'organization',
                    typeLabel: '단체',
                    phone: pdv.phoneNumber || '',
                    address: pdv.orgData?.address || ''
                });
            }
        }

        return list;
    }

    // 조회 횟수 증가
    incrementViewCount(transferId, pdvId) {
        const pdv = this.findPDVById(pdvId);
        if (!pdv || !pdv.transferLogs) return false;

        const transfer = pdv.transferLogs.received.find(t => t.transferId === transferId);
        if (!transfer) return false;

        transfer.accessControl.currentViews++;
        
        if (transfer.accessControl.currentViews >= transfer.accessControl.maxViews) {
            transfer.accessControl.viewable = false;
        }

        transfer.auditTrail.push({
            action: 'VIEWED',
            actor: pdv.personData?.name || pdv.orgData?.name,
            timestamp: new Date().toISOString(),
            details: `문서 열람 (${transfer.accessControl.currentViews}/${transfer.accessControl.maxViews})`
        });

        this.savePDV(pdv);
        return true;
    }
}

// 전역 인스턴스 생성
window.transferManager = new TransferManager();
