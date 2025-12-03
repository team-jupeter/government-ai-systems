const App = () => {
    const [activeTab, setActiveTab] = React.useState('overview');

    const renderContent = () => {
        switch(activeTab) {
            case 'overview': return <Overview />;
            case 'pdv': return <PDVSystem />;
            case 'financial': return <FinancialStatement />;
            case 'behavioral': return <BehavioralPremium />;
            case 'products': return <InsuranceProducts />;
            case 'underwriting': return <Underwriting />;
            case 'claim': return <ClaimProcessing />;
            case 'fraud': return <FraudDetection />;
            case 'performance': return <PerformanceDashboard />;
            default: return <Overview />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
                {renderContent()}
            </main>
            <Footer />
            <AIConsultation />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
