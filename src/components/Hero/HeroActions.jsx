import { site } from '../../content/site'
import styles from './HeroActions.module.css'

export function HeroActions() {
  return (
    <div className={styles.actions}>
      <a className={styles.primary} href={site.actions.primary.href}>
        {site.actions.primary.label}
      </a>
      <a className={styles.secondary} href={site.actions.secondary.href}>
        {site.actions.secondary.label}
      </a>
    </div>
  )
}
