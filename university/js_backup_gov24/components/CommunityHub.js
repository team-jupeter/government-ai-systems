const CommunityHub = ({ studentId, onNavigate }) => {
    const [communities, setCommunities] = React.useState([]);
    const [myCommunities, setMyCommunities] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchCommunityData();
    }, [studentId]);

    const fetchCommunityData = async () => {
        // 데모 데이터
        setCommunities([
            {
                id: 'algo-masters',
                name: '알고리즘 마스터즈',
                description: '알고리즘과 문제해결에 관심있는 학습자 커뮤니티',
                similarity: 94,
                member_count: 1245,
                aptitude_tags: ['논리적 사고', '문제 해결', '수학적 분석'],
                active_projects: 12,
                recent_activity: '3분 전'
            },
            {
                id: 'ai-pioneers',
                name: 'AI 개척자들',
                description: '인공지능과 머신러닝을 탐구하는 학습자 커뮤니티',
                similarity: 89,
                member_count: 2380,
                aptitude_tags: ['창의성', '데이터 분석', '연구 지향'],
                active_projects: 28,
                recent_activity: '10분 전'
            },
            {
                id: 'data-wizards',
                name: '데이터 마법사',
                description: '데이터 분석과 시각화를 연구하는 커뮤니티',
                similarity: 82,
                member_count: 890,
                aptitude_tags: ['분석력', '통계', '시각화'],
                active_projects: 8,
                recent_activity: '1시간 전'
            },
            {
                id: 'startup-lab',
                name: '스타트업 랩',
                description: '창업과 사업화에 관심있는 학습자 커뮤니티',
                similarity: 65,
                member_count: 560,
                aptitude_tags: ['리더십', '기획력', '커뮤니케이션'],
                active_projects: 15,
                recent_activity: '2시간 전'
            }
        ]);

        setMyCommunities(['algo-masters', 'ai-pioneers']);
        setLoading(false);
    };

    const joinCommunity = (communityId) => {
        setMyCommunities(prev => [...prev, communityId]);
        alert('커뮤니티에 가입되었습니다!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-400"></i>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* 헤더 */}
            <div>
                <h1 className="text-2xl font-bold">학습 커뮤니티</h1>
                <p className="text-gray-400 mt-1">적성과 학습 성향이 비슷한 동료들과 함께하세요</p>
            </div>

            {/* 안내 배너 */}
            <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                        <i className="fas fa-users text-white text-xl"></i>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">AI 기반 커뮤니티 매칭</h3>
                        <p className="text-gray-300 text-sm mt-1">
                            AI가 학습 이력, 성적, 적성을 분석하여 가장 적합한 커뮤니티를 추천합니다.
                            기존의 학과나 클래스 대신, 관심사와 역량이 비슷한 동료들과 함께 성장하세요.
                        </p>
                    </div>
                </div>
            </div>

            {/* 내 커뮤니티 */}
            {myCommunities.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-4">
                        <i className="fas fa-heart text-red-400 mr-2"></i>
                        내 커뮤니티
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {communities.filter(c => myCommunities.includes(c.id)).map(community => (
                            <div key={community.id} className="bg-gray-800 rounded-xl p-5 border border-yellow-500 border-opacity-30">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h3 className="font-semibold">{community.name}</h3>
                                            <span className="badge bg-yellow-500 bg-opacity-20 text-yellow-400 text-xs">가입됨</span>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1">{community.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <span><i className="fas fa-users mr-1"></i>{community.member_count}</span>
                                        <span><i className="fas fa-project-diagram mr-1"></i>{community.active_projects} 프로젝트</span>
                                    </div>
                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium">
                                        입장하기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 추천 커뮤니티 */}
            <div>
                <h2 className="text-lg font-semibold mb-4">
                    <i className="fas fa-compass text-blue-400 mr-2"></i>
                    추천 커뮤니티
                </h2>
                <div className="space-y-4">
                    {communities.map(community => {
                        const isJoined = myCommunities.includes(community.id);
                        
                        return (
                            <div key={community.id} className="bg-gray-800 rounded-xl p-6 card-hover">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                                                {community.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{community.name}</h3>
                                                <p className="text-gray-400 text-sm">{community.description}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {community.aptitude_tags.map((tag, i) => (
                                                <span key={i} className="badge bg-gray-700 text-gray-300 px-2 py-1 text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center space-x-6 mt-4 text-sm text-gray-400">
                                            <span><i className="fas fa-users mr-1"></i>{community.member_count}명</span>
                                            <span><i className="fas fa-project-diagram mr-1"></i>{community.active_projects} 프로젝트</span>
                                            <span><i className="fas fa-clock mr-1"></i>{community.recent_activity}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-400">{community.similarity}%</div>
                                            <div className="text-xs text-gray-500">적합도</div>
                                        </div>
                                        
                                        {isJoined ? (
                                            <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium cursor-default">
                                                <i className="fas fa-check mr-2"></i>가입됨
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => joinCommunity(community.id)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2.5 rounded-lg font-medium"
                                            >
                                                가입하기
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
