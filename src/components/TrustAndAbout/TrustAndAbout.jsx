import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './TrustAndAbout.module.css'

const clientRows = [
  ['NØRTH /', 'the SAGES', 'Hruđa', 'TvojPlot', 'buky__'],
  ['MORROW', 'FIELD /', 'kin.', 'RITUAL', 'NØRTH /'],
]
const testimonials = [
  { quote: 'Working with Alex gave our company a new sense of focus. He captured the heart of our work and made it easy for the right people to recognise us.', name: 'Maya Phillips', role: 'Founder, Morrow' },
  { quote: 'Thoughtful, fast, and unusually clear. Every decision had a reason behind it, and the result is a brand we are proud to bring into the world.', name: 'Noah Reed', role: 'Creative Director' },
  { quote: 'From the first conversation to launch, Alex understood our ambitions. The finished site has helped us speak with confidence and grow with intention.', name: 'Rae Sullivan', role: 'Co-founder, North' },
]

export function TrustAndAbout() {
  const root = useRef(null)
  const disc = useRef(null)
  const cards = useRef([])
  const portrait = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return undefined
    gsap.fromTo(`.${styles.logo}`, { opacity: 0 }, { opacity: 1, stagger: { each: 0.045, from: 'center' }, duration: 0.52, ease: 'power2.out', scrollTrigger: { trigger: `.${styles.clients}`, start: 'top 78%', once: true } })
    gsap.from(`.${styles.aboutPanel}`, { y: 56, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: `.${styles.about}`, start: 'top 75%', once: true } })
    gsap.to(portrait.current, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: `.${styles.about}`, start: 'top bottom', end: 'bottom top', scrub: 0.8 } })
    gsap.set(disc.current, { xPercent: -50 })
    const feedbackTimeline = gsap.timeline({
      scrollTrigger: { trigger: `.${styles.testimonials}`, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    })
    feedbackTimeline.fromTo(disc.current, { yPercent: -52, rotate: -28 }, { yPercent: 10, rotate: 220, duration: 1.2, ease: 'none' }, 0)
    const cardPositions = [
      { x: -46, y: -88, rotation: -1.5 },
      { x: 0, y: 82, rotation: 0 },
      { x: 46, y: -32, rotation: 1.5 },
    ]
    cards.current.filter(Boolean).forEach((card, index) => {
      const position = cardPositions[index]
      feedbackTimeline.fromTo(card, { x: position.x, y: position.y + 75, rotation: position.rotation, opacity: 0, scale: 0.9 }, { x: position.x, y: position.y, rotation: position.rotation, opacity: 1, scale: 1, duration: 0.52, ease: 'power2.out' }, 0.16 + index * 0.12)
    })
    return () => feedbackTimeline.kill()
  }, { scope: root, dependencies: [prefersReducedMotion] })

  return <div ref={root}>
    <section className={styles.clients} aria-labelledby="clients-title">
      <p id="clients-title">Clients who trust me</p>
      <h2>I partner with ambitious businesses, established companies, startups and agencies to build brands that make a lasting impression.</h2>
      <div className={styles.logoRows}>
        {clientRows.map((row, rowIndex) => <div className={`${styles.logoRow} ${rowIndex === 0 ? styles.slideLeft : styles.slideRight}`} key={rowIndex}>
          {[...row, ...row].map((client, index) => <div className={styles.logo} key={`${client}-${index}`}>{client}</div>)}
        </div>)}
      </div>
    </section>

    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.aboutPanel}>
        <div className={styles.portrait} ref={portrait} aria-label="Abstract portrait illustration"><span className={styles.hair} /><span className={styles.face} /><span className={styles.glasses} /><span className={styles.shirt} /></div>
        <div className={styles.aboutContent}>
          <h2 id="about-title">I have a <i>passion</i><br />for <i>design</i> and<br /><i>strategy.</i></h2>
          <div className={styles.aboutCopy}><p>My curiosity for design has always gone hand in hand with a love of strategy and technology. I build visual systems that feel clear, useful, and full of character.</p><p>Today, I help ambitious teams create brands and websites that communicate with confidence, build trust, and support meaningful growth.</p></div>
          <a href="#contact">Let’s get in touch <span>↗</span></a>
        </div>
      </div>
    </section>

    <section className={styles.testimonials} aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">Kind words</h2>
      <div className={styles.disc} ref={disc} aria-hidden="true"><svg viewBox="0 0 500 500"><defs><path id="orbit" d="M250,250 m-187,0 a187,187 0 1,1 374,0 a187,187 0 1,1 -374,0" /></defs><text><textPath href="#orbit">AT THE END OF THE DAY, YOUR SATISFACTION MATTERS MOST · AT THE END OF THE DAY, YOUR SATISFACTION MATTERS MOST · </textPath></text></svg><span>“</span></div>
      <div className={styles.testimonialGrid}>{testimonials.map((item, index) => <blockquote className={styles.testimonial} key={item.name} ref={(element) => { cards.current[index] = element }}><p>“{item.quote}”</p><footer><strong>{item.name}</strong><span>{item.role}</span></footer></blockquote>)}</div>
    </section>
  </div>
}
