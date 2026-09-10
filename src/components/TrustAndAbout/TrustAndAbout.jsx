import { useLayoutEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import monikaPhoto from '../../assets/monika_pic.jpeg'
import ayushPhoto from '../../assets/ayush-pic.png'
import kdPhoto from '../../assets/kd_pic.jpeg'
import kunalPhoto from '../../assets/kunal_pic.jpeg'
import styles from './TrustAndAbout.module.css'

const clientRows = [
  ['Academic Planning', 'Dr. Parth’s Clinic', 'Jai Ramdev Timber', 'Fitora', 'Arohan Health', 'Nivra Homes'],
  ['Saanjh Foods', 'Kshetra Labs', 'Academic Planning', 'Dr. Parth’s Clinic', 'Jai Ramdev Timber', 'Fitora'],
]
const testimonials = [
  { quote: 'Working with Alex gave our company a new sense of focus. He captured the heart of our work and made it easy for the right people to recognise us.', name: 'Maya Phillips', role: 'Founder, Morrow', logo: 'Morrow' },
  { quote: 'Thoughtful, fast, and unusually clear. Every decision had a reason behind it, and the result is a brand we are proud to bring into the world.', name: 'Noah Reed', role: 'Creative Director' },
  { quote: 'From the first conversation to launch, Alex understood our ambitions. The finished site has helped us speak with confidence and grow with intention.', name: 'Rae Sullivan', role: 'Co-founder, North', logo: 'NØRTH' },
]
const teamMembers = [
  { name: 'Monika', role: 'Machine Learning Engineer', bio: 'Builds intelligent systems end to end, from machine learning models and data analysis to full-stack apps running on resilient cloud infrastructure.', photo: monikaPhoto, tone: 'coral' },
  { name: 'Ayush', role: 'Systems & Solutions Architect', bio: 'Designs cloud-native systems end to end, covering architecture, DevOps automation, and mobile development, so products run smoothly at scale.', photo: ayushPhoto, tone: 'sand' },
  { name: 'KD', role: 'Full-Stack Developer', bio: 'Builds complete web applications across the stack, from backend services and APIs to polished, responsive frontend interfaces.', photo: kdPhoto, tone: 'blue' },
  { name: 'Kunal', role: 'iOS & AI Engineer', bio: 'Ships native iOS experiences and applies strong foundations in data science and algorithms to build intelligent, full-stack products.', photo: kunalPhoto, tone: 'violet' },
]

export function TrustAndAbout() {
  const root = useRef(null)
  const disc = useRef(null)
  const cards = useRef([])
  const portrait = useRef(null)
  const teamCards = useRef([])
  const teamPhotos = useRef([])
  const teamImages = useRef([])
  const teamInfo = useRef([])
  const teamRail = useRef(null)
  const teamData = useRef(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(() => {
    if (prefersReducedMotion) return undefined
    gsap.fromTo(`.${styles.logo}`, { opacity: 0 }, { opacity: 1, stagger: { each: 0.045, from: 'center' }, duration: 0.52, ease: 'power2.out', scrollTrigger: { trigger: `.${styles.clients}`, start: 'top 78%', once: true } })
    gsap.from(`.${styles.aboutPanel}`, { y: 56, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: `.${styles.about}`, start: 'top 75%', once: true } })
    gsap.set(disc.current, { xPercent: -50 })
    const feedbackTimeline = gsap.timeline({
      scrollTrigger: { trigger: `.${styles.testimonials}`, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    })
    feedbackTimeline.fromTo(disc.current, { yPercent: -16, rotate: -28 }, { yPercent: 10, rotate: 220, duration: 1.2, ease: 'none' }, 0)
    const cardPositions = [
      { x: -46, y: 32, rotation: -1.5 },
      { x: 0, y: 202, rotation: 0 },
      { x: 46, y: 88, rotation: 1.5 },
    ]
    cards.current.filter(Boolean).forEach((card, index) => {
      const position = cardPositions[index]
      feedbackTimeline.fromTo(card, { x: position.x, y: position.y + 75, rotation: position.rotation, opacity: 0, scale: 0.9 }, { x: position.x, y: position.y, rotation: position.rotation, opacity: 1, scale: 1, duration: 0.52, ease: 'power2.out' }, 0.16 + index * 0.12)
    })
    return () => { feedbackTimeline.kill() }
  }, { scope: root, dependencies: [prefersReducedMotion] })

  useLayoutEffect(() => {
    const cardNodes = teamCards.current.filter(Boolean)
    if (!portrait.current || !cardNodes.length) return undefined

    const media = gsap.matchMedia()
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.fromTo(cardNodes, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: portrait.current, start: 'top 85%', toggleActions: 'play none none none' },
        })
        return
      }

      media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (context) => {
        const { mobile } = context.conditions

        gsap.to(teamRail.current, {
          x: () => -Math.max(0, teamRail.current.scrollWidth - portrait.current.clientWidth + (mobile ? 28 : 72)),
          ease: 'none',
          scrollTrigger: {
            trigger: portrait.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        cardNodes.forEach((card, index) => {
          const visual = teamImages.current[index] || teamPhotos.current[index]
          const info = teamInfo.current[index]
          const offset = mobile ? (index % 2 === 0 ? -8 : -18) : (index % 2 === 0 ? -20 : -42)

          gsap.to(visual, {
            y: offset,
            ease: 'none',
            scrollTrigger: {
              trigger: portrait.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })

          const reveal = gsap.timeline({
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
          reveal
            .fromTo(visual, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.2, ease: 'power3.out' })
            .fromTo(info, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, 0.3)
        })

      })
    }, portrait)

    return () => { media.revert(); ctx.revert() }
  }, [prefersReducedMotion])

  useGSAP(() => {
    if (prefersReducedMotion || selectedMember === null || !teamData.current) return undefined
    const tween = gsap.fromTo(teamData.current, { autoAlpha: 0, y: 28, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out' })
    return () => tween.kill()
  }, { scope: root, dependencies: [selectedMember, prefersReducedMotion] })

  return <div ref={root}>
    <section className={styles.clients} aria-labelledby="clients-title">
      <p id="clients-title">Selected work</p>
      <h2>From academic management systems and healthcare portfolios to business websites and fitness platforms, we build useful digital products that are ready to grow.</h2>
      <div className={styles.logoRows}>
        {clientRows.map((row, rowIndex) => <div className={`${styles.logoRow} ${rowIndex === 0 ? styles.slideLeft : styles.slideRight}`} key={rowIndex}>
          {[...row, ...row].map((client, index) => <div className={styles.logo} key={`${client}-${index}`}>{client}</div>)}
        </div>)}
      </div>
    </section>

    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.aboutPanel}>
        <div className={`${styles.portrait} ${selectedMember !== null ? styles.portraitExpanded : ''}`} ref={portrait} aria-label="Four-person team gallery">
          <div className={styles.teamGrid}>
            <div className={styles.teamHeader}>
              <p>Our team <span>04</span></p>
              <h3>People who bring<br />ideas to life.</h3>
              <small>Scroll to meet the team <b>↓</b></small>
            </div>
            <div className={styles.teamRail} ref={teamRail}>
              {teamMembers.map((member, index) => <div className={`${styles.teamItem} ${selectedMember === index ? styles.teamItemSelected : ''}`} key={member.name}>
                <button type="button" className={`${styles.teamCard} ${styles[member.tone]} ${selectedMember === index ? styles.teamSelected : ''}`} ref={(node) => { teamCards.current[index] = node }} onClick={() => setSelectedMember((current) => current === index ? null : index)} aria-label={`Open details for ${member.name}`} aria-pressed={selectedMember === index}>
                  <div className={styles.teamPhoto} ref={(node) => { teamPhotos.current[index] = node }}>
                    {member.photo ? <img ref={(node) => { teamImages.current[index] = node }} src={member.photo} alt={member.name} /> : <b>Add photo</b>}
                    <i>{String(index + 1).padStart(2, '0')}</i>
                  </div>
                  <div className={styles.teamInfo} ref={(node) => { teamInfo.current[index] = node }}><strong>{member.name}</strong><small>{member.role}</small></div>
                </button>
                {selectedMember === index && <aside className={styles.teamInlineData} ref={teamData} aria-live="polite">
                  <button type="button" className={styles.closeTeamData} onClick={() => setSelectedMember(null)} aria-label="Close team member details">×</button>
                  <p>Team member {String(index + 1).padStart(2, '0')}</p>
                  <h3>{member.name}</h3>
                  <strong>{member.role}</strong>
                  <span>{member.bio}</span>
                </aside>}
              </div>)}
            </div>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <h2 id="about-title">We have a <i>passion</i><br />for <i>engineering</i> and<br /><i>craft.</i></h2>
          <div className={styles.aboutCopy}><p>Our curiosity for building things has always gone hand in hand with a love of solving real problems. We write code that feels clear, reliable, and built to last.</p><p>Today, we help ambitious founders ship products that work under real conditions, hold up in production, and support real growth.</p></div>
          <a href="#contact">Let’s get in touch <span>↗</span></a>
        </div>
      </div>
    </section>

    <section className={styles.testimonials} aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">Kind words</h2>
      <div className={styles.disc} ref={disc} aria-hidden="true"><svg viewBox="0 0 500 500"><defs><path id="orbit" d="M250,250 m-187,0 a187,187 0 1,1 374,0 a187,187 0 1,1 -374,0" /></defs><text><textPath href="#orbit">AT THE END OF THE DAY, YOUR SATISFACTION MATTERS MOST · AT THE END OF THE DAY, YOUR SATISFACTION MATTERS MOST · </textPath></text></svg><span>“</span></div>
      <div className={styles.testimonialGrid}>{testimonials.map((item, index) => <blockquote className={styles.testimonial} key={item.name} ref={(element) => { cards.current[index] = element }}><p>“{item.quote}”</p><footer><div className={styles.testimonialMeta}><strong>{item.name}</strong><span>{item.role}</span></div>{item.logo && <span className={styles.testimonialLogo}>{item.logo}</span>}</footer></blockquote>)}</div>
    </section>
  </div>
}
