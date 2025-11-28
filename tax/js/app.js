const App = () => {
    const [currentMenu, setCurrentMenu] = React.useState('dashboard');

    const renderContent = () => {
        switch(currentMenu) {
            case 'dashboard': return <Dashboard />;
            case 'realtime': return <RealtimeTax />;
            case 'financial': return <FinancialStatements />;
            case 'transactions': return <TransactionLedger />;
            case 'taxlaw': return <TaxLawDB />;
            case 'layers': return <LayerHierarchy />;
            case 'ai-agent': return <AITaxAgent />;
            case 'taxpayer': return <TaxpayerProfile />;
            case 'openhash': return <OpenHashVerify />;
            case 'nts-finance': return <NTSFinancials />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Header currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
            <main>
                {renderContent()}
            </main>
            
            {/* 하단 OpenHash 정보 */}
            <footer className="bg-gray-800 border-t border-gray-700 py-6 mt-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                <i className="fas fa-link text-cyan-400"></i>
                            </div>
                            <div>
                                <div className="text-white font-bold">OpenHash 국세 행정 자동화 시스템</div>
                                <div className="text-xs text-gray-400">
                                    374.76 TPS | 99.2% AI 탈세 탐지 | 4계층 분산 네트워크
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <a href="/openhash-system" className="hover:text-cyan-400 transition">
                                <i className="fas fa-info-circle mr-1"></i>OpenHash 기술
                            </a>
                            <a href="/private-data-vault" className="hover:text-cyan-400 transition">
                                <i className="fas fa-shield-alt mr-1"></i>프라이빗 금고
                            </a>
                            <a href="/" className="hover:text-cyan-400 transition">
                                <i className="fas fa-home mr-1"></i>포털
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
