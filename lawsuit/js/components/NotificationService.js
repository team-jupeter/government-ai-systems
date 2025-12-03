const NotificationService = () => {
    const [settings, setSettings] = React.useState({
        sms: true,
        email: true,
        kakao: false,
        push: true
    });
    const [notifications, setNotifications] = React.useState({
        documentSubmit: true,
        documentReceive: true,
        trialDate: true,
        deadline: true,
        verdict: true,
        payment: true
    });
    const [caseNotifications, setCaseNotifications] = React.useState([
        { caseNumber: '2025가합12345', caseName: '손해배상(기)', sms: true, email: true },
        { caseNumber: '2025나56789', caseName: '임대차보증금', sms: true, email: false }
    ]);

    const handleSettingChange = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleNotificationChange = (key) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    return (
        <div className="p-6">
            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-xl font-bold mb-6">
                        <i className="fas fa-bell mr-2 text-blue-600"></i>알림서비스 설정
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-bold mb-4">알림 수신 방법</h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'sms', icon: 'fa-sms', label: 'SMS 문자메시지', desc: '휴대폰으로 알림 수신' },
                                    { key: 'email', icon: 'fa-envelope', label: '이메일', desc: '등록된 이메일로 알림 수신' },
                                    { key: 'kakao', icon: 'fa-comment', label: '카카오톡', desc: '카카오 알림톡 수신' },
                                    { key: 'push', icon: 'fa-mobile-alt', label: '앱 푸시', desc: '전자소송 앱 푸시 알림' }
                                ].map(item => (
                                    <div 
                                        key={item.key}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`fas ${item.icon} text-gray-500 w-5`}></i>
                                            <div>
                                                <div className="font-medium">{item.label}</div>
                                                <div className="text-xs text-gray-500">{item.desc}</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleSettingChange(item.key)}
                                            className={`w-12 h-6 rounded-full transition ${
                                                settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                                                settings[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}></div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">알림 항목 설정</h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'documentSubmit', label: '서류 제출 완료', desc: '내가 제출한 서류 접수 시' },
                                    { key: 'documentReceive', label: '서류 수신', desc: '상대방/법원 서류 접수 시' },
                                    { key: 'trialDate', label: '기일 안내', desc: '변론/조정 기일 알림' },
                                    { key: 'deadline', label: '제출기한 임박', desc: '제출기한 3일/1일 전 알림' },
                                    { key: 'verdict', label: '판결 선고', desc: '판결문 등재 시' },
                                    { key: 'payment', label: '납부 안내', desc: '소송비용 납부 관련' }
                                ].map(item => (
                                    <div 
                                        key={item.key}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <div className="font-medium">{item.label}</div>
                                            <div className="text-xs text-gray-500">{item.desc}</div>
                                        </div>
                                        <button
                                            onClick={() => handleNotificationChange(item.key)}
                                            className={`w-12 h-6 rounded-full transition ${
                                                notifications[item.key] ? 'bg-green-600' : 'bg-gray-300'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                                                notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}></div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="font-bold mb-4">
                        <i className="fas fa-folder-open mr-2 text-blue-600"></i>사건별 알림 설정
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left py-3 px-4">사건번호</th>
                                    <th className="text-left py-3 px-4">사건명</th>
                                    <th className="text-center py-3 px-4">SMS</th>
                                    <th className="text-center py-3 px-4">이메일</th>
                                    <th className="text-center py-3 px-4">관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {caseNotifications.map((c, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="py-3 px-4 font-medium text-blue-600">{c.caseNumber}</td>
                                        <td className="py-3 px-4">{c.caseName}</td>
                                        <td className="py-3 px-4 text-center">
                                            <input type="checkbox" checked={c.sms} onChange={() => {}} className="w-4 h-4" />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <input type="checkbox" checked={c.email} onChange={() => {}} className="w-4 h-4" />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button className="text-gray-500 hover:text-blue-600">
                                                <i className="fas fa-cog"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button className="px-6 py-3 border rounded-lg hover:bg-gray-50">
                        초기화
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <i className="fas fa-save mr-2"></i>설정 저장
                    </button>
                </div>
            </div>
        </div>
    );
};
