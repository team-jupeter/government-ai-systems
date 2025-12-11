let seogwipoData = {};
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
                seogwipoData = await window.dataLoader.loadDepartment('seogwipo');
                console.log('✅ seogwipoData 로드 완료');
            } catch (error) { seogwipoData = {}; }
        });
    });
} else {
    waitForDataLoader(async () => {
        try {
            seogwipoData = await window.dataLoader.loadDepartment('seogwipo');
            console.log('✅ seogwipoData 로드 완료');
        } catch (error) { seogwipoData = {}; }
    });
}
