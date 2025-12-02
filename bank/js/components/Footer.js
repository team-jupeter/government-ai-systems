const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* 회사 정보 */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <i className="fas fa-university text-2xl text-bank-gold"></i>
                            <h3 className="text-lg font-bold">AI 자율 은행</h3>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-4">
                            FPGA와 AI 기술을 결합한 차세대 완전 자율 은행 시스템
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-bank-blue transition-colors">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-bank-blue transition-colors">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-bank-blue transition-colors">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    {/* 서비스 */}
                    <div>
                        <h4 className="font-bold mb-4 text-bank-gold">은행 서비스</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">예금 서비스</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">대출 서비스</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">자산관리</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">신탁 서비스</a></li>
                        </ul>
                    </div>

                    {/* AI 기술 */}
                    <div>
                        <h4 className="font-bold mb-4 text-bank-gold">AI 기술</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">신용평가 AI</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">사기탐지 시스템</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FPGA 가속</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">실시간 분석</a></li>
                        </ul>
                    </div>

                    {/* 연락처 */}
                    <div>
                        <h4 className="font-bold mb-4 text-bank-gold">문의하기</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <i className="fas fa-phone text-bank-gold"></i>
                                <span>1588-0000</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope text-bank-gold"></i>
                                <span>info@aibank.gov.kr</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-map-marker-alt text-bank-gold"></i>
                                <span>서울특별시 중구 세종대로 110</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 하단 정보 */}
                <div className="border-t border-gray-700 pt-6 flex flex-wrap justify-between items-center gap-4">
                    <div className="text-sm text-gray-500">
                        © 2025 AI 자율 은행 시스템. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">이용약관</a>
                        <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                        <a href="#" className="hover:text-white transition-colors">금융소비자보호</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
