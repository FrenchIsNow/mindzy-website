'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Category {
  name: string
  count: number
}

interface BlogCategoryFilterProps {
  categories: Category[]
  allLabel: string
  totalCount: number
}

export function BlogCategoryFilter({ categories, allLabel, totalCount }: BlogCategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') || ''

  function select(category: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <button
        onClick={() => select('')}
        className={`group px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
          !active
            ? 'bg-anthracite text-white border-anthracite shadow-sm'
            : 'bg-white text-gray-600 border-gray-200 hover:border-anthracite/40 hover:text-anthracite hover:shadow-sm'
        }`}
      >
        <span>{allLabel}</span>
        <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full transition-colors ${
          !active ? 'bg-white/20 text-white/80' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
        }`}>
          {totalCount}
        </span>
      </button>
      {categories.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => select(name)}
          className={`group px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer flex items-center gap-2 capitalize ${
            active === name
              ? 'bg-anthracite text-white border-anthracite shadow-sm'
              : 'bg-white text-gray-600 border-gray-200 hover:border-anthracite/40 hover:text-anthracite hover:shadow-sm'
          }`}
        >
          <span>{name}</span>
          <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full transition-colors ${
            active === name ? 'bg-white/20 text-white/80' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}
