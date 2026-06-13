import { redirect } from "next/navigation"
import Link from "next/link"
import ClearCart from "@/components/ClearCart"

interface Props {
  searchParams: Promise<{
    paymentKey?: string
    orderId?: string
    amount?: string
  }>
}

async function confirmPayment(paymentKey: string, orderId: string, amount: number) {
  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) throw new Error("TOSS_SECRET_KEY 환경변수가 설정되지 않았습니다")

  const authorization = "Basic " + Buffer.from(secretKey + ":").toString("base64")

  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
    cache: "no-store",
  })

  const data = await res.json()

  if (!res.ok) {
    return { ok: false, code: data.code as string, message: data.message as string }
  }

  return { ok: true, data }
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { paymentKey, orderId, amount } = await searchParams

  if (!paymentKey || !orderId || !amount) {
    redirect("/")
  }

  if (paymentKey !== "demo") {
    const result = await confirmPayment(paymentKey, orderId, Number(amount))

    if (!result.ok) {
      redirect(
        `/checkout/fail?code=${encodeURIComponent(result.code ?? "")}&message=${encodeURIComponent(result.message ?? "결제 확인에 실패했습니다")}`
      )
    }
  }

  const paidAmount = Number(amount)

  return (
    <>
      <ClearCart />
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12 text-green-600"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-stone-900 mb-3">결제가 완료되었습니다!</h1>
        <p className="text-stone-500 mb-1">
          주문번호: <span className="font-semibold text-stone-700">{orderId}</span>
        </p>
        <p className="text-stone-500 mb-1">
          결제금액:{" "}
          <span className="font-semibold text-amber-700">
            {paidAmount.toLocaleString()}원
          </span>
        </p>
        <p className="text-stone-500 mb-10 leading-relaxed mt-4">
          담당자가 확인 후 영업일 기준 1~2일 내에 연락드립니다.
          <br />
          문의사항은{" "}
          <span className="text-amber-700 font-medium">1588-0000</span>으로 연락해 주세요.
        </p>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-stone-700 mb-4 text-sm">주문 안내</h2>
          <ul className="space-y-2.5">
            {[
              "입금 확인 후 배송이 시작됩니다.",
              "설치는 배송 완료 후 별도 일정 안내드립니다.",
              "제품 보증기간은 구매일로부터 1년입니다.",
              "AS 문의: support@modelzero.co.kr",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            홈으로 가기
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border border-stone-300 hover:border-amber-400 text-stone-600 hover:text-amber-700 font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </>
  )
}
