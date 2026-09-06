import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import { NavCard } from './NavCard'
import styles from './Navbar.module.css'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const cardRefs = useRef([])
  const backdropRef = useRef(null)
  const rootRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const toggle = () => setIsOpen((open) => !open)

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean)
      if (prefersReducedMotion) {
        gsap.set(backdropRef.current, { opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' })
        gsap.set(cards, { opacity: isOpen ? 1 : 0, scale: 1, rotate: 0 })
        return
      }

      if (isOpen) {
        gsap.to(backdropRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.6, rotate: 0 },
          {
            opacity: 1,
            scale: 1,
            rotate: () => gsap.utils.random(-10, 10),
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
          },
        )
      } else {
        gsap.to(backdropRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 })
        gsap.to(cards, {
          opacity: 0,
          scale: 0.6,
          rotate: () => gsap.utils.random(-24, 24),
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.in',
        })
      }
    },
    { scope: rootRef, dependencies: [isOpen, prefersReducedMotion] },
  )

  return (
    <nav className={styles.navbar} ref={rootRef}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-label={site.name}
        onClick={toggle}
      >
        <span className={styles.monogram} aria-hidden="true">
          {site.name.charAt(0)}
        </span>
        {site.name}
      </button>
      <div className={styles.backdrop} ref={backdropRef} />
      <div className={styles.cards}>
        {site.nav.map((item, index) => (
          <NavCard
            key={item.label}
            label={item.label}
            href={item.href}
            isOpen={isOpen}
            cardRef={(el) => (cardRefs.current[index] = el)}
          />
        ))}
      </div>
    </nav>
  )
}
