const App = () => (
    <div className="min-h-screen bg-gray-900">
        <Header />
        <MedicalInstitutions />
        <AIDiagnosis />
        <AppointmentBooking />
        <PrivateVault />
        <AIConsultation />
        <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
            <div className="max-w-6xl mx-auto text-center">
                <div className="flex justify-center gap-4 mb-4 text-sm"><span className="text-blue-400"><i className="fas fa-hospital mr-1"></i>제주대학교병원</span><span className="text-gray-500">|</span><span className="text-green-400"><i className="fas fa-clinic-medical mr-1"></i>보건소 네트워크</span><span className="text-gray-500">|</span><span className="text-amber-400"><i className="fas fa-shield-alt mr-1"></i>프라이빗 금고</span></div>
                <p className="text-gray-500 text-sm">© 2025 제주 권역 의료 AI 협진 시스템</p>
                <p className="text-gray-600 text-xs mt-1">OpenHash + 5차원 건강 분석 + Private Data Vault</p>
            </div>
        </footer>
    </div>
);
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
