function Header() {
    return (
        <header className="bg-gov-blue text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">국가데이터처</h1>
                        <p className="text-sm opacity-90">National Data Registry</p>
                    </div>
                    <div className="text-right text-xs opacity-80">
                        <div>오픈해시 기반 통합 데이터 네트워크</div>
                        <div>특허출원: 2025.11.12</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
