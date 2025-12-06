const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-violet-500">
                <div className="text-3xl font-bold text-violet-600">127</div>
                <div className="text-sm text-gray-600 mt-2">연간 윤리 안건</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">300</div>
                <div className="text-sm text-gray-600 mt-2">의원 윤리 추적</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600 mt-2">위원 노드</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">83%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[9,10,11,12,13,14,15,16,17,18,19,20].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-violet-500 hover:bg-violet-600 transition-colors" 
                         style={{height: `${(h/20)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
