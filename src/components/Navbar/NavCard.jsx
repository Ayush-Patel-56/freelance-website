import styles from './NavCard.module.css'

export function NavCard({ label, href, isOpen, cardRef }) {
  return (
    <a
      ref={cardRef}
      href={href}
      className={styles.card}
      aria-hidden={!isOpen}
      tabIndex={isOpen ? 0 : -1}
    >
      {label}
    </a>
  )
}
