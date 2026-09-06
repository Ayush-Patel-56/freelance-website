import { site } from '../../content/site'
import styles from './HeroTagline.module.css'

export function HeroTagline() {
  return (
    <p className={styles.tagline} data-hero-tagline>
      <span className={styles.dot} aria-hidden="true" />
      {site.tagline}
    </p>
  )
}
