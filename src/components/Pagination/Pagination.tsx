import styles from './Pagination.module.scss'

export function Pagination({ current, total, onChange }: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null

  return (
    <div className={styles.pages}>
      <button className={styles.arrow} disabled={current <= 1} onClick={() => onChange(current - 1)}>
        ←
      </button>

      {current > 1 && <button onClick={() => onChange(1)}>1</button>}
      {current > 3 && <button className={styles.dots} disabled>…</button>}
      {current > 2 && <button onClick={() => onChange(current - 1)}>{current - 1}</button>}

      <button className={styles.active}>{current}</button>

      {current < total && <button onClick={() => onChange(current + 1)}>{current + 1}</button>}
      {current < total - 1 && <button className={styles.dots} disabled>…</button>}
      {current < total - 1 && <button onClick={() => onChange(total)}>{total}</button>}

      <button className={styles.arrow} disabled={current >= total} onClick={() => onChange(current + 1)}>
        →
      </button>
    </div>
  )
}
