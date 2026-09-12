import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './ScrollCue.module.css'

export function ScrollCue() {
  const buttonRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isNearTop, setIsNearTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => setIsNearTop(window.scrollY < window.innerHeight * 0.5)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useGSAP(() => {
    if (prefersReducedMotion) return
    const tween = gsap.to(buttonRef.current, {
      y: 8,
      duration: 0.9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    return () => tween.kill()
  }, [prefersReducedMotion])

  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles.scrollCue}
      aria-label="Scroll down"
      aria-hidden={!isNearTop}
      tabIndex={isNearTop ? 0 : -1}
      data-hidden={!isNearTop}
      onClick={handleClick}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 4v16m0 0l-6-6m6 6l6-6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
