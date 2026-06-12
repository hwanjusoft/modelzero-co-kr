"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { loadTossPayments } from "@tosspayments/tosspayments-sdk"
import { useCartStore } from "@/store/cartStore"

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!

const PAYMENT_METHODS = [
  { id: "CARD" as const,             label: "신용 / 체크카드", icon: "💳" },
  { id: "TRANSFER" as const,         label: "계좌이체",        icon: "🏦" },
  { id: "VIRTUAL_ACCOUNT" as const,  label: "가상계좌",        icon: "📄" },
]

const schema = z.object({
  name:          z.string().min(2, "이름을 2자 이상 입력해주세요"),
  phone:         z.string().regex(/^010-\d{4}-\d{4}$/, "010-XXXX-XXXX 형식으로 입력해주세요"),
  email:         z.string().email("올바른 이메일을 입력해주세요").optional().or(z.literal("")),
  address:       z.string().min(5, "주소를 입력해주세요"),
  addressDetail: z.string().optional(),
})
type FormValues = z.infer<typeof schema>

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11)
  if (d.length >= 8) return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7)}`
  if (d.length >= 4) return `${d.slice(0,3)}-${d.slice(3)}`
  return d
}

function Field({ label, error, children, required }: {
  label: string; error?: string; children: React.ReactNode; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-stone-700">
        {label}{required && <span className="text-amber-600 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls = "w-full px-4 py-2.5 rounded-lg border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"

function CoffeeMachineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="15" y="14" width="50" height="10" rx="3" fill="currentColor" opacity="0.6"/>
      <rect x="15" y="22" width="50" height="38" rx="4" fill="currentColor" opacity="0.35"/>
      <rect x="10" y="57" width="60" height="8"  rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="22" y="28" width="26" height="16" rx="2" fill="currentColor" opacity="0.7"/>
      <circle cx="57" cy="32" r="4" fill="currentColor" opacity="0.85"/>
      <circle cx="57" cy="43" r="4" fill="currentColor" opacity="0.85"/>
      <rect x="28" y="46" width="5" height="10" rx="1" fill="currentColor" opacity="0.65"/>
      <rect x="38" y="46" width="5" height="10" rx="1" fill="currentColor" opacity="0.65"/>
      <path d="M22 56 L26 66 L54 66 L58 56 Z" fill="currentColor" opacity="0.45"/>
    </svg>
  )
}

export default function CheckoutPage() {
  const [mounted,     setMounted]     = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [payMethod,   setPayMethod]   = useState<"CARD"|"TRANSFER"|"VIRTUAL_ACCOUNT">("CARD")

  const tossRef   = useRef<Awaited<ReturnType<typeof loadTossPayments>> | null>(null)
  const orderIdRef = useRef("MZ-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6))

  const store = useCartStore()
  useEffect(() => setMounted(true), [])

  const items    = mounted ? store.items    : []
  const subtotal = mounted ? store.totalPrice() : 0
  const shipping = subtotal >= 5_000_000 ? 0 : 50_000
  const total    = subtotal + shipping

  // Toss SDK 초기화 (클라이언트 키 로드만, 결제 요청 시 payment() 호출)
  useEffect(() => {
    loadTossPayments(CLIENT_KEY).then(tp => { tossRef.current = tp }).catch(console.error)
  }, [])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormValues) {
    if (!tossRef.current) return
    setLoading(true)

    const orderName =
      items.length === 1
        ? items[0].name
        : `${items[0].name} 외 ${items.length - 1}건`

    const base = {
      amount:              { currency: "KRW" as const, value: total },
      orderId:             orderIdRef.current,
      orderName,
      successUrl:          window.location.origin + "/checkout/success",
      failUrl:             window.location.origin + "/checkout/fail",
      customerName:        data.name,
      customerEmail:       data.email || undefined,
      customerMobilePhone: data.phone.replace(/-/g, ""),
    }

    try {
      const payment = tossRef.current.payment({
        customerKey: "anon_" + Math.random().toString(36).slice(2),
      })

      if (payMethod === "CARD") {
        await payment.requestPayment({
          method: "CARD",
          ...base,
          card: { useEscrow: false, flowMode: "DEFAULT", useCardPoint: false, useAppCardOnly: false },
        })
      } else if (payMethod === "TRANSFER") {
        await payment.requestPayment({ method: "TRANSFER", ...base })
      } else {
        await payment.requestPayment({
          method: "VIRTUAL_ACCOUNT",
          ...base,
          virtualAccount: {
            cashReceipt: { type: "소득공제" as const },
            useEscrow:   false,
            validHours:  24,
          },
        })
      }
    } catch {
      setLoading(false)
    }
  }

  if (mounted && items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-stone-500 mb-6">장바구니가 비어 있습니다.</p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
          제품 보러 가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-amber-600 transition-colors">홈</Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-amber-600 transition-colors">장바구니</Link>
        <span>/</span>
        <span className="text-stone-900 font-medium">결제</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-8">결제하기</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── 왼쪽 ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* 1. 배송 정보 */}
            <section className="bg-white border border-stone-200 rounded-2xl p-6">
              <h2 className="font-bold text-stone-900 text-lg mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                배송 정보
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="수령인"      error={errors.name?.message}    required>
                  <input {...register("name")}  placeholder="홍길동"          className={inputCls}/>
                </Field>
                <Field label="연락처"      error={errors.phone?.message}   required>
                  <input
                    {...register("phone")}
                    placeholder="010-0000-0000" maxLength={13}
                    onChange={e => setValue("phone", formatPhone(e.target.value), { shouldValidate: true })}
                    className={inputCls}
                  />
                </Field>
                <Field label="이메일 (선택)" error={errors.email?.message}>
                  <input {...register("email")} placeholder="example@email.com" type="email" className={inputCls}/>
                </Field>
                <Field label="상세 주소"   error={errors.addressDetail?.message}>
                  <input {...register("addressDetail")} placeholder="동/호수, 건물명 등" className={inputCls}/>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="주소" error={errors.address?.message} required>
                    <input {...register("address")} placeholder="시/도, 시/군/구, 도로명" className={inputCls}/>
                  </Field>
                </div>
              </div>
            </section>

            {/* 2. 결제 수단 */}
            <section className="bg-white border border-stone-200 rounded-2xl p-6">
              <h2 className="font-bold text-stone-900 text-lg mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                결제 수단
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayMethod(m.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      payMethod === m.id
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-xs font-medium text-center leading-tight">{m.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-stone-400 bg-stone-50 rounded-lg px-4 py-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0 text-amber-500">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                "결제하기" 클릭 시 토스페이먼츠 안전결제 창이 열립니다.
              </div>
            </section>

          </div>

          {/* ── 오른쪽: 주문 요약 ── */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold text-stone-900 text-lg mb-5">주문 상품</h2>

              <ul className="space-y-4 mb-6">
                {items.map(item => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                      <CoffeeMachineIcon className="w-8 h-8 text-white"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-900 truncate">{item.name}</p>
                      <p className="text-xs text-stone-500">{item.quantity}개</p>
                    </div>
                    <p className="text-sm font-semibold text-stone-800 flex-shrink-0">
                      {(item.price * item.quantity).toLocaleString()}원
                    </p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-stone-200 pt-4 space-y-2.5 text-sm mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>상품 금액</span><span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>배송비</span>
                  <span>{shipping === 0 ? <span className="text-green-600 font-medium">무료</span> : `${shipping.toLocaleString()}원`}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>최종 결제 금액</span>
                  <span className="text-amber-700">{total.toLocaleString()}원</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    처리 중...
                  </>
                ) : (
                  `${PAYMENT_METHODS.find(m=>m.id===payMethod)?.icon} ${total.toLocaleString()}원 결제하기`
                )}
              </button>

              <p className="text-center text-xs text-stone-400 mt-3 flex items-center justify-center gap-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                토스페이먼츠 SSL 보안 결제
              </p>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
