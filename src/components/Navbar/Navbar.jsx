import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { site } from '../../content/site'
import { NavCard } from './NavCard'
import styles from './Navbar.module.css'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRefs = useRef([])
  const backdropRef = useRef(null)
  const rootRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const openMenu = () => {
    setIsVisible(true)
    setIsOpen(true)
  }
  const closeMenu = () => setIsOpen(false)
  const toggle = () => (isOpen ? closeMenu() : openMenu())

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean)
      if (prefersReducedMotion) {
        gsap.set(backdropRef.current, { opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' })
        gsap.set(cards, { opacity: isOpen ? 1 : 0, y: 0, scale: 1, rotate: 0 })
        if (!isOpen && isVisible) setIsVisible(false)
        return
      }

      gsap.killTweensOf([backdropRef.current, ...cards])
      if (isOpen) {
        gsap.to(backdropRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
        gsap.fromTo(
          cards,
          { opacity: 0, y: 84, scale: 0.92, rotate: 0 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.62,
            stagger: 0.075,
            ease: 'power3.out',
          },
        )
      } else if (isVisible) {
        const closeTimeline = gsap.timeline({ onComplete: () => setIsVisible(false) })
        closeTimeline.to(cards, { opacity: 0, y: 180, scale: 0.96, duration: 0.44, stagger: { each: 0.055, from: 'end' }, ease: 'power3.in' })
          .to(backdropRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.22 }, '-=0.18')
        return () => closeTimeline.kill()
      } else {
        gsap.set(backdropRef.current, { opacity: 0, pointerEvents: 'none' })
        gsap.set(cards, { opacity: 0, y: 84 })
      }
    },
    { scope: rootRef, dependencies: [isOpen, isVisible, prefersReducedMotion] },
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
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.name}>{site.name}</span>
        <span className={styles.chevron} aria-hidden="true">▼</span>
      </button>
      <div className={styles.backdrop} ref={backdropRef} onClick={closeMenu} aria-hidden="true" />
      <div className={`${styles.cards} ${isVisible ? styles.visible : ''}`} aria-label="Site navigation">
        {site.nav.map((item, index) => (
          <NavCard
            key={item.label}
            label={item.label}
            href={item.href}
            kind={item.kind}
            isOpen={isOpen}
            onNavigate={closeMenu}
            cardRef={(el) => (cardRefs.current[index] = el)}
          />
        ))}
      </div>
    </nav>
  )
}
