function Footer() {
    return (
        <footer className="bg-gov-text text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    <div>
                        <h4 className="font-bold text-lg mb-3">개인정보금고 (PDV)</h4>
                        <p className="text-sm text-gray-300">
                            오픈해시 기반 프라이빗 데이터 금고 시스템
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3">주요 특징</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>• 개인정보 주권 보장</li>
                            <li>• 해시 전용 저장 (32 bytes)</li>
                            <li>• 교차 검증 자동화</li>
                            <li>• 법적 증명력 확보</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3">성능</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>• TPS: 25,907+</li>
                            <li>• 에너지 절감: 98.5%</li>
                            <li>• 정확도: 98.9%</li>
                            <li>• 확인 시간: 0.05초</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
                    <p>© 2025 오픈해시 기반 프라이빗 데이터 금고 시스템. 특허출원.</p>
                    <p className="mt-2">AWS 실증 실험 완료 (2025.11.18)</p>
                </div>
            </div>
        </footer>
    );
}
