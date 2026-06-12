import { notFound } from "next/navigation"
import Link from "next/link"
import { products } from "@/data/products"
import AddToCartButton from "@/components/AddToCartButton"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return {}
  return { title: `${product.name} | ModelZero Coffee` }
}

function CoffeeMachineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="15" y="14" width="50" height="10" rx="3" fill="currentColor" opacity="0.6" />
      <rect x="15" y="22" width="50" height="38" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="10" y="57" width="60" height="8" rx="2" fill="currentColor" opacity="0.5" />
      <rect x="22" y="28" width="26" height="16" rx="2" fill="currentColor" opacity="0.7" />
      <circle cx="57" cy="32" r="4" fill="currentColor" opacity="0.85" />
      <circle cx="57" cy="43" r="4" fill="currentColor" opacity="0.85" />
      <rect x="28" y="46" width="5" height="10" rx="1" fill="currentColor" opacity="0.65" />
      <rect x="38" y="46" width="5" height="10" rx="1" fill="currentColor" opacity="0.65" />
      <path d="M22 56 L26 66 L54 66 L58 56 Z" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-amber-600 transition-colors">홈</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-amber-600 transition-colors">전체 제품</Link>
        <span>/</span>
        <span className="text-stone-900 font-medium">{product.shortName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div
          className={`rounded-2xl bg-gradient-to-br ${product.gradient} aspect-square flex items-center justify-center relative overflow-hidden`}
        >
          <CoffeeMachineIcon className="w-64 h-64 text-white" />
          {product.badge && (
            <span className="absolute top-5 left-5 bg-amber-500 text-stone-950 text-sm font-bold px-3 py-1.5 rounded-full">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center">
              <span className="text-white font-bold text-xl">품절</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-amber-600 text-sm font-semibold mb-1">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug mb-4">
              {product.name}
            </h1>
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Price */}
          <div className="bg-stone-50 rounded-xl p-5">
            {discount && (
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-0.5 rounded-full">
                  {discount}% 할인
                </span>
                <span className="text-stone-400 line-through text-sm">
                  {product.originalPrice!.toLocaleString()}원
                </span>
              </div>
            )}
            <p className="text-3xl font-bold text-stone-900">
              {product.price.toLocaleString()}
              <span className="text-lg font-medium text-stone-600 ml-1">원</span>
            </p>
            <p className="text-xs text-stone-400 mt-1">부가세 포함 / 배송비 별도</p>
          </div>

          {/* Add to Cart */}
          <AddToCartButton product={product} fullWidth />

          {/* Features */}
          <div>
            <h3 className="font-semibold text-stone-900 mb-3">주요 특징</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-stone-600">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-stone-900 mb-6">제품 사양</h2>
        <div className="border border-stone-200 rounded-2xl overflow-hidden">
          {Object.entries(product.specs).map(([key, value], i) => (
            <div
              key={key}
              className={`flex ${i % 2 === 0 ? "bg-stone-50" : "bg-white"} divide-x divide-stone-200`}
            >
              <div className="w-40 sm:w-52 px-5 py-3.5 text-sm font-medium text-stone-700 flex-shrink-0">
                {key}
              </div>
              <div className="px-5 py-3.5 text-sm text-stone-600">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
