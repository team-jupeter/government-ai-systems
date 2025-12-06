const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">41,263</div>
                <div className="text-sm text-gray-600 mt-2">연간 항소 건수</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">13</div>
                <div className="text-sm text-gray-600 mt-2">OpenHash 노드</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-cyan-500">
                <div className="text-3xl font-bold text-cyan-600">6</div>
                <div className="text-sm text-gray-600 mt-2">고등법원</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-indigo-500">
                <div className="text-3xl font-bold text-indigo-600">91%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[3247,3358,3472,3591,3715,3845,3981,4123,4271,4426,4588,4757].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-blue-500 hover:bg-blue-600 transition-colors" 
                         style={{height: `${(h/4757)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
