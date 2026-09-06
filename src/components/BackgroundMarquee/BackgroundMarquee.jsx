import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import styles from './BackgroundMarquee.module.css'

const words = site.marqueeText.split('/').map((word) => word.trim())

function MarqueeGroup() {
  return (
    <span className={styles.group}>
      {words.map((word, index) => (
        <span key={word} className={styles.word}>
          <span className={index % 2 === 0 ? styles.plain : styles.accent}>{word}</span>
          {index < words.length - 1 && <span className={styles.sep}>/</span>}
        </span>
      ))}
    </span>
  )
}

export function BackgroundMarquee() {
  const trackRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 38,
        ease: 'none',
        repeat: -1,
      })
      return () => tween.kill()
    },
    { dependencies: [prefersReducedMotion] },
  )

  return (
    <div className={styles.marquee}>
      <div className={styles.track} ref={trackRef} data-testid="marquee-track" aria-hidden="true">
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </div>
  )
}
