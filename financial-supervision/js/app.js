// ============================================
// 금융감독 AI 자동화 시스템 (데모)
// 메인 애플리케이션
// ============================================

const { useState } = React;

// 메인 앱 컴포넌트
function App() {
    const [activeTab, setActiveTab] = useState('overview');

    // 탭 전환 핸들러
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    // 현재 활성화된 컴포넌트 렌더링
    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return <Overview />;
            case 'realtime':
                return <RealtimeSupervision />;
            case 'fraud':
                return <FraudDetection />;
            case 'soundness':
                return <SoundnessInspection />;
            case 'regulatory':
                return <RegulatoryCompliance />;
            case 'risk':
                return <RiskManagement />;
            case 'report':
                return <ReportGeneration />;
            case 'agents':
                return <AIAgents />;
            case 'performance':
                return <PerformanceDashboard />;
            default:
                return <Overview />;
        }
    };

    const tabs = [
        { id: 'overview', icon: 'fa-home', label: '개요' },
        { id: 'realtime', icon: 'fa-chart-line', label: '실시간 감독' },
        { id: 'fraud', icon: 'fa-shield-alt', label: '이상거래 탐지' },
        { id: 'soundness', icon: 'fa-heartbeat', label: '건전성 검사' },
        { id: 'regulatory', icon: 'fa-balance-scale', label: '규제 준수' },
        { id: 'risk', icon: 'fa-exclamation-triangle', label: '리스크 관리' },
        { id: 'report', icon: 'fa-file-alt', label: '보고서 생성' },
        { id: 'agents', icon: 'fa-users', label: 'AI 에이전트' },
        { id: 'performance', icon: 'fa-trophy', label: '성과 대시보드' }
    ];

    return (
        <div>
            <div className="container">
                {/* 헤더 */}
                <div className="header">
                    <h1>금융감독 AI 자동화 시스템</h1>
                    <div className="header-meta">
                        <span><i className="fas fa-cube"></i> OpenHash 기반</span>
                        <span><i className="fas fa-flask"></i> 특허 출원용 프로토타입</span>
                        <span><i className="fas fa-robot"></i> AI 에이전트</span>
                        <span><i className="fas fa-shield"></i> 데이터 무결성</span>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <div className="tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => handleTabChange(tab.id)}
                        >
                            <i className={`fas ${tab.icon}`}></i> {tab.label}
                        </button>
                    ))}
                </div>

                {/* 콘텐츠 영역 */}
                <div className="content">
                    {renderContent()}
                </div>
            </div>

            {/* 푸터 */}
            <div className="footer">
                <p>© 2025 OpenHash 기반 금융감독 AI 자동화 시스템 (특허 출원용 데모)</p>
                <p>실시간 거래 감독 · 이상거래 탐지 · 건전성 검사 자동화</p>
            </div>
        </div>
    );
}

// React 앱 마운트
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
