import { site } from '../../content/site'
import styles from './HeroActions.module.css'

export function HeroActions() {
  return (
    <span className={styles.actions}>
      <a className={styles.primary} href={site.actions.primary.href}>
        <span className={styles.playIcon} aria-hidden="true">▶</span>
        {site.actions.primary.label}
      </a>
      <a className={styles.secondary} href={site.actions.secondary.href}>
        {site.actions.secondary.label}
      </a>
    </span>
  )
}
