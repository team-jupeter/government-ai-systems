const EvidenceVault = () => {
    const evidence = [
        { type: '문서', name: '계약서.pdf', date: '2024-11-01', status: '검증완료' },
        { type: '영상', name: 'CCTV_20241101.mp4', date: '2024-11-01', status: '검증완료' },
        { type: '음성', name: '통화녹음.mp3', date: '2024-11-02', status: '검증중' }
    ];

    return (
        <div className="py-16 px-4" style={{backgroundColor: '#f8f9fa'}}>
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4" style={{color: '#212529'}}>
                        <i className="fas fa-lock mr-3" style={{color: '#0046FF'}}></i>
                        증거 금고
                    </h2>
                    <p className="text-lg" style={{color: '#6b7280'}}>OpenHash로 위변조 불가능한 증거 보관</p>
                </div>

                <div className="rounded-xl p-6 shadow-md" style={{backgroundColor: 'white', border: '1px solid #e5e7eb'}}>
                    <div className="space-y-4">
                        {evidence.map((e, i) => (
                            <div key={i} className="flex justify-between items-center p-4 rounded-lg" style={{backgroundColor: '#f9fafb', border: '1px solid #e5e7eb'}}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#eff6ff'}}>
                                        <i className={`fas ${
                                            e.type === '문서' ? 'fa-file-pdf' :
                                            e.type === '영상' ? 'fa-video' : 'fa-microphone'
                                        } text-xl`} style={{color: '#0046FF'}}></i>
                                    </div>
                                    <div>
                                        <div className="font-bold" style={{color: '#212529'}}>{e.name}</div>
                                        <div className="text-sm" style={{color: '#6b7280'}}>등록일: {e.date}</div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium`} style={{
                                    backgroundColor: e.status === '검증완료' ? '#d1fae5' : '#fef3c7',
                                    color: e.status === '검증완료' ? '#065f46' : '#92400e'
                                }}>
                                    {e.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 rounded-xl p-6" style={{backgroundColor: '#eff6ff', border: '1px solid #bfdbfe'}}>
                    <div className="flex items-start gap-4">
                        <i className="fas fa-info-circle text-3xl" style={{color: '#0046FF'}}></i>
                        <div>
                            <h4 className="text-lg font-bold mb-2" style={{color: '#212529'}}>OpenHash 무결성 보장</h4>
                            <p style={{color: '#374151'}}>모든 증거는 OpenHash 분산원장에 해시값이 기록되어 위변조가 불가능합니다. 법정에서 증거 능력을 100% 보장받을 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
