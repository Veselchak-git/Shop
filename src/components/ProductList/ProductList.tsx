import { useEffect, useState } from 'react'
import { FilterBar } from '../FilterBar/FilterBar'
import { Pagination } from '../Pagination/Pagination'
import { ProductTable } from '../ProductTable/ProductTable'
import { fetchAllProducts, fetchProducts } from '../../services/product'
import { SORT_OPTIONS } from '../../consts/sort-options'
import type { PageData } from '../../interfaces/page-data'
import styles from './ProductList.module.scss'

export function ProductList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [data, setData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchAllProducts()
      .then(items => setCategories([...new Set(items.map(p => p.category))].sort()))
      .catch(() => {})
  }, [])

  function load(p: number, overrides?: { category?: string; priceMin?: string; priceMax?: string; sortValue?: string }) {
    const c = overrides?.category ?? category
    const pMin = overrides?.priceMin ?? priceMin
    const pMax = overrides?.priceMax ?? priceMax
    const sv = overrides?.sortValue ?? sortValue

    const opt = SORT_OPTIONS.find(o => o.value === sv)
    setLoading(true)
    setError('')
    fetchProducts({
      search, category: c, priceMin: pMin, priceMax: pMax,
      sortField: opt?.field ?? '',
      sortOrder: opt?.order ?? 'asc',
      page: p,
    })
      .then(res => setData({
        items: res.items,
        totalPages: res.meta.total_pages,
        currentPage: res.meta.current_page,
        totalItems: res.meta.total_items,
      }))
      .catch(err => { setError(err.message); setData(null) })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const t = setTimeout(() => load(1), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  function handleCategoryChange(v: string) { setCategory(v); load(1, { category: v }) }
  function handlePriceMinChange(v: string) { setPriceMin(v); load(1, { priceMin: v }) }
  function handlePriceMaxChange(v: string) { setPriceMax(v); load(1, { priceMax: v }) }
  function handleSortChange(v: string) { setSortValue(v); load(1, { sortValue: v }) }
  function handleReset() {
    setSearch(''); setCategory(''); setPriceMin(''); setPriceMax(''); setSortValue('')
    load(1, { category: '', priceMin: '', priceMax: '', sortValue: '' })
  }

  const fmt = (n: number) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)
  const stars = (n: number) => '★'.repeat(Math.floor(n)) + (n % 1 >= 0.5 ? '☆' : '') + '☆'.repeat(5 - Math.ceil(n))

  return (
    <div className={styles.container}>
      <h1>Реестр товаров</h1>

      <FilterBar
        search={search} category={category} priceMin={priceMin} priceMax={priceMax}
        sortValue={sortValue} categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={handleCategoryChange}
        onPriceMinChange={handlePriceMinChange}
        onPriceMaxChange={handlePriceMaxChange}
        onSortChange={handleSortChange}
        onReset={handleReset}
      />

      {error && <div className={styles.error}>{error}</div>}

      {loading && <div className={styles.loading}><div className={styles.spinner} /> Загрузка…</div>}

      {!loading && data?.items.length === 0 && <div className={styles.empty}>Ничего не найдено</div>}

      {!loading && data && data.items.length > 0 && (
        <div className={styles.wrapper}>
          <ProductTable 
            items={data.items} 
            fmt={fmt} 
            stars={stars}
          />
          <Pagination 
            current={data.currentPage} 
            total={data.totalPages} 
            onChange={p => load(p)} 
          />
        </div>
      )}
    </div>
  )
}
