const Hero = () => {
    return (
        <section className="bg-gov-blue text-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <div className="inline-block mb-4 px-4 py-1 bg-white bg-opacity-20 rounded-full">
                        <span className="text-sm font-medium">국가 자동화 플랫폼 핵심 기술</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        오픈해시(OpenHash)
                    </h2>
                    
                    <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                        블록체인을 대체하는 차세대 분산 신뢰 기술<br />
                        확률적 계층 선택 기반 데이터 무결성 검증 시스템
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                        <div className="bg-white bg-opacity-10 rounded-lg p-6">
                            <div className="text-3xl font-bold mb-2">98.5%</div>
                            <div className="text-sm opacity-90">에너지 효율 개선</div>
                            <div className="text-xs opacity-75 mt-2">비트코인 대비</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-lg p-6">
                            <div className="text-3xl font-bold mb-2">424만+</div>
                            <div className="text-sm opacity-90">초당 트랜잭션 처리</div>
                            <div className="text-xs opacity-75 mt-2">TPS 성능</div>
                        </div>
                        <div className="bg-white bg-opacity-10 rounded-lg p-6">
                            <div className="text-3xl font-bold mb-2">선형 확장</div>
                            <div className="text-sm opacity-90">노드 증가 대비</div>
                            <div className="text-xs opacity-75 mt-2">처리량 비례 증가</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
