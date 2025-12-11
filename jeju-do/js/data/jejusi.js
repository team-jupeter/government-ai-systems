let jejusiData = {};
function waitForDataLoader(callback, maxRetries = 50) {
    let retries = 0;
    const check = () => {
        if (window.dataLoader) callback();
        else if (++retries < maxRetries) setTimeout(check, 100);
        else callback();
    };
    check();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        waitForDataLoader(async () => {
            try {
                jejusiData = await window.dataLoader.loadDepartment('jejusi');
                console.log('✅ jejusiData 로드 완료');
            } catch (error) { jejusiData = {}; }
        });
    });
} else {
    waitForDataLoader(async () => {
        try {
            jejusiData = await window.dataLoader.loadDepartment('jejusi');
            console.log('✅ jejusiData 로드 완료');
        } catch (error) { jejusiData = {}; }
    });
}
