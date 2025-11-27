const TenPriorityTasks = () => {
    const [tasks, setTasks] = React.useState(null);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => { fetch('/api/food-drug-safety/tasks').then(r => r.json()).then(setTasks); }, []);
    const processTask = async (taskId) => {
        setLoading(true); setSelectedTask(taskId);
        try {
            const res = await fetch('/api/food-drug-safety/task/process', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ task_id: taskId }) });
            setResult(await res.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    };
    const taskIcons = { drug_approval: '💊', clinical_trial: '🔬', food_permit: '🍱', import_inspection: '🚢', medical_device: '🩺', cosmetic_notify: '💄', safety_info: '⚠️', adverse_monitor: '📊', recall_manage: '🔄', civil_petition: '📞' };
    return (
        <section className="py-16 px-4 bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold mb-4"><i className="fas fa-tasks mr-3 text-green-400"></i>10대 우선 업무 자동화</h2><p className="text-gray-400">연간 52만건 처리 | 68% 시간 단축 | 1,247억원 절감</p></div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                    {tasks && Object.entries(tasks.tasks).map(([id, task]) => (
                        <button key={id} onClick={() => processTask(id)} disabled={loading} className={`p-4 rounded-xl text-center transition-all ${selectedTask === id ? 'bg-green-600 scale-105' : 'bg-gray-800 hover:bg-gray-700'}`}>
                            <div className="text-2xl mb-2">{taskIcons[id]}</div>
                            <div className="text-xs font-medium">{task.name}</div>
                            <div className="text-xs text-gray-400 mt-1">{task.annual_volume.toLocaleString()}건/년</div>
                        </button>
                    ))}
                </div>
                {result && (
                    <div className="bg-gray-800 rounded-xl p-6 border border-green-500/30">
                        <div className="flex items-center gap-4 mb-4"><span className="text-4xl">{taskIcons[selectedTask]}</span><div><h3 className="text-xl font-bold text-green-400">{result.task}</h3><span className="text-sm text-gray-400">Agent: {result.agent}</span></div><div className="ml-auto px-4 py-2 bg-green-600 rounded-lg font-bold">{result.result?.status}</div></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-900 p-4 rounded-lg text-center"><div className="text-xs text-gray-500">AI 처리</div><div className="text-2xl font-bold text-green-400">{result.processing?.ai_time_seconds}초</div></div>
                            <div className="bg-gray-900 p-4 rounded-lg text-center"><div className="text-xs text-gray-500">기존 소요</div><div className="text-2xl font-bold text-red-400">{result.processing?.original_days}일</div></div>
                            <div className="bg-gray-900 p-4 rounded-lg text-center"><div className="text-xs text-gray-500">최적화 후</div><div className="text-2xl font-bold text-blue-400">{result.processing?.ai_optimized_days}일</div></div>
                            <div className="bg-gray-900 p-4 rounded-lg text-center"><div className="text-xs text-gray-500">시간 절감</div><div className="text-2xl font-bold text-yellow-400">{result.processing?.time_saved_percent}%</div></div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                            <div className="bg-gray-900 p-2 rounded"><span className="text-gray-400">신뢰도: </span><span className="text-green-400">{result.result?.confidence}%</span></div>
                            <div className="bg-gray-900 p-2 rounded"><span className="text-gray-400">유사사례: </span><span className="text-blue-400">{result.result?.similar_cases_found}건</span></div>
                            <div className="bg-gray-900 p-2 rounded"><span className="text-gray-400">법령참조: </span><span className="text-purple-400">{result.result?.law_references}건</span></div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
