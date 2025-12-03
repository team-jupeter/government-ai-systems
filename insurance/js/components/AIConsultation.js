const AIConsultation = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all z-50"
            >
                <i className="fas fa-comment-dots text-2xl"></i>
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-96 z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-900">AI 보험 상담</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        PDV 데이터 기반으로 맞춤형 보험 상품을 추천해드립니다.
                    </p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        상담 시작하기
                    </button>
                </div>
            )}
        </>
    );
};
