const AIChat = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">💬 AI 어시스턴트</h2>
        <div className="border rounded-lg h-96 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="bg-orange-100 p-3 rounded-lg mb-3">
                    <p className="text-sm">안녕하세요! 행정안전위원회 OpenHash 시스템 어시스턴트입니다. 재난 대응, 지방자치, 경찰행정 관련 문의를 도와드립니다.</p>
                </div>
            </div>
            <div className="border-t p-4">
                <input type="text" placeholder="메시지를 입력하세요..." 
                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
        </div>
    </div>
);
