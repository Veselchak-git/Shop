import type { Product } from '../../interfaces/product'
import styles from './ProductTable.module.scss'

export function ProductTable({ items, fmt, stars }: {
  items: Product[];
  fmt: (n: number) => string;
  stars: (n: number) => string;
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Рейтинг</th>
        </tr>
      </thead>
      <tbody>
        {items.map(p => (
          <tr key={p.id}>
            <td>
              <strong>{p.title}</strong>
            </td>
            <td>
              <span className={styles.badge}>
                {p.category}
              </span>
            </td>
            <td>
              {fmt(p.price)}
            </td>
            <td>
              <span className={styles.stars}>
                {stars(p.rating)}
              </span> 
              {p.rating.toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
