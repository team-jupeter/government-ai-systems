const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-pink-500">
                <div className="text-3xl font-bold text-pink-600">3,927</div>
                <div className="text-sm text-gray-600 mt-2">연간 보건 안건</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">51.8M</div>
                <div className="text-sm text-gray-600 mt-2">의료 데이터 보호</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">421</div>
                <div className="text-sm text-gray-600 mt-2">의료 정책 의결</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">84%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[294,308,323,339,355,371,388,405,422,440,458,476].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-pink-500 hover:bg-pink-600 transition-colors" 
                         style={{height: `${(h/476)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
