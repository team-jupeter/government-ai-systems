const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-emerald-500">
                <div className="text-3xl font-bold text-emerald-600">12,384</div>
                <div className="text-sm text-gray-600 mt-2">연간 행정 건수</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">47.3M</div>
                <div className="text-sm text-gray-600 mt-2">의사록 보존</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">300</div>
                <div className="text-sm text-gray-600 mt-2">의원 지원</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[938,986,1036,1088,1142,1198,1256,1316,1378,1443,1510,1579].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-emerald-500 hover:bg-emerald-600 transition-colors" 
                         style={{height: `${(h/1579)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
