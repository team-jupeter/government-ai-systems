const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-amber-500">
                <div className="text-3xl font-bold text-amber-600">5,142</div>
                <div className="text-sm text-gray-600 mt-2">연간 분석 건수</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">677조</div>
                <div className="text-sm text-gray-600 mt-2">예산 분석(원)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">147</div>
                <div className="text-sm text-gray-600 mt-2">전문 인력</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-yellow-500">
                <div className="text-3xl font-bold text-yellow-600">91%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[389,409,430,452,475,499,524,551,579,608,639,671].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-amber-500 hover:bg-amber-600 transition-colors" 
                         style={{height: `${(h/671)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
