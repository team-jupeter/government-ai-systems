const EupMyeonDongSection = () => {
    const [centers, setCenters] = React.useState(null);
    const [services, setServices] = React.useState(null);
    const [selectedCenter, setSelectedCenter] = React.useState('연동');
    const [selectedService, setSelectedService] = React.useState('증명서발급');
    const [selectedItem, setSelectedItem] = React.useState('주민등록등본');
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        fetch('/api/local-admin/eupmyeondong/list').then(r => r.json()).then(setCenters);
        fetch('/api/local-admin/eupmyeondong/services').then(r => r.json()).then(setServices);
    }, []);
    const processRequest = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/local-admin/eupmyeondong/process', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ center: selectedCenter, service_type: selectedService, item: selectedItem, citizen_pdv_id: 'PDV_' + Date.now() }) });
            setResult(await response.json());
        } catch (e) { setResult({ error: e.message }); }
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full mb-4 inline-block">읍면동 Level</span><h2 className="text-3xl font-bold mb-4"><i className="fas fa-home mr-3 text-green-400"></i>읍면동 주민센터 AI</h2><p className="text-gray-400">43개 주민센터 · PDV 자동 연동 · Currency 수수료 자동 결제</p></div>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="bg-gray-900 rounded-xl p-5 border border-gray-700"><h3 className="font-bold mb-3 text-green-400"><i className="fas fa-map-marker-alt mr-2"></i>주민센터</h3><div className="space-y-2 max-h-48 overflow-y-auto">{centers && Object.entries(centers.regions).map(([region, list]) => (<div key={region}><div className="text-xs text-gray-500 mb-1">{region.replace('_', ' ')}</div><div className="flex flex-wrap gap-1">{list.slice(0, 6).map(c => (<button key={c} onClick={() => setSelectedCenter(c)} className={`text-xs px-2 py-1 rounded ${selectedCenter === c ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}>{c}</button>))}</div></div>))}</div></div>
                    <div className="bg-gray-900 rounded-xl p-5 border border-gray-700"><h3 className="font-bold mb-3 text-yellow-400"><i className="fas fa-tasks mr-2"></i>민원 서비스</h3><div className="space-y-2 mb-3">{services && Object.keys(services.services).map(svc => (<button key={svc} onClick={() => { setSelectedService(svc); setSelectedItem(services.services[svc].items[0]); }} className={`w-full text-left p-2 rounded text-sm ${selectedService === svc ? 'bg-yellow-600' : 'bg-gray-800 hover:bg-gray-700'}`}>{svc}</button>))}</div>{services && selectedService && (<select value={selectedItem} onChange={e => setSelectedItem(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-2 text-sm">{services.services[selectedService]?.items.map(item => (<option key={item} value={item}>{item}</option>))}</select>)}</div>
                    <div className="bg-gray-900 rounded-xl p-5 border border-gray-700"><h3 className="font-bold mb-3 text-blue-400"><i className="fas fa-robot mr-2"></i>AI 처리</h3><div className="p-3 bg-gray-800 rounded mb-3 text-sm"><div className="font-bold">{selectedCenter} 주민센터</div><div className="text-gray-400">{selectedService} → {selectedItem}</div></div><button onClick={processRequest} disabled={loading} className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-medium mb-3">{loading ? '처리 중...' : '민원 신청'}</button>{result && !result.error && (<div className="space-y-2"><div className="p-3 bg-green-900/30 rounded border border-green-500 text-center"><span className="text-green-400 font-bold">✅ {result.result?.status}</span></div><div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-gray-800 p-2 rounded text-center"><div className="text-gray-500">처리시간</div><div className="font-bold text-green-400">{result.processing?.processing_time_seconds}초</div></div><div className="bg-gray-800 p-2 rounded text-center"><div className="text-gray-500">수수료</div><div className="font-bold text-yellow-400">{result.currency_integration?.fee_amount > 0 ? result.currency_integration.fee_amount + '원' : '무료'}</div></div></div></div>)}</div>
                </div>
            </div>
        </section>
    );
};
