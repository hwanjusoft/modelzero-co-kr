import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-amber-600 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                  <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                </svg>
              </div>
              <span className="text-white font-bold">
                ModelZero <span className="text-amber-500">Coffee</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              무인커피머신의 새로운 기준.<br />
              최고의 기술로 최고의 커피를 제공합니다.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-400 transition-colors">
                  전체 제품
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400 transition-colors">
                  장바구니
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">고객 지원</h3>
            <ul className="space-y-2 text-sm">
              <li>대표전화: 1588-0000</li>
              <li>운영시간: 평일 09:00 – 18:00</li>
              <li>이메일: support@modelzero.co.kr</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-xs text-center text-stone-600">
          © 2026 ModelZero Coffee. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
