function Header() {
    return (
        <header className="bg-gov-blue text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-vault text-4xl"></i>
                        <div>
                            <h1 className="text-2xl font-bold">개인정보금고 (PDV)</h1>
                            <p className="text-sm text-blue-100">Private Data Vault System</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-blue-100">오픈해시 기반</div>
                        <div className="text-xs text-blue-200">특허출원: 오픈해시 기반 프라이빗 데이터 금고 시스템</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
