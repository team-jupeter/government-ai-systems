const App = () => {
    const [currentPage, setCurrentPage] = React.useState('dashboard');

    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard':
                return <Dashboard />;
            case 'mylearning':
                return <MyLearning />;
            case 'courses':
                return <CourseList />;
            case 'professor':
                return <AIProfessor />;
            case 'exam':
                return <ExamCenter />;
            case 'grade':
                return <GradeReport />;
            case 'career':
                return <CareerRecommend />;
            case 'thesis':
                return <ThesisAssistant />;
            case 'community':
                return <CommunityHub />;
            case 'vault':
                return <PrivateVault />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex">
                <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
                <main className="flex-1">
                    {renderPage()}
                </main>
            </div>
            <FloatingHelp />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
