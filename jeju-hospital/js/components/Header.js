const Header = ({ patientId, onNavigate }) => {
    const [time, setTime] = React.useState(new Date());
    React.useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900/95 border-b border-gray-700 z-40 backdrop-blur-sm">
            <div className="h-full px-6 flex items-center justify-between" style={{ marginLeft: '256px' }}>
                <div className="flex items-center space-x-4"><h1 className="text-xl font-bold"><span className="text-blue-400">제주</span> 통합 의료 AI</h1><span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full"><i className="fas fa-circle text-xs mr-1 animate-pulse"></i>시스템 정상</span></div>
                <div className="flex items-center space-x-6"><div className="text-sm text-gray-400"><i className="fas fa-clock mr-2"></i>{time.toLocaleString('ko-KR')}</div><div className="text-sm"><span className="text-gray-400 mr-2">환자 ID:</span><span className="font-mono text-blue-400">{patientId}</span></div></div>
            </div>
        </header>
    );
};
