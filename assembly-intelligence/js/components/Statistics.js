const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-indigo-500">
                <div className="text-3xl font-bold text-indigo-600">1,247</div>
                <div className="text-sm text-gray-600 mt-2">연간 정보 안건</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">7.2조</div>
                <div className="text-sm text-gray-600 mt-2">국정원 예산(원)</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">147</div>
                <div className="text-sm text-gray-600 mt-2">보안 정책 의결</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">86%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[92,97,102,107,113,119,125,131,138,145,152,159].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-indigo-500 hover:bg-indigo-600 transition-colors" 
                         style={{height: `${(h/159)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
