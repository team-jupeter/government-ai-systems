function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 시스템 정보 */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <i className="fas fa-building-columns"></i>
                            증권거래소
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            오픈해시 기반 초고속 거래 인프라로 공정하고 투명한 자본시장을 구축합니다.
                        </p>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-exchange-blue transition-colors cursor-pointer">
                                <i className="fab fa-github"></i>
                            </div>
                            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-exchange-blue transition-colors cursor-pointer">
                                <i className="fab fa-twitter"></i>
                            </div>
                        </div>
                    </div>

                    {/* 주요 기능 */}
                    <div>
                        <h4 className="font-bold mb-4">주요 기능</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <i className="fas fa-bolt w-4"></i> 매매체결시스템
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <i className="fas fa-water w-4"></i> 시장조성
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <i className="fas fa-video w-4"></i> 시장감시
                            </li>
                            <li className="hover:text-white transition-colors cursor-pointer">
                                <i className="fas fa-list-check w-4"></i> 상장관리
                            </li>
                        </ul>
                    </div>

                    {/* 기술 스펙 */}
                    <div>
                        <h4 className="font-bold mb-4">기술 스펙</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><i className="fas fa-microchip text-exchange-gold mr-2"></i>FPGA 가속</li>
                            <li><i className="fas fa-brain text-green-400 mr-2"></i>AI 시장감시</li>
                            <li><i className="fas fa-link text-blue-400 mr-2"></i>오픈해시 체인</li>
                            <li><i className="fas fa-coins text-yellow-400 mr-2"></i>디지털화폐 결제</li>
                        </ul>
                    </div>

                    {/* 연락처 */}
                    <div>
                        <h4 className="font-bold mb-4">문의</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope"></i>
                                exchange@openhash.gov
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-phone"></i>
                                1588-0000
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-map-marker-alt"></i>
                                서울 여의도
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
                    <p>© 2025 한국 증권거래소. OpenHash 기반 차세대 거래 시스템.</p>
                    <p className="mt-2">FPGA 0.015ms 체결 | AI 시장감시 | T+0 디지털화폐 결제</p>
                </div>
            </div>
        </footer>
    );
}

window.Footer = Footer;
