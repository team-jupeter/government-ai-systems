function Footer() {
    return (
        <footer className="bg-gov-text text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    <div>
                        <h4 className="font-bold text-lg mb-3">국가데이터처</h4>
                        <p className="text-sm text-gray-300">
                            오픈해시 기반 통합 데이터 네트워크
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3">핵심 성과</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>• TPS: 4,238,450 (약 424만)</li>
                            <li>• 부처 연계: 450억원 → 0원</li>
                            <li>• 에너지 절감: 98.5%</li>
                            <li>• 노드: 503만+</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3">구성</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Layer 0: 국가데이터처 3개</li>
                            <li>• Layer 1: 503만+ 노드</li>
                            <li>• Layer 2: 32개 광역/통신</li>
                            <li>• Layer 3: 10개 Core</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
                    <p>© 2025 국가데이터처 통합 데이터 네트워크. 특허출원 2025.11.12</p>
                </div>
            </div>
        </footer>
    );
}
