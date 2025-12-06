const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">3,847</div>
                <div className="text-sm text-gray-600 mt-2">연간 조사 건수</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">300</div>
                <div className="text-sm text-gray-600 mt-2">의원 지원</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-red-500">
                <div className="text-3xl font-bold text-red-600">123</div>
                <div className="text-sm text-gray-600 mt-2">전문 연구원</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-amber-500">
                <div className="text-3xl font-bold text-amber-600">86%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[291,306,322,338,355,373,392,412,433,455,478,502].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-orange-500 hover:bg-orange-600 transition-colors" 
                         style={{height: `${(h/502)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
