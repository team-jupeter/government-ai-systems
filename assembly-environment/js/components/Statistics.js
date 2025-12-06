const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-emerald-500">
                <div className="text-3xl font-bold text-emerald-600">3,184</div>
                <div className="text-sm text-gray-600 mt-2">연간 환경 안건</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">2.4M</div>
                <div className="text-sm text-gray-600 mt-2">탄소 배출(톤)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">4,283</div>
                <div className="text-sm text-gray-600 mt-2">산업재해 추적</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">79%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[238,251,264,278,292,306,321,336,351,367,383,399].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-emerald-500 hover:bg-emerald-600 transition-colors" 
                         style={{height: `${(h/399)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
