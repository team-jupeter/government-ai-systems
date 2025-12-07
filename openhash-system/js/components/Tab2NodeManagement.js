const Tab2NodeManagement = () => {
    // 디바이스 진입
    const [slides1, setSlides1] = React.useState([]);
    const [isRunning1, setIsRunning1] = React.useState(false);
    const [currentSlide1, setCurrentSlide1] = React.useState(0);
    const [newDeviceId, setNewDeviceId] = React.useState('Device_5001');
    const [targetLayer1, setTargetLayer1] = React.useState('Node_1042');
    
    // Layer 노드 진입
    const [slides2, setSlides2] = React.useState([]);
    const [isRunning2, setIsRunning2] = React.useState(false);
    const [currentSlide2, setCurrentSlide2] = React.useState(0);
    const [newNodeId, setNewNodeId] = React.useState('Node_1_New');
    const [targetLayer2, setTargetLayer2] = React.useState('Node_2001');
    
    // 노드 탈퇴
    const [slides3, setSlides3] = React.useState([]);
    const [isRunning3, setIsRunning3] = React.useState(false);
    const [currentSlide3, setCurrentSlide3] = React.useState(0);
    const [maliciousNode, setMaliciousNode] = React.useState('Node_1042');
    const [exitReason, setExitReason] = React.useState('이중 지불 시도 탐지');

    const sha256 = (text) => {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(64, '0');
    };

    const blsSign = (message, nodeId) => {
        return sha256(message + nodeId).substring(0, 96);
    };

    // 디바이스 진입 시뮬레이션
    const runDeviceEntry = async () => {
        setIsRunning1(true);
        setSlides1([]);
        setCurrentSlide1(0);

        // 단계 1: 초기 Merkle Root 생성
        await new Promise(resolve => setTimeout(resolve, 2000));
        const originRoot = sha256('origin_' + newDeviceId);
        setSlides1(prev => [...prev, {
            step: 1,
            title: '새 디바이스의 초기 Merkle Root 생성',
            content: newDeviceId + '가 초기 Root를 생성',
            description: [
                '📱 새 디바이스의 네트워크 진입 준비',
                '',
                newDeviceId + '의 동작:',
                '',
                '1. 초기 상태 설정',
                '   아직 트랜잭션 처리 전이므로 "origin" 상태',
                '',
                '2. Origin Merkle Root 생성',
                '   Origin_Root = SHA256("origin_' + newDeviceId + '")',
                '',
                '이 Root는:',
                '• 디바이스의 시작점',
                '• 아직 Tx 없는 깨끗한 상태',
                '• 이후 모든 Hash Chain의 기준점',
                '',
                '비유:',
                '새 계좌의 잔액 0원 상태와 같습니다.',
                '이제 이것에 서명하여 진입 요청을 할 것입니다.'
            ],
            data: [
                '새 디바이스 정보:',
                '  ID: ' + newDeviceId,
                '  상태: 진입 준비',
                '',
                '생성된 Origin Root:',
                '  ' + originRoot,
                '',
                '의미:',
                '  • 초기 상태의 디지털 지문',
                '  • 32 bytes (SHA-256)',
                '  • 위조 불가능',
                '',
                '다음 단계: 이것에 서명'
            ],
            icon: 'fa-mobile-alt',
            color: 'cyan'
        }]);
        setCurrentSlide1(1);

        // 단계 2: 개인키로 서명
        await new Promise(resolve => setTimeout(resolve, 2000));
        const deviceSK = sha256('secret_key_' + newDeviceId);
        const devicePK = sha256('public_key_' + deviceSK);
        const signature = blsSign(originRoot, newDeviceId);
        setSlides1(prev => [...prev, {
            step: 2,
            title: '디바이스의 BLS 서명 생성',
            content: '자신의 개인키로 Origin Root에 서명',
            description: [
                '🔐 디바이스 신원 증명',
                '',
                '디바이스의 키 쌍:',
                '• 개인키(SK): 절대 공개 안 함, 디바이스만 보관',
                '• 공개키(PK): 네트워크에 공개, 검증용',
                '',
                '서명 생성:',
                '  σ = BLS_Sign(Origin_Root, SK_' + newDeviceId + ')',
                '',
                'BLS 서명의 특성:',
                '1. 크기: 48 bytes (고정)',
                '2. 타원곡선 기반 암호화',
                '3. 위조 불가능',
                '4. 누구나 검증 가능 (공개키로)',
                '',
                '서명의 의미:',
                '"나(' + newDeviceId + ')는 이 Origin Root의 주인이며,',
                ' 네트워크에 진입하고 싶습니다"',
                '',
                '이제 이 서명으로 자신을 증명할 수 있습니다.',
                '상위 노드가 공개키로 검증할 것입니다.'
            ],
            data: [
                '키 쌍 정보:',
                '  개인키(SK): ' + deviceSK.substring(0, 32) + '... (비밀)',
                '  공개키(PK): ' + devicePK.substring(0, 32) + '... (공개)',
                '',
                'BLS 서명 생성:',
                '  메시지: ' + originRoot.substring(0, 32) + '...',
                '  서명: ' + signature.substring(0, 48),
                '       ' + signature.substring(48),
                '',
                '서명 크기: 48 bytes',
                '',
                '검증 공식:',
                '  e(σ, g) = e(H(Origin_Root), PK)',
                '  ↑ 상위 노드가 이것으로 검증'
            ],
            icon: 'fa-key',
            color: 'purple'
        }]);
        setCurrentSlide1(2);

        // 단계 3: Layer 1 노드로 전송
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides1(prev => [...prev, {
            step: 3,
            title: '선택한 Layer 1 노드로 진입 요청 전송',
            content: targetLayer1 + '로 Origin Root + 서명 전송',
            description: [
                '📤 진입 요청 전송',
                '',
                '디바이스의 선택:',
                '• ' + newDeviceId + '는 ' + targetLayer1 + '을 선택',
                '• 자유롭게 선택 가능 (어느 Layer 1이든)',
                '• 지리적 근접성, 네트워크 속도 등 고려',
                '',
                '전송 패킷:',
                '{',
                '  "device_id": "' + newDeviceId + '",',
                '  "origin_root": "' + originRoot.substring(0, 16) + '...",',
                '  "signature": "' + signature.substring(0, 16) + '...",',
                '  "public_key": "' + devicePK.substring(0, 16) + '..."',
                '}',
                '',
                '패킷 크기:',
                '• Origin Root: 32 bytes',
                '• Signature: 48 bytes',
                '• Public Key: 32 bytes',
                '• 메타데이터: ~20 bytes',
                '• 총: ~132 bytes',
                '',
                '매우 경량!',
                'BLS 집계 불필요 → 즉시 전송 가능'
            ],
            data: [
                '전송 정보:',
                '  발신: ' + newDeviceId,
                '  수신: ' + targetLayer1,
                '',
                '패킷 내용:',
                '  ┌─────────────────────────────────┐',
                '  │ Device ID: ' + newDeviceId.padEnd(18) + '│',
                '  ├─────────────────────────────────┤',
                '  │ Origin Root:                    │',
                '  │ ' + originRoot.substring(0, 32) + '│',
                '  ├─────────────────────────────────┤',
                '  │ BLS Signature:                  │',
                '  │ ' + signature.substring(0, 32) + '│',
                '  │ ' + signature.substring(32, 64) + '│',
                '  │ ' + signature.substring(64) + '│',
                '  ├─────────────────────────────────┤',
                '  │ Public Key:                     │',
                '  │ ' + devicePK.substring(0, 32) + '│',
                '  └─────────────────────────────────┘',
                '',
                '전송 완료! ' + targetLayer1 + '이 수신 중...'
            ],
            icon: 'fa-paper-plane',
            color: 'blue'
        }]);
        setCurrentSlide1(3);

        // 단계 4: 노드의 서명 검증
        await new Promise(resolve => setTimeout(resolve, 2000));
        const verified = true; // 시뮬레이션에서는 항상 성공
        setSlides1(prev => [...prev, {
            step: 4,
            title: targetLayer1 + '의 서명 검증',
            content: 'BLS 서명을 공개키로 검증',
            description: [
                '🔍 ' + targetLayer1 + '의 검증 프로세스',
                '',
                '수신한 데이터:',
                '1. Origin Root (메시지)',
                '2. BLS Signature (서명)',
                '3. Public Key (검증 키)',
                '',
                '검증 과정:',
                '',
                'Step 1: 페어링 검증',
                '  좌변: e(σ, g)',
                '  우변: e(H(Origin_Root), PK)',
                '',
                'Step 2: 비교',
                '  좌변 == 우변 ?',
                '',
                'Step 3: 결과',
                '  ✅ 일치 → 서명 유효',
                '  ❌ 불일치 → 서명 위조',
                '',
                '검증 성공 의미:',
                '• ' + newDeviceId + '가 실제 소유자',
                '• Origin Root가 위조되지 않음',
                '• 진입 자격 확인',
                '',
                '검증 실패 시:',
                '• 진입 거부',
                '• 연결 차단',
                '• 보안 로그 기록',
                '',
                '복잡도: O(1) - 즉시 검증!'
            ],
            data: [
                targetLayer1 + '의 검증:',
                '',
                '입력:',
                '  Origin Root: ' + originRoot.substring(0, 24) + '...',
                '  Signature: ' + signature.substring(0, 24) + '...',
                '  Public Key: ' + devicePK.substring(0, 24) + '...',
                '',
                'BLS 페어링 검증:',
                '  e(σ, g) = e(H(Root), PK)',
                '',
                '계산 중...',
                '  좌변 계산: ' + sha256('left').substring(0, 32) + '...',
                '  우변 계산: ' + sha256('right').substring(0, 32) + '...',
                '',
                '결과: ' + (verified ? '✅ 일치!' : '❌ 불일치!'),
                '',
                verified ? [
                    '✅ 검증 성공!',
                    '',
                    '  • 서명 유효함',
                    '  • ' + newDeviceId + ' 신원 확인',
                    '  • 진입 승인 준비'
                ].join('\n') : [
                    '❌ 검증 실패!',
                    '',
                    '  • 서명 위조 탐지',
                    '  • 진입 거부',
                    '  • 연결 차단'
                ].join('\n')
            ],
            icon: verified ? 'fa-check-circle' : 'fa-times-circle',
            color: verified ? 'green' : 'red'
        }]);
        setCurrentSlide1(4);

        // 단계 5: 디바이스 목록에 추가
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides1(prev => [...prev, {
            step: 5,
            title: '디바이스 목록 추가',
            content: targetLayer1 + '의 관리 디바이스 목록에 등록',
            description: [
                '📋 ' + targetLayer1 + '의 관리 목록 업데이트',
                '',
                '이전 상태:',
                '  관리 디바이스: 100개',
                '  [Device_001, Device_002, ..., Device_100]',
                '',
                '추가 작업:',
                '  devices.push({',
                '    id: "' + newDeviceId + '",',
                '    origin_root: "' + originRoot.substring(0, 16) + '...",',
                '    public_key: "' + devicePK.substring(0, 16) + '...",',
                '    join_time: ' + Date.now() + ',',
                '    status: "active"',
                '  })',
                '',
                '새로운 상태:',
                '  관리 디바이스: 101개',
                '  [Device_001, ..., Device_100, ' + newDeviceId + ']',
                '',
                '이제 ' + newDeviceId + '는:',
                '• ' + targetLayer1 + '의 하위 디바이스',
                '• 트랜잭션 처리 가능',
                '• Merkle Tree에 포함됨',
                '• OpenHash 네트워크의 정식 멤버',
                '',
                '다음번 ' + targetLayer1 + '이 Merkle Tree 구성 시:',
                '101개 디바이스 Root로 트리 생성!'
            ],
            data: [
                targetLayer1 + ' 디바이스 목록:',
                '',
                '이전 (100개):',
                '  Device_001: active',
                '  Device_002: active',
                '  Device_003: active',
                '  ...',
                '  Device_100: active',
                '',
                '➕ 추가:',
                '  ' + newDeviceId + ': active ⭐ NEW',
                '    Origin: ' + originRoot.substring(0, 24) + '...',
                '    PubKey: ' + devicePK.substring(0, 24) + '...',
                '    Joined: ' + new Date().toLocaleString('ko-KR'),
                '',
                '현재 (101개):',
                '  총 관리 디바이스: 101개',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '다음 Merkle Tree 구성 시:',
                '  101개 Device Root → Layer1 Root',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-list',
            color: 'teal'
        }]);
        setCurrentSlide1(5);

        // 단계 6: 진입 완료
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides1(prev => [...prev, {
            step: 6,
            title: '디바이스 진입 완료',
            content: newDeviceId + '가 OpenHash 네트워크 멤버가 됨',
            description: [
                '🎉 진입 프로세스 완료!',
                '',
                '달성한 것:',
                '✅ ' + newDeviceId + ' 신원 증명',
                '✅ ' + targetLayer1 + '에 등록',
                '✅ 네트워크 정식 멤버',
                '✅ 트랜잭션 처리 가능',
                '',
                '이제 ' + newDeviceId + '가 할 수 있는 것:',
                '1. 트랜잭션 생성 및 처리',
                '2. Merkle Root 제출',
                '3. BLS 서명 참여',
                '4. 네트워크 합의 참여',
                '',
                '핵심 포인트:',
                '• BLS 집계 불필요 (기존 방식과 다름)',
                '• 단순 1:1 검증 (O(1))',
                '• 즉시 진입 가능',
                '• 확장성 무한대',
                '',
                '만약 1000개 디바이스가 동시 진입해도:',
                '각각 독립적으로 O(1) 처리 → 병렬 처리 가능!',
                '',
                '이것이 OpenHash의 동적 확장성입니다!'
            ],
            data: [
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '   디바이스 진입 완료',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                '새 디바이스:',
                '  ID: ' + newDeviceId,
                '  상위 노드: ' + targetLayer1,
                '  상태: ✅ Active',
                '',
                '처리 과정:',
                '  1. Origin Root 생성 ✅',
                '  2. BLS 서명 ✅',
                '  3. 전송 ✅',
                '  4. 검증 ✅',
                '  5. 등록 ✅',
                '  6. 완료 ✅',
                '',
                '소요 시간: ~12초 (시뮬레이션)',
                '실제: ~0.1초 (O(1) 복잡도)',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '효율성:',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '  ✓ BLS 집계: 불필요',
                '  ✓ 다수 서명: 불필요',
                '  ✓ 검증: 1번 (O(1))',
                '  ✓ 데이터: ~132 bytes',
                '  ✓ 확장성: 무한대',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-check-circle',
            color: 'gold'
        }]);
        setCurrentSlide1(6);

        setIsRunning1(false);
    };

    // Layer 노드 진입 시뮬레이션
    const runNodeEntry = async () => {
        setIsRunning2(true);
        setSlides2([]);
        setCurrentSlide2(0);

        // 단계 1: Hash Chain origin 생성
        await new Promise(resolve => setTimeout(resolve, 2000));
        const chainOrigin = sha256('origin_' + newNodeId);
        setSlides2(prev => [...prev, {
            step: 1,
            title: '새 노드의 Hash Chain Origin 생성',
            content: newNodeId + '의 초기 Hash Chain 생성',
            description: [
                '⛓️ 새 Layer 노드의 시작점',
                '',
                newNodeId + '의 초기화:',
                '',
                '1. Hash Chain Origin 생성',
                '   Chain_Origin = SHA256("origin_' + newNodeId + '")',
                '',
                '이것은:',
                '• 모든 미래 Hash Chain의 기준점',
                '• 노드의 "탄생 증명서"',
                '• 위조 불가능한 시작점',
                '',
                '비유:',
                '블록체인의 Genesis Block과 같습니다.',
                '',
                '이후 노드가 트랜잭션을 처리하면:',
                '  Chain_1 = SHA256(Chain_Origin + Tx_Data_1)',
                '  Chain_2 = SHA256(Chain_1 + Tx_Data_2)',
                '  Chain_3 = SHA256(Chain_2 + Tx_Data_3)',
                '  ...',
                '',
                '모든 Chain이 이 Origin에서 시작됩니다.',
                '디바이스 진입과 동일한 패턴입니다!'
            ],
            data: [
                '새 Layer 노드 정보:',
                '  Node ID: ' + newNodeId,
                '  Layer: 1 (읍면동)',
                '  목표 상위: ' + targetLayer2 + ' (Layer 2)',
                '',
                'Hash Chain Origin:',
                '  ' + chainOrigin,
                '',
                '의미:',
                '  • 노드의 시작점',
                '  • 32 bytes (SHA-256)',
                '  • 모든 미래 Chain의 루트',
                '',
                '다음 단계:',
                '  이것에 BLS 서명'
            ],
            icon: 'fa-link',
            color: 'orange'
        }]);
        setCurrentSlide2(1);

        // 단계 2: BLS 서명
        await new Promise(resolve => setTimeout(resolve, 2000));
        const nodeSK = sha256('node_secret_' + newNodeId);
        const nodePK = sha256('node_public_' + nodeSK);
        const nodeSig = blsSign(chainOrigin, newNodeId);
        setSlides2(prev => [...prev, {
            step: 2,
            title: '노드의 BLS 서명',
            content: '자신의 개인키로 Chain Origin에 서명',
            description: [
                '🔐 노드 신원 증명',
                '',
                '(디바이스 진입과 동일한 패턴!)',
                '',
                '노드 키 쌍:',
                '• 개인키: 노드만 보관',
                '• 공개키: 네트워크 공개',
                '',
                '서명 생성:',
                '  σ = BLS_Sign(Chain_Origin, SK_' + newNodeId + ')',
                '',
                '서명의 의미:',
                '"나(' + newNodeId + ')는 이 Hash Chain의 주인이며,',
                ' Layer 1 노드로 진입하고 싶습니다"',
                '',
                '디바이스와의 차이:',
                '• 디바이스: Origin Root에 서명',
                '• 노드: Chain Origin에 서명',
                '',
                '하지만 메커니즘은 완전히 동일!',
                'OpenHash의 재귀적 패턴입니다.'
            ],
            data: [
                '노드 키 쌍:',
                '  SK: ' + nodeSK.substring(0, 32) + '... (비밀)',
                '  PK: ' + nodePK.substring(0, 32) + '... (공개)',
                '',
                'BLS 서명:',
                '  메시지: ' + chainOrigin.substring(0, 32) + '...',
                '  서명: ' + nodeSig.substring(0, 48),
                '       ' + nodeSig.substring(48),
                '',
                '서명 크기: 48 bytes',
                '',
                '패턴 반복:',
                '  디바이스 진입 ≈ 노드 진입',
                '  동일한 알고리즘!'
            ],
            icon: 'fa-signature',
            color: 'purple'
        }]);
        setCurrentSlide2(2);

        // 단계 3: Layer 2로 전송
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides2(prev => [...prev, {
            step: 3,
            title: targetLayer2 + '로 진입 요청 전송',
            content: 'Chain Origin + 서명을 상위 노드로 전송',
            description: [
                '📤 상위 Layer로 진입 요청',
                '',
                '노드의 선택:',
                '• ' + newNodeId + '는 ' + targetLayer2 + ' 선택',
                '• 자유롭게 선택 가능',
                '• 지리적, 네트워크 조건 고려',
                '',
                '전송 패킷:',
                '{',
                '  "node_id": "' + newNodeId + '",',
                '  "layer": 1,',
                '  "chain_origin": "' + chainOrigin.substring(0, 16) + '...",',
                '  "signature": "' + nodeSig.substring(0, 16) + '...",',
                '  "public_key": "' + nodePK.substring(0, 16) + '..."',
                '}',
                '',
                '디바이스 진입과 거의 동일!',
                '차이점: "origin_root" → "chain_origin"',
                '',
                '패킷 크기: ~132 bytes',
                'BLS 집계 불필요 → 즉시 전송'
            ],
            data: [
                '전송 정보:',
                '  발신: ' + newNodeId + ' (Layer 1 지망)',
                '  수신: ' + targetLayer2 + ' (Layer 2)',
                '',
                '패킷:',
                '  ┌─────────────────────────────────┐',
                '  │ Node ID: ' + newNodeId.padEnd(21) + '│',
                '  │ Layer: 1                        │',
                '  ├─────────────────────────────────┤',
                '  │ Chain Origin:                   │',
                '  │ ' + chainOrigin.substring(0, 32) + '│',
                '  ├─────────────────────────────────┤',
                '  │ BLS Signature:                  │',
                '  │ ' + nodeSig.substring(0, 32) + '│',
                '  │ ' + nodeSig.substring(32, 64) + '│',
                '  │ ' + nodeSig.substring(64) + '│',
                '  └─────────────────────────────────┘',
                '',
                '전송 완료!'
            ],
            icon: 'fa-paper-plane',
            color: 'blue'
        }]);
        setCurrentSlide2(3);

        // 단계 4: 검증
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides2(prev => [...prev, {
            step: 4,
            title: targetLayer2 + '의 서명 검증',
            content: 'BLS 서명 검증 (디바이스와 동일)',
            description: [
                '🔍 ' + targetLayer2 + '의 검증',
                '',
                '(디바이스 진입과 완전히 동일!)',
                '',
                '검증 과정:',
                '  e(σ, g) = e(H(Chain_Origin), PK)',
                '',
                '결과:',
                '  ✅ 일치 → 진입 승인',
                '  ❌ 불일치 → 진입 거부',
                '',
                '알고리즘 재사용:',
                'verify_device()와 verify_node()는',
                '내부 로직이 동일합니다!',
                '',
                'OpenHash의 단순함:',
                '하나의 검증 함수로',
                '디바이스도, 노드도 처리!'
            ],
            data: [
                targetLayer2 + '의 검증:',
                '',
                '입력:',
                '  Chain Origin: ' + chainOrigin.substring(0, 24) + '...',
                '  Signature: ' + nodeSig.substring(0, 24) + '...',
                '  Public Key: ' + nodePK.substring(0, 24) + '...',
                '',
                'BLS 검증:',
                '  계산 중...',
                '',
                '결과: ✅ 검증 성공!',
                '',
                '  • ' + newNodeId + ' 신원 확인',
                '  • Chain Origin 유효',
                '  • 진입 승인',
                '',
                '복잡도: O(1)',
                '디바이스 검증과 동일!'
            ],
            icon: 'fa-check-circle',
            color: 'green'
        }]);
        setCurrentSlide2(4);

        // 단계 5: 노드 목록 추가
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides2(prev => [...prev, {
            step: 5,
            title: 'Layer 1 노드 목록에 추가',
            content: targetLayer2 + '의 관리 노드 목록 업데이트',
            description: [
                '📋 ' + targetLayer2 + '의 관리 목록',
                '',
                '이전:',
                '  관리 Layer 1 노드: 100개',
                '',
                '추가:',
                '  layer1_nodes.push({',
                '    id: "' + newNodeId + '",',
                '    chain_origin: "' + chainOrigin.substring(0, 16) + '...",',
                '    public_key: "' + nodePK.substring(0, 16) + '...",',
                '    devices: [], // 아직 디바이스 없음',
                '    status: "active"',
                '  })',
                '',
                '현재:',
                '  관리 Layer 1 노드: 101개',
                '',
                '이제 ' + newNodeId + '는:',
                '• ' + targetLayer2 + '의 하위 노드',
                '• 디바이스를 관리할 수 있음',
                '• Layer 2 Merkle Tree에 포함됨',
                '• 네트워크 정식 노드',
                '',
                '다음번 ' + targetLayer2 + '이 Merkle Tree 구성 시:',
                '101개 Layer 1 Root로 트리 생성!'
            ],
            data: [
                targetLayer2 + ' 관리 노드 목록:',
                '',
                '이전 (100개):',
                '  Node_1001: 관리 디바이스 100개',
                '  Node_1002: 관리 디바이스 98개',
                '  ...',
                '  Node_1100: 관리 디바이스 105개',
                '',
                '➕ 추가:',
                '  ' + newNodeId + ': 관리 디바이스 0개 ⭐ NEW',
                '    Origin: ' + chainOrigin.substring(0, 24) + '...',
                '    Joined: ' + new Date().toLocaleString('ko-KR'),
                '',
                '현재 (101개):',
                '  총 관리 노드: 101개',
                '',
                newNodeId + '는 이제:',
                '  • 디바이스 진입 요청 받을 수 있음',
                '  • Merkle Root 제출 가능',
                '  • BLS 서명 참여'
            ],
            icon: 'fa-list',
            color: 'teal'
        }]);
        setCurrentSlide2(5);

        // 단계 6: 완료
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides2(prev => [...prev, {
            step: 6,
            title: 'Layer 노드 진입 완료',
            content: newNodeId + '가 Layer 1 정식 노드가 됨',
            description: [
                '🎉 노드 진입 완료!',
                '',
                '달성:',
                '✅ ' + newNodeId + ' 신원 증명',
                '✅ ' + targetLayer2 + '에 등록',
                '✅ Layer 1 정식 노드',
                '✅ 디바이스 관리 가능',
                '',
                '이제 ' + newNodeId + '가 할 수 있는 것:',
                '1. 디바이스 진입 승인',
                '2. 디바이스 Merkle Root 수집',
                '3. Layer 1 Merkle Tree 구성',
                '4. BLS 서명 집계',
                '5. ' + targetLayer2 + '로 보고',
                '',
                '재귀적 역할:',
                '• 하위: 디바이스를 관리 (상위 역할)',
                '• 상위: ' + targetLayer2 + '에게 보고 (하위 역할)',
                '',
                '패턴 완성:',
                '디바이스 진입 ≈ 노드 진입',
                '동일한 메커니즘, 다른 레벨!',
                '',
                '확장성:',
                '무한히 많은 노드 동시 진입 가능 (O(1))'
            ],
            data: [
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '   Layer 노드 진입 완료',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                '새 노드:',
                '  ID: ' + newNodeId,
                '  Layer: 1',
                '  상위: ' + targetLayer2 + ' (Layer 2)',
                '  상태: ✅ Active',
                '',
                '처리 과정:',
                '  1. Chain Origin 생성 ✅',
                '  2. BLS 서명 ✅',
                '  3. 전송 ✅',
                '  4. 검증 ✅',
                '  5. 등록 ✅',
                '  6. 완료 ✅',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '디바이스 진입과 비교:',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '  알고리즘: 동일',
                '  검증: 동일',
                '  복잡도: 동일 (O(1))',
                '  확장성: 동일 (무한대)',
                '',
                '재귀적 프랙탈 구조 완성!',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-check-circle',
            color: 'gold'
        }]);
        setCurrentSlide2(6);

        setIsRunning2(false);
    };

    // 노드 탈퇴 시뮬레이션
    const runNodeExit = async () => {
        setIsRunning3(true);
        setSlides3([]);
        setCurrentSlide3(0);

        // 단계 1: 이상 행위 탐지
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides3(prev => [...prev, {
            step: 1,
            title: '악의적 행위 탐지',
            content: '상위 노드가 하위 노드의 이상 행위 감지',
            description: [
                '🚨 Node_2001의 모니터링',
                '',
                '탐지된 이상 행위:',
                '• 노드: ' + maliciousNode,
                '• 사유: ' + exitReason,
                '',
                '탐지 방법:',
                '1. Merkle Proof 검증 실패',
                '   요청한 Tx의 증명이 위조됨',
                '',
                '2. Hash Chain 불일치',
                '   이전 제출 Root와 모순',
                '',
                '3. 이중 서명 탐지',
                '   다른 Root에 중복 서명',
                '',
                '4. 타임아웃',
                '   응답 없음 (DoS 공격)',
                '',
                '상위 노드의 책임:',
                '• 하위 노드 관리',
                '• 이상 행위 감시',
                '• 악의적 노드 제거',
                '',
                '자동 탐지 시스템:',
                '• 실시간 모니터링',
                '• 패턴 분석',
                '• 즉시 조치'
            ],
            data: [
                '이상 행위 탐지 보고:',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '  🚨 보안 경고',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                '탐지 시각: ' + new Date().toLocaleString('ko-KR'),
                '탐지자: Node_2001',
                '대상 노드: ' + maliciousNode,
                '',
                '위반 내용:',
                '  ' + exitReason,
                '',
                '증거:',
                '  • Merkle Proof 위조 시도 3회',
                '  • Hash 불일치 5회',
                '  • 이중 서명 탐지',
                '',
                '위험도: 🔴 High',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '조치 필요: 즉시 제거',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-exclamation-triangle',
            color: 'red'
        }]);
        setCurrentSlide3(1);

        // 단계 2: 증거 수집
        await new Promise(resolve => setTimeout(resolve, 2000));
        const evidence = sha256('evidence_' + maliciousNode + '_' + exitReason);
        setSlides3(prev => [...prev, {
            step: 2,
            title: '증거 수집 및 기록',
            content: '악의적 행위의 암호학적 증거 확보',
            description: [
                '📸 증거 확보',
                '',
                'Node_2001의 증거 수집:',
                '',
                '1. 위조된 Merkle Proof',
                '   - 요청: Tx #567 증명',
                '   - 응답: 위조된 경로',
                '   - 검증: 실패',
                '',
                '2. Hash Chain 기록',
                '   - 이전 제출: Root_A',
                '   - 현재 제출: Root_B',
                '   - 모순: Root_A → Root_B 불가능',
                '',
                '3. 타임스탬프',
                '   - 각 이상 행위의 정확한 시각',
                '',
                '4. 서명 검증 로그',
                '   - 이중 서명 증거',
                '',
                '모든 증거를 SHA-256 해싱:',
                '  Evidence_Hash = SHA256(all_evidence)',
                '',
                '이 해시는:',
                '• 위조 불가능',
                '• 타임스탬프 포함',
                '• 영구 기록',
                '• 블랙리스트 근거'
            ],
            data: [
                '수집된 증거:',
                '',
                '위반 노드: ' + maliciousNode,
                '위반 사유: ' + exitReason,
                '',
                '증거 항목:',
                '  1. 위조 Merkle Proof (3건)',
                '  2. Hash Chain 모순 (5건)',
                '  3. 이중 서명 (2건)',
                '  4. 타임아웃 (1건)',
                '',
                '증거 Hash:',
                '  ' + evidence,
                '',
                '타임스탬프:',
                '  ' + Date.now(),
                '',
                '이 증거는:',
                '  • 블랙리스트 등록 근거',
                '  • 향후 재진입 방지',
                '  • 다른 노드와 공유',
                '',
                '암호학적 증명 완료'
            ],
            icon: 'fa-camera',
            color: 'orange'
        }]);
        setCurrentSlide3(2);

        // 단계 3: 노드 제거
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides3(prev => [...prev, {
            step: 3,
            title: '노드 목록에서 제거',
            content: 'Node_2001의 관리 목록에서 삭제',
            description: [
                '🗑️ 노드 제거 처리',
                '',
                'Node_2001의 동작:',
                '',
                '1. 관리 목록에서 제거',
                '   layer1_nodes.remove(' + maliciousNode + ')',
                '',
                '2. 활성 연결 차단',
                '   disconnect(' + maliciousNode + ')',
                '',
                '3. 향후 요청 거부',
                '   blacklist.add(' + maliciousNode + ')',
                '',
                '이전 상태:',
                '  관리 노드: 101개',
                '  [Node_1001, ..., ' + maliciousNode + ', ..., Node_1_New]',
                '',
                '제거 후:',
                '  관리 노드: 100개',
                '  [Node_1001, ..., Node_1_New]',
                '  (' + maliciousNode + ' 제거됨)',
                '',
                '제거의 의미:',
                '• 더 이상 Merkle Tree에 포함 안 됨',
                '• BLS 서명 참여 불가',
                '• 네트워크에서 격리됨'
            ],
            data: [
                'Node_2001 관리 목록 업데이트:',
                '',
                '이전 (101개):',
                '  Node_1001: active',
                '  Node_1002: active',
                '  ...',
                '  ' + maliciousNode + ': active ⚠️',
                '  ...',
                '  Node_1_New: active',
                '',
                '➖ 제거:',
                '  ' + maliciousNode + ': ❌ REMOVED',
                '    사유: ' + exitReason,
                '    증거: ' + evidence.substring(0, 24) + '...',
                '',
                '현재 (100개):',
                '  총 관리 노드: 100개',
                '',
                '다음 Merkle Tree 구성 시:',
                '  100개 Node Root로 구성',
                '  (' + maliciousNode + ' 제외)'
            ],
            icon: 'fa-trash',
            color: 'red'
        }]);
        setCurrentSlide3(3);

        // 단계 4: 블랙리스트 등록
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides3(prev => [...prev, {
            step: 4,
            title: '블랙리스트 영구 등록',
            content: '향후 재진입 방지 및 다른 노드 공유',
            description: [
                '🚫 블랙리스트 시스템',
                '',
                'Node_2001의 블랙리스트 등록:',
                '',
                '등록 내용:',
                '{',
                '  "node_id": "' + maliciousNode + '",',
                '  "public_key": "...",',
                '  "reason": "' + exitReason + '",',
                '  "evidence_hash": "' + evidence.substring(0, 16) + '...",',
                '  "banned_at": ' + Date.now() + ',',
                '  "banned_by": "Node_2001"',
                '}',
                '',
                '블랙리스트 효과:',
                '1. 재진입 시도 자동 거부',
                '   같은 Public Key로 진입 불가',
                '',
                '2. 다른 Layer 2 노드와 공유',
                '   전체 네트워크에 전파',
                '',
                '3. 영구 기록',
                '   삭제 불가능',
                '',
                '재진입 시도 시:',
                '  "이 공개키는 블랙리스트에 있습니다"',
                '  → 즉시 거부'
            ],
            data: [
                '블랙리스트 등록:',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '  🚫 영구 차단',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                'Node ID: ' + maliciousNode,
                'Public Key: (해시됨)',
                '',
                '차단 사유:',
                '  ' + exitReason,
                '',
                '증거 Hash:',
                '  ' + evidence,
                '',
                '차단 시각:',
                '  ' + new Date().toLocaleString('ko-KR'),
                '',
                '차단 노드:',
                '  Node_2001',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '상태: 영구 차단',
                '재진입: 불가능',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-ban',
            color: 'black'
        }]);
        setCurrentSlide3(4);

        // 단계 5: 네트워크 공지
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides3(prev => [...prev, {
            step: 5,
            title: '다른 노드에 공지',
            content: '블랙리스트 정보를 동료 노드들과 공유',
            description: [
                '📢 네트워크 전파',
                '',
                'Node_2001의 브로드캐스트:',
                '',
                '수신자:',
                '• 같은 Layer 2의 다른 노드들',
                '  (Node_2002, Node_2003, ...)',
                '',
                '• 상위 Layer 3',
                '  (Node_3001)',
                '',
                '전송 내용:',
                '{',
                '  "type": "blacklist_update",',
                '  "banned_node": "' + maliciousNode + '",',
                '  "evidence": "' + evidence.substring(0, 16) + '...",',
                '  "reason": "' + exitReason + '"',
                '}',
                '',
                '다른 노드들의 동작:',
                '1. 블랙리스트 업데이트',
                '2. ' + maliciousNode + ' 연결 차단',
                '3. 진입 요청 거부 설정',
                '',
                '네트워크 효과:',
                '• 전체 Layer 2에서 차단',
                '• 어디서도 재진입 불가',
                '• 보안 강화'
            ],
            data: [
                '네트워크 브로드캐스트:',
                '',
                'Node_2001 → 모든 동료:',
                '',
                '  📨 Node_2002: 수신 ✅',
                '  📨 Node_2003: 수신 ✅',
                '  📨 Node_2004: 수신 ✅',
                '  ...',
                '  📨 Node_3001 (상위): 수신 ✅',
                '',
                '전파된 정보:',
                '  차단 노드: ' + maliciousNode,
                '  사유: ' + exitReason,
                '  증거: ' + evidence.substring(0, 32) + '...',
                '',
                '각 노드의 조치:',
                '  ✓ 블랙리스트 추가',
                '  ✓ 연결 차단',
                '  ✓ 진입 거부 설정',
                '',
                '결과:',
                '  ' + maliciousNode + ' 네트워크 전체에서 격리'
            ],
            icon: 'fa-broadcast-tower',
            color: 'blue'
        }]);
        setCurrentSlide3(5);

        // 단계 6: 완료
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSlides3(prev => [...prev, {
            step: 6,
            title: '노드 탈퇴 완료',
            content: maliciousNode + ' 네트워크에서 영구 제거됨',
            description: [
                '✅ 탈퇴 프로세스 완료',
                '',
                '처리 결과:',
                '✅ 악의적 행위 탐지',
                '✅ 증거 확보',
                '✅ 노드 제거',
                '✅ 블랙리스트 등록',
                '✅ 네트워크 공지',
                '',
                '현재 상태:',
                '• ' + maliciousNode + ': 제거됨',
                '• Node_2001: 관리 노드 100개',
                '• 블랙리스트: 1개 추가',
                '• 네트워크: 안전 확보',
                '',
                '핵심 특징:',
                '1. 상위 노드의 권한',
                '   - 하위 노드 관리',
                '   - 즉시 제거 가능',
                '',
                '2. 증거 기반 처리',
                '   - 암호학적 증명',
                '   - 투명한 기록',
                '',
                '3. 네트워크 보안',
                '   - 정보 공유',
                '   - 재진입 방지',
                '',
                '진입과 탈퇴의 대칭성:',
                '• 진입: O(1) - 개인 서명',
                '• 탈퇴: O(1) - 상위 결정'
            ],
            data: [
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '   노드 탈퇴 완료',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                '제거된 노드: ' + maliciousNode,
                '처리 노드: Node_2001',
                '사유: ' + exitReason,
                '',
                '처리 과정:',
                '  1. 이상 행위 탐지 ✅',
                '  2. 증거 수집 ✅',
                '  3. 목록 제거 ✅',
                '  4. 블랙리스트 등록 ✅',
                '  5. 네트워크 공지 ✅',
                '  6. 완료 ✅',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '동적 노드 관리 특징:',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '  진입: O(1) - 개인 서명만',
                '  탈퇴: O(1) - 상위 결정만',
                '  검증: O(1) - BLS 1번',
                '  확장성: 무한대',
                '',
                '  BLS 집계: 불필요 ✅',
                '  다수 서명: 불필요 ✅',
                '  단순함: 극대화 ✅',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-check-circle',
            color: 'green'
        }]);
        setCurrentSlide3(6);

        setIsRunning3(false);
    };

    return (
        <div>
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .slide-card { animation: slideInRight 0.6s ease-out; }
            `}</style>

            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">동적 노드 관리 (진입 & 탈퇴)</h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    새 디바이스나 노드는 자신의 서명만으로 진입하고, 상위 노드가 1:1 검증합니다.
                    BLS 집계 불필요 - 단순하고 효율적인 O(1) 메커니즘입니다.
                </p>
            </div>

            {/* 섹션 1: 디바이스 진입 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-100 border-2 border-cyan-500 rounded-lg p-6 mb-6">
                    <h5 className="text-xl font-bold text-cyan-900 mb-4">
                        <i className="fas fa-mobile-alt mr-3"></i>
                        섹션 1: 디바이스 진입
                    </h5>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">새 디바이스 ID</label>
                            <input
                                type="text"
                                value={newDeviceId}
                                onChange={(e) => setNewDeviceId(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">목표 Layer 1 노드</label>
                            <input
                                type="text"
                                value={targetLayer1}
                                onChange={(e) => setTargetLayer1(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={runDeviceEntry}
                        disabled={isRunning1}
                        className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 disabled:opacity-50"
                    >
                        {isRunning1 ? '진행 중... (' + currentSlide1 + '/6)' : '🚀 디바이스 진입 시뮬레이션'}
                    </button>
                </div>

                <div className="space-y-6">
                    {slides1.map((slide, idx) => (
                        <div key={idx} className={'slide-card bg-white border-2 border-' + slide.color + '-400 rounded-lg shadow-xl overflow-hidden'}>
                            <div className={'bg-gradient-to-r from-' + slide.color + '-50 to-' + slide.color + '-100 px-6 py-4 border-b-2 border-' + slide.color + '-300'}>
                                <div className="flex items-center gap-4">
                                    <div className={'w-16 h-16 bg-' + slide.color + '-500 rounded-full flex items-center justify-center shadow-lg'}>
                                        <i className={'fas ' + slide.icon + ' text-3xl text-white'}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={'px-4 py-1 bg-' + slide.color + '-600 text-white rounded-full text-sm font-bold'}>
                                                단계 {slide.step}/6
                                            </span>
                                            <h6 className="text-xl font-bold">{slide.title}</h6>
                                        </div>
                                        <p className="text-gray-700">{slide.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                {slide.description && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="text-sm text-gray-700 whitespace-pre-line">
                                            {slide.description.join('\n')}
                                        </div>
                                    </div>
                                )}
                                <div className="bg-gray-900 rounded-lg p-5 font-mono text-xs text-green-400">
                                    {slide.data.map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t-4 border-gray-300 my-12"></div>

            {/* 섹션 2: Layer 노드 진입 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-100 border-2 border-orange-500 rounded-lg p-6 mb-6">
                    <h5 className="text-xl font-bold text-orange-900 mb-4">
                        <i className="fas fa-server mr-3"></i>
                        섹션 2: Layer 노드 진입
                    </h5>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">새 Layer 1 노드 ID</label>
                            <input
                                type="text"
                                value={newNodeId}
                                onChange={(e) => setNewNodeId(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">목표 Layer 2 노드</label>
                            <input
                                type="text"
                                value={targetLayer2}
                                onChange={(e) => setTargetLayer2(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={runNodeEntry}
                        disabled={isRunning2}
                        className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50"
                    >
                        {isRunning2 ? '진행 중... (' + currentSlide2 + '/6)' : '🚀 Layer 노드 진입 시뮬레이션'}
                    </button>
                </div>

                <div className="space-y-6">
                    {slides2.map((slide, idx) => (
                        <div key={idx} className={'slide-card bg-white border-2 border-' + slide.color + '-400 rounded-lg shadow-xl overflow-hidden'}>
                            <div className={'bg-gradient-to-r from-' + slide.color + '-50 to-' + slide.color + '-100 px-6 py-4 border-b-2 border-' + slide.color + '-300'}>
                                <div className="flex items-center gap-4">
                                    <div className={'w-16 h-16 bg-' + slide.color + '-500 rounded-full flex items-center justify-center shadow-lg'}>
                                        <i className={'fas ' + slide.icon + ' text-3xl text-white'}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={'px-4 py-1 bg-' + slide.color + '-600 text-white rounded-full text-sm font-bold'}>
                                                단계 {slide.step}/6
                                            </span>
                                            <h6 className="text-xl font-bold">{slide.title}</h6>
                                        </div>
                                        <p className="text-gray-700">{slide.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                {slide.description && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="text-sm text-gray-700 whitespace-pre-line">
                                            {slide.description.join('\n')}
                                        </div>
                                    </div>
                                )}
                                <div className="bg-gray-900 rounded-lg p-5 font-mono text-xs text-green-400">
                                    {slide.data.map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t-4 border-gray-300 my-12"></div>

            {/* 섹션 3: 노드 탈퇴 */}
            <div className="mb-12">
                <div className="bg-gradient-to-r from-red-50 to-pink-100 border-2 border-red-500 rounded-lg p-6 mb-6">
                    <h5 className="text-xl font-bold text-red-900 mb-4">
                        <i className="fas fa-user-slash mr-3"></i>
                        섹션 3: 노드 탈퇴
                    </h5>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">악의적 노드 ID</label>
                            <input
                                type="text"
                                value={maliciousNode}
                                onChange={(e) => setMaliciousNode(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-red-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">탈퇴 사유</label>
                            <input
                                type="text"
                                value={exitReason}
                                onChange={(e) => setExitReason(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-red-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={runNodeExit}
                        disabled={isRunning3}
                        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 disabled:opacity-50"
                    >
                        {isRunning3 ? '진행 중... (' + currentSlide3 + '/6)' : '🚫 노드 탈퇴 시뮬레이션'}
                    </button>
                </div>

                <div className="space-y-6">
                    {slides3.map((slide, idx) => (
                        <div key={idx} className={'slide-card bg-white border-2 border-' + slide.color + '-400 rounded-lg shadow-xl overflow-hidden'}>
                            <div className={'bg-gradient-to-r from-' + slide.color + '-50 to-' + slide.color + '-100 px-6 py-4 border-b-2 border-' + slide.color + '-300'}>
                                <div className="flex items-center gap-4">
                                    <div className={'w-16 h-16 bg-' + slide.color + '-500 rounded-full flex items-center justify-center shadow-lg'}>
                                        <i className={'fas ' + slide.icon + ' text-3xl text-white'}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={'px-4 py-1 bg-' + slide.color + '-600 text-white rounded-full text-sm font-bold'}>
                                                단계 {slide.step}/6
                                            </span>
                                            <h6 className="text-xl font-bold">{slide.title}</h6>
                                        </div>
                                        <p className="text-gray-700">{slide.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                {slide.description && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="text-sm text-gray-700 whitespace-pre-line">
                                            {slide.description.join('\n')}
                                        </div>
                                    </div>
                                )}
                                <div className="bg-gray-900 rounded-lg p-5 font-mono text-xs text-green-400">
                                    {slide.data.map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
