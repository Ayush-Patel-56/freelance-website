import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import styles from './BrandStatement.module.css'

function tokenizeSegments(segments) {
  const tokens = []
  segments.forEach((segment, segmentIndex) => {
    const parts = segment.value.match(/\s+|\S+/g) || []
    parts.forEach((part, partIndex) => {
      tokens.push({
        text: part,
        bold: segment.bold,
        isSpace: /^\s+$/.test(part),
        key: `${segmentIndex}-${partIndex}`,
      })
    })
  })
  return tokens
}

export function BrandStatement() {
  const sectionRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const tokens = tokenizeSegments(site.brandStatement)

  useGSAP(
    () => {
      const words = gsap.utils.toArray(`.${styles.word}`, sectionRef.current)

      if (prefersReducedMotion) {
        gsap.set(words, { opacity: 1 })
        return undefined
      }

      gsap.set(words, { opacity: 0.25 })

      const tween = gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 0.6,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  )

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <p className={styles.text}>
          {tokens.map((token) =>
            token.isSpace ? (
              token.text
            ) : (
              <span
                key={token.key}
                className={`${styles.word} ${token.bold ? styles.bold : ''}`}
              >
                {token.text}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
