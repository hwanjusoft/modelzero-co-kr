import Link from "next/link"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "24시간 무인 운영",
    desc: "사람 없이도 끊임없이 운영. AI 기반 자동 관리 시스템으로 24시간 최상의 커피를 제공합니다.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "AI 자동 관리",
    desc: "AI가 원두 소모량, 청소 주기, 고장 징후를 사전에 감지하여 알림을 보내드립니다.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
    title: "간편 결제 연동",
    desc: "카드, QR, 간편결제 모두 지원. 무인 결제 환경 구축이 한 번에 해결됩니다.",
  },
]

export default function HomePage() {
  const featured = products.filter((p) => p.badge).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-amber-600/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              무인커피머신 전문 쇼핑몰
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              무인커피머신의
              <br />
              <span className="text-amber-500">새로운 기준</span>
            </h1>
            <p className="text-stone-400 text-lg leading-relaxed mb-8 max-w-xl">
              24시간 무인 운영, AI 자동 관리, 간편 결제 연동까지.
              ModelZero Coffee의 프리미엄 무인커피머신으로
              당신의 비즈니스를 시작하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                전체 제품 보기
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center border border-stone-700 hover:border-amber-600 text-stone-300 hover:text-amber-400 font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                카탈로그 문의
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-stone-200">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-600 text-sm font-semibold mb-1">BEST PRODUCTS</p>
              <h2 className="text-3xl font-bold text-stone-900">인기 제품</h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-stone-500 hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              전체 보기
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 무인카페를 시작하세요
          </h2>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            초기 설치부터 AS까지 ModelZero Coffee가 함께합니다.
            전문 상담을 통해 최적의 머신을 추천해 드립니다.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-amber-700 font-bold px-8 py-3.5 rounded-xl hover:bg-amber-50 transition-colors"
          >
            제품 둘러보기
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
