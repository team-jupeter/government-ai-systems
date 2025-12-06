const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-amber-500">
                <div className="text-3xl font-bold text-amber-600">8,927</div>
                <div className="text-sm text-gray-600 mt-2">연간 예산 안건</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">677조</div>
                <div className="text-sm text-gray-600 mt-2">국가 예산(원)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">51</div>
                <div className="text-sm text-gray-600 mt-2">위원 노드</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">88%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[678,712,747,783,821,859,898,939,981,1024,1069,1115].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-amber-500 hover:bg-amber-600 transition-colors" 
                         style={{height: `${(h/1115)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
