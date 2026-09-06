import { useId } from 'react'
import { site } from '../../content/site'
import styles from './RotatingBadge.module.css'

export function RotatingBadge({ wrapperRef, ringRef, textRef, arrowRef }) {
  const pathId = useId()
  const loopedText = `${site.badgeText} • ${site.badgeText} • `

  return (
    <div className={styles.wrapper} ref={wrapperRef} aria-hidden="true">
      <div className={styles.ring} ref={ringRef}>
        <svg className={styles.svg} ref={textRef} viewBox="0 0 200 200">
          <path
            id={pathId}
            fill="none"
            d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
          <text className={styles.text}>
            <textPath href={`#${pathId}`} startOffset="0%">
              {loopedText}
            </textPath>
          </text>
        </svg>
      </div>
      <span className={styles.arrow} ref={arrowRef}>
        <svg viewBox="0 0 24 24" width="40" height="40">
          <path d="M4 8l8 9 8-9z" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
