"use client"

import { useState } from "react"
import { useCartStore } from "@/store/cartStore"
import type { Product } from "@/data/products"

interface Props {
  product: Product
  className?: string
  fullWidth?: boolean
}

export default function AddToCartButton({ product, className, fullWidth }: Props) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  function handleAdd() {
    if (!product.inStock) return
    addItem({
      id: product.id,
      name: product.shortName,
      price: product.price,
      gradient: product.gradient,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className={`${fullWidth ? "w-full" : ""} px-6 py-3 rounded-lg bg-stone-200 text-stone-400 text-sm font-medium cursor-not-allowed ${className ?? ""}`}
      >
        품절
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`${fullWidth ? "w-full" : ""} px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
        added
          ? "bg-green-600 text-white"
          : "bg-amber-600 hover:bg-amber-700 active:scale-95 text-white"
      } ${className ?? ""}`}
    >
      {added ? "✓ 담겼습니다" : "장바구니 담기"}
    </button>
  )
}
