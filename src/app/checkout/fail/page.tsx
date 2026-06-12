import Link from "next/link"

interface Props {
  searchParams: Promise<{ code?: string; message?: string }>
}

export default async function CheckoutFailPage({ searchParams }: Props) {
  const { code, message } = await searchParams

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-red-500"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-stone-900 mb-3">결제에 실패했습니다</h1>

      {message && (
        <p className="text-stone-500 mb-2">{message}</p>
      )}
      {code && (
        <p className="text-xs text-stone-400 mb-8">오류 코드: {code}</p>
      )}
      {!message && !code && (
        <p className="text-stone-500 mb-8">
          결제 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-sm text-amber-800 text-left">
        <p className="font-semibold mb-1">자주 발생하는 원인</p>
        <ul className="space-y-1 text-amber-700 list-disc list-inside">
          <li>카드 한도 초과 또는 잔액 부족</li>
          <li>카드 정보 오류 (번호, 유효기간, CVC)</li>
          <li>결제 취소</li>
          <li>네트워크 오류</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          다시 시도하기
        </Link>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center border border-stone-300 hover:border-amber-400 text-stone-600 hover:text-amber-700 font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          장바구니로 돌아가기
        </Link>
      </div>
    </div>
  )
}
