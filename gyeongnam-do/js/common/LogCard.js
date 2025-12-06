const LogCard = ({ log }) => (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium mb-2">
                    {log.type}
                </span>
                <h3 className="font-bold text-gray-800">{log.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{log.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                log.status === '완료' ? 'bg-green-100 text-green-800' : 
                log.status === '진행중' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'
            }`}>
                {log.status}
            </span>
        </div>
    </div>
);
