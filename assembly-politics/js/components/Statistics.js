const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-gray-600 mt-2">연간 법안 심사</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">487</div>
                <div className="text-sm text-gray-600 mt-2">금융감독 조치</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">234</div>
                <div className="text-sm text-gray-600 mt-2">공정거래 제재</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">81%</div>
                <div className="text-sm text-gray-600 mt-2">AI 자동화율</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[52,58,61,67,71,74,79,83,87,92,89,95].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-blue-500 hover:bg-blue-600 transition-colors" 
                         style={{height: `${h}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
