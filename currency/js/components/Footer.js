// 푸터 컴포넌트
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">시스템 정보</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>특허명: FPGA 및 AI 기반 초고속·저전력 통합 디지털 화폐 시스템</li>
                            <li>청구항: 35개</li>
                            <li>핵심 기술: FPGA 하드웨어 가속, AI 앙상블 검증</li>
                            <li>성능: 기존 시스템 대비 3,333배 향상</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">주요 기능</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>• 실시간 재무제표 자동 생성</li>
                            <li>• 세무 완전 자동화</li>
                            <li>• 크로스체인 자산 이동</li>
                            <li>• 통합 금융 서비스 (은행+보험+증권)</li>
                            <li>• 글로벌 규제 자동 준수</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">성능 지표</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>• 처리 속도: 0.015ms (초고속)</li>
                            <li>• AI 검증 정확도: 99.4%</li>
                            <li>• 전력 절감: GPU 대비 88.6%</li>
                            <li>• 처리량: 100,000 TPS</li>
                            <li>• 가용성: 99.99%</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                    <p>© 2025 대한민국 정부. FPGA 및 AI 기반 통합 디지털 화폐 시스템. All rights reserved.</p>
                    <p className="mt-2">본 시스템은 2025년 9월 AWS 클라우드 실증실험을 통해 성능이 입증되었습니다.</p>
                </div>
            </div>
        </footer>
    );
};

window.Footer = Footer;
