const VitalMonitor = ({ patientId }) => {
    return (<div className="p-6"><h1 className="text-2xl font-bold mb-4"><i className="fas fa-heartbeat text-red-400 mr-3"></i>생체 모니터</h1><div className="bg-gray-800 rounded-xl border border-gray-700 p-8 text-center"><i className="fas fa-heartbeat text-6xl text-red-400 mb-4 animate-pulse"></i><p className="text-gray-400">실시간 바이탈 모니터링</p></div></div>);
};
