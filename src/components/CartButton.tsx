"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/store/cartStore"

export default function CartButton() {
  const [mounted, setMounted] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems)

  useEffect(() => {
    setMounted(true)
  }, [])

  const count = mounted ? totalItems() : 0

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      <span className="hidden sm:inline text-sm font-medium">장바구니</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 sm:static sm:ml-0 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-stone-950">
          {count}
        </span>
      )}
    </Link>
  )
}
