// API 호출 함수들
(function() {
    window.HospitalAPI = {
        authenticatePDV: async (pdvId, biometricType) => {
            const response = await fetch('/api-jeju-hospital/authenticate-pdv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pdv_id: pdvId, biometric_type: biometricType })
            });
            return await response.json();
        },

        getEquipmentStatus: async () => {
            const response = await fetch('/api-jeju-hospital/get-equipment-status');
            return await response.json();
        },

        startConsultation: async (pdvId) => {
            const response = await fetch('/api-jeju-hospital/start-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pdv_id: pdvId })
            });
            return await response.json();
        },

        chatWithAIDoctor: async (sessionId, message) => {
            const response = await fetch('/api-jeju-hospital/chat-with-ai-doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId, message: message })
            });
            return await response.json();
        },

        performTestInChat: async (sessionId, equipmentId) => {
            const response = await fetch('/api-jeju-hospital/perform-test-in-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId, equipment_id: equipmentId })
            });
            return await response.json();
        },

        getProgressMessages: async (sessionId) => {
            const response = await fetch('/api-jeju-hospital/get-progress-messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            });
            return await response.json();
        },

        finalizeConsultation: async (sessionId) => {
            const response = await fetch('/api-jeju-hospital/finalize-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            });
            return await response.json();
        }
    };
    
    console.log('✅ HospitalAPI loaded (complete)');
})();
