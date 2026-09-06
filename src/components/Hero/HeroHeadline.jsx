import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import styles from './HeroHeadline.module.css'

function HeadlinePart({ part }) {
  if (part.type === 'image') {
    return (
      <span
        role="img"
        aria-label={part.alt}
        className={styles.thumb}
        data-hero-thumb
        style={{ background: part.gradient }}
      />
    )
  }
  if (part.type === 'accent') {
    return <span className={styles.accent}>{part.value}</span>
  }
  return <span>{part.value}</span>
}

export function HeroHeadline() {
  const rootRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const lines = rootRef.current.querySelectorAll(`.${styles.line}`)
      gsap.from(lines, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })

      if (prefersReducedMotion) return
      const thumbs = rootRef.current.querySelectorAll('[data-hero-thumb]')
      thumbs.forEach((thumb, index) => {
        gsap.to(thumb, {
          yPercent: index % 2 === 0 ? 20 : -20,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <h1 className={styles.headline} data-hero-headline ref={rootRef}>
      <span className={styles.line}>
        {site.headline.lineOne.map((part, index) => (
          <HeadlinePart key={index} part={part} />
        ))}
      </span>
      <span className={styles.line}>
        {site.headline.lineTwo.map((part, index) => (
          <HeadlinePart key={index} part={part} />
        ))}
      </span>
    </h1>
  )
}
