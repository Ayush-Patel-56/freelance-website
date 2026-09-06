import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import styles from './BackgroundMarquee.module.css'

export function BackgroundMarquee() {
  const trackRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 20,
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
        <span>{site.marqueeText}</span>
        <span>{site.marqueeText}</span>
      </div>
    </div>
  )
}
