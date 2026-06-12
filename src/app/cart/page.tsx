"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

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

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const store = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const items = mounted ? store.items : []
  const { removeItem, updateQuantity, clearCart, totalPrice } = store

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-stone-400">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-stone-700 mb-2">장바구니가 비어 있습니다</h2>
        <p className="text-stone-500 mb-8">관심 있는 제품을 장바구니에 담아보세요.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          제품 보러 가기
        </Link>
      </div>
    )
  }

  const total = totalPrice()
  const shipping = total >= 5000000 ? 0 : 50000

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">장바구니</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 flex gap-4 items-center"
            >
              <div
                className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}
              >
                <CoffeeMachineIcon className="w-12 h-12 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.id}`}
                  className="font-semibold text-stone-900 hover:text-amber-700 transition-colors line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-amber-700 font-bold mt-1">
                  {item.price.toLocaleString()}원
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold text-stone-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-right flex-shrink-0 min-w-[90px]">
                <p className="font-bold text-stone-900">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-stone-400 hover:text-red-500 transition-colors mt-1"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-stone-400 hover:text-red-500 transition-colors mt-2"
          >
            전체 삭제
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-stone-900 text-lg mb-6">주문 요약</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-stone-600">
                <span>상품 금액</span>
                <span>{total.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>배송비</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">무료</span>
                  ) : (
                    `${shipping.toLocaleString()}원`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-stone-400">
                  500만원 이상 구매 시 배송비 무료
                </p>
              )}
            </div>

            <div className="border-t border-stone-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-stone-900">
                <span>최종 결제 금액</span>
                <span className="text-amber-700">{(total + shipping).toLocaleString()}원</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-colors text-center"
            >
              주문하기
            </Link>

            <Link
              href="/products"
              className="block text-center mt-3 text-sm text-stone-500 hover:text-amber-600 transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
