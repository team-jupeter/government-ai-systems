const { useState, useEffect } = React;
const API_BASE = '/api-jeju-integrated';

// 에이전트 ID → URL 매핑
const AGENT_URLS = {
    // 도청
    "special_autonomy": "/jeju-admin/?agent=special_autonomy_agent",
    "tourism_marketing": "/jeju-admin/?agent=tourism_marketing_agent",
    "future_industry": "/jeju-admin/?agent=future_industry_agent",
    "jobs_economy": "/jeju-admin/?agent=jobs_economy_agent",
    "health_welfare_regional": "/jeju-admin/?agent=health_welfare_agent",
    "environment": "/jeju-admin/?agent=environment_agent",
    "agriculture": "/jeju-admin/?agent=agriculture_agent",
    "marine_fishery": "/jeju-admin/?agent=marine_fishery_agent",
    "infrastructure": "/jeju-admin/?agent=infrastructure_agent",
    "pdv_regional": "/jeju-admin/?agent=pdv_agent",
    "openhash_layer3": "/jeju-admin/?agent=openhash_agent",
    
    // 시청
    "city_civil": "/jeju-si/?agent=city_civil_agent",
    "certificate": "/jeju-si/?agent=certificate_agent",
    "welfare_city": "/jeju-si/?agent=welfare_agent",
    "tax_city": "/jeju-si/?agent=tax_agent",
    "citrus_fishery": "/jeju-si/?agent=citrus_fishery_agent",
    "tourism_city": "/jeju-si/?agent=tourism_agent",
    "call_center": "/jeju-si/?agent=call_center_agent",
    "pdv_city": "/jeju-si/?agent=pdv_agent",
    "openhash_layer2": "/jeju-si/?agent=openhash_agent",
    
    // 읍면동
    "civil_affairs": "/eup-myeon-dong/?agent=civil_affairs_agent",
    "welfare_local": "/eup-myeon-dong/?agent=welfare_agent",
    "tax_local": "/eup-myeon-dong/?agent=tax_agent",
    "health_local": "/eup-myeon-dong/?agent=health_agent",
    "senior_care": "/eup-myeon-dong/?agent=senior_care_agent",
    "resident_consultation": "/eup-myeon-dong/?agent=resident_consultation_agent",
    "community": "/eup-myeon-dong/?agent=community_agent",
    "pdv_local": "/eup-myeon-dong/?agent=pdv_agent",
    "openhash_layer1": "/eup-myeon-dong/?agent=openhash_agent"
};

