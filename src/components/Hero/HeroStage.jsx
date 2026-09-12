import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import { HeroTagline } from './HeroTagline'
import { HeroHeadline } from './HeroHeadline'
import { RotatingBadge } from './RotatingBadge'
import { BackgroundMarquee } from '../BackgroundMarquee/BackgroundMarquee'
import styles from './HeroStage.module.css'

export function HeroStage() {
  const heroRef = useRef(null)
  const marqueeSectionRef = useRef(null)
  const badgeWrapperRef = useRef(null)
  const badgeRingRef = useRef(null)
  const badgeTextRef = useRef(null)
  const badgeArrowRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.set(badgeWrapperRef.current, { xPercent: -50 })
      const badgeScrollDistance = '+=55%'

      const tween = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      tween
        .fromTo(badgeWrapperRef.current, { yPercent: -105 }, { yPercent: 0, ease: 'none' }, 0)
        .to(badgeRingRef.current, { rotate: 360, ease: 'none' }, 0)

      const pin = ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom top',
        end: badgeScrollDistance,
        pin: marqueeSectionRef.current,
        pinSpacing: true,
      })

      const zoomTween = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'bottom top',
          end: badgeScrollDistance,
          scrub: 0.6,
        },
      })

      zoomTween
        .to(badgeWrapperRef.current, { scale: 8, ease: 'power1.inOut', duration: 1.6 }, 0)
        .to(
          [badgeTextRef.current, badgeArrowRef.current],
          { opacity: 0, ease: 'none', duration: 0.4 },
          0.9,
        )
        .to(
          marqueeSectionRef.current,
          { backgroundColor: '#f96f39', ease: 'none', duration: 0.4 },
          1.6,
        )

      return () => {
        tween.scrollTrigger?.kill()
        pin.kill()
        zoomTween.scrollTrigger?.kill()
      }
    },
    { scope: marqueeSectionRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <div className={styles.stage}>
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroNotch}>
          <span className={styles.notchLetter}>{site.initials}</span>
          <span className={styles.notchDot} aria-hidden="true" />
        </div>
        <div className={styles.heroContent}>
          <HeroTagline />
          <HeroHeadline />
        </div>
      </section>
      <section className={styles.marqueeSection} ref={marqueeSectionRef}>
        <RotatingBadge
          wrapperRef={badgeWrapperRef}
          ringRef={badgeRingRef}
          textRef={badgeTextRef}
          arrowRef={badgeArrowRef}
        />
        <BackgroundMarquee />
      </section>
    </div>
  )
}
