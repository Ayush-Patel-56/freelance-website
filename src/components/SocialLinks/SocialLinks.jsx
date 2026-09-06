import { site } from '../../content/site'
import styles from './SocialLinks.module.css'

export function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      {site.social.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={label}
        >
          {label.slice(0, 2)}
        </a>
      ))}
    </div>
  )
}
