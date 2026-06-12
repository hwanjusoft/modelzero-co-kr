import Link from "next/link"
import CartButton from "./CartButton"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
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
                <line x1="6" x2="6" y1="2" y2="4" />
                <line x1="10" x2="10" y1="2" y2="4" />
                <line x1="14" x2="14" y1="2" y2="4" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              ModelZero <span className="text-amber-500">Coffee</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-stone-400 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              홈
            </Link>
            <Link
              href="/products"
              className="text-stone-400 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              전체 제품
            </Link>
          </nav>

          <CartButton />
        </div>
      </div>
    </header>
  )
}
