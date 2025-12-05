// ============================================
// FPGA 가속 자율 시장 시스템 (데모)
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
            case 'fpga':
                return <FPGAAcceleration />;
            case 'agents':
                return <AIAgents />;
            case 'privacy':
                return <PrivacyProtection />;
            case 'trust':
                return <GlobalTrust />;
            case 'forecast':
                return <DemandForecast />;
            case 'distribution':
                return <ValueDistribution />;
            case 'security':
                return <SecuritySystem />;
            case 'performance':
                return <PerformanceDashboard />;
            default:
                return <Overview />;
        }
    };

    const tabs = [
        { id: 'overview', icon: 'fa-home', label: '개요' },
        { id: 'fpga', icon: 'fa-microchip', label: 'FPGA 가속' },
        { id: 'agents', icon: 'fa-robot', label: 'AI 에이전트' },
        { id: 'privacy', icon: 'fa-shield-alt', label: '프라이버시 보호' },
        { id: 'trust', icon: 'fa-globe', label: '글로벌 신뢰' },
        { id: 'forecast', icon: 'fa-chart-line', label: '수요 예측' },
        { id: 'distribution', icon: 'fa-balance-scale', label: '가치 분배' },
        { id: 'security', icon: 'fa-lock', label: '보안 시스템' },
        { id: 'performance', icon: 'fa-trophy', label: '성과 대시보드' }
    ];

    return (
        <div>
            <div className="container">
                {/* 헤더 */}
                <div className="header">
                    <h1>FPGA 가속 자율 시장 시스템</h1>
                    <div className="header-meta">
                        <span><i className="fas fa-microchip"></i> FPGA 기반</span>
                        <span><i className="fas fa-cube"></i> OpenHash</span>
                        <span><i className="fas fa-shield-alt"></i> 프라이버시 보호</span>
                        <span><i className="fas fa-robot"></i> AI 자율 운영</span>
                        <span><i className="fas fa-flask"></i> 특허 출원용 프로토타입</span>
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
                <p>© 2025 FPGA 가속 자율 시장 시스템 (특허 출원용 데모)</p>
                <p>OpenHash 기반 프라이버시 보호형 전자상거래 플랫폼</p>
            </div>
        </div>
    );
}

// React 앱 마운트
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
