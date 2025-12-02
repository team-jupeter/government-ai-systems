const Footer = () => {
    return (
        <footer className="bg-gov-blue text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-link text-3xl"></i>
                        </div>
                        <h4 className="text-2xl font-bold mb-2">오픈해시 (OpenHash)</h4>
                        <p className="text-sm opacity-90">차세대 분산 신뢰 기술</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
                        <div className="bg-white bg-opacity-10 rounded p-4">
                            <div className="text-sm opacity-75 mb-1">에너지 효율</div>
                            <div className="font-bold">98.5% 절감</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded p-4">
                            <div className="text-sm opacity-75 mb-1">처리 성능</div>
                            <div className="font-bold">424만+ TPS</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded p-4">
                            <div className="text-sm opacity-75 mb-1">확장성</div>
                            <div className="font-bold">선형 증가</div>
                        </div>
                    </div>

                    <div className="border-t border-white border-opacity-20 pt-6">
                        <p className="text-sm opacity-75">
                            © 2025 국가 자동화 플랫폼. All rights reserved.
                        </p>
                        <p className="text-xs opacity-60 mt-2">
                            확률적 계층 선택 기반 데이터 무결성 검증 시스템
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
