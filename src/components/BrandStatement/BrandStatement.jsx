import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import styles from './BrandStatement.module.css'

export function BrandStatement() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'power2.out',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <p className={styles.text} ref={textRef}>
          {site.brandStatement.map((segment, index) => (
            <span key={index} className={segment.bold ? styles.bold : undefined}>
              {segment.value}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
