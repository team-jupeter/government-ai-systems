const { useState, useEffect } = React;

const App = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bank-blue mb-4"></div>
                    <p className="text-gray-600 font-medium">오픈해시 은행 시스템 로딩 중...</p>
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return <Overview />;
            case 'financial':
                return <FinancialStatement />;
            case 'deposit':
                return <DepositService />;
            case 'loan':
                return <LoanService />;
            case 'credit':
                return <CreditRating />;
            case 'asset':
                return <AssetManagement />;
            case 'payment':
                return <PaymentTransfer />;
            case 'fraud':
                return <FraudDetection />;
            case 'trust':
                return <TrustService />;
            case 'performance':
                return <PerformanceDashboard />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-fadeIn">
                    {renderContent()}
                </div>
            </main>

            <Footer />
            
            {/* AI 상담 Floating Button */}
            <AIConsultation />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
