// 파일 업로드 처리
window.GeneratorFileUpload = {
    uploadedFiles: [],
    
    // 파일 업로드 처리
    handleUpload: async function(event, type) {
        const files = event.target.files;
        if (!files || files.length === 0) return;
        
        for (let file of files) {
            // 파일 크기 체크
            const maxSize = type === 'image' ? 5 : type === 'video' ? 50 : 10; // MB
            if (file.size > maxSize * 1024 * 1024) {
                alert(`${file.name}: 파일이 너무 큽니다 (최대 ${maxSize}MB)`);
                continue;
            }
            
            try {
                const base64 = await this.fileToBase64(file);
                const fileData = {
                    type: type,
                    name: file.name,
                    mimeType: file.type,
                    data: base64,
                    uploadedAt: new Date().toISOString()
                };
                
                this.uploadedFiles.push(fileData);
                this.addPreview(fileData, this.uploadedFiles.length - 1);
                
                window.GeneratorCore.addMessage(`📎 ${file.name} 업로드 완료`, 'ai');
            } catch (error) {
                console.error('파일 업로드 오류:', error);
                alert(`${file.name} 업로드 실패`);
            }
        }
        
        event.target.value = '';
    },
    
    // 파일을 Base64로 변환
    fileToBase64: function(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },
    
    // 미리보기 추가
    addPreview: function(fileData, index) {
        const container = document.getElementById('filePreviewArea');
        const div = document.createElement('div');
        div.className = 'file-preview-item';
        div.dataset.index = index;
        
        let content = '';
        if (fileData.type === 'image') {
            content = `<img src="${fileData.data}" alt="${fileData.name}">`;
        } else if (fileData.type === 'video') {
            content = `<video src="${fileData.data}"></video>`;
        } else if (fileData.type === 'audio') {
            content = `<div class="file-icon">🎵</div>`;
        }
        
        div.innerHTML = `
            ${content}
            <button class="file-preview-remove" onclick="removeFile(${index})">×</button>
        `;
        
        container.appendChild(div);
    },
    
    // 파일 제거
    removeFile: function(index) {
        this.uploadedFiles.splice(index, 1);
        
        const container = document.getElementById('filePreviewArea');
        container.innerHTML = '';
        this.uploadedFiles.forEach((file, i) => {
            this.addPreview(file, i);
        });
    }
};

// 전역 함수
window.handleFileUpload = function(event, type) {
    window.GeneratorFileUpload.handleUpload(event, type);
};

window.removeFile = function(index) {
    window.GeneratorFileUpload.removeFile(index);
};
