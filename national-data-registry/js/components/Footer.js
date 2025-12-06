function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-6">
                    <div>
                        <h3 className="text-white font-semibold mb-3">국가데이터처</h3>
                        <p className="text-sm">통계의 기준설정과 인구조사, 통계·데이터의 총괄·조정 업무 담당</p>
                        <p className="text-sm mt-2">국무총리 직속 차관급 중앙행정기관</p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-3">주요 서비스</h3>
                        <ul className="text-sm space-y-1">
                            <li>• 국가통계포털 (KOSIS)</li>
                            <li>• 통계지리정보서비스 (SGIS)</li>
                            <li>• 마이크로데이터 통합서비스</li>
                            <li>• 통계데이터센터</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-3">관련 링크</h3>
                        <ul className="text-sm space-y-1">
                            <li><a href="http://100.30.14.224/" className="hover:text-white">국가 포털</a></li>
                            <li><a href="http://100.30.14.224/openhash.html" className="hover:text-white">OpenHash 기술</a></li>
                            <li><a href="https://mods.go.kr" className="hover:text-white">국가데이터처 공식사이트</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-4 text-sm text-center">
                    <p>© 2025 국가데이터처 AI 자동화 시스템 (OpenHash 기술 실증)</p>
                </div>
            </div>
        </footer>
    );
}
