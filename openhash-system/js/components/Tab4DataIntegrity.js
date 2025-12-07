const Tab4DataIntegrity = () => {
    const [slides, setSlides] = React.useState([]);
    const [isRunning, setIsRunning] = React.useState(false);
    const [currentSlide, setCurrentSlide] = React.useState(0);

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

    const blsAggregate = (signatures) => {
        let result = 0;
        signatures.forEach(sig => {
            for (let i = 0; i < sig.length; i += 8) {
                result ^= parseInt(sig.substring(i, i + 8), 16);
            }
        });
        return result.toString(16).padStart(96, '0');
    };

    const buildMerkleTree = (leaves) => {
        let level = leaves;
        const tree = [level];
        while (level.length > 1) {
            const newLevel = [];
            for (let i = 0; i < level.length; i += 2) {
                const left = level[i];
                const right = i + 1 < level.length ? level[i + 1] : left;
                newLevel.push(sha256(left + right).substring(0, 64));
            }
            tree.push(newLevel);
            level = newLevel;
        }
        return tree;
    };

    const runFullSimulation = async () => {
        setIsRunning(true);
        setSlides([]);
        setCurrentSlide(0);

        let stepCounter = 0;

        // ==================== PHASE 1: 사용자 단말 → Layer 1 ====================
        
        // 단계 1: 사용자 단말 트랜잭션 처리
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const deviceTxs = [];
        for (let i = 1; i <= 100; i++) {
            const txs = [];
            for (let j = 1; j <= 50; j++) {
                txs.push('Tx_D' + i + '_' + j);
            }
            deviceTxs.push(txs);
        }
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 1: 디바이스 → Layer 1',
            title: '사용자 단말 트랜잭션 처리',
            content: '100개 디바이스가 각각 50개 트랜잭션 처리',
            description: [
                '🏁 OpenHash의 시작점',
                '',
                '사용자 디바이스(스마트폰, IoT 등)가 트랜잭션을 생성합니다:',
                '• 결제, 문서 전송, 데이터 기록 등',
                '• 각 디바이스는 독립적으로 Tx 처리',
                '• 총 100개 디바이스 × 50개 Tx = 5,000개 트랜잭션',
                '',
                '각 디바이스의 동작:',
                '1. 트랜잭션 생성 (예: "A→B 100원")',
                '2. 로컬에서 검증',
                '3. 처리 완료',
                '',
                '이제 이 트랜잭션들을 Layer 1 노드로 전송할 준비를 합니다.'
            ],
            data: [
                '디바이스별 트랜잭션 (3개 예시):',
                '',
                'Device_001: 50개 Tx 처리',
                '  Tx_D1_1, Tx_D1_2, ..., Tx_D1_50',
                '',
                'Device_002: 50개 Tx 처리',
                '  Tx_D2_1, Tx_D2_2, ..., Tx_D2_50',
                '',
                'Device_003: 50개 Tx 처리',
                '  Tx_D3_1, Tx_D3_2, ..., Tx_D3_50',
                '',
                '... (총 100개 디바이스)',
                '',
                '총 처리량: 5,000개 트랜잭션'
            ],
            icon: 'fa-mobile-alt',
            color: 'cyan'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 2: 디바이스 Merkle Root 생성
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const deviceRoots = deviceTxs.map((txs, i) => {
            const hashes = txs.map(tx => sha256(tx));
            const tree = buildMerkleTree(hashes);
            return tree[tree.length - 1][0];
        });
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 1: 디바이스 → Layer 1',
            title: '각 디바이스의 Merkle Root 생성',
            content: '100개 디바이스가 자신의 Tx로 Merkle Tree 구성',
            description: [
                '📊 디바이스의 데이터 요약',
                '',
                '각 디바이스는 자신이 처리한 50개 Tx를 요약합니다:',
                '',
                'Device_001의 동작:',
                '1. 50개 Tx 각각을 SHA-256 해싱',
                '   [Hash(Tx1), Hash(Tx2), ..., Hash(Tx50)]',
                '',
                '2. 이것들로 Merkle Tree 구성',
                '   - Level 0: 50개 해시 (리프)',
                '   - Level 1: 25개 중간 노드',
                '   - Level 2: 13개',
                '   - Level 3: 7개',
                '   - Level 4: 4개',
                '   - Level 5: 2개',
                '   - Level 6: 1개 (Device Merkle Root)',
                '',
                '3. Device_Root_001 생성 완료',
                '',
                '이 Root는 50개 Tx 전체를 32바이트로 압축한 것입니다.',
                '하나라도 변조되면 Root가 완전히 달라집니다.'
            ],
            data: [
                '생성된 Device Merkle Root (3개 예시):',
                '',
                'Device_001: ' + deviceRoots[0],
                '  ↑ 50개 Tx를 32바이트로 요약',
                '',
                'Device_002: ' + deviceRoots[1],
                '  ↑ 50개 Tx를 32바이트로 요약',
                '',
                'Device_003: ' + deviceRoots[2],
                '  ↑ 50개 Tx를 32바이트로 요약',
                '',
                '... (총 100개 Device Root)',
                '',
                '원본 크기: 5,000개 Tx',
                '압축 크기: 100개 Root × 32 bytes = 3,200 bytes',
                '압축률: 대폭 감소!'
            ],
            icon: 'fa-compress',
            color: 'blue'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 3: Layer 1 노드가 Merkle Tree 구성
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer1Tree = buildMerkleTree(deviceRoots);
        const layer1Root = layer1Tree[layer1Tree.length - 1][0];
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 1: 디바이스 → Layer 1',
            title: 'Layer 1 노드의 Merkle Tree 구성',
            content: '100개 Device Root로 Layer 1 Merkle Tree 생성',
            description: [
                '🌳 Layer 1 Node_1001의 역할',
                '',
                'Layer 1 노드가 담당 디바이스들을 관리합니다:',
                '',
                '1. 100개 Device Root 수신',
                '   Device_Root_001 ~ Device_Root_100',
                '',
                '2. 이것들을 리프로 하는 Merkle Tree 구성',
                '   - Level 0: 100개 Device Root',
                '   - Level 1: 50개',
                '   - Level 2: 25개',
                '   - Level 3: 13개',
                '   - Level 4: 7개',
                '   - Level 5: 4개',
                '   - Level 6: 2개',
                '   - Level 7: 1개 (Layer 1 Merkle Root)',
                '',
                '3. Layer1_Root 계산 완료',
                '',
                '이 Layer1_Root는:',
                '• 100개 디바이스의 모든 데이터 대표',
                '• 5,000개 Tx를 단 32바이트로 압축',
                '• 위조 불가능한 디지털 지문'
            ],
            data: [
                'Layer 1 Merkle Tree:',
                '',
                'Level 7 (Root): 1개',
                '  ' + layer1Root,
                '  ↑ 이것이 100개 디바이스 전체를 대표',
                '',
                'Level 6: 2개',
                'Level 5: 4개',
                '...',
                'Level 0: 100개 (Device Roots)',
                '',
                '트리 높이: 7층',
                '총 노드: ' + layer1Tree.reduce((s,l)=>s+l.length,0) + '개',
                '',
                '압축 효과:',
                '  입력: 100개 × 32 bytes = 3,200 bytes',
                '  출력: 1개 × 32 bytes = 32 bytes',
                '  압축률: 100배!'
            ],
            icon: 'fa-sitemap',
            color: 'green'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 4: BLS 서명 수집 및 집계
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const deviceSigs = deviceRoots.map((root, i) => blsSign(layer1Root, 'Device_' + (i+1)));
        const layer1AggSig = blsAggregate(deviceSigs);
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 1: 디바이스 → Layer 1',
            title: 'BLS 서명 수집 및 집계',
            content: '100개 디바이스 서명을 1개로 압축',
            description: [
                '✍️ BLS 서명의 마법',
                '',
                '프로세스:',
                '',
                '1. Layer 1이 모든 디바이스에 Layer1_Root 공지',
                '   "이것이 우리 100개의 요약입니다"',
                '',
                '2. 각 디바이스가 자신의 개인키로 서명',
                '   Device_001: σ₁ = BLS_Sign(Layer1_Root, SK_D1)',
                '   Device_002: σ₂ = BLS_Sign(Layer1_Root, SK_D2)',
                '   ...',
                '   Device_100: σ₁₀₀ = BLS_Sign(Layer1_Root, SK_D100)',
                '',
                '3. Layer 1이 100개 서명 수집',
                '   총 4,800 bytes (100 × 48 bytes)',
                '',
                '4. BLS 집계 연산',
                '   σ_agg = σ₁ · σ₂ · ... · σ₁₀₀',
                '   타원곡선 위의 점 덧셈',
                '',
                '5. 결과: 단 48 bytes!',
                '   100배 압축 완료',
                '',
                '이 집계 서명으로 100개 디바이스 모두 동의했음을 증명!'
            ],
            data: [
                'BLS 서명 집계:',
                '',
                '개별 서명 (3개 예시):',
                'Device_001: ' + deviceSigs[0].substring(0,40) + '...',
                'Device_002: ' + deviceSigs[1].substring(0,40) + '...',
                'Device_003: ' + deviceSigs[2].substring(0,40) + '...',
                '... (총 100개)',
                '',
                '집계 연산:',
                'σ_agg = σ₁ · σ₂ · ... · σ₁₀₀',
                '',
                '집계 서명:',
                layer1AggSig,
                '',
                '압축 효과:',
                '  입력: 100개 × 48 bytes = 4,800 bytes',
                '  출력: 1개 × 48 bytes = 48 bytes',
                '  압축률: 100배!',
                '',
                '검증: 단 1번으로 100개 모두 확인 가능!'
            ],
            icon: 'fa-signature',
            color: 'purple'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 5: Layer 1 Hash Chain 업데이트
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer1Chain = sha256('origin' + layer1Root + layer1AggSig);
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 1: 디바이스 → Layer 1',
            title: 'Layer 1 Hash Chain 업데이트',
            content: 'Merkle Root + BLS 서명을 Hash Chain에 기록',
            description: [
                '⛓️ Hash Chain의 형성',
                '',
                'Layer 1 Node_1001의 Hash Chain 업데이트:',
                '',
                '이전 상태:',
                '  Previous_Chain = "origin" (최초)',
                '',
                '새로운 데이터:',
                '  • Layer1_Merkle_Root (100개 디바이스 요약)',
                '  • BLS_Aggregated_Signature (100개 동의 증명)',
                '',
                'Hash Chain 계산:',
                '  New_Chain = SHA256(',
                '    Previous_Chain + ',
                '    Layer1_Merkle_Root + ',
                '    BLS_Aggregated_Signature',
                '  )',
                '',
                '결과:',
                '  Node_1001의 새로운 Hash Chain 생성',
                '',
                '의미:',
                '• 100개 디바이스의 5,000개 Tx가 기록됨',
                '• 시간순으로 연결됨 (이전 Chain 포함)',
                '• 위조 불가능 (하나 바꾸면 전체 변경)',
                '',
                '다음번에 또 100개 디바이스 처리 시:',
                '  Chain_2 = SHA256(Chain_1 + New_Root + New_Sig)',
                '이렇게 계속 연결됩니다.'
            ],
            data: [
                'Hash Chain 업데이트:',
                '',
                '입력 데이터:',
                '  Previous: origin',
                '  Merkle Root: ' + layer1Root.substring(0,32) + '...',
                '  BLS Sig: ' + layer1AggSig.substring(0,32) + '...',
                '',
                'SHA-256 연산:',
                'Chain = SHA256(origin + Root + Sig)',
                '',
                '새로운 Hash Chain:',
                layer1Chain,
                '',
                '이 Chain에 담긴 정보:',
                '  ✓ 100개 디바이스',
                '  ✓ 5,000개 트랜잭션',
                '  ✓ 100개 디바이스의 동의',
                '  ✓ 시간 순서 보장',
                '',
                '다음 단계: 이것을 Layer 2로 전송'
            ],
            icon: 'fa-link',
            color: 'orange'
        }]);
        setCurrentSlide(stepCounter);

        // ==================== PHASE 2: Layer 1 → Layer 2 ====================
        
        // 단계 6: Layer 1 노드들의 Merkle Root 생성 및 전송
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer1Nodes = [];
        for (let i = 1; i <= 100; i++) {
            layer1Nodes.push({
                nodeId: 'Node_1' + String(i).padStart(3, '0'),
                merkleRoot: sha256('L1_Node_' + i + '_data'),
                hashChain: sha256('chain_L1_' + i)
            });
        }
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 2: Layer 1 → Layer 2',
            title: '동일한 패턴 반복: Layer 1 → Layer 2',
            content: '100개 Layer 1 노드가 자신의 Merkle Root를 Layer 2로 전송',
            description: [
                '🔄 재귀적 패턴의 시작',
                '',
                '이제 Phase 1과 동일한 패턴이 반복됩니다!',
                '',
                'Layer 1 노드들의 역할 변화:',
                '• Phase 1: 디바이스를 관리하는 "상위 노드"',
                '• Phase 2: Layer 2에게는 "하위 노드"',
                '',
                '각 Layer 1 노드 (100개):',
                '1. 자신의 처리 내역을 Merkle Root로 요약',
                '   - 디바이스 관리 기록',
                '   - Hash Chain 상태',
                '   - 모든 처리 내역',
                '',
                '2. Node_Merkle_Root 생성',
                '   각 노드마다 고유한 Root',
                '',
                '3. 자신의 개인키로 서명',
                '   σ_node = BLS_Sign(Node_Root, SK)',
                '',
                '4. Layer 2 Node_2001로 전송',
                '   {node_root, signature}',
                '',
                'Phase 1에서 디바이스가 한 일을',
                '이제 Layer 1 노드가 동일하게 수행합니다!'
            ],
            data: [
                'Layer 1 노드들의 전송 (3개 예시):',
                '',
                'Node_1001 → Layer 2:',
                '  Merkle Root: ' + layer1Nodes[0].merkleRoot,
                '  서명: BLS_Sign(Root, SK_1001)',
                '',
                'Node_1002 → Layer 2:',
                '  Merkle Root: ' + layer1Nodes[1].merkleRoot,
                '  서명: BLS_Sign(Root, SK_1002)',
                '',
                'Node_1003 → Layer 2:',
                '  Merkle Root: ' + layer1Nodes[2].merkleRoot,
                '  서명: BLS_Sign(Root, SK_1003)',
                '',
                '... (총 100개 Layer 1 노드)',
                '',
                '패턴 반복!',
                '  Phase 1: 디바이스 → Layer 1',
                '  Phase 2: Layer 1 → Layer 2 (동일한 방식)'
            ],
            icon: 'fa-layer-group',
            color: 'blue'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 7: Layer 2의 Merkle Tree 구성
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer1NodeRoots = layer1Nodes.map(n => n.merkleRoot);
        const layer2Tree = buildMerkleTree(layer1NodeRoots);
        const layer2Root = layer2Tree[layer2Tree.length - 1][0];
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 2: Layer 1 → Layer 2',
            title: 'Layer 2의 Merkle Tree 구성',
            content: 'Layer 2 Node_2001이 100개 Layer 1 Root로 트리 생성',
            description: [
                '🌳 동일한 알고리즘 적용',
                '',
                'Layer 2 Node_2001의 동작:',
                '(Phase 1에서 Layer 1이 한 것과 동일!)',
                '',
                '1. 100개 Layer 1 Node Root 수신',
                '',
                '2. Merkle Tree 구성',
                '   - Level 0: 100개 Layer 1 Root',
                '   - Level 1~6: 중간 노드들',
                '   - Level 7: Layer2_Merkle_Root',
                '',
                '3. Layer2_Root 계산 완료',
                '',
                '이 Root가 의미하는 것:',
                '• 100개 Layer 1 노드',
                '  → 각 노드가 100개 디바이스 관리',
                '  → 총 10,000개 디바이스',
                '  → 총 500,000개 트랜잭션',
                '',
                '모든 것이 단 32바이트에 압축!',
                '',
                '알고리즘은 Phase 1과 완전히 동일합니다.',
                '입력만 다를 뿐입니다.'
            ],
            data: [
                'Layer 2 Merkle Tree:',
                '',
                'Level 7 (Root): 1개',
                '  ' + layer2Root,
                '  ↑ 100개 Layer 1 노드 = 10,000개 디바이스',
                '',
                'Level 6: 2개',
                'Level 5: 4개',
                '...',
                'Level 0: 100개 (Layer 1 Roots)',
                '',
                '재귀적 압축:',
                '  500,000개 Tx',
                '  → 10,000개 Device Root',
                '  → 100개 Layer 1 Root',
                '  → 1개 Layer 2 Root (32 bytes)',
                '',
                '압축률: 수백만 배!'
            ],
            icon: 'fa-sitemap',
            color: 'green'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 8: Layer 2의 BLS 집계
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer1Sigs = layer1Nodes.map(n => blsSign(layer2Root, n.nodeId));
        const layer2AggSig = blsAggregate(layer1Sigs);
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 2: Layer 1 → Layer 2',
            title: 'Layer 2의 BLS 집계',
            content: '100개 Layer 1 서명 → 1개 집계 서명',
            description: [
                '✍️ 동일한 BLS 패턴',
                '',
                '(Phase 1과 완전히 동일한 과정)',
                '',
                '1. Layer 2가 Layer2_Root를 100개 Layer 1에 공지',
                '',
                '2. 각 Layer 1 노드가 서명',
                '   Node_1001: σ₁ = BLS_Sign(Layer2_Root, SK_1001)',
                '   Node_1002: σ₂ = BLS_Sign(Layer2_Root, SK_1002)',
                '   ...',
                '',
                '3. Layer 2가 100개 서명 수집',
                '',
                '4. BLS 집계',
                '   σ_agg = σ₁ · σ₂ · ... · σ₁₀₀',
                '',
                '5. 48 bytes 완성',
                '',
                '결과:',
                '• 100개 Layer 1 노드의 동의',
                '• 10,000개 디바이스의 간접 동의',
                '• 500,000개 Tx의 최종 승인',
                '',
                '모두 48 bytes에 담김!'
            ],
            data: [
                'Layer 2 BLS 집계:',
                '',
                '입력 (100개 서명):',
                '  σ₁, σ₂, ..., σ₁₀₀',
                '  총: 4,800 bytes',
                '',
                '집계 연산:',
                '  ' + layer2AggSig.substring(0,48),
                '  ' + layer2AggSig.substring(48),
                '',
                '출력:',
                '  48 bytes (100배 압축)',
                '',
                '이 서명이 증명하는 것:',
                '  ✓ 100개 Layer 1 노드 동의',
                '  ✓ 10,000개 디바이스 간접 동의',
                '  ✓ 500,000개 Tx 승인'
            ],
            icon: 'fa-signature',
            color: 'purple'
        }]);
        setCurrentSlide(stepCounter);

        // ==================== PHASE 3: Layer 2 → Layer 3 ====================
        
        // 단계 9: Layer 2 → Layer 3 (동일 패턴)
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer2Nodes = [];
        for (let i = 1; i <= 100; i++) {
            layer2Nodes.push({
                nodeId: 'Node_2' + String(i).padStart(3, '0'),
                merkleRoot: sha256('L2_Node_' + i + '_data')
            });
        }
        const layer2NodeRoots = layer2Nodes.map(n => n.merkleRoot);
        const layer3Tree = buildMerkleTree(layer2NodeRoots);
        const layer3Root = layer3Tree[layer3Tree.length - 1][0];
        const layer2Sigs = layer2Nodes.map(n => blsSign(layer3Root, n.nodeId));
        const layer3AggSig = blsAggregate(layer2Sigs);
        
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 3: Layer 2 → Layer 3',
            title: '패턴 반복: Layer 2 → Layer 3',
            content: '100개 Layer 2 노드 → Layer 3 Node_3001',
            description: [
                '🔄 세 번째 반복',
                '',
                '동일한 패턴이 또 반복됩니다!',
                '',
                'Layer 3 Node_3001의 동작:',
                '1. 100개 Layer 2 Root 수신',
                '2. Merkle Tree 구성 → Layer3_Root',
                '3. 100개 Layer 2에 공지',
                '4. BLS 서명 100개 수집',
                '5. 집계 → 48 bytes',
                '6. Hash Chain 업데이트',
                '',
                '이제 Layer3_Root가 의미하는 것:',
                '• 100개 Layer 2 노드',
                '  → 각각 100개 Layer 1 관리',
                '  → 각 Layer 1은 100개 디바이스 관리',
                '',
                '계산:',
                '  100 × 100 × 100 = 1,000,000개 디바이스!',
                '  1,000,000 × 50 = 50,000,000개 Tx!',
                '',
                '모두 32 bytes Root + 48 bytes Sig = 80 bytes!',
                '',
                '알고리즘은 여전히 동일합니다.'
            ],
            data: [
                'Layer 3 처리 결과:',
                '',
                'Merkle Root:',
                '  ' + layer3Root,
                '  ↑ 1,000,000개 디바이스 대표',
                '',
                'BLS 집계 서명:',
                '  ' + layer3AggSig.substring(0,48),
                '  ' + layer3AggSig.substring(48),
                '  ↑ 100개 Layer 2 노드 동의',
                '',
                '압축 효과:',
                '  50,000,000개 Tx',
                '  → 80 bytes로 압축!',
                '',
                '재귀 레벨: 3단계',
                '  디바이스 → L1 → L2 → L3'
            ],
            icon: 'fa-layer-group',
            color: 'teal'
        }]);
        setCurrentSlide(stepCounter);

        // ==================== PHASE 4: Layer 3 → Layer 4 ====================
        
        // 단계 10: Layer 3 → Layer 4 (최종)
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        const layer3Nodes = [];
        for (let i = 1; i <= 10; i++) {
            layer3Nodes.push({
                nodeId: 'Node_3' + String(i).padStart(3, '0'),
                merkleRoot: sha256('L3_Node_' + i + '_data')
            });
        }
        const layer3NodeRoots = layer3Nodes.map(n => n.merkleRoot);
        const layer4Tree = buildMerkleTree(layer3NodeRoots);
        const layer4Root = layer4Tree[layer4Tree.length - 1][0];
        const layer3Sigs = layer3Nodes.map(n => blsSign(layer4Root, n.nodeId));
        const layer4AggSig = blsAggregate(layer3Sigs);
        
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: 'Phase 4: Layer 3 → Layer 4',
            title: '최종 단계: Layer 3 → Layer 4 (국가 수준)',
            content: '10개 Layer 3 노드 → Layer 4 최종 확정',
            description: [
                '👑 국가 레벨 최종 확정',
                '',
                'Layer 4 Node_4001의 동작:',
                '(동일한 알고리즘, 마지막 적용)',
                '',
                '1. 10개 Layer 3 Root 수신',
                '2. Merkle Tree 구성 → Layer4_Root',
                '3. 10개 Layer 3에 공지',
                '4. BLS 서명 10개 수집',
                '5. 집계 → 48 bytes',
                '6. 최종 확정',
                '',
                'Layer4_Root가 의미하는 것:',
                '• 10개 Layer 3',
                '  → 각각 100개 Layer 2',
                '  → 각각 100개 Layer 1',
                '  → 각각 100개 디바이스',
                '',
                '계산:',
                '  10 × 100 × 100 × 100 = 10,000,000개 디바이스',
                '  10,000,000 × 50 = 500,000,000개 Tx',
                '',
                '5억 개 트랜잭션이 80 bytes!',
                '',
                '이것이 OpenHash의 확장성입니다!'
            ],
            data: [
                '🏆 최종 국가 레벨 확정',
                '',
                'Layer 4 Merkle Root:',
                '  ' + layer4Root,
                '  ↑ 전체 국가 시스템 대표',
                '',
                'Layer 4 BLS 서명:',
                '  ' + layer4AggSig.substring(0,48),
                '  ' + layer4AggSig.substring(48),
                '  ↑ 10개 광역시도 동의',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '최종 통계:',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '  디바이스: 10,000,000개',
                '  트랜잭션: 500,000,000개',
                '  최종 크기: 80 bytes',
                '',
                '  Layer 4: 10개 노드',
                '  Layer 3: 1,000개 노드',
                '  Layer 2: 100,000개 노드',
                '  Layer 1: 10,000,000개 노드',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '알고리즘 반복 횟수: 4번',
                '사용된 코드: 동일한 함수',
                '재귀적 프랙탈 구조 완성!',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
            ],
            icon: 'fa-flag-checkered',
            color: 'gold'
        }]);
        setCurrentSlide(stepCounter);

        // 단계 11: 전체 시스템 요약
        await new Promise(resolve => setTimeout(resolve, 2000));
        stepCounter++;
        setSlides(prev => [...prev, {
            step: stepCounter,
            phase: '완료',
            title: 'OpenHash 재귀적 구조 완성',
            content: '동일한 알고리즘 4번 반복으로 5억 건 처리',
            description: [
                '🎯 핵심 통찰',
                '',
                '1. 동일한 알고리즘',
                '   모든 Layer에서 같은 코드 실행:',
                '   • Merkle Tree 구성',
                '   • BLS 서명 집계',
                '   • Hash Chain 업데이트',
                '',
                '2. 재귀적 반복',
                '   Phase 1 패턴이 Phase 2, 3, 4에서 반복',
                '   입력만 다를 뿐 로직은 동일',
                '',
                '3. 프랙탈 구조',
                '   작은 부분(디바이스→L1)과',
                '   큰 부분(L3→L4)의 구조가 동일',
                '',
                '4. 무한 확장성',
                '   Layer 5, 6, 7... 추가 가능',
                '   알고리즘 변경 없음',
                '',
                '5. 효율성',
                '   5억 건 → 80 bytes',
                '   검증: 각 Layer당 O(1)',
                '',
                '6. 보안성',
                '   각 Layer에서 BLS + Merkle',
                '   위조 불가능, 추적 가능',
                '',
                '이것이 진정한 계층적 분산 시스템입니다!'
            ],
            data: [
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '   OpenHash 재귀적 프랙탈 구조',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                'Layer 4 (국가)',
                '  ↑ 10개 × [동일 알고리즘]',
                'Layer 3 (광역시도)',
                '  ↑ 100개 × [동일 알고리즘]',
                'Layer 2 (시군구)',
                '  ↑ 100개 × [동일 알고리즘]',
                'Layer 1 (읍면동)',
                '  ↑ 100개 × [동일 알고리즘]',
                '디바이스',
                '',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '각 단계마다:',
                '  1. Merkle Tree 구성',
                '  2. Merkle Root 계산',
                '  3. BLS 서명 수집',
                '  4. BLS 집계 (100배 압축)',
                '  5. Hash Chain 업데이트',
                '  6. 상위 Layer 전송',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '',
                '✅ 5억 건 트랜잭션 처리',
                '✅ 80 bytes로 압축',
                '✅ O(log n) 검증',
                '✅ 위조 불가능',
                '✅ 무한 확장 가능',
                '',
                'As above, so below! 🌟'
            ],
            icon: 'fa-infinity',
            color: 'indigo'
        }]);
        setCurrentSlide(stepCounter);

        setIsRunning(false);
    };

    return (
        <div>
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .slide-card { animation: slideInRight 0.6s ease-out; }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .pulse-highlight { animation: pulse 1s ease-in-out infinite; }
            `}</style>

            <div className="mb-8">
                <h4 className="text-2xl font-bold text-gov-text mb-3">
                    OpenHash 재귀적 계층 구조 (사용자 → Layer 4)
                </h4>
                <p className="text-gov-text-secondary leading-relaxed">
                    동일한 알고리즘이 4번 반복되어 5억 개 트랜잭션을 80 bytes로 압축합니다.
                    각 단계는 Merkle Tree + BLS 서명의 프랙탈 패턴으로 구성됩니다.
                </p>
            </div>

            <div className="mb-12">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-100 border-2 border-indigo-500 rounded-lg p-6 mb-6">
                    <h5 className="text-xl font-bold text-indigo-900 mb-4">
                        <i className="fas fa-play-circle mr-3"></i>
                        전체 프로세스 시뮬레이션
                    </h5>
                    <p className="text-sm text-indigo-800 mb-4">
                        디바이스 → Layer 1 → Layer 2 → Layer 3 → Layer 4 
                        (동일 패턴 4번 반복)
                    </p>
                    <button
                        onClick={runFullSimulation}
                        disabled={isRunning}
                        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isRunning ? '진행 중... (' + currentSlide + '/11 단계)' : '🚀 OpenHash 전체 시뮬레이션 시작'}
                    </button>
                </div>

                <div className="space-y-6">
                    {slides.map((slide, idx) => (
                        <div key={idx} className={'slide-card bg-white border-2 border-' + slide.color + '-400 rounded-lg shadow-xl overflow-hidden'}>
                            <div className={'bg-gradient-to-r from-' + slide.color + '-50 to-' + slide.color + '-100 px-6 py-4 border-b-2 border-' + slide.color + '-300'}>
                                <div className="flex items-center gap-4">
                                    <div className={'w-16 h-16 bg-' + slide.color + '-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0'}>
                                        <i className={'fas ' + slide.icon + ' text-3xl text-white'}></i>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-gray-600 mb-1">{slide.phase}</div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={'px-4 py-1 bg-' + slide.color + '-600 text-white rounded-full text-sm font-bold'}>
                                                단계 {slide.step}/11
                                            </span>
                                            <h6 className="text-xl font-bold text-gray-900">{slide.title}</h6>
                                        </div>
                                        <p className="text-gray-700 font-medium">{slide.content}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                {slide.description && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h6 className="font-bold text-gray-800 mb-2 flex items-center">
                                            <i className="fas fa-info-circle mr-2 text-blue-600"></i>
                                            상세 설명
                                        </h6>
                                        <div className="text-sm text-gray-700 whitespace-pre-line">
                                            {slide.description.join('\n')}
                                        </div>
                                    </div>
                                )}
                                <div className="bg-gray-900 rounded-lg p-5 font-mono text-xs text-green-400">
                                    {slide.data.map((line, i) => (
                                        <div key={i} className={line.includes('━━━') ? 'text-cyan-400' : line.includes('✅') || line.includes('✓') ? 'text-yellow-300 font-bold' : ''}>
                                            {line}
                                        </div>
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
