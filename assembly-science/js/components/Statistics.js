const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-cyan-500">
                <div className="text-3xl font-bold text-cyan-600">3,289</div>
                <div className="text-sm text-gray-600 mt-2">연간 법안 심사</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">4,723</div>
                <div className="text-sm text-gray-600 mt-2">R&D 과제 추적</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">234</div>
                <div className="text-sm text-gray-600 mt-2">통신 정책 의결</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">84%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[247,262,278,291,304,318,332,347,361,378,392,407].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-cyan-500 hover:bg-cyan-600 transition-colors" 
                         style={{height: `${(h/407)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
