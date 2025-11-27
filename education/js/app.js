const App = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <SevenStageProcess />
            <HumanUniqueTask />
            <CareerOptimization />
            <PrivacyProtection />
            <AIConsultation />
            <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-500 text-sm">© 2025 7단계 개인-사회 통합 최적화 AI 교육 시스템 (7S-ISIO)</p>
                    <p className="text-gray-600 text-xs mt-1">OpenHash Platform | HUTSI · PIAR · ISIO · RCM · HLPP · RBC</p>
                </div>
            </footer>
        </div>
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
