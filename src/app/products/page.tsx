import { products, categories } from "@/data/products"
import ProductCard from "@/components/ProductCard"

export const metadata = {
  title: "전체 제품 | ModelZero Coffee",
}

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const active = category && category !== "전체" ? category : null

  const filtered = active
    ? products.filter((p) => p.category === active)
    : products

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">전체 제품</h1>
        <p className="text-stone-500">무인 운영에 최적화된 프리미엄 커피 머신을 만나보세요.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const isActive = cat === "전체" ? !active : cat === active
          return (
            <a
              key={cat}
              href={cat === "전체" ? "/products" : `/products?category=${encodeURIComponent(cat)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </a>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          해당 카테고리에 제품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
