import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { HeroTagline } from './HeroTagline'
import { HeroHeadline } from './HeroHeadline'
import { HeroActions } from './HeroActions'
import { RotatingBadge } from './RotatingBadge'
import { BackgroundMarquee } from '../BackgroundMarquee/BackgroundMarquee'
import styles from './HeroStage.module.css'

export function HeroStage() {
  const heroRef = useRef(null)
  const marqueeSectionRef = useRef(null)
  const badgeWrapperRef = useRef(null)
  const badgeRingRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.set(badgeWrapperRef.current, { xPercent: -50 })

      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      tween
        .fromTo(badgeWrapperRef.current, { yPercent: -105 }, { yPercent: -50, ease: 'none' }, 0)
        .to(badgeRingRef.current, { rotate: 360, ease: 'none' }, 0)

      const pin = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom top',
        end: '+=100%',
        pin: marqueeSectionRef.current,
        pinSpacing: true,
      })

      return () => {
        tween.scrollTrigger?.kill()
        pin.kill()
      }
    },
    { scope: marqueeSectionRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <div className={styles.stage}>
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <HeroTagline />
          <HeroHeadline />
          <HeroActions />
        </div>
      </section>
      <section className={styles.marqueeSection} ref={marqueeSectionRef}>
        <RotatingBadge wrapperRef={badgeWrapperRef} ringRef={badgeRingRef} />
        <BackgroundMarquee />
      </section>
    </div>
  )
}
