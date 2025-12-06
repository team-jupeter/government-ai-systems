const Statistics = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold">📊 OpenHash 성능 통계</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500">
                <div className="text-3xl font-bold text-purple-600">2,134</div>
                <div className="text-sm text-gray-600 mt-2">연간 교육 법안</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-green-500">
                <div className="text-3xl font-bold text-green-600">9.2M</div>
                <div className="text-sm text-gray-600 mt-2">보호된 학생 데이터</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-blue-500">
                <div className="text-3xl font-bold text-blue-600">89</div>
                <div className="text-sm text-gray-600 mt-2">교과서 검정</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-5 border-t-4 border-orange-500">
                <div className="text-3xl font-bold text-orange-600">82%</div>
                <div className="text-sm text-gray-600 mt-2">처리 시간 단축</div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-4">월별 처리 현황 (2024)</h3>
            <div className="h-64 flex items-end justify-around border-b border-gray-300">
                {[167,179,184,192,201,209,217,224,232,241,248,256].map((h,i) => (
                    <div key={i} className="flex-1 mx-1 bg-purple-500 hover:bg-purple-600 transition-colors" 
                         style={{height: `${(h/256)*100}%`}} title={`${i+1}월`}></div>
                ))}
            </div>
        </div>
    </div>
);
