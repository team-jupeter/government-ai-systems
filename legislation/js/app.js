const { useState, useEffect } = React;

const API_BASE_URL = '/api/legislation';

function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [stats, setStats] = useState(null);
    const [layerInfo, setLayerInfo] = useState(null);
    const [recentBlocks, setRecentBlocks] = useState([]);
    
    useEffect(() => {
        fetchStats();
        fetchLayerInfo();
        fetchRecentBlocks();
    }, []);
    
    const fetchStats = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/statistics`);
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('통계 로드 오류:', error);
        }
    };
    
    const fetchLayerInfo = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/openhash/layers`);
            const data = await response.json();
            setLayerInfo(data);
        } catch (error) {
            console.error('계층 정보 로드 오류:', error);
        }
    };
    
    const fetchRecentBlocks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/openhash/blocks?limit=5`);
            const data = await response.json();
            setRecentBlocks(data.recent_blocks || []);
        } catch (error) {
            console.error('블록 로드 오류:', error);
        }
    };
    
    const handleRecordToOpenHash = async (e) => {
        e.preventDefault();
        setLoading(true);
        const title = e.target.title.value;
        const content = e.target.content.value;
        const institution = e.target.institution.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/openhash/record`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, institution })
            });
            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
            fetchRecentBlocks();
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleVerifyOpenHash = async (e) => {
        e.preventDefault();
        setLoading(true);
        const content = e.target.content.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/openhash/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content })
            });
            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        const legislation = e.target.legislation.value;
        const type = e.target.type.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ legislation, type, record_to_chain: true })
            });
            const data = await response.json();
            setResult(data.result || data.error);
            if (data.openhash) {
                setResult(prev => prev + '\n\n📦 오픈해시 기록 완료\n' + 
                    `해시: ${data.openhash.hash}\n계층: ${data.openhash.layer_name}`);
            }
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleInterpret = async (e) => {
        e.preventDefault();
        setLoading(true);
        const question = e.target.question.value;
        const context = e.target.context.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/interpret`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question, context })
            });
            const data = await response.json();
            setResult(data.result || data.error);
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleDraft = async (e) => {
        e.preventDefault();
        setLoading(true);
        const purpose = e.target.purpose.value;
        const scope = e.target.scope.value;
        const key_provisions = e.target.key_provisions.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/draft`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ purpose, scope, key_provisions })
            });
            const data = await response.json();
            setResult(data.result || data.error);
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleCleanup = async (e) => {
        e.preventDefault();
        setLoading(true);
        const legislation = e.target.legislation.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/cleanup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ legislation })
            });
            const data = await response.json();
            setResult(data.result || data.error);
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleLocalRegulation = async (e) => {
        e.preventDefault();
        setLoading(true);
        const regulation = e.target.regulation.value;
        const region = e.target.region.value;
        
        try {
            const response = await fetch(`${API_BASE_URL}/local-regulation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ regulation, region })
            });
            const data = await response.json();
            setResult(data.result || data.error);
        } catch (error) {
            setResult('오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100' },
        // 헤더
        React.createElement('div', { className: 'bg-white shadow-md' },
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 py-6' },
                React.createElement('div', { className: 'flex items-center justify-between' },
                    React.createElement('div', { className: 'flex items-center space-x-4' },
                        React.createElement('div', { className: 'text-4xl' }, '⚖️'),
                        React.createElement('div', {},
                            React.createElement('h1', { className: 'text-3xl font-bold text-gray-900' }, '법제처 업무자동화 시스템'),
                            React.createElement('p', { className: 'text-sm text-gray-500' }, 'OpenHash 분산신뢰 + AI 멀티에이전트')
                        )
                    ),
                    stats && React.createElement('div', { className: 'text-right' },
                        React.createElement('div', { className: 'text-sm text-green-600 font-semibold' }, '🔐 오픈해시 활성화'),
                        React.createElement('div', { className: 'text-xs text-gray-600' }, `기록된 블록: ${stats.openhash_blocks}개`)
                    )
                )
            )
        ),
        
        // 메인 컨텐츠
        React.createElement('div', { className: 'max-w-7xl mx-auto px-4 py-8' },
            // 통계 카드
            stats && layerInfo && React.createElement('div', { className: 'grid grid-cols-5 gap-4 mb-8' },
                React.createElement('div', { className: 'bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white' },
                    React.createElement('div', { className: 'text-3xl mb-2' }, '🔗'),
                    React.createElement('div', { className: 'text-2xl font-bold' }, layerInfo.total_nodes),
                    React.createElement('div', { className: 'text-sm opacity-90' }, '오픈해시 노드')
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white' },
                    React.createElement('div', { className: 'text-3xl mb-2' }, '⚡'),
                    React.createElement('div', { className: 'text-2xl font-bold' }, stats.energy_saving),
                    React.createElement('div', { className: 'text-sm opacity-90' }, '에너지 절감')
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white' },
                    React.createElement('div', { className: 'text-3xl mb-2' }, '🚀'),
                    React.createElement('div', { className: 'text-2xl font-bold' }, '1,000,000'),
                    React.createElement('div', { className: 'text-sm opacity-90' }, 'TPS (초당처리)')
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white' },
                    React.createElement('div', { className: 'text-3xl mb-2' }, '📊'),
                    React.createElement('div', { className: 'text-2xl font-bold' }, stats.processing_improvement),
                    React.createElement('div', { className: 'text-sm opacity-90' }, '처리시간 단축')
                ),
                React.createElement('div', { className: 'bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white' },
                    React.createElement('div', { className: 'text-3xl mb-2' }, '🤖'),
                    React.createElement('div', { className: 'text-2xl font-bold' }, '5'),
                    React.createElement('div', { className: 'text-sm opacity-90' }, 'AI 에이전트')
                )
            ),
            
            // 탭 버튼
            React.createElement('div', { className: 'bg-white rounded-xl shadow-lg mb-6 p-2' },
                React.createElement('div', { className: 'flex space-x-2 overflow-x-auto' },
                    [
                        { id: 'overview', label: '🏛️ 시스템 개요', icon: '🏛️' },
                        { id: 'openhash', label: '🔐 오픈해시', icon: '🔐' },
                        { id: 'review', label: '📋 법령심사', icon: '📋' },
                        { id: 'interpret', label: '💡 법령해석', icon: '💡' },
                        { id: 'draft', label: '✍️ 입법지원', icon: '✍️' },
                        { id: 'cleanup', label: '🔧 법령정비', icon: '🔧' },
                        { id: 'local', label: '🏛️ 자치법규', icon: '🏛️' }
                    ].map(tab => 
                        React.createElement('button', {
                            key: tab.id,
                            onClick: () => { setActiveTab(tab.id); setResult(''); },
                            className: `px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`
                        }, tab.label)
                    )
                )
            ),
            
            // 시스템 개요
            activeTab === 'overview' && layerInfo && React.createElement('div', { className: 'space-y-6' },
                React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                    React.createElement('h2', { className: 'text-2xl font-bold text-gray-900 mb-4' }, '🔐 오픈해시 4계층 분산 신뢰 시스템'),
                    React.createElement('div', { className: 'grid grid-cols-4 gap-4' },
                        layerInfo.layers.map((layer, idx) => 
                            React.createElement('div', { 
                                key: idx,
                                className: 'bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200'
                            },
                                React.createElement('div', { className: 'text-3xl mb-3 text-center' }, 
                                    idx === 0 ? '🏘️' : idx === 1 ? '🏙️' : idx === 2 ? '🏛️' : '⚖️'
                                ),
                                React.createElement('h3', { className: 'text-lg font-bold text-gray-900 mb-2' }, layer.layer),
                                React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, layer.name),
                                React.createElement('div', { className: 'space-y-1 text-xs' },
                                    React.createElement('div', { className: 'flex justify-between' },
                                        React.createElement('span', { className: 'text-gray-600' }, '노드:'),
                                        React.createElement('span', { className: 'font-semibold' }, layer.nodes)
                                    ),
                                    React.createElement('div', { className: 'flex justify-between' },
                                        React.createElement('span', { className: 'text-gray-600' }, 'TPS:'),
                                        React.createElement('span', { className: 'font-semibold' }, layer.tps.toLocaleString())
                                    ),
                                    React.createElement('div', { className: 'flex justify-between' },
                                        React.createElement('span', { className: 'text-gray-600' }, '총 TPS:'),
                                        React.createElement('span', { className: 'font-semibold text-blue-600' }, layer.total_tps.toLocaleString())
                                    )
                                ),
                                React.createElement('p', { className: 'text-xs text-gray-500 mt-3 border-t pt-3' }, layer.role)
                            )
                        )
                    )
                ),
                
                React.createElement('div', { className: 'grid grid-cols-2 gap-6' },
                    React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                        React.createElement('h3', { className: 'text-xl font-bold text-gray-900 mb-4' }, '🤖 AI 멀티에이전트 시스템'),
                        React.createElement('div', { className: 'space-y-3' },
                            [
                                { name: 'DeepSeek R1', role: '법령 심사', desc: '헌법 합치성, 법체계 정합성 검토' },
                                { name: 'LLaMA', role: '법령 해석', desc: '조문 해석, 판례 분석' },
                                { name: 'Mistral', role: '입법 지원', desc: '법령안 초안 작성' },
                                { name: 'AI 정비', role: '법령 정비', desc: '불합리 규제 탐지' },
                                { name: 'AI 자치', role: '자치법규', desc: '상위법령 충돌 검토' }
                            ].map((agent, idx) => 
                                React.createElement('div', { 
                                    key: idx,
                                    className: 'bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200'
                                },
                                    React.createElement('div', { className: 'font-semibold text-gray-900' }, `${agent.name} - ${agent.role}`),
                                    React.createElement('div', { className: 'text-sm text-gray-600 mt-1' }, agent.desc)
                                )
                            )
                        )
                    ),
                    
                    React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                        React.createElement('h3', { className: 'text-xl font-bold text-gray-900 mb-4' }, '⚡ 블록체인 대비 성능'),
                        React.createElement('div', { className: 'space-y-4' },
                            [
                                { metric: '에너지 소비', value: '98.5% 절감', icon: '🔋', color: 'green' },
                                { metric: '처리 비용', value: '99.9% 절감', icon: '💰', color: 'blue' },
                                { metric: '확장성', value: '무제한', icon: '📈', color: 'purple' },
                                { metric: '처리 속도', value: '60% 단축', icon: '⚡', color: 'orange' },
                                { metric: '보안', value: 'SHA-256 + ECDSA', icon: '🔐', color: 'red' }
                            ].map((item, idx) => 
                                React.createElement('div', { 
                                    key: idx,
                                    className: 'flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                                },
                                    React.createElement('div', { className: 'flex items-center space-x-3' },
                                        React.createElement('span', { className: 'text-2xl' }, item.icon),
                                        React.createElement('span', { className: 'text-gray-700' }, item.metric)
                                    ),
                                    React.createElement('span', { className: `font-bold text-${item.color}-600` }, item.value)
                                )
                            )
                        )
                    )
                ),
                
                recentBlocks.length > 0 && React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                    React.createElement('h3', { className: 'text-xl font-bold text-gray-900 mb-4' }, '📦 최근 오픈해시 블록'),
                    React.createElement('div', { className: 'space-y-2' },
                        recentBlocks.map(block => 
                            React.createElement('div', { 
                                key: block.block_id,
                                className: 'bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition'
                            },
                                React.createElement('div', { className: 'flex justify-between items-start' },
                                    React.createElement('div', { className: 'flex-1' },
                                        React.createElement('div', { className: 'font-semibold text-gray-900' }, `블록 #${block.block_id}: ${block.title}`),
                                        React.createElement('div', { className: 'text-xs text-gray-500 mt-1' }, `해시: ${block.content_hash.substring(0, 32)}...`),
                                        React.createElement('div', { className: 'text-xs text-gray-500' }, `기관: ${block.institution} | 계층: ${block.layer_name}`)
                                    ),
                                    React.createElement('div', { className: 'text-right' },
                                        React.createElement('div', { className: 'text-sm font-semibold text-blue-600' }, `신뢰도: ${block.trust_score}`),
                                        React.createElement('div', { className: 'text-xs text-gray-500' }, new Date(block.timestamp).toLocaleString('ko-KR'))
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            
            // 오픈해시 탭
            activeTab === 'openhash' && React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6' },
                React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                    React.createElement('h2', { className: 'text-xl font-bold text-gray-900 mb-4' }, '📝 법령 데이터 기록'),
                    React.createElement('form', { onSubmit: handleRecordToOpenHash, className: 'space-y-4' },
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '법령 제목'),
                            React.createElement('input', {
                                type: 'text',
                                name: 'title',
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '예: 행정절차법 개정안',
                                required: true
                            })
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '기관'),
                            React.createElement('select', { 
                                name: 'institution',
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                            },
                                React.createElement('option', { value: '법제처' }, '법제처'),
                                React.createElement('option', { value: '국회' }, '국회'),
                                React.createElement('option', { value: '중앙부처' }, '중앙부처'),
                                React.createElement('option', { value: '지자체' }, '지자체')
                            )
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '법령 내용'),
                            React.createElement('textarea', {
                                name: 'content',
                                rows: 8,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '법령 전문을 입력하세요...',
                                required: true
                            })
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            className: 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400'
                        }, loading ? '기록 중...' : '🔐 오픈해시에 기록')
                    ),
                    
                    React.createElement('div', { className: 'mt-6 pt-6 border-t' },
                        React.createElement('h3', { className: 'font-bold text-gray-900 mb-4' }, '🔍 법령 데이터 검증'),
                        React.createElement('form', { onSubmit: handleVerifyOpenHash, className: 'space-y-4' },
                            React.createElement('div', {},
                                React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '검증할 법령 내용'),
                                React.createElement('textarea', {
                                    name: 'content',
                                    rows: 4,
                                    className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                    placeholder: '검증할 법령 내용을 입력하세요...',
                                    required: true
                                })
                            ),
                            React.createElement('button', {
                                type: 'submit',
                                disabled: loading,
                                className: 'w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400'
                            }, loading ? '검증 중...' : '✅ 무결성 검증')
                        )
                    )
                ),
                
                React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                    React.createElement('h2', { className: 'text-xl font-bold text-gray-900 mb-4' }, '결과'),
                    React.createElement('div', { 
                        className: 'bg-gray-50 rounded-lg p-6 min-h-[600px] max-h-[600px] overflow-y-auto font-mono text-sm'
                    },
                        result || React.createElement('div', { className: 'text-gray-400 text-center mt-20' },
                            React.createElement('div', { className: 'text-6xl mb-4' }, '🔐'),
                            React.createElement('p', {}, '결과가 여기에 표시됩니다')
                        )
                    )
                )
            ),
            
            // 나머지 탭들 (기존 코드와 동일하지만 간소화)
            ['review', 'interpret', 'draft', 'cleanup', 'local'].includes(activeTab) && 
            React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-6' },
                React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                    React.createElement('h2', { className: 'text-xl font-bold text-gray-900 mb-4' }, 
                        activeTab === 'review' ? '📋 법령 심사' :
                        activeTab === 'interpret' ? '💡 법령 해석' :
                        activeTab === 'draft' ? '✍️ 입법 지원' :
                        activeTab === 'cleanup' ? '🔧 법령 정비' : '🏛️ 자치법규 지원'
                    ),
                    
                    activeTab === 'review' && React.createElement('form', { onSubmit: handleReview, className: 'space-y-4' },
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '법령 유형'),
                            React.createElement('select', { 
                                name: 'type',
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
                            },
                                React.createElement('option', { value: '법률' }, '법률'),
                                React.createElement('option', { value: '시행령' }, '시행령'),
                                React.createElement('option', { value: '시행규칙' }, '시행규칙')
                            )
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '법령안 내용'),
                            React.createElement('textarea', {
                                name: 'legislation',
                                rows: 12,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '심사할 법령안을 입력하세요...',
                                required: true
                            })
                        ),
                        React.createElement('div', { className: 'bg-blue-50 p-3 rounded-lg text-sm text-blue-800' },
                            '💡 AI가 분석 후 자동으로 오픈해시에 기록됩니다'
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            className: 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400'
                        }, loading ? 'AI 분석 중...' : '🤖 AI 법령 심사 + 오픈해시 기록')
                    ),
                    
                    activeTab === 'interpret' && React.createElement('form', { onSubmit: handleInterpret, className: 'space-y-4' },
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '해석 요청'),
                            React.createElement('textarea', {
                                name: 'question',
                                rows: 6,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '해석이 필요한 법령 조문이나 질문을 입력하세요...',
                                required: true
                            })
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '관련 맥락 (선택)'),
                            React.createElement('textarea', {
                                name: 'context',
                                rows: 6,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '추가 맥락을 입력하세요...'
                            })
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            className: 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400'
                        }, loading ? 'AI 해석 중...' : '💡 AI 법령 해석')
                    ),
                    
                    activeTab === 'draft' && React.createElement('form', { onSubmit: handleDraft, className: 'space-y-4' },
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '입법 목적'),
                            React.createElement('textarea', {
                                name: 'purpose',
                                rows: 4,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '법령 제정의 목적을 입력하세요...',
                                required: true
                            })
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '적용 범위'),
                            React.createElement('input', {
                                type: 'text',
                                name: 'scope',
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '예: 전국민, 공무원, 특정 업종 등'
                            })
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '주요 내용'),
                            React.createElement('textarea', {
                                name: 'key_provisions',
                                rows: 6,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '법령에 포함할 주요 내용을 입력하세요...'
                            })
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            className: 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400'
                        }, loading ? 'AI 작성 중...' : '✍️ AI 법령안 초안 작성')
                    ),
                    
                    activeTab === 'cleanup' && React.createElement('form', { onSubmit: handleCleanup, className: 'space-y-4' },
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '정비 대상 법령'),
                            React.createElement('textarea', {
                                name: 'legislation',
                                rows: 14,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '정비가 필요한 법령을 입력하세요...',
                                required: true
                            })
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            className: 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400'
                        }, loading ? 'AI 분석 중...' : '🔧 AI 법령 정비 분석')
                    ),
                    
                    activeTab === 'local' && React.createElement('form', { onSubmit: handleLocalRegulation, className: 'space-y-4' },
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '지역'),
                            React.createElement('input', {
                                type: 'text',
                                name: 'region',
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '예: 서울특별시, 제주특별자치도 등',
                                required: true
                            })
                        ),
                        React.createElement('div', {},
                            React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, '자치법규 내용'),
                            React.createElement('textarea', {
                                name: 'regulation',
                                rows: 12,
                                className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500',
                                placeholder: '검토할 조례나 규칙을 입력하세요...',
                                required: true
                            })
                        ),
                        React.createElement('button', {
                            type: 'submit',
                            disabled: loading,
                            className: 'w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400'
                        }, loading ? 'AI 검토 중...' : '🏛️ AI 자치법규 검토')
                    )
                ),
                
                React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
                    React.createElement('h2', { className: 'text-xl font-bold text-gray-900 mb-4' }, 'AI 분석 결과'),
                    React.createElement('div', { 
                        className: 'bg-gray-50 rounded-lg p-6 min-h-[500px] max-h-[600px] overflow-y-auto'
                    },
                        result ? React.createElement('div', { 
                            className: 'whitespace-pre-wrap text-gray-800 leading-relaxed'
                        }, result) : React.createElement('div', { className: 'text-gray-400 text-center mt-20' },
                            React.createElement('div', { className: 'text-6xl mb-4' }, '🤖'),
                            React.createElement('p', {}, 'AI 분석 결과가 여기에 표시됩니다')
                        )
                    )
                )
            )
        ),
        
        // 푸터
        React.createElement('div', { className: 'bg-white mt-8 py-6 border-t' },
            React.createElement('div', { className: 'max-w-7xl mx-auto px-4 text-center' },
                React.createElement('p', { className: 'text-gray-800 font-semibold mb-2' }, 
                    '⚖️ 법제처 업무자동화 시스템 | OpenHash 분산신뢰 + AI 멀티에이전트'
                ),
                React.createElement('p', { className: 'text-sm text-gray-600' }, 
                    '🔐 SHA-256 + ECDSA 암호화 | ⚡ 98.5% 에너지 절감 | 🚀 60% 처리시간 단축 | 🤖 DeepSeek R1 + LLaMA + Mistral'
                ),
                React.createElement('p', { className: 'text-xs text-gray-500 mt-2' }, 
                    '4계층 262노드 | 초당 319만 건 처리 | 168바이트 고정블록'
                )
            )
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
