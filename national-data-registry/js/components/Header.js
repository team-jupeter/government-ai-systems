function Header() {
    return (
        <header className="bg-gov-blue text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-chart-line text-3xl"></i>
                        <div>
                            <h1 className="text-2xl font-bold">국가데이터처</h1>
                            <p className="text-sm text-blue-100">Ministry of Data and Statistics</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                        <a href="http://100.30.14.224/" className="hover:text-blue-200 transition">
                            <i className="fas fa-home mr-1"></i>국가 포털
                        </a>
                        <a href="http://100.30.14.224/openhash.html" className="hover:text-blue-200 transition">
                            <i className="fas fa-info-circle mr-1"></i>OpenHash
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
