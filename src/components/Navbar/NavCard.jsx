import styles from './NavCard.module.css'

function CardArtwork({ kind, label }) {
  if (kind === 'home') return <div className={styles.homeArtwork} aria-hidden="true"><span>Dev collective · engineering partner ·</span></div>
  if (kind === 'services') return <ol className={styles.serviceList} aria-hidden="true"><li><b>01</b>Product engineering</li><li><b>02</b>AI & data systems</li><li><b>03</b>Secure platforms</li></ol>
  if (label === 'Work') return <div className={styles.workArtwork} aria-hidden="true"><i /><i /></div>
  if (kind === 'about') return <div className={styles.aboutArtwork} aria-hidden="true">
    <p className={styles.aboutHeadline}>We have a <em>passion</em><br />for <em>engineering</em> and<br /><em>craft.</em></p>
    <div className={styles.aboutFooter}>
      <p className={styles.aboutCopy}>We write code that feels clear, reliable, and built to last, so founders can ship products that hold up in production.</p>
      <span className={styles.aboutLink}>Let’s get in touch <i>↗</i></span>
    </div>
  </div>
  if (kind === 'contact') return <div className={styles.contactArtwork} aria-hidden="true">
    <p className={styles.contactEyebrow}>Fluent in English and Hindi</p>
    <strong className={styles.contactHeadline}>Let’s discuss<br /><em>your</em> vision.</strong>
    <div className={styles.contactFooter}>
      <div className={styles.contactFooterItem}><span className={styles.contactLabel}>Direct inquiry</span><span className={styles.contactValue}>litmusfront@gmail.com</span></div>
      <div className={styles.contactFooterItem}><span className={styles.contactLabel}>Call us</span><span className={styles.contactValue}>+91 82384 27405</span></div>
      <div className={styles.contactFooterItem}><span className={styles.contactLabel}>Availability</span><span className={styles.contactValue}>Taking select projects for 2026</span></div>
    </div>
  </div>
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
