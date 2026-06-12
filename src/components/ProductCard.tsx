import Link from "next/link"
import type { Product } from "@/data/products"
import AddToCartButton from "./AddToCartButton"

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

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100 transition-all duration-300 flex flex-col">
      <Link href={`/products/${product.id}`} className="block relative">
        <div
          className={`relative h-52 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}
        >
          <CoffeeMachineIcon className="w-36 h-36 text-white" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-bold px-2.5 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-stone-950/60 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-stone-800/80 px-4 py-2 rounded-full">
                품절
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-amber-700 font-medium mb-1">{product.category}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-stone-900 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-stone-500 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-end justify-between mt-auto">
          <div>
            {discount && (
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs text-red-500 font-semibold">{discount}% 할인</span>
                <span className="text-xs text-stone-400 line-through">
                  {product.originalPrice!.toLocaleString()}원
                </span>
              </div>
            )}
            <p className="text-lg font-bold text-stone-900">
              {product.price.toLocaleString()}
              <span className="text-sm font-medium text-stone-600">원</span>
            </p>
          </div>
        </div>

        <AddToCartButton product={product} fullWidth />
      </div>
    </div>
  )
}
