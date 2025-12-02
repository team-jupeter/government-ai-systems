function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <i className="fas fa-chart-line text-sec-blue"></i>
                            오픈해시 자율 증권 시스템
                        </h3>
                        <p className="text-sm leading-relaxed mb-4">
                            OpenHash 블록체인 대안 기술과 DeepSeek R1 AI 엔진으로 구현한 차세대 증권 자동화 플랫폼
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-sec-blue rounded-full flex items-center justify-center transition-colors">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-sec-blue rounded-full flex items-center justify-center transition-colors">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">주요 기능</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-sec-gold transition-colors">AI 고객 상담</a></li>
                            <li><a href="#" className="hover:text-sec-gold transition-colors">스마트 트레이딩</a></li>
                            <li><a href="#" className="hover:text-sec-gold transition-colors">투자 분석</a></li>
                            <li><a href="#" className="hover:text-sec-gold transition-colors">리스크 관리</a></li>
                        </ul>
                    </div>

                    {/* Technology */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">핵심 기술</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <i className="fas fa-check-circle text-sec-green"></i>
                                OpenHash 분산원장
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-check-circle text-sec-green"></i>
                                DeepSeek R1 AI
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-check-circle text-sec-green"></i>
                                실시간 데이터 처리
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-check-circle text-sec-green"></i>
                                양자내성 암호화
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">시스템 정보</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-server text-sec-blue mt-1"></i>
                                <div>
                                    <div className="text-gray-400">서버</div>
                                    <div>100.30.14.224:5070</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-code text-sec-blue mt-1"></i>
                                <div>
                                    <div className="text-gray-400">버전</div>
                                    <div>v1.0.0 (2025-12-02)</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-shield-alt text-sec-blue mt-1"></i>
                                <div>
                                    <div className="text-gray-400">보안등급</div>
                                    <div>금융 1등급</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400">
                        © 2025 대한민국 정부 AI 자동화 시스템. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-sec-gold transition-colors">개인정보처리방침</a>
                        <a href="#" className="hover:text-sec-gold transition-colors">이용약관</a>
                        <a href="#" className="hover:text-sec-gold transition-colors">API 문서</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
