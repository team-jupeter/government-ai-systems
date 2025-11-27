const App = () => (
    <div className="min-h-screen bg-gray-900">
        <Header />
        <LayerVisualization />
        <DataLinkage />
        <StatisticsLifecycle />
        <DataSovereignty />
        <AIConsultation />
        <ExplainerPage />
        <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-gray-500 text-sm">© 2025 국가데이터처 통합 데이터 네트워크</p>
                <p className="text-gray-600 text-xs mt-1">OpenHash 5계층 + AI 멀티에이전트 + CRYSTALS-Dilithium</p>
            </div>
        </footer>
    </div>
);
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
