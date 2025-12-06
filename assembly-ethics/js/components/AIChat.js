const AIChat = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">💬 AI 어시스턴트</h2>
        <div className="border rounded-lg h-96 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="bg-violet-100 p-3 rounded-lg mb-3">
                    <p className="text-sm">안녕하세요! 윤리특별위원회 OpenHash 시스템 어시스턴트입니다. 의원 윤리, 징계, 재산 공개 관련 문의를 도와드립니다. (비공개 정보 제외)</p>
                </div>
            </div>
            <div className="border-t p-4">
                <input type="text" placeholder="메시지를 입력하세요..." 
                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
        </div>
    </div>
);
