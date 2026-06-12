export interface Product {
  id: string
  name: string
  shortName: string
  description: string
  price: number
  originalPrice?: number
  category: string
  badge?: string
  features: string[]
  specs: Record<string, string>
  inStock: boolean
  gradient: string
}

export const products: Product[] = [
  {
    id: "e-pro-1000",
    name: "E-Pro 1000 프리미엄 에스프레소 머신",
    shortName: "E-Pro 1000",
    description:
      "24시간 무인 운영에 최적화된 상업용 에스프레소 머신. AI 기반 자동 청소 시스템과 19바 펌프로 완벽한 에스프레소를 제공합니다.",
    price: 3500000,
    originalPrice: 4200000,
    category: "에스프레소",
    badge: "베스트셀러",
    features: [
      "19바 고압 펌프 시스템",
      "AI 자동 세척 및 관리",
      "24시간 연속 운영 가능",
      "원두 자동 분쇄 기능",
      "7인치 터치스크린 인터페이스",
    ],
    specs: {
      전압: "220V / 60Hz",
      소비전력: "2,200W",
      "물통 용량": "2.5L",
      "원두 호퍼": "500g",
      "크기 (W×D×H)": "340 × 480 × 580mm",
      무게: "22kg",
    },
    inStock: true,
    gradient: "from-amber-900 via-stone-800 to-stone-900",
  },
  {
    id: "auto-brew-a100",
    name: "AutoBrew A100 자동 아메리카노 머신",
    shortName: "AutoBrew A100",
    description:
      "뜨거운 아메리카노부터 아이스 아메리카노까지 원터치로. 무인 편의점, 사무실에 최적화된 스마트 커피 머신.",
    price: 2200000,
    category: "아메리카노",
    badge: "신제품",
    features: [
      "핫 / 아이스 전환 기능",
      "자동 얼음 투입 시스템",
      "QR 결제 연동 가능",
      "원격 모니터링 지원",
      "자동 컵 디스펜서",
    ],
    specs: {
      전압: "220V / 60Hz",
      소비전력: "1,800W",
      "물통 용량": "3L",
      "크기 (W×D×H)": "380 × 520 × 620mm",
      무게: "18kg",
    },
    inStock: true,
    gradient: "from-stone-700 via-stone-800 to-stone-900",
  },
  {
    id: "latte-master-l500",
    name: "LatteMaster L500 전자동 라떼 머신",
    shortName: "LatteMaster L500",
    description:
      "부드러운 우유 거품과 완벽한 라떼. 카페라떼, 카푸치노, 마키아토 등 10가지 메뉴를 자동으로 제공합니다.",
    price: 2800000,
    originalPrice: 3200000,
    category: "라떼/카푸치노",
    badge: "인기",
    features: [
      "자동 밀크 스팀 시스템",
      "10가지 음료 메뉴",
      "정밀 온도 제어 (±1°C)",
      "우유 자동 냉각 보관",
      "음성 주문 지원",
    ],
    specs: {
      전압: "220V / 60Hz",
      소비전력: "2,400W",
      "물통 용량": "2L",
      "우유통 용량": "1.5L",
      "크기 (W×D×H)": "400 × 550 × 660mm",
      무게: "26kg",
    },
    inStock: true,
    gradient: "from-amber-700 via-amber-800 to-amber-900",
  },
  {
    id: "all-in-one-pro",
    name: "AllInOne Pro 멀티기능 무인 커피 머신",
    shortName: "AllInOne Pro",
    description:
      "에스프레소, 아메리카노, 라떼, 카푸치노 등 20가지 메뉴를 지원하는 올인원 프리미엄 머신. 대형 무인카페에 최적.",
    price: 4500000,
    originalPrice: 5500000,
    category: "멀티기능",
    badge: "PREMIUM",
    features: [
      "20가지 음료 메뉴",
      "듀얼 그라인더 시스템",
      "카드 / QR 결제 내장",
      "원격 재고 관리",
      "24시간 전담 AS 지원",
    ],
    specs: {
      전압: "220V / 60Hz",
      소비전력: "3,000W",
      "물통 용량": "4L",
      "원두 호퍼": "800g",
      "크기 (W×D×H)": "460 × 600 × 720mm",
      무게: "35kg",
    },
    inStock: true,
    gradient: "from-stone-800 via-stone-900 to-neutral-950",
  },
  {
    id: "capsule-king-c200",
    name: "CapsuleKing C200 캡슐 커피 머신",
    shortName: "CapsuleKing C200",
    description:
      "네스프레소 호환 캡슐을 사용하는 컴팩트 무인 머신. 소형 사무실, 독서실, 고시원에 딱 맞는 크기와 성능.",
    price: 1800000,
    category: "캡슐",
    features: [
      "네스프레소 호환 캡슐",
      "자동 캡슐 투입 / 배출",
      "컴팩트 슬림 디자인",
      "30초 빠른 예열",
      "저소음 설계 (45dB 이하)",
    ],
    specs: {
      전압: "220V / 60Hz",
      소비전력: "1,500W",
      "물통 용량": "1.8L",
      "캡슐 저장": "최대 30개",
      "크기 (W×D×H)": "280 × 380 × 460mm",
      무게: "12kg",
    },
    inStock: true,
    gradient: "from-amber-600 via-amber-700 to-amber-800",
  },
  {
    id: "instant-pro-i300",
    name: "InstantPro I300 스마트 인스턴트 머신",
    shortName: "InstantPro I300",
    description:
      "고급 분말 원료를 사용한 경제적인 무인 머신. 낮은 초기 비용으로 시작하는 무인카페 창업에 최적입니다.",
    price: 1200000,
    originalPrice: 1500000,
    category: "인스턴트",
    features: [
      "5가지 분말 원료 동시 사용",
      "자동 온도 조절",
      "대용량 분말 저장통",
      "간편한 유지보수",
      "저렴한 운영 비용",
    ],
    specs: {
      전압: "220V / 60Hz",
      소비전력: "1,200W",
      "물통 용량": "5L",
      "분말 저장": "각 500g × 5종",
      "크기 (W×D×H)": "320 × 420 × 540mm",
      무게: "15kg",
    },
    inStock: false,
    gradient: "from-stone-600 via-stone-700 to-stone-800",
  },
]

export const categories = ["전체", ...new Set(products.map((p) => p.category))]
