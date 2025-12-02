// FPGA 하드웨어 가속 컴포넌트
const FPGAHardware = () => {
    const [expandedSection, setExpandedSection] = React.useState(null);

    const advantages = [
        {
            title: '초고속 처리',
            icon: 'bolt',
            value: '10-100배',
            description: '소프트웨어 대비 10-100배 빠른 암호화 연산',
            detail: {
                specs: [
                    'BN254 타원곡선 페어링: 0.015ms',
                    '타원곡선 스칼라 곱셈: 0.008ms',
                    'SHA-256 해시: 0.001ms',
                    'ECDSA 서명 검증: 0.006ms'
                ],
                comparison: 'CPU는 범용 명령어 세트로 암호화에 최적화되지 않아 소프트웨어 에뮬레이션에 의존하며 계산 비용이 높음',
                source: '출처: RuntimeRec, 2024; Cryptography Stack Exchange'
            }
        },
        {
            title: '저전력 설계',
            icon: 'leaf',
            value: '88.6%',
            description: 'GPU 대비 88.6% 전력 절감',
            detail: {
                specs: [
                    'FPGA: 15W (본 시스템)',
                    'GPU (RTX 3090): 132W',
                    'CPU (Intel Xeon): 95W',
                    '연간 CO₂ 절감: 845kg'
                ],
                comparison: '4U 섀시 내 FPGA 클러스터가 1,400W 미만으로 1,000개 이상 듀얼코어 프로세서와 동등한 성능 제공',
                source: '출처: Military Embedded Systems'
            }
        },
        {
            title: '병렬 처리',
            icon: 'th',
            value: '수백 스트림',
            description: '동시 다중 암호화 스트림 처리',
            detail: {
                specs: [
                    '수백 개의 병렬 AES-GCM 스트림',
                    '수십 Gbps 암호화 속도',
                    '중형 FPGA: 수백 Gbps 지원',
                    '완전 독립적 병렬 실행'
                ],
                comparison: 'CPU/GPU는 순차 처리에 제약이 있으나, FPGA는 하드웨어 수준 병렬성으로 다중 작업 동시 수행',
                source: '출처: Xiphera, 2023'
            }
        },
        {
            title: '재구성 가능',
            icon: 'sync',
            value: '무제한',
            description: '알고리즘 업데이트 및 최적화 가능',
            detail: {
                specs: [
                    '필드 재프로그래밍 가능',
                    '프로토콜 수정 및 최적화',
                    '버그 수정 및 패치',
                    '양자내성 암호 대응 준비'
                ],
                comparison: 'ASIC 기반 TPM은 배포 후 알고리즘 변경 불가능하나, FPGA는 새로운 암호 표준에 즉시 대응 가능',
                source: '출처: Xiphera, 2023; ScienceDirect'
            }
        },
        {
            title: '물리적 보안',
            icon: 'shield-alt',
            value: '격리',
            description: '키와 연산의 완전한 하드웨어 격리',
            detail: {
                specs: [
                    '소프트웨어로부터 키 격리',
                    '부채널 공격 저항성',
                    '역공학 방지 (난독화/암호화)',
                    '오류 검출 및 수정 기능'
                ],
                comparison: '소프트웨어가 손상되더라도 FPGA 내 키는 안전하게 보호되며, 시스템 버스나 메모리 공격으로부터 격리',
                source: '출처: Xiphera, 2023; ScienceDirect'
            }
        },
        {
            title: '비트 최적화',
            icon: 'microchip',
            value: 'RTL 수준',
            description: '레지스터 전송 레벨 최적화',
            detail: {
                specs: [
                    '비트 단위 연산 최적화',
                    '알고리즘 언롤링 (Unrolling)',
                    '파이프라이닝 구조',
                    '맞춤형 데이터 경로 설계'
                ],
                comparison: '소프트웨어는 컴파일러 최적화에 제약이 있으나, FPGA는 하드웨어 레벨에서 완전한 제어 가능',
                source: '출처: Xiphera, 2023'
            }
        }
    ];

    const architecture = {
        title: 'FPGA 아키텍처 구성',
        components: [
            {
                name: 'DSP 슬라이스',
                count: '1,757개',
                description: '병렬 모듈러 곱셈 연산',
                details: [
                    '고속 정수/고정소수점 연산',
                    '48비트 곱셈-누산 (MAC)',
                    '병렬 파이프라인 구조',
                    '타원곡선 연산 최적화'
                ]
            },
            {
                name: 'BRAM',
                count: '1,685개 (64MB)',
                description: '온칩 메모리 블록',
                details: [
                    '듀얼 포트 메모리 액세스',
                    '중간 연산 결과 저장',
                    '제어 신호 마이크로프로그래밍',
                    '쉬프트 레지스터 대체로 로직 절감'
                ]
            },
            {
                name: '병렬 곱셈기',
                count: '다중 유닛',
                description: '모듈러 연산 가속',
                details: [
                    'Montgomery 곱셈 알고리즘',
                    '인터리브 방식 지수 연산',
                    '디지트-디지트 연산 방식',
                    '모듈러 역원 계산 최적화'
                ]
            },
            {
                name: '파이프라인',
                count: '다단계',
                description: '처리량 극대화',
                details: [
                    'AES 병렬 파이프라인',
                    '해시 함수 언롤링 구조',
                    '블록당 다중 처리',
                    '지연시간 최소화'
                ]
            }
        ]
    };

    const mechanisms = {
        title: '작동 메커니즘',
        processes: [
            {
                step: '1',
                name: '데이터 입력',
                description: '트랜잭션 데이터가 FPGA 입력 버퍼로 전송',
                technical: 'DMA(Direct Memory Access)를 통한 효율적 데이터 전송'
            },
            {
                step: '2',
                name: '병렬 분배',
                description: '데이터를 다중 처리 유닛에 병렬 분배',
                technical: '수백 개의 독립 암호화 엔진이 동시 작동'
            },
            {
                step: '3',
                name: '암호 연산',
                description: 'BN254 페어링, 해시, 서명 검증 동시 수행',
                technical: 'DSP 슬라이스에서 모듈러 곱셈, BRAM에서 중간 값 저장'
            },
            {
                step: '4',
                name: '파이프라인 처리',
                description: '다단계 파이프라인으로 연속 처리',
                technical: '각 단계가 동시 실행되어 처리량 극대화 (0.015ms 달성)'
            },
            {
                step: '5',
                name: '결과 출력',
                description: '검증 완료된 결과를 시스템으로 반환',
                technical: '오류 검출 코드(ECC) 적용으로 신뢰성 보장'
            }
        ]
    };

    const comparison = {
        title: '성능 비교 (실증 데이터)',
        data: [
            {
                metric: '타원곡선 암호화 (ECC)',
                fpga: '4.13ms',
                software: '70ms',
                ratio: '17배',
                note: 'Diffie-Hellman 키 교환, FPGA는 36% 슬라이스만 사용',
                source: 'Journal of Sensors, 2021'
            },
            {
                metric: 'RSA 1024비트',
                fpga: '37ms @ 60MHz',
                software: '수백 ms',
                ratio: '10배+',
                note: 'Xilinx 200K 게이트 FPGA 평가',
                source: 'ResearchGate, 2009'
            },
            {
                metric: 'AES-128 암호화',
                fpga: '수십 Gbps',
                software: '수백 Mbps',
                ratio: '100배+',
                note: '중형 FPGA로 수백 개 병렬 스트림',
                source: 'Xiphera, 2023'
            },
            {
                metric: 'SHA-3 해싱',
                fpga: '최고 처리량',
                asic: '중간',
                software: '최저',
                ratio: '맞춤 설계',
                note: 'FPGA 재구성으로 최적화 가능',
                source: 'Journal of Cryptographic Engineering, 2023'
            }
        ]
    };

    const applications = [
        {
            title: '디지털 화폐',
            icon: 'coins',
            items: ['거래 서명 검증', '블록 해싱', '영지식 증명', '크로스체인 브리지']
        },
        {
            title: '금융 시스템',
            icon: 'university',
            items: ['고속 결제 처리', 'HSM 대체', 'TLS/SSL 가속', '규제 준수 로깅']
        },
        {
            title: '국가 인프라',
            icon: 'building',
            items: ['군사 통신 암호화', '정부 PKI 시스템', '스마트 그리드 보안', '5G 네트워크 암호화']
        }
    ];

    return (
        <div className="space-y-12">
            {/* 개요 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    FPGA 하드웨어 가속 기술
                </h2>
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-gov-blue">
                    <p className="text-gray-800 leading-relaxed mb-4">
                        <strong>FPGA(Field-Programmable Gate Array)</strong>는 사용자가 프로그래밍 가능한 집적회로로, 
                        암호화 연산에 특화된 하드웨어 가속을 제공합니다. 본 시스템은 <strong>Xilinx Virtex UltraScale+ VU9P</strong> 
                        칩을 사용하여 400MHz 이상의 동작 주파수로 BN254 타원곡선 페어링 연산을 0.015ms에 처리합니다.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-white rounded p-3 text-center border border-gray-200">
                            <div className="text-2xl font-bold text-gov-blue">400MHz+</div>
                            <div className="text-sm text-gray-600 mt-1">동작 주파수</div>
                        </div>
                        <div className="bg-white rounded p-3 text-center border border-gray-200">
                            <div className="text-2xl font-bold text-gov-blue">0.015ms</div>
                            <div className="text-sm text-gray-600 mt-1">BN254 페어링</div>
                        </div>
                        <div className="bg-white rounded p-3 text-center border border-gray-200">
                            <div className="text-2xl font-bold text-gov-blue">88.6%</div>
                            <div className="text-sm text-gray-600 mt-1">전력 절감</div>
                        </div>
                        <div className="bg-white rounded p-3 text-center border border-gray-200">
                            <div className="text-2xl font-bold text-gov-blue">100K</div>
                            <div className="text-sm text-gray-600 mt-1">TPS 처리량</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FPGA의 6대 장점 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    FPGA의 6대 핵심 장점
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {advantages.map((adv, index) => (
                        <div key={index}>
                            <div 
                                onClick={() => setExpandedSection(expandedSection === `adv-${index}` ? null : `adv-${index}`)}
                                className={`bg-white border-2 rounded-lg p-5 cursor-pointer transition-all hover:border-gov-blue hover:shadow-md ${
                                    expandedSection === `adv-${index}` ? 'border-gov-blue shadow-md' : 'border-gray-300'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-gov-blue rounded-lg flex items-center justify-center flex-shrink-0">
                                        <i className={`fas fa-${adv.icon} text-white text-2xl`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{adv.title}</h3>
                                        <div className="text-2xl font-bold text-gov-blue mb-2">{adv.value}</div>
                                        <p className="text-sm text-gray-600">{adv.description}</p>
                                        <div className="mt-2 text-right">
                                            <i className={`fas fa-chevron-${expandedSection === `adv-${index}` ? 'up' : 'down'} text-gray-400`}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {expandedSection === `adv-${index}` && (
                                <div className="mt-2 bg-gray-50 rounded-lg p-5 border-2 border-gray-300">
                                    <h4 className="font-bold text-gray-900 mb-3">상세 사양</h4>
                                    <ul className="space-y-2 mb-4">
                                        {adv.detail.specs.map((spec, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <span className="text-gov-blue mt-1">•</span>
                                                <span>{spec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="bg-blue-50 rounded p-3 border-l-4 border-gov-blue mb-3">
                                        <p className="text-sm text-gray-700">
                                            <strong>비교:</strong> {adv.detail.comparison}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 italic">{adv.detail.source}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 아키텍처 구성 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    {architecture.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {architecture.components.map((comp, index) => (
                        <div key={index} className="bg-white border-2 border-gray-300 rounded-lg p-5">
                            <div className="flex items-start gap-4 mb-3">
                                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-cog text-white text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{comp.name}</h3>
                                    <div className="text-xl font-bold text-green-700">{comp.count}</div>
                                    <p className="text-sm text-gray-600 mt-1">{comp.description}</p>
                                </div>
                            </div>
                            <ul className="space-y-1">
                                {comp.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-green-600 mt-1">▸</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* 작동 메커니즘 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    {mechanisms.title}
                </h2>
                <div className="space-y-3">
                    {mechanisms.processes.map((proc, index) => (
                        <div key={index} className="bg-white border-2 border-gray-300 rounded-lg p-5">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gov-blue rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-xl">
                                    {proc.step}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{proc.name}</h3>
                                    <p className="text-gray-700 mb-2">{proc.description}</p>
                                    <div className="bg-gray-50 rounded p-3 border-l-4 border-gray-400">
                                        <p className="text-sm text-gray-600">
                                            <i className="fas fa-info-circle text-gray-500 mr-2"></i>
                                            <strong>기술 세부:</strong> {proc.technical}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 성능 비교 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    {comparison.title}
                </h2>
                <div className="bg-white rounded-lg border-2 border-gray-300 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4 font-bold text-gray-900">암호화 연산</th>
                                <th className="text-left p-4 font-bold text-gray-900">FPGA</th>
                                <th className="text-left p-4 font-bold text-gray-900">소프트웨어</th>
                                <th className="text-left p-4 font-bold text-gray-900">성능 향상</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparison.data.map((row, index) => (
                                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="font-semibold text-gray-900">{row.metric}</div>
                                        <div className="text-xs text-gray-600 mt-1">{row.note}</div>
                                        <div className="text-xs text-gray-500 italic mt-1">{row.source}</div>
                                    </td>
                                    <td className="p-4 font-bold text-green-700">{row.fpga}</td>
                                    <td className="p-4 text-gray-700">{row.software}</td>
                                    <td className="p-4 font-bold text-gov-blue">{row.ratio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 적용 분야 */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-gov-blue pl-4">
                    주요 적용 분야
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {applications.map((app, index) => (
                        <div key={index} className="bg-white border-2 border-gray-300 rounded-lg p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <i className={`fas fa-${app.icon} text-white text-xl`}></i>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{app.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {app.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                        <i className="fas fa-check text-purple-600 mt-1"></i>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* 참고 문헌 */}
            <section className="bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                <h2 className="text-lg font-bold mb-4 text-gray-900">참고 문헌</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>• RuntimeRec (2024). "FPGA-Based Hardware Acceleration for Cryptography"</li>
                    <li>• Military Embedded Systems. "Accelerating cryptography with FPGA clusters"</li>
                    <li>• Xiphera (2023). "Benefits of FPGAs as implementation platforms for cryptosystems"</li>
                    <li>• Journal of Sensors (2021). "A Compact FPGA‐Based Accelerator for Curve‐Based Cryptography"</li>
                    <li>• ScienceDirect. "Cryptographic Accelerator - Topics in Computer Science"</li>
                    <li>• Journal of Cryptographic Engineering (2023). "Hardware acceleration design of the SHA-3"</li>
                </ul>
            </section>
        </div>
    );
};

window.FPGAHardware = FPGAHardware;
