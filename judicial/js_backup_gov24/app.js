const App = () => (
    <div className="min-h-screen bg-gray-900">
        <Header />
        <CaseAnalysis />
        <PrivateVaultSimulation />
        <EvidenceVault />
        <GlobalComparison />
        <SupremeCourt500 />
        <AIConsultation />
        
        <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
            <div className="max-w-6xl mx-auto text-center">
                <div className="flex justify-center gap-4 mb-4 text-sm flex-wrap">
                    <span className="text-yellow-400"><i className="fas fa-balance-scale mr-1"></i>AI 승소율 예측</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-amber-400"><i className="fas fa-vault mr-1"></i>프라이빗 금고</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-cyan-400"><i className="fas fa-landmark mr-1"></i>국가데이터처</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-purple-400"><i className="fas fa-globe mr-1"></i>글로벌 판례 비교</span>
                </div>
                <p className="text-gray-500 text-sm">© 2025 AI 예방적 사법 시스템</p>
                <p className="text-gray-600 text-xs mt-1">OpenHash 5계층 + DeepSeek R1 + 1,800만 건 법률 데이터 + 국가데이터처 503만+ 노드</p>
            </div>
        </footer>
    </div>
);
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
