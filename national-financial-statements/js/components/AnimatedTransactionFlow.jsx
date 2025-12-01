// 애니메이션 컴포넌트 (별도 파일로 분리)
const AnimatedTransactionFlow = ({ result, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showHash, setShowHash] = useState(false);
    const [activeLayer, setActiveLayer] = useState(null);
    
    const steps = [
        { 
            message: "거래 데이터로부터 Hash를 생성합니다.",
            duration: 2000,
            action: () => setShowHash(true)
        },
        {
            message: "거래 데이터 Hash를 Layer 1으로 보내고, Layer 1의 Hash Chain을 갱신합니다.",
            duration: 3000,
            action: () => setActiveLayer('layer1')
        },
        {
            message: "Layer 1이 Hash Chain을 갱신하고, 최종 Hash를 거래당사자에게 답신합니다.",
            duration: 2500,
            action: () => {}
        },
        {
            message: "이제, 거래 당사자와 Layer 1의 Hash Chain이 상호 연동되었습니다.",
            duration: 2000,
            action: () => {}
        },
        {
            message: "거래당사자가 Layer 1으로부터 답신받은 Hash로 자신의 최종 Hash를 갱신합니다.",
            duration: 2500,
            action: () => setActiveLayer(null)
        },
        {
            message: "Layer 1의 최종 Hash를 Layer 2로 전송하고, 동일한 메커니즘으로 Layer 1과 Layer 2의 Hash Chain을 상호 연동합니다.",
            duration: 3000,
            action: () => setActiveLayer('layer2')
        },
        {
            message: "Layer 2와 Layer 3 간에도 동일한 메커니즘으로 상호 Hash Chain을 연동합니다.",
            duration: 3000,
            action: () => setActiveLayer('layer3')
        },
        {
            message: "Layer 3와 Layer 4도 동일한 메커니즘으로 상호 Hash Chain을 연동합니다.",
            duration: 3000,
            action: () => setActiveLayer('layer4')
        },
        {
            message: "거래 당사자와 Hash를 연동하는 Layer는 사전에 결정되지 않고, Layer 1, 2, 3, 4 중 어느 하나로 확률적으로 결정됩니다.",
            duration: 3000,
            action: () => setActiveLayer('complete')
        }
    ];
    
    useEffect(() => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            step.action();
            
            const timer = setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, step.duration);
            
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [currentStep]);
    
    return (
        <div>
            {/* 애니메이션 컴포넌트 내용 */}
        </div>
    );
};
