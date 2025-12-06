function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Overview />
            <TechnicalTabs />
            <Footer />
        </div>
    );
}

// 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// React 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
