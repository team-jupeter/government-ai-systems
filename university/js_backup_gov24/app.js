const App = () => {
    const [currentPage, setCurrentPage] = React.useState('dashboard');
    const [studentId, setStudentId] = React.useState('STU-DEMO1234');
    const [showTour, setShowTour] = React.useState(false);

    React.useEffect(() => {
        // "다시 보지 않기"를 선택한 경우에만 숨김
        const tourHidden = localStorage.getItem('ai-university-tour-hidden');
        if (!tourHidden) {
            setShowTour(true);
        }
    }, []);

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    const handleTourComplete = () => {
        setShowTour(false);
    };

    const resetTour = () => {
        localStorage.removeItem('ai-university-tour-hidden');
        setShowTour(true);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard studentId={studentId} onNavigate={handleNavigate} />;
            case 'courses':
                return <CourseList studentId={studentId} onNavigate={handleNavigate} />;
            case 'my-learning':
                return <MyLearning studentId={studentId} onNavigate={handleNavigate} />;
            case 'ai-professor':
                return <AIProfessor studentId={studentId} onNavigate={handleNavigate} />;
            case 'exam':
                return <ExamCenter studentId={studentId} onNavigate={handleNavigate} />;
            case 'grades':
                return <GradeReport studentId={studentId} onNavigate={handleNavigate} />;
            case 'thesis':
                return <ThesisAssistant studentId={studentId} onNavigate={handleNavigate} />;
            case 'career':
                return <CareerRecommend studentId={studentId} onNavigate={handleNavigate} />;
            case 'community':
                return <CommunityHub studentId={studentId} onNavigate={handleNavigate} />;
            case 'pdv':
                return <PrivateVault studentId={studentId} onNavigate={handleNavigate} />;
            default:
                return <Dashboard studentId={studentId} onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="min-h-screen gradient-bg">
            {showTour && <OnboardingTour onComplete={handleTourComplete} />}

            <Header studentId={studentId} onResetTour={resetTour} onNavigate={handleNavigate} />
            
            <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
            
            <main 
                className="min-h-screen pt-16"
                style={{ marginLeft: '280px' }}
            >
                <div className="p-6 pr-8">
                    {renderPage()}
                </div>
            </main>

            <FloatingHelp />
            <AIChat studentId={studentId} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
