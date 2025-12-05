const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">1,847</div>
                <div className="text-sm text-gray-600 mt-2">연간 법안 심사</div>
                <div className="text-xs text-gray-500 mt-1">통과율 87.3%</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">3,241</div>
                <div className="text-sm text-gray-600 mt-2">체계자구 수정</div>
                <div className="text-xs text-gray-500 mt-1">전월 대비 +8%</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-red-500">
                <div className="text-3xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-600 mt-2">위헌 요소 차단</div>
                <div className="text-xs text-gray-500 mt-1">AI 탐지</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">23일→6일</div>
                <div className="text-sm text-gray-600 mt-2">평균 심사 기간</div>
                <div className="text-xs text-gray-500 mt-1">73% 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 법안 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[143,157,162,171,178,189,197,204,213,221,228,239].map((count, i) => (
                    <div key={i} className="flex-1 mx-1 group relative">
                        <div 
                            className="bg-gradient-to-t from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500 transition-all cursor-pointer rounded-t" 
                            style={{height: `${(count/239)*100}%`}}
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
                <h3 className="font-bold text-lg mb-4">심사 결과</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">원안 가결</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{width: '67%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-green-600">67%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">수정 가결</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{width: '20%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-blue-600">20%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">계류 중</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-600 h-2 rounded-full" style={{width: '10%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-yellow-600">10%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">부결/폐기</span>
                        <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div className="bg-red-600 h-2 rounded-full" style={{width: '3%'}}></div>
                            </div>
                            <span className="text-sm font-bold text-red-600">3%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">AI 효율성 지표</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">AI 1차 검토율</span>
                            <span className="text-sm font-bold text-purple-600">89%</span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-3">
                            <div className="bg-purple-600 h-3 rounded-full" style={{width: '89%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">AI 권고 수용률</span>
                            <span className="text-sm font-bold text-green-600">78%</span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-3">
                            <div className="bg-green-600 h-3 rounded-full" style={{width: '78%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">처리 시간 단축</span>
                            <span className="text-sm font-bold text-blue-600">73%</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{width: '73%'}}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm">비용 절감</span>
                            <span className="text-sm font-bold text-orange-600">64%</span>
                        </div>
                        <div className="w-full bg-orange-200 rounded-full h-3">
                            <div className="bg-orange-600 h-3 rounded-full" style={{width: '64%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
