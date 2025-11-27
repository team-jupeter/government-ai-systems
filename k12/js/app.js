const App = () => (
    <div className="min-h-screen bg-gray-900">
        <Header />
        <FutureIndustry />
        <AITeachers />
        <StudentAnalysis />
        <BalanceMechanism />
        <CareerRecommend />
        <EducationExplainer />
        <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-gray-500 text-sm">© 2025 K-12 AI 교육 시스템</p>
                <p className="text-gray-600 text-xs mt-1">7단계 개인-사회 통합 최적화 | 1,200만 학습자 개별 지도</p>
            </div>
        </footer>
    </div>
);
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
