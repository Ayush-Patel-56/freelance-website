import styles from './NavCard.module.css'

function CardArtwork({ kind, label }) {
  if (kind === 'home') return <div className={styles.homeArtwork} aria-hidden="true"><span>Independent designer · digital partner ·</span></div>
  if (kind === 'services') return <ol className={styles.serviceList} aria-hidden="true"><li><b>01</b>Visual identity</li><li><b>02</b>Web design</li><li><b>03</b>Webflow development</li></ol>
  if (label === 'Work') return <div className={styles.workArtwork} aria-hidden="true"><i /><i /></div>
  if (kind === 'about') return <div className={styles.aboutArtwork} aria-hidden="true"><div className={styles.portrait}><span /><span /><span /></div><p>I have a <em>passion</em><br />for <em>design</em> and<br /><em>strategy.</em></p></div>
  if (kind === 'contact') return <div className={styles.contactArtwork} aria-hidden="true"><p>Fluent in English, German and Spanish</p><strong>Let’s discuss<br /><em>your</em> vision.</strong></div>
  return null
}

export function NavCard({ label, href, kind, isOpen, onNavigate, cardRef }) {
  return (
    <a
      ref={cardRef}
      href={href}
      className={`${styles.card} ${styles[kind || 'work']}`}
      aria-hidden={!isOpen}
      tabIndex={isOpen ? 0 : -1}
      onClick={onNavigate}
    >
      <h2>{label}</h2>
      <CardArtwork kind={kind} label={label} />
    </a>
  )
}
