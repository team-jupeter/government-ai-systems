const App = () => {
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [patientId] = React.useState('PT-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(Math.random()*90000+10000));
    const [showIntroModal, setShowIntroModal] = React.useState(false);
    
    React.useEffect(() => { 
        if (!localStorage.getItem('jeju-hospital-intro-dismissed')) setShowIntroModal(true); 
    }, []);
    
    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard': return <Dashboard patientId={patientId} onNavigate={setCurrentPage} />;
            case 'medical-status': return <MedicalStatus />;
            case 'smartwatch': return <SmartWatchMonitor />;
            case 'ai-doctor': return <AIDoctorChat patientId={patientId} />;
            case 'ai-nurse': return <AINurseChat patientId={patientId} />;
            case 'vital': return <VitalMonitor patientId={patientId} />;
            case 'pdv': return <PDVManager patientId={patientId} />;
            case 'appointment': return <Appointment patientId={patientId} />;
            case 'hospitals': return <HospitalInfo />;
            default: return <Dashboard patientId={patientId} onNavigate={setCurrentPage} />;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-900">
            {showIntroModal && <IntroModal onClose={() => setShowIntroModal(false)} onDontShowAgain={() => { localStorage.setItem('jeju-hospital-intro-dismissed', 'true'); setShowIntroModal(false); }} />}
            <Header patientId={patientId} onNavigate={setCurrentPage} />
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="pt-16 min-h-screen" style={{ marginLeft: '256px' }}>
                <div className="p-6">{renderPage()}</div>
            </main>
        </div>
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
