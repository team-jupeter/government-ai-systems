const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-red-500">
                <div className="text-3xl font-bold text-red-600">2,478</div>
                <div className="text-sm text-gray-600 mt-2">연간 국방 안건</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">234</div>
                <div className="text-sm text-gray-600 mt-2">무기 도입 승인</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">57조</div>
                <div className="text-sm text-gray-600 mt-2">국방 예산 (원)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">81%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[189,201,214,227,238,249,262,274,287,301,314,328].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-red-500 hover:bg-red-600 transition-colors" 
                         style={{height: `${(h/328)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
