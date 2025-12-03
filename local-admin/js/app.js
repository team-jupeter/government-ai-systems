const App = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <DoCheongSection />
            <EupMyeonDongSection />
            <PolicyExecution />
            <AIConsultation />
            <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-500 text-sm">© 2025 오픈해시 기반 통합 자치 행정 시스템 - 제주특별자치도</p>
                    <p className="text-gray-600 text-xs mt-1">OpenHash Platform | Port 5014</p>
                </div>
            </footer>
        </div>
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
