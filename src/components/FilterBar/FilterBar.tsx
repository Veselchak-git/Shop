import styles from './FilterBar.module.scss'

export function FilterBar({
  search, 
  category, 
  priceMin, 
  priceMax, 
  sortValue, 
  categories,
  onSearchChange, 
  onCategoryChange, 
  onPriceMinChange, 
  onPriceMaxChange,
  onSortChange, 
  onReset,
}: {
  search: string; 
  category: string; 
  priceMin: string; 
  priceMax: string;
  sortValue: string; 
  categories: string[];
  onSearchChange: (v: string) => void; 
  onCategoryChange: (v: string) => void;
  onPriceMinChange: (v: string) => void; 
  onPriceMaxChange: (v: string) => void;
  onSortChange: (v: string) => void; 
  onReset: () => void;
}) {
  return (
    <div className={styles.filters}>
      <label>
        Поиск
        <input 
          placeholder="Название…" 
          value={search} 
          onChange={e => onSearchChange(e.target.value)} 
        />
      </label>
      <label>
        Категория
        <select 
          value={category} 
          onChange={e => onCategoryChange(e.target.value)}
        >
          <option value="">Все</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <label>
        Цена
        <input 
          type="number" 
          placeholder="от" 
          value={priceMin} 
          onChange={e => onPriceMinChange(e.target.value)} 
        />
      </label>
        <input 
          type="number" 
          placeholder="до" 
          value={priceMax} 
          onChange={e => onPriceMaxChange(e.target.value)} 
        />
      <label>
        Сортировка
        <select value={sortValue} onChange={e => onSortChange(e.target.value)}>
          <option value="">По умолчанию</option>
          <option value="title-asc">А→Я</option>
          <option value="title-desc">Я→А</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
          <option value="rating-asc">Рейтинг ↑</option>
          <option value="rating-desc">Рейтинг ↓</option>
        </select>
      </label>
      <button onClick={onReset}>Сбросить</button>
    </div>
  )
}
