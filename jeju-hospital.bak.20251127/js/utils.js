// 유틸리티 함수들
(function() {
    window.HospitalUtils = {
        showNotification: (message, duration = 3000) => {
            const event = new CustomEvent('show-notification', {
                detail: { message, duration }
            });
            window.dispatchEvent(event);
        },

        getEquipmentStatusColor: (status) => {
            const colors = {
                'available': 'green',
                'in_use': 'yellow',
                'maintenance': 'red'
            };
            return colors[status] || 'gray';
        },

        getEquipmentStatusText: (status) => {
            const texts = {
                'available': '사용 가능',
                'in_use': '사용 중',
                'maintenance': '점검 중'
            };
            return texts[status] || '알 수 없음';
        }
    };
    
    console.log('✅ HospitalUtils loaded');
})();
