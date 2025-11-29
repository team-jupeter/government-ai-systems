const App = () => {
    const [currentMenu, setCurrentMenu] = React.useState('dashboard');

    const handleMenuChange = (menuId) => {
        setCurrentMenu(menuId);
    };

    const renderContent = () => {
        switch(currentMenu) {
            case 'dashboard':
                return React.createElement(Dashboard);
            case 'realtime':
                return React.createElement(RealtimeTax);
            case 'financial':
                return React.createElement(FinancialStatements);
            case 'adjustment':
                return React.createElement(TaxAdjustment);
            case 'ledger':
                return React.createElement(TransactionLedger);
            case 'taxlaw':
                return React.createElement(TaxLawDB);
            case 'layer':
                return React.createElement(LayerHierarchy);
            case 'ai':
                return React.createElement(AITaxAgent);
            case 'taxpayer':
                return React.createElement(TaxpayerProfile);
            case 'verify':
                return React.createElement(OpenHashVerify);
            case 'nts':
                return React.createElement(NTSFinancials);
            default:
                return React.createElement(Dashboard);
        }
    };

    return React.createElement('div', { className: 'min-h-screen bg-gray-900 text-white' },
        React.createElement(Header, { 
            currentMenu: currentMenu, 
            onMenuChange: handleMenuChange 
        }),
        React.createElement('main', null, renderContent()),
        React.createElement(FloatingAssistant, { 
            onOpenChat: () => setCurrentMenu('ai') 
        })
    );
};

// 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
