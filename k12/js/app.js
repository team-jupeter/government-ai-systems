// ============================================
// 7단계 개인-사회 통합 최적화 AI 교육 시스템
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
            case 'steps':
                return <SevenSteps />;
            case 'agents':
                return <AIAgents />;
            case 'personalized':
                return <PersonalizedLearning />;
            case 'social':
                return <SocialLearning />;
            case 'assessment':
                return <AdaptiveAssessment />;
            case 'analytics':
                return <LearningAnalytics />;
            case 'teacher':
                return <TeacherSupport />;
            case 'performance':
                return <PerformanceDashboard />;
            default:
                return <Overview />;
        }
    };

    const tabs = [
        { id: 'overview', icon: 'fa-home', label: '개요' },
        { id: 'steps', icon: 'fa-stairs', label: '7단계 프로세스' },
        { id: 'agents', icon: 'fa-robot', label: 'AI 에이전트' },
        { id: 'personalized', icon: 'fa-user-graduate', label: '개인화 학습' },
        { id: 'social', icon: 'fa-users', label: '사회적 학습' },
        { id: 'assessment', icon: 'fa-clipboard-check', label: '적응형 평가' },
        { id: 'analytics', icon: 'fa-chart-line', label: '학습 분석' },
        { id: 'teacher', icon: 'fa-chalkboard-teacher', label: '교사 지원' },
        { id: 'performance', icon: 'fa-trophy', label: '성과 대시보드' }
    ];

    return (
        <div>
            <div className="container">
                {/* 헤더 */}
                <div className="header">
                    <h1>7단계 개인-사회 통합 최적화 AI 교육 시스템</h1>
                    <div className="header-meta">
                        <span><i className="fas fa-graduation-cap"></i> K-12 전체 학년</span>
                        <span><i className="fas fa-brain"></i> AI 개인화 학습</span>
                        <span><i className="fas fa-users"></i> 사회적 학습</span>
                        <span><i className="fas fa-chart-line"></i> 학습 분석</span>
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
                <p>© 2025 7단계 개인-사회 통합 최적화 AI 교육 시스템 (특허 출원용 데모)</p>
                <p>OpenHash 기반 프라이버시 보호형 K-12 교육 플랫폼</p>
            </div>
        </div>
    );
}

// React 앱 마운트
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
