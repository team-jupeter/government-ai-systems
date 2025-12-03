const App = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <TenPriorityTasks />
            <AgentSystem />
            <DocumentVerification />
            <AgentInteraction />
            <AIConsultation />
            <footer className="bg-gray-800 py-8 px-4 border-t border-gray-700">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-500 text-sm">© 2025 식품의약품안전처 AI 업무 자동화 시스템</p>
                    <p className="text-gray-600 text-xs mt-1">OpenHash + DeepSeek R1 + A2A Protocol | MFDS Automation</p>
                </div>
            </footer>
        </div>
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