function App() {
    const [systemInfo, setSystemInfo] = useState(null);
    const [agents, setAgents] = useState(null);
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [simulating, setSimulating] = useState(false);
    const [simulationData, setSimulationData] = useState(null);
    const [simulationStep, setSimulationStep] = useState(0);
    const [selectedLayer, setSelectedLayer] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (simulationData && simulationData.steps) {
            const interval = setInterval(() => {
                setSimulationStep(prev => {
                    if (prev < simulationData.steps.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [simulationData]);

    const fetchData = async () => {
        try {
            const [infoRes, agentsRes, servicesRes] = await Promise.all([
                fetch(`${API_BASE}/info`),
                fetch(`${API_BASE}/agents`),
                fetch(`${API_BASE}/services`)
            ]);
            setSystemInfo(await infoRes.json());
            setAgents(await agentsRes.json());
            setServices((await servicesRes.json()).services);
        } catch (error) {
            console.error('데이터 로드 실패:', error);
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;
        
        const userMsg = { role: 'user', content: inputMessage };
        setChatMessages(prev => [...prev, userMsg]);
        setInputMessage('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/consultation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputMessage })
            });
            const data = await response.json();
            setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            setChatMessages(prev => [...prev, { role: 'assistant', content: '오류가 발생했습니다.' }]);
        } finally {
            setLoading(false);
        }
    };

    const startSimulation = async (serviceId) => {
        setSimulating(true);
        setSimulationData(null);
        setSimulationStep(0);

        const endpoints = {
            'citizen_petition_routing': '/simulate/citizen-petition-routing',
            'welfare_integration': '/simulate/welfare-integration',
            'tax_collection': '/simulate/tax-collection',
            'tourism_dataflow': '/simulate/tourism-dataflow',
            'emergency_response': '/simulate/emergency-response'
        };

        try {
            const response = await fetch(`${API_BASE}${endpoints[serviceId]}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const data = await response.json();
            
            if (data.action === 'open_ai_chat') {
                setActiveTab('chat');
                setChatMessages([{ role: 'assistant', content: data.initial_message }]);
            } else {
                setSimulationData(data);
            }
        } catch (error) {
            console.error('시뮬레이션 실패:', error);
        } finally {
            setSimulating(false);
        }
    };

    const getLayerColor = (layer) => {
        const colors = {
            '도청': 'from-purple-500 to-blue-500',
            '시청': 'from-cyan-500 to-blue-500',
            '읍면동': 'from-green-500 to-cyan-500',
            '전체': 'from-orange-500 to-red-500'
        };
        return colors[layer] || 'from-gray-500 to-gray-600';
    };

    const renderAgentCard = (agent, layerColor) => {
        const url = AGENT_URLS[agent.id];
        return React.createElement('a', {
            key: agent.id,
            href: url,
            className: `card-dark rounded-xl p-4 border ${layerColor} hover:shadow-lg hover:scale-105 transition-all block cursor-pointer`
        },
            React.createElement('div', { className: 'flex items-center gap-3 mb-2' },
                React.createElement('div', { className: 'text-3xl' }, agent.name.split(' ')[0]),
                React.createElement('div', { className: 'flex-1' },
                    React.createElement('div', { className: 'font-bold text-white text-sm' }, agent.name),
                    React.createElement('div', { className: 'text-xs mt-1' },
                        React.createElement('span', { className: 'px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs border border-cyan-500/30' }, agent.layer)
                    )
                )
            ),
            React.createElement('p', { className: 'text-gray-400 text-xs mb-2' }, agent.description),
            React.createElement('div', { className: 'text-xs text-cyan-400 font-semibold flex items-center gap-1' },
                '상세 보기 →'
            )
        );
    };

    return React.createElement('div', { className: 'min-h-screen' },
        React.createElement('a', { 
            href: '/', 
            className: 'fixed top-6 left-6 z-50 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 font-bold neon-border'
        }, '🏠 포털'),
        
        React.createElement('div', { className: 'fixed top-6 right-6 z-50 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 status-online text-white' },
            '● 3계층 통합'
        ),

        React.createElement('div', { className: 'container mx-auto px-4 py-12' },
            React.createElement('header', { className: 'text-center mb-16 pt-8' },
                React.createElement('div', { className: 'flex items-center justify-center gap-4 mb-6' },
                    React.createElement('div', { className: 'w-24 h-24 bg-gradient-to-br from-purple-400 via-cyan-400 to-green-400 rounded-2xl flex items-center justify-center text-5xl neon-border' },
                        '🏛️'
                    ),
                    React.createElement('div', { className: 'text-left' },
                        React.createElement('h1', { className: 'text-6xl font-bold text-cyan-400 neon-text mb-2' },
                            '제주 통합 행정 시스템'
                        ),
                        React.createElement('p', { className: 'text-gray-400 text-xl' }, '도청 · 시청 · 읍면동 3계층 통합 플랫폼')
                    )
                ),
                
                systemInfo && React.createElement('div', { className: 'grid grid-cols-4 gap-6 max-w-4xl mx-auto mt-8' },
                    React.createElement('div', { className: 'text-center card-dark rounded-xl p-4 neon-border' },
                        React.createElement('div', { className: 'text-4xl font-bold text-purple-400 mb-2' }, '3계층'),
                        React.createElement('div', { className: 'text-gray-400 text-sm' }, '통합 관리')
                    ),
                    React.createElement('div', { className: 'text-center card-dark rounded-xl p-4 neon-border' },
                        React.createElement('div', { className: 'text-4xl font-bold text-cyan-400 mb-2' }, '29'),
                        React.createElement('div', { className: 'text-gray-400 text-sm' }, 'AI 에이전트')
                    ),
                    React.createElement('div', { className: 'text-center card-dark rounded-xl p-4 neon-border' },
                        React.createElement('div', { className: 'text-4xl font-bold text-green-400 mb-2' }, '67만'),
                        React.createElement('div', { className: 'text-gray-400 text-sm' }, '전체 인구')
                    ),
                    React.createElement('div', { className: 'text-center card-dark rounded-xl p-4 neon-border' },
                        React.createElement('div', { className: 'text-4xl font-bold text-blue-400 mb-2' }, '96.5%'),
                        React.createElement('div', { className: 'text-gray-400 text-sm' }, '자동화율')
                    )
                )
            ),

            React.createElement('div', { className: 'mb-12 flex justify-center gap-4' },
                ['overview', 'layers', 'services', 'chat'].map(tab => 
                    React.createElement('button', {
                        key: tab,
                        onClick: () => setActiveTab(tab),
                        className: `px-8 py-4 rounded-xl font-bold transition-all text-lg ${
                            activeTab === tab 
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white neon-border' 
                                : 'card-dark text-gray-300 hover:text-white'
                        }`
                    }, tab === 'overview' ? '📊 개요' : tab === 'layers' ? '🏛️ 3계층' : tab === 'services' ? '⚡ 연계' : '💬 상담')
                )
            ),

            activeTab === 'overview' && React.createElement('div', {},
                React.createElement('div', { className: 'card-dark rounded-2xl p-8 mb-8 neon-border' },
                    React.createElement('h2', { className: 'text-3xl font-bold mb-6 text-cyan-400 neon-text' }, '🎯 3계층 통합 구조'),
                    
                    systemInfo && React.createElement('div', { className: 'space-y-8' },
                        React.createElement('div', { className: 'relative' },
                            React.createElement('div', { className: 'card-dark rounded-2xl p-6 border-2 border-purple-500/50 layer-card' },
                                React.createElement('div', { className: 'flex items-center justify-between mb-4' },
                                    React.createElement('div', { className: 'flex items-center gap-4' },
                                        React.createElement('div', { className: 'text-5xl' }, '🏛️'),
                                        React.createElement('div', {},
                                            React.createElement('h3', { className: 'text-2xl font-bold text-purple-400' }, systemInfo.layers.layer_3.name),
                                            React.createElement('p', { className: 'text-gray-400 mt-1' }, systemInfo.layers.layer_3.jurisdiction)
                                        )
                                    ),
                                    React.createElement('div', { className: 'text-right' },
                                        React.createElement('div', { className: 'text-3xl font-bold text-purple-400' }, systemInfo.layers.layer_3.agents),
                                        React.createElement('div', { className: 'text-sm text-gray-400' }, 'AI 에이전트')
                                    )
                                ),
                                React.createElement('div', { className: 'text-sm text-gray-300' },
                                    '특별자치, 관광마케팅, 미래산업, 광역복지, 환경보전, 농축산, 해양수산, 인프라건설'
                                )
                            ),
                            React.createElement('div', { className: 'flex justify-center my-4' },
                                React.createElement('div', { className: 'w-1 h-12 bg-gradient-to-b from-purple-500 to-cyan-500' })
                            )
                        ),
                        
                        React.createElement('div', { className: 'relative' },
                            React.createElement('div', { className: 'card-dark rounded-2xl p-6 border-2 border-cyan-500/50 layer-card' },
                                React.createElement('div', { className: 'flex items-center justify-between mb-4' },
                                    React.createElement('div', { className: 'flex items-center gap-4' },
                                        React.createElement('div', { className: 'text-5xl' }, '🏢'),
                                        React.createElement('div', {},
                                            React.createElement('h3', { className: 'text-2xl font-bold text-cyan-400' }, systemInfo.layers.layer_2.name),
                                            React.createElement('p', { className: 'text-gray-400 mt-1' }, systemInfo.layers.layer_2.jurisdiction)
                                        )
                                    ),
                                    React.createElement('div', { className: 'text-right' },
                                        React.createElement('div', { className: 'text-3xl font-bold text-cyan-400' }, systemInfo.layers.layer_2.agents),
                                        React.createElement('div', { className: 'text-sm text-gray-400' }, 'AI 에이전트')
                                    )
                                ),
                                React.createElement('div', { className: 'text-sm text-gray-300' },
                                    '시민민원, 증명발급, 시복지, 시세처리, 감귤수산, 관광진흥, 120콜센터'
                                )
                            ),
                            React.createElement('div', { className: 'flex justify-center my-4' },
                                React.createElement('div', { className: 'w-1 h-12 bg-gradient-to-b from-cyan-500 to-green-500' })
                            )
                        ),
                        
                        React.createElement('div', { className: 'relative' },
                            React.createElement('div', { className: 'card-dark rounded-2xl p-6 border-2 border-green-500/50 layer-card' },
                                React.createElement('div', { className: 'flex items-center justify-between mb-4' },
                                    React.createElement('div', { className: 'flex items-center gap-4' },
                                        React.createElement('div', { className: 'text-5xl' }, '🏘️'),
                                        React.createElement('div', {},
                                            React.createElement('h3', { className: 'text-2xl font-bold text-green-400' }, systemInfo.layers.layer_1.name),
                                            React.createElement('p', { className: 'text-gray-400 mt-1' }, systemInfo.layers.layer_1.jurisdiction)
                                        )
                                    ),
                                    React.createElement('div', { className: 'text-right' },
                                        React.createElement('div', { className: 'text-3xl font-bold text-green-400' }, systemInfo.layers.layer_1.agents),
                                        React.createElement('div', { className: 'text-sm text-gray-400' }, 'AI 에이전트')
                                    )
                                ),
                                React.createElement('div', { className: 'text-sm text-gray-300' },
                                    '민원처리, 복지지원, 지방세, 보건의료, 경로당, 주민상담, 마을공동체'
                                )
                            )
                        )
                    )
                ),

                React.createElement('div', { className: 'grid md:grid-cols-2 gap-6' },
                    React.createElement('div', { className: 'card-dark rounded-2xl p-6 neon-border' },
                        React.createElement('h3', { className: 'text-2xl font-bold mb-4 text-cyan-400' }, '💡 핵심 특징'),
                        React.createElement('ul', { className: 'space-y-3 text-gray-300' },
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-cyan-400' }, '▸'),
                                '도청-시청-읍면동 실시간 데이터 연계'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-cyan-400' }, '▸'),
                                '29개 AI 에이전트 통합 운영'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-cyan-400' }, '▸'),
                                '계층 간 민원 자동 배정'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-cyan-400' }, '▸'),
                                '복지/세금 통합 관리'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-cyan-400' }, '▸'),
                                '재난 동시 대응 시스템'
                            )
                        )
                    ),
                    React.createElement('div', { className: 'card-dark rounded-2xl p-6 neon-border' },
                        React.createElement('h3', { className: 'text-2xl font-bold mb-4 text-green-400' }, '📈 통합 효과'),
                        React.createElement('ul', { className: 'space-y-3 text-gray-300' },
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-green-400' }, '✓'),
                                '민원 처리시간 70% 단축'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-green-400' }, '✓'),
                                '복지 사각지대 92% 해소'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-green-400' }, '✓'),
                                '세금 징수율 98% 달성'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-green-400' }, '✓'),
                                '재난 대응시간 80% 단축'
                            ),
                            React.createElement('li', { className: 'flex items-center gap-3' },
                                React.createElement('span', { className: 'text-green-400' }, '✓'),
                                '도민 만족도 94%'
                            )
                        )
                    )
                )
            ),

            activeTab === 'layers' && agents && React.createElement('div', {},
                React.createElement('h2', { className: 'text-3xl font-bold mb-4 text-center text-cyan-400 neon-text' }, '🤖 29개 AI 에이전트'),
                React.createElement('p', { className: 'text-center text-gray-400 mb-8' }, '에이전트를 클릭하면 해당 사이트로 이동하여 상세 정보를 확인할 수 있습니다'),
                
                React.createElement('div', { className: 'flex justify-center gap-4 mb-8' },
                    ['all', 'layer_3', 'layer_2', 'layer_1'].map(layer =>
                        React.createElement('button', {
                            key: layer,
                            onClick: () => setSelectedLayer(layer),
                            className: `px-6 py-3 rounded-xl font-bold transition-all ${
                                selectedLayer === layer
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white neon-border'
                                    : 'card-dark text-gray-300 hover:text-white'
                            }`
                        }, layer === 'all' ? '전체' : layer === 'layer_3' ? '도청' : layer === 'layer_2' ? '시청' : '읍면동')
                    )
                ),

                React.createElement('div', { className: 'space-y-8' },
                    (selectedLayer === 'all' || selectedLayer === 'layer_3') && React.createElement('div', {},
                        React.createElement('h3', { className: 'text-2xl font-bold mb-4 text-purple-400' }, '🏛️ 도청 (11개)'),
                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4' },
                            agents.by_layer.layer_3.map(agent => renderAgentCard(agent, 'border-purple-500/30 hover:border-purple-500'))
                        )
                    ),

                    (selectedLayer === 'all' || selectedLayer === 'layer_2') && React.createElement('div', {},
                        React.createElement('h3', { className: 'text-2xl font-bold mb-4 text-cyan-400' }, '🏢 시청 (9개)'),
                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4' },
                            agents.by_layer.layer_2.map(agent => renderAgentCard(agent, 'border-cyan-500/30 hover:border-cyan-500'))
                        )
                    ),

                    (selectedLayer === 'all' || selectedLayer === 'layer_1') && React.createElement('div', {},
                        React.createElement('h3', { className: 'text-2xl font-bold mb-4 text-green-400' }, '🏘️ 읍면동 (9개)'),
                        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4' },
                            agents.by_layer.layer_1.map(agent => renderAgentCard(agent, 'border-green-500/30 hover:border-green-500'))
                        )
                    )
                )
            ),

            activeTab === 'services' && React.createElement('div', { className: 'space-y-6' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-8 text-center text-cyan-400 neon-text' }, '⚡ 계층 간 연계 서비스'),
                services.map((service, idx) =>
                    React.createElement('div', {
                        key: idx,
                        className: 'card-dark rounded-2xl p-6 neon-border'
                    },
                        React.createElement('div', { className: 'flex items-center justify-between mb-6' },
                            React.createElement('div', { className: 'flex-1' },
                                React.createElement('div', { className: 'flex items-center gap-4 mb-3' },
                                    React.createElement('div', { className: 'text-5xl' },
                                        idx === 0 ? '📨' : idx === 1 ? '🏠' : idx === 2 ? '💰' : idx === 3 ? '🌏' : '🚨'
                                    ),
                                    React.createElement('div', {},
                                        React.createElement('h3', { className: 'text-2xl font-bold text-white' }, service.name),
                                        React.createElement('p', { className: 'text-gray-400 mt-1' }, service.description)
                                    )
                                ),
                                React.createElement('div', { className: 'flex gap-2 flex-wrap' },
                                    service.layers_involved.map((layer, i) =>
                                        React.createElement('span', {
                                            key: i,
                                            className: `px-3 py-1 bg-gradient-to-r ${getLayerColor(layer)} text-white rounded-lg text-sm font-bold`
                                        }, layer)
                                    ),
                                    React.createElement('span', {
                                        className: 'px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-bold border border-green-500/30'
                                    }, `⚡ ${service.processing_time}`)
                                )
                            ),
                            React.createElement('button', {
                                onClick: () => startSimulation(service.id),
                                disabled: simulating,
                                className: 'px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 neon-border ml-4'
                            }, simulating ? '⏳ 실행 중...' : '▶ 시작')
                        ),

                        simulationData && simulationData.service === service.name && React.createElement('div', { className: 'mt-6 space-y-6' },
                            React.createElement('div', { className: 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/30' },
                                React.createElement('h4', { className: 'text-xl font-bold mb-4 text-cyan-400' }, '📊 처리 흐름'),
                                React.createElement('div', { className: 'text-center mb-4' },
                                    React.createElement('span', { className: 'px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-bold border border-cyan-500/30' },
                                        simulationData.flow
                                    )
                                ),
                                React.createElement('div', { className: 'space-y-3' },
                                    simulationData.steps.map((step, stepIdx) =>
                                        React.createElement('div', {
                                            key: stepIdx,
                                            className: `flex items-center gap-4 p-4 rounded-xl transition-all ${
                                                stepIdx <= simulationStep
                                                    ? 'bg-green-900/30 border-2 border-green-500/50'
                                                    : 'bg-gray-800/30 border-2 border-gray-700/30'
                                            }`
                                        },
                                            React.createElement('div', {
                                                className: `w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                                    stepIdx <= simulationStep ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                                                }`
                                            }, step.step),
                                            React.createElement('div', { className: 'flex-1' },
                                                React.createElement('div', { className: 'flex items-center gap-3 mb-1' },
                                                    React.createElement('span', {
                                                        className: `px-3 py-1 bg-gradient-to-r ${getLayerColor(step.layer)} text-white rounded-lg text-xs font-bold`
                                                    }, step.layer),
                                                    React.createElement('span', { className: 'font-bold text-white' }, step.action)
                                                ),
                                                stepIdx <= simulationStep && React.createElement('div', { className: 'text-sm text-green-400' }, `완료 (${step.time}초)`)
                                            ),
                                            stepIdx <= simulationStep && React.createElement('div', { className: 'text-3xl text-green-400' }, '✓')
                                        )
                                    )
                                )
                            ),

                            simulationData.distribution && React.createElement('div', { className: 'grid md:grid-cols-3 gap-4' },
                                React.createElement('div', { className: 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border border-purple-500/30' },
                                    React.createElement('h4', { className: 'text-lg font-bold mb-3 text-purple-400' }, '도세'),
                                    React.createElement('div', { className: 'text-3xl font-bold text-white' }, simulationData.distribution.provincial_tax.toLocaleString() + '원')
                                ),
                                React.createElement('div', { className: 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/30' },
                                    React.createElement('h4', { className: 'text-lg font-bold mb-3 text-cyan-400' }, '시세'),
                                    React.createElement('div', { className: 'text-3xl font-bold text-white' }, simulationData.distribution.city_tax.toLocaleString() + '원')
                                ),
                                React.createElement('div', { className: 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/30' },
                                    React.createElement('h4', { className: 'text-lg font-bold mb-3 text-green-400' }, '구세'),
                                    React.createElement('div', { className: 'text-3xl font-bold text-white' }, simulationData.distribution.district_tax.toLocaleString() + '원')
                                )
                            ),

                            simulationData.transaction && React.createElement('div', { className: 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/30' },
                                React.createElement('h4', { className: 'text-xl font-bold mb-4 text-cyan-400' }, '⛓️ 오픈해시 분산 기록'),
                                React.createElement('div', { className: 'mb-4' },
                                    React.createElement('span', { className: 'text-gray-400 text-sm' }, 'Hash: '),
                                    React.createElement('code', { className: 'bg-black/50 px-3 py-2 rounded text-xs text-cyan-400 font-mono' },
                                        simulationData.transaction.hash_value.substring(0, 32) + '...'
                                    )
                                ),
                                React.createElement('div', { className: 'grid grid-cols-2 gap-3 mt-4' },
                                    simulationData.transaction.layers.map((layer, idx) =>
                                        React.createElement('div', {
                                            key: idx,
                                            className: 'bg-black/30 rounded-lg p-4 border border-cyan-500/20'
                                        },
                                            React.createElement('div', { className: 'font-bold text-sm text-cyan-400 mb-1' }, layer.layer_name),
                                            React.createElement('div', { className: 'text-xs text-gray-400' }, layer.node_id),
                                            React.createElement('div', { className: 'text-xs text-green-400 mt-2' }, '✓ 기록 완료')
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            ),

            activeTab === 'chat' && React.createElement('div', { className: 'card-dark rounded-2xl p-8 neon-border' },
                React.createElement('h2', { className: 'text-3xl font-bold mb-6 text-cyan-400 neon-text' }, '💬 통합 AI 상담'),
                React.createElement('div', { className: 'bg-black/30 rounded-xl p-4 h-96 overflow-y-auto mb-4 border border-cyan-500/20' },
                    chatMessages.length === 0 && React.createElement('div', { className: 'text-center text-gray-400 mt-32 text-lg' },
                        '안녕하세요! 제주 통합 행정 시스템 AI입니다. 도청, 시청, 읍면동 모든 서비스에 대해 안내해드립니다.'
                    ),
                    chatMessages.map((msg, idx) =>
                        React.createElement('div', {
                            key: idx,
                            className: `mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`
                        },
                            React.createElement('div', {
                                className: `inline-block max-w-lg px-5 py-3 rounded-2xl text-lg ${
                                    msg.role === 'user'
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                        : 'card-dark text-gray-200 border border-cyan-500/30'
                                }`
                            }, msg.content)
                        )
                    ),
                    loading && React.createElement('div', { className: 'text-center' },
                        React.createElement('div', { className: 'inline-block px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-400 border border-cyan-500/30' }, '입력 중...')
                    )
                ),
                React.createElement('div', { className: 'flex gap-3' },
                    React.createElement('input', {
                        type: 'text',
                        value: inputMessage,
                        onChange: (e) => setInputMessage(e.target.value),
                        onKeyPress: (e) => e.key === 'Enter' && sendMessage(),
                        placeholder: '메시지를 입력하세요...',
                        className: 'flex-1 px-5 py-4 bg-black/30 border border-cyan-500/30 text-white rounded-xl focus:outline-none focus:border-cyan-500 text-lg placeholder-gray-500'
                    }),
                    React.createElement('button', {
                        onClick: sendMessage,
                        disabled: loading || !inputMessage.trim(),
                        className: 'px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 neon-border'
                    }, '전송')
                )
            )
        )
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
