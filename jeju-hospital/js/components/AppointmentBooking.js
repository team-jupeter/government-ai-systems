const AppointmentBooking = () => {
    const [institution, setInstitution] = React.useState('jeju_univ_hospital');
    const [department, setDepartment] = React.useState('내과');
    const [reservation, setReservation] = React.useState(null);
    const [review, setReview] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const insts = [{id:'jeju_univ_hospital',name:'제주대학교병원'},{id:'jeju_medical_center',name:'제주의료원'},{id:'seogwipo_medical_center',name:'서귀포의료원'}];
    const depts = {jeju_univ_hospital:['내과','외과','정형외과','신경과','심장내과','소화기내과'],jeju_medical_center:['정신과','내과','재활의학과','신경과'],seogwipo_medical_center:['내과','외과','정형외과','산부인과']};
    const makeReservation = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/jeju-hospital/reserve-appointment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({institution,department})});
            const data = await res.json();
            setReservation(data);
            setTimeout(async()=>{const r=await fetch('/api/jeju-hospital/doctor-review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({diagnosis_id:data.reservation?.id})});setReview(await r.json());},2000);
        } catch(e){console.error(e);}
        setLoading(false);
    };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-calendar-check mr-3 text-cyan-400"></i>AI 기반 진료 예약</h2><p className="text-gray-400">예약 시 AI 진단 결과가 담당의에게 사전 전달됩니다</p></div>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold">1</div><h3 className="font-bold text-cyan-400">예약 정보</h3></div>
                        <div className="space-y-4">
                            <div><label className="text-sm text-gray-400 block mb-2">의료기관</label>{insts.map(i=><button key={i.id} onClick={()=>{setInstitution(i.id);setDepartment(depts[i.id][0]);}} className={`w-full p-3 mb-2 rounded-lg text-left ${institution===i.id?'bg-cyan-600':'bg-gray-900 hover:bg-gray-700'}`}><i className="fas fa-hospital mr-2"></i>{i.name}</button>)}</div>
                            <div><label className="text-sm text-gray-400 block mb-2">진료과</label><select value={department} onChange={e=>setDepartment(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3">{depts[institution]?.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
                            <button onClick={makeReservation} disabled={loading} className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-bold">{loading?'처리중...':'🗓️ 예약 신청'}</button>
                        </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-2 mb-4"><div className={`w-8 h-8 ${reservation?'bg-green-600':'bg-gray-600'} rounded-full flex items-center justify-center font-bold`}>2</div><h3 className={`font-bold ${reservation?'text-green-400':'text-gray-500'}`}>예약 확정</h3></div>
                        {reservation?.reservation ? (
                            <div className="space-y-4">
                                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/50 text-center"><i className="fas fa-check-circle text-3xl text-green-400 mb-2"></i><div className="font-bold text-green-400">예약 확정</div></div>
                                <div className="bg-gray-900 p-4 rounded space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-400">예약번호</span><span className="font-mono text-cyan-400">{reservation.reservation.id}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">병원</span><span>{reservation.reservation.institution}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">진료과</span><span>{reservation.reservation.department}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">담당의</span><span className="text-yellow-400">{reservation.reservation.slot?.doctor}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">날짜</span><span>{reservation.reservation.slot?.date}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">시간</span><span className="text-xl font-bold text-green-400">{reservation.reservation.slot?.time}</span></div>
                                </div>
                                <div className="bg-purple-900/30 p-3 rounded border border-purple-500/30 text-sm"><i className="fas fa-robot text-purple-400 mr-2"></i>AI 소견 담당의 전달: <span className="text-green-400">완료</span></div>
                            </div>
                        ) : <div className="text-center py-12 text-gray-500"><i className="fas fa-calendar text-4xl mb-4 opacity-50"></i><p>예약 진행 시 결과 표시</p></div>}
                    </div>
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center gap-2 mb-4"><div className={`w-8 h-8 ${review?'bg-yellow-600':'bg-gray-600'} rounded-full flex items-center justify-center font-bold`}>3</div><h3 className={`font-bold ${review?'text-yellow-400':'text-gray-500'}`}>담당의 검토</h3></div>
                        {review?.review ? (
                            <div className="space-y-4">
                                <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/50 text-center"><i className="fas fa-user-md text-3xl text-yellow-400 mb-2"></i><div className="font-bold text-yellow-400">검토 완료</div></div>
                                <div className="bg-gray-900 p-4 rounded">
                                    <div className="flex justify-between mb-3"><span className="text-gray-400">AI 진단 동의</span><span className={`px-3 py-1 rounded-full text-sm ${review.review.doctor_agreement==='동의'?'bg-green-600':review.review.doctor_agreement==='부분동의'?'bg-yellow-600':'bg-orange-600'}`}>{review.review.doctor_agreement}</span></div>
                                    {review.review.additional_tests?.length > 0 && <div className="mb-3"><div className="text-sm text-gray-400 mb-2">추가 검사</div><div className="flex flex-wrap gap-2">{review.review.additional_tests.map((t,i)=><span key={i} className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-sm">{t}</span>)}</div></div>}
                                    <div className="text-sm bg-gray-800 p-3 rounded border-l-2 border-yellow-500">{review.review.doctor_notes}</div>
                                </div>
                            </div>
                        ) : reservation ? <div className="text-center py-12"><i className="fas fa-spinner fa-spin text-3xl text-yellow-400 mb-4"></i><p className="text-gray-400">담당의 검토 중...</p></div> : <div className="text-center py-12 text-gray-500"><i className="fas fa-user-md text-4xl mb-4 opacity-50"></i><p>예약 후 검토 진행</p></div>}
                    </div>
                </div>
            </div>
        </section>
    );
};
