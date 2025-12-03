const { useState, useEffect, useRef } = React;
const API_BASE_URL = '/api/fooddrug';

function App() {
    const [selectedAgent, setSelectedAgent] = useState('general');
    const [agentTypes, setAgentTypes] = useState({});
    const [ecosystemInfo, setEcosystemInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [documentHash, setDocumentHash] = useState('');
    const [verifyResult, setVerifyResult] = useState(null);
    const [activeTab, setActiveTab] = useState('scenarios');
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [hashingStep, setHashingStep] = useState(0);
    const [propagationStep, setPropagationStep] = useState(0);
    const [showAnimation, setShowAnimation] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/agent-types`)
            .then(res => res.json())
            .then(data => setAgentTypes(data.agents))
            .catch(err => console.error('Agent 로드 실패:', err));
        
        fetch(`${API_BASE_URL}/ecosystem-info`)
            .then(res => res.json())
            .then(data => setEcosystemInfo(data))
            .catch(err => console.error('생태계 정보 로드 실패:', err));
    }, []);

    // 해싱 애니메이션
    useEffect(() => {
        if (showAnimation && hashingStep < 4) {
            const timer = setTimeout(() => setHashingStep(hashingStep + 1), 800);
            return () => clearTimeout(timer);
        } else if (hashingStep === 4 && propagationStep < 5) {
            const timer = setTimeout(() => setPropagationStep(propagationStep + 1), 600);
            return () => clearTimeout(timer);
        }
    }, [showAnimation, hashingStep, propagationStep]);

    const startHashDemo = () => {
        setHashingStep(0);
        setPropagationStep(0);
        setShowAnimation(true);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Data = e.target.result.split(',')[1];
                setAttachedFiles(prev => [...prev, {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: base64Data
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleConsultation = async () => {
        if (!message.trim() && attachedFiles.length === 0) return;

        const userMessage = message;
        setMessage('');
        setLoading(true);

        setChatHistory(prev => [...prev, {
            role: 'user',
            content: userMessage,
            files: attachedFiles,
            timestamp: new Date().toLocaleTimeString('ko-KR')
        }]);

        try {
            const response = await fetch(`${API_BASE_URL}/consultation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    agentType: selectedAgent,
                    files: attachedFiles
                })
            });

            const data = await response.json();

            if (response.ok) {
                setChatHistory(prev => [...prev, {
                    role: 'assistant',
                    content: data.response,
                    agentType: data.agentType,
                    processedFiles: data.processedFiles,
                    openhashRecords: data.openhashRecords,
                    timestamp: new Date().toLocaleTimeString('ko-KR')
                }]);
                setAttachedFiles([]);
            } else {
                setChatHistory(prev => [...prev, {
                    role: 'error',
                    content: data.error,
                    timestamp: new Date().toLocaleTimeString('ko-KR')
                }]);
            }
        } catch (error) {
            setChatHistory(prev => [...prev, {
                role: 'error',
                content: '서버 통신 실패',
                timestamp: new Date().toLocaleTimeString('ko-KR')
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!documentHash.trim()) return;

        setLoading(true);
        setVerifyResult(null);

        try {
            const response = await fetch(`${API_BASE_URL}/document-verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    documentHash,
                    documentType: selectedAgent
                })
            });

            const data = await response.json();
            setVerifyResult(data);
        } catch (error) {
            setVerifyResult({ error: '검증 실패' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <div className="text-center mb-8 fade-in">
                    <h1 className="text-4xl font-bold text-indigo-900 mb-2">
                        🏥 식품의약품안전처 통합 데이터 네트워크
                    </h1>
                    <p className="text-gray-600 mb-3">
                        국가데이터처 모델 기반 - 오픈해시 5계층 구조
                    </p>
                    {ecosystemInfo && (
                        <div className="inline-flex items-center space-x-4 text-sm bg-white px-6 py-3 rounded-lg shadow">
                            <span className="text-indigo-700 font-semibold">🔗 총 {ecosystemInfo.totalNodes.toLocaleString()}개 노드</span>
                            <span className="text-green-700 font-semibold">⚡ {ecosystemInfo.totalTPS.toLocaleString()} TPS</span>
                            <span className="text-purple-700 font-semibold">🔐 0.18초 검증</span>
                        </div>
                    )}
                </div>

                {/* 탭 */}
                <div className="flex flex-wrap justify-center mb-6 gap-3">
                    <button onClick={() => setActiveTab('scenarios')}
                        className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'scenarios' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}>
                        🎯 실제 문제 해결
                    </button>
                    <button onClick={() => setActiveTab('consultation')}
                        className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'consultation' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}>
                        💬 AI 상담
                    </button>
                    <button onClick={() => setActiveTab('layers')}
                        className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'layers' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}>
                        🏗️ 5계층 구조
                    </button>
                    <button onClick={() => setActiveTab('verify')}
                        className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                            activeTab === 'verify' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}>
                        🔐 문서 검증
                    </button>
                </div>

                {/* 실제 문제 해결 시나리오 탭 */}
                {activeTab === 'scenarios' && ecosystemInfo && (
                    <div className="space-y-6 fade-in">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                💡 오픈해시가 식약처에 제공하는 실질적 가치
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(ecosystemInfo.realWorldScenarios).map(([key, scenario]) => (
                                    <div key={key} className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-400 transition-colors">
                                        <div className="mb-4">
                                            <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-3">
                                                ❌ 현재 문제
                                            </div>
                                            <p className="text-gray-700">{scenario.problem}</p>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
                                                ✅ 오픈해시 솔루션
                                            </div>
                                            <p className="text-gray-700">{scenario.solution}</p>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-gray-200">
                                            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                                                📊 효과
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">{scenario.impact}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">🎯 핵심 혜택 요약</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {ecosystemInfo.keyBenefits && Object.entries(ecosystemInfo.keyBenefits).map(([key, value]) => (
                                    <div key={key} className="bg-white bg-opacity-20 rounded-lg p-4">
                                        <div className="text-sm opacity-90 mb-1">
                                            {key === 'integrity' ? '🔐 무결성' : 
                                             key === 'speed' ? '⚡ 속도' : 
                                             key === 'transparency' ? '👁️ 투명성' : 
                                             key === 'cost' ? '💰 비용' : '🛡️ 보안'}
                                        </div>
                                        <div className="font-semibold">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* AI 상담 탭 */}
                {activeTab === 'consultation' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">🤖 AI Agent</h2>
                            <div className="space-y-2">
                                {Object.entries(agentTypes).map(([key, name]) => (
                                    <button key={key} onClick={() => setSelectedAgent(key)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm ${
                                            selectedAgent === key ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-900 font-semibold' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                                        }`}>
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">💬 상담</h2>

                            <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
                                {chatHistory.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        질문하거나 문서를 첨부하세요
                                    </div>
                                )}
                                {chatHistory.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-2xl rounded-lg p-4 ${
                                            msg.role === 'user' ? 'bg-indigo-600 text-white' :
                                            msg.role === 'error' ? 'bg-red-100 text-red-800' :
                                            'bg-white border-2 border-gray-200 text-gray-800'
                                        }`}>
                                            <div className="text-sm font-semibold mb-1 opacity-75">
                                                {msg.role === 'user' ? '사용자' : 
                                                 msg.role === 'error' ? '오류' : 
                                                 agentTypes[msg.agentType]}
                                            </div>
                                            <div className="whitespace-pre-wrap">{msg.content}</div>
                                            
                                            {msg.files && msg.files.length > 0 && (
                                                <div className="mt-2 text-sm opacity-75">
                                                    📎 첨부: {msg.files.map(f => f.name).join(', ')}
                                                </div>
                                            )}
                                            
                                            {msg.openhashRecords && msg.openhashRecords.length > 0 && (
                                                <div className="mt-3 p-3 bg-green-50 rounded border border-green-300">
                                                    <div className="font-semibold text-green-800 mb-2">🔐 오픈해시 등록 완료</div>
                                                    {msg.openhashRecords.map((rec, i) => (
                                                        <div key={i} className="text-xs text-green-700 mb-2">
                                                            <div>• {rec.filename}</div>
                                                            <div className="ml-3 text-xs opacity-75">
                                                                {rec.layer_name} | {rec.nodes.toLocaleString()}개 노드 | 신뢰도 {rec.trust_score}% | {rec.verification_time}
                                                            </div>
                                                            <div className="ml-3 text-xs italic">{rec.role}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <div className="text-xs mt-1 opacity-60">{msg.timestamp}</div>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {attachedFiles.length > 0 && (
                                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="text-sm font-semibold text-blue-900 mb-2">📎 첨부 파일 ({attachedFiles.length})</div>
                                    {attachedFiles.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm text-blue-800 mb-1">
                                            <span>{file.name} ({(file.size / 1024).toFixed(1)}KB)</span>
                                            <button onClick={() => removeFile(idx)} className="text-red-600 hover:text-red-800 font-bold">✕</button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-2">
                                <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple className="hidden" />
                                <button onClick={() => fileInputRef.current.click()}
                                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">
                                    📎 파일 첨부 (임상시험 데이터, 허가 신청서, 검사 결과 등)
                                </button>
                                <div className="flex gap-2">
                                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleConsultation()}
                                        placeholder="질문 입력..."
                                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                        disabled={loading} />
                                    <button onClick={handleConsultation}
                                        disabled={loading || (!message.trim() && attachedFiles.length === 0)}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300">
                                        전송
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5계층 구조 탭 */}
                {activeTab === 'layers' && ecosystemInfo && (
                    <div className="space-y-6 fade-in">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                🏗️ 식약처 5계층 오픈해시 네트워크
                            </h2>
                            
                            <div className="space-y-4">
                                {Object.entries(ecosystemInfo.layers).sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(([layerNum, layer]) => (
                                    <div key={layerNum} className={`p-6 rounded-lg border-2 ${
                                        layerNum === '0' ? 'bg-red-50 border-red-300' :
                                        layerNum === '1' ? 'bg-blue-50 border-blue-300' :
                                        layerNum === '2' ? 'bg-green-50 border-green-300' :
                                        layerNum === '3' ? 'bg-purple-50 border-purple-300' :
                                        'bg-orange-50 border-orange-300'
                                    }`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{layer.name}</h3>
                                                <p className="text-gray-700 mb-2">{layer.description}</p>
                                                <div className="inline-block px-3 py-1 bg-white rounded-full text-sm font-semibold">
                                                    {layer.role}
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <div className="text-3xl font-bold text-indigo-600">{layer.nodes.toLocaleString()}</div>
                                                <div className="text-sm text-gray-600">노드</div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                            <div className="bg-white rounded p-3">
                                                <div className="text-xs text-gray-600">TPS</div>
                                                <div className="text-lg font-bold">{layer.tps.toLocaleString()}</div>
                                            </div>
                                            <div className="bg-white rounded p-3">
                                                <div className="text-xs text-gray-600">신뢰도 가중치</div>
                                                <div className="text-lg font-bold">{layer.trust_weight}</div>
                                            </div>
                                            {layerNum === '1' && layer.details && (
                                                <>
                                                    <div className="bg-white rounded p-3">
                                                        <div className="text-xs text-gray-600">제약사</div>
                                                        <div className="text-lg font-bold">{layer.details.pharmaceutical.toLocaleString()}</div>
                                                    </div>
                                                    <div className="bg-white rounded p-3">
                                                        <div className="text-xs text-gray-600">병원</div>
                                                        <div className="text-lg font-bold">{layer.details.hospital.toLocaleString()}</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        
                                        {layer.examples && (
                                            <div className="mt-4 p-3 bg-white rounded">
                                                <div className="text-sm font-semibold text-gray-700 mb-2">📋 처리 예시:</div>
                                                <div className="text-sm text-gray-600">
                                                    {layer.examples.join(' | ')}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 문서 검증 탭 - 애니메이션 강화 */}
                {activeTab === 'verify' && (
                    <div className="space-y-6 fade-in">
                        {/* 해시 검증 메커니즘 애니메이션 */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                🎬 오픈해시 검증 메커니즘 시각화
                            </h2>
                            
                            <button 
                                onClick={startHashDemo}
                                className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                ▶️ 검증 프로세스 애니메이션 시작
                            </button>

                            {/* 단계별 애니메이션 */}
                            <div className="space-y-6">
                                {/* Step 1: 문서 제출 */}
                                <div className={`p-6 rounded-lg border-2 transition-all duration-500 ${
                                    hashingStep >= 1 ? 'bg-blue-50 border-blue-500 scale-105' : 'bg-gray-50 border-gray-200'
                                }`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                                            hashingStep >= 1 ? 'bg-blue-600 text-white scale-110' : 'bg-gray-300 text-gray-600'
                                        }`}>
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">📄 문서 제출</h3>
                                            <p className="text-gray-700">제약회사가 임상시험 데이터 (50MB)를 식약처에 제출</p>
                                            {hashingStep >= 1 && (
                                                <div className="mt-3 p-3 bg-white rounded-lg animate-pulse">
                                                    <div className="text-sm text-blue-700">
                                                        📊 clinical_trial_phase3_data.pdf (52.3 MB)
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: 해시 생성 */}
                                <div className={`p-6 rounded-lg border-2 transition-all duration-500 ${
                                    hashingStep >= 2 ? 'bg-green-50 border-green-500 scale-105' : 'bg-gray-50 border-gray-200'
                                }`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                                            hashingStep >= 2 ? 'bg-green-600 text-white scale-110' : 'bg-gray-300 text-gray-600'
                                        }`}>
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">🔐 SHA-256 해시 생성</h3>
                                            <p className="text-gray-700">50MB 문서 → 32바이트 고유 지문 생성 (0.002초)</p>
                                            {hashingStep >= 2 && (
                                                <div className="mt-3 space-y-2">
                                                    <div className="p-3 bg-white rounded-lg">
                                                        <div className="text-xs text-gray-600 mb-1">원본 문서 (50MB)</div>
                                                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded animate-pulse"></div>
                                                    </div>
                                                    <div className="text-center text-2xl animate-bounce">⬇️</div>
                                                    <div className="p-3 bg-white rounded-lg font-mono text-xs break-all">
                                                        <div className="text-xs text-gray-600 mb-1">SHA-256 해시 (32 bytes)</div>
                                                        <div className="text-green-700 font-bold">
                                                            a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: 원본 암호화 저장 */}
                                <div className={`p-6 rounded-lg border-2 transition-all duration-500 ${
                                    hashingStep >= 3 ? 'bg-purple-50 border-purple-500 scale-105' : 'bg-gray-50 border-gray-200'
                                }`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                                            hashingStep >= 3 ? 'bg-purple-600 text-white scale-110' : 'bg-gray-300 text-gray-600'
                                        }`}>
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">💾 원본 암호화 저장</h3>
                                            <p className="text-gray-700">원본 문서는 제약회사 서버에 AES-256으로 암호화 저장</p>
                                            {hashingStep >= 3 && (
                                                <div className="mt-3 p-4 bg-white rounded-lg border-2 border-purple-300">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="text-sm font-semibold text-purple-900">🏢 제약회사 서버</div>
                                                            <div className="text-xs text-purple-700">원본 50MB 안전 보관</div>
                                                        </div>
                                                        <div className="text-3xl animate-pulse">🔒</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: 오픈해시 네트워크 전파 */}
                                <div className={`p-6 rounded-lg border-2 transition-all duration-500 ${
                                    hashingStep >= 4 ? 'bg-orange-50 border-orange-500 scale-105' : 'bg-gray-50 border-gray-200'
                                }`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                                            hashingStep >= 4 ? 'bg-orange-600 text-white scale-110' : 'bg-gray-300 text-gray-600'
                                        }`}>
                                            4
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">🌐 5계층 네트워크 전파</h3>
                                            <p className="text-gray-700">32바이트 해시만 35,024개 노드에 전파 (0.18초)</p>
                                            
                                            {hashingStep >= 4 && (
                                                <div className="mt-4 relative h-64 bg-gradient-to-b from-white to-orange-100 rounded-lg p-4">
                                                    {/* Layer 0 */}
                                                    <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
                                                        propagationStep >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                                    }`}>
                                                        <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                                            Layer 0: 본청 (3개)
                                                        </div>
                                                    </div>

                                                    {/* Layer 1 전파선 */}
                                                    {propagationStep >= 2 && (
                                                        <>
                                                            <svg className="absolute top-12 left-0 w-full h-full" style={{zIndex: 0}}>
                                                                <line x1="50%" y1="40" x2="25%" y2="100" stroke="#3b82f6" strokeWidth="2" className="animate-pulse"/>
                                                                <line x1="50%" y1="40" x2="50%" y2="100" stroke="#3b82f6" strokeWidth="2" className="animate-pulse"/>
                                                                <line x1="50%" y1="40" x2="75%" y2="100" stroke="#3b82f6" strokeWidth="2" className="animate-pulse"/>
                                                            </svg>
                                                        </>
                                                    )}

                                                    {/* Layer 2 */}
                                                    <div className={`absolute top-24 left-0 right-0 flex justify-around transition-all duration-500 ${
                                                        propagationStep >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                                    }`}>
                                                        <div className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold shadow">지방청</div>
                                                        <div className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold shadow">지방청</div>
                                                        <div className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold shadow">지방청</div>
                                                    </div>

                                                    {/* Layer 3 */}
                                                    <div className={`absolute top-40 left-0 right-0 flex justify-around transition-all duration-500 ${
                                                        propagationStep >= 4 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                                    }`}>
                                                        <div className="bg-purple-500 text-white px-3 py-1 rounded text-xs font-bold shadow">평가원</div>
                                                        <div className="bg-purple-500 text-white px-3 py-1 rounded text-xs font-bold shadow">평가원</div>
                                                    </div>

                                                    {/* Layer 1 업계 */}
                                                    <div className={`absolute bottom-4 left-0 right-0 flex justify-around transition-all duration-500 ${
                                                        propagationStep >= 5 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                                    }`}>
                                                        <div className="text-xs font-bold text-blue-700">제약사</div>
                                                        <div className="text-xs font-bold text-blue-700">병원</div>
                                                        <div className="text-xs font-bold text-blue-700">의료기기</div>
                                                        <div className="text-xs font-bold text-blue-700">식품사</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 전파 완료 후 통계 */}
                            {propagationStep >= 5 && (
                                <div className="mt-6 p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg animate-pulse">
                                    <h3 className="text-xl font-bold mb-4">✅ 오픈해시 등록 완료!</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                            <div className="text-2xl font-bold">0.18초</div>
                                            <div className="text-sm">전파 시간</div>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                            <div className="text-2xl font-bold">35,024</div>
                                            <div className="text-sm">참여 노드</div>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                            <div className="text-2xl font-bold">32 bytes</div>
                                            <div className="text-sm">전송 데이터</div>
                                        </div>
                                        <div className="bg-white bg-opacity-20 rounded-lg p-3">
                                            <div className="text-2xl font-bold">95.7%</div>
                                            <div className="text-sm">신뢰도</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 위변조 탐지 시뮬레이션 */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                ⚠️ 위변조 탐지 메커니즘
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* 정상 문서 */}
                                <div className="border-2 border-green-300 rounded-lg p-6 bg-green-50">
                                    <h3 className="text-lg font-bold text-green-900 mb-4">✅ 정상 문서</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white rounded">
                                            <div className="text-xs text-gray-600">원본 해시</div>
                                            <div className="font-mono text-xs break-all text-green-700">
                                                a7ffc6f8bf1ed766...
                                            </div>
                                        </div>
                                        <div className="text-center text-xl">⬇️</div>
                                        <div className="p-3 bg-white rounded">
                                            <div className="text-xs text-gray-600">검증 해시</div>
                                            <div className="font-mono text-xs break-all text-green-700">
                                                a7ffc6f8bf1ed766...
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-bold">
                                                ✅ 일치 - 무결성 확인
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 위변조 문서 */}
                                <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
                                    <h3 className="text-lg font-bold text-red-900 mb-4">❌ 위변조 문서</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white rounded">
                                            <div className="text-xs text-gray-600">원본 해시</div>
                                            <div className="font-mono text-xs break-all text-gray-700">
                                                a7ffc6f8bf1ed766...
                                            </div>
                                        </div>
                                        <div className="text-center text-xl">⬇️</div>
                                        <div className="p-3 bg-white rounded">
                                            <div className="text-xs text-gray-600">변조된 문서 해시</div>
                                            <div className="font-mono text-xs break-all text-red-700">
                                                <span className="bg-red-200">b8</span>ffc6f8bf1ed766...
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg font-bold animate-pulse">
                                                ❌ 불일치 - 위변조 탐지!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                                <h4 className="font-bold text-yellow-900 mb-2">🔬 핵심 원리</h4>
                                <ul className="text-sm text-yellow-800 space-y-1">
                                    <li>• 문서의 단 1바이트만 변경되어도 완전히 다른 해시 생성</li>
                                    <li>• 0.18초 내에 35,024개 노드에서 동시 검증</li>
                                    <li>• 역산 불가능: 해시로부터 원본 복원 불가능 (암호학적 안전성)</li>
                                    <li>• 50년 장기 보안성 (양자 내성 암호 CRYSTALS-Dilithium)</li>
                                </ul>
                            </div>
                        </div>

                        {/* 실제 검증 인터페이스 */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔐 실제 문서 검증</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">문서 해시 (SHA-256)</label>
                                    <input type="text" value={documentHash} onChange={(e) => setDocumentHash(e.target.value)}
                                        placeholder="64자 해시 입력 또는 위 애니메이션의 샘플 해시 사용"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-sm" />
                                </div>
                                
                                <div className="flex gap-2">
                                    <button onClick={handleVerify} disabled={loading || !documentHash.trim()}
                                        className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300">
                                        {loading ? '검증 중...' : '🔍 문서 검증'}
                                    </button>
                                    <button 
                                        onClick={() => setDocumentHash('a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a')}
                                        className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300">
                                        📋 샘플 해시 사용
                                    </button>
                                </div>

                                {verifyResult && (
                                    <div className={`mt-6 p-6 rounded-lg ${verifyResult.error ? 'bg-red-50 border-2 border-red-300' : 'bg-green-50 border-2 border-green-300'}`}>
                                        {verifyResult.error ? (
                                            <div className="text-red-800">
                                                <div className="font-bold text-lg mb-2">❌ 검증 실패</div>
                                                <p>{verifyResult.error}</p>
                                            </div>
                                        ) : (
                                            <div className="text-green-800">
                                                <div className="font-bold text-xl mb-4">✅ {verifyResult.message}</div>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div className="bg-white rounded p-4">
                                                        <div className="text-sm font-semibold">신뢰도 점수</div>
                                                        <div className="text-3xl font-bold">{verifyResult.trustScore}%</div>
                                                    </div>
                                                    <div className="bg-white rounded p-4">
                                                        <div className="text-sm font-semibold">검증 계층</div>
                                                        <div className="text-xl font-bold">{verifyResult.layerInfo?.name}</div>
                                                    </div>
                                                    <div className="bg-white rounded p-4">
                                                        <div className="text-sm font-semibold">참여 노드</div>
                                                        <div className="text-2xl font-bold">{verifyResult.layerInfo?.nodes.toLocaleString()}개</div>
                                                    </div>
                                                    <div className="bg-white rounded p-4">
                                                        <div className="text-sm font-semibold">검증 시간</div>
                                                        <div className="text-2xl font-bold">{verifyResult.verificationTime}</div>
                                                    </div>
                                                </div>
                                                <div className="bg-white rounded p-4 text-sm">
                                                    <div className="font-semibold mb-2">계층 역할:</div>
                                                    <p>{verifyResult.layerInfo?.role}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 기존 vs 오픈해시 비교 */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                📊 기존 방식 vs 오픈해시
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border-2 border-gray-300 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">❌ 기존 방식</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-red-600">⏱️</span>
                                            <span>검증 시간: <strong>3-9개월</strong></span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-red-600">📄</span>
                                            <span>수작업 문서 대조</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-red-600">👥</span>
                                            <span>전문가 다수 필요</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-red-600">💰</span>
                                            <span>연간 245억 원 비용</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-red-600">⚠️</span>
                                            <span>위조 적발률 낮음</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
                                    <h3 className="text-lg font-bold text-green-900 mb-4">✅ 오픈해시</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-600">⚡</span>
                                            <span>검증 시간: <strong>0.18초</strong> (99.9% 단축)</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-600">🤖</span>
                                            <span>자동 암호학적 검증</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-600">🌐</span>
                                            <span>35,024개 노드 동시 검증</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-600">💰</span>
                                            <span>연간 245억 원 절감</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-green-600">🎯</span>
                                            <span>위조 적발률 520% 향상</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
