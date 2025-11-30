const App = () => (
    <div className="min-h-screen bg-gray-900">
        <Header />
        <OrganizationChart />
        <AgentPanel />
        <CollaborationHub />
        <OpenHashMonitor />
        <AIConsultation />
        <FloatingHelper />
        <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
            <div className="max-w-6xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full flex items-center justify-center">
                        <i className="fas fa-landmark text-lg"></i>
                    </div>
                    <span className="text-xl font-bold">대통령실 AI 자동화 시스템</span>
                </div>
                <p className="text-gray-500 text-sm">
                    대한민국 대통령실 | OpenHash 무결성 검증 | Claude AI 기반
                </p>
                <p className="text-gray-600 text-xs mt-2">
                    30개 AI 에이전트 | 18개 정부부처 연동 | SHA3-256 암호화
                </p>
                <div className="flex justify-center space-x-6 mt-4 text-gray-500 text-sm">
                    <span><i className="fas fa-shield-alt mr-1 text-green-500"></i>보안 적용</span>
                    <span><i className="fas fa-link mr-1 text-purple-500"></i>OpenHash</span>
                    <span><i className="fas fa-robot mr-1 text-blue-500"></i>AI 자동화</span>
                    <span><i className="fas fa-network-wired mr-1 text-cyan-500"></i>부처 연동</span>
                </div>
            </div>
        </footer>
    </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
