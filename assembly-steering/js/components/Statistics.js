const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">2,847</div>
                <div className="text-sm text-gray-600 mt-2">검증된 트랜잭션</div>
                <div className="text-xs text-gray-500 mt-1">전월 대비 +12%</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">487.3</div>
                <div className="text-sm text-gray-600 mt-2">TPS (초당 처리)</div>
                <div className="text-xs text-gray-500 mt-1">AWS 실측값</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">0.23초</div>
                <div className="text-sm text-gray-600 mt-2">평균 검증 시간</div>
                <div className="text-xs text-gray-500 mt-1">24개 노드</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600 mt-2">데이터 무결성</div>
                <div className="text-xs text-gray-500 mt-1">위변조 시도 0건</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 트랜잭션 처리량 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[187,203,219,234,247,261,278,289,301,318,327,342].map((count, i) => (
                    <div key={i} className="flex-1 mx-1 group relative">
                        <div 
                            className="bg-gradient-to-t from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 transition-all cursor-pointer rounded-t" 
                            style={{height: `${(count/342)*100}%`}}
                        ></div>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {count}건
                        </div>
                        <div className="text-center text-xs text-gray-600 mt-2">{i+1}월</div>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">트랜잭션 유형</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">의안 처리</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '43%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-blue-600">43%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">예산 심사</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '28%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-green-600">28%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">인사 동의</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{width: '18%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-purple-600">18%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">기타</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-orange-600 h-2 rounded-full" style={{width: '11%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-orange-600">11%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">에너지 효율 비교</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">Bitcoin</span>
                            <span className="text-sm font-bold text-red-600">100%</span>
                        </div>
                        <div className="w-full bg-red-200 rounded-full h-3">
                            <div className="bg-red-600 h-3 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">~150 TWh/year</div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">Ethereum (PoS)</span>
                            <span className="text-sm font-bold text-yellow-600">2.3%</span>
                        </div>
                        <div className="w-full bg-yellow-200 rounded-full h-3">
                            <div className="bg-yellow-600 h-3 rounded-full" style={{width: '2.3%'}}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">~3.4 TWh/year</div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-bold">OpenHash</span>
                            <span className="text-sm font-bold text-green-600">0.3%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-3">
                            <div className="bg-green-600 h-3 rounded-full" style={{width: '0.3%'}}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">~0.45 TWh/year</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
