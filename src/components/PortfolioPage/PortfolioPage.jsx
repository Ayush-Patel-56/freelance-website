import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './PortfolioPage.module.css'

const projects = [
  { number: '01', title: 'Afterlight', year: '2026', tags: ['Digital direction', 'Web design', 'Development'], color: 'ember', words: ['A/R', 'AFTER', 'LIGHT'], note: 'A modular identity for a cultural studio working after dark.' },
  { number: '02', title: 'Morrow Studio', year: '2025', tags: ['Identity', 'Art direction'], color: 'cobalt', words: ['MORROW', 'OBJECTS', '01'], note: 'A tactile digital home for ideas made to last.' },
  { number: '03', title: 'Kindred Index', year: '2025', tags: ['Strategy', 'Web design'], color: 'lime', words: ['KINDRED', 'INDEX', 'K/I'], note: 'A visual system for a new index of independent makers.' },
  { number: '04', title: 'Common Thread', year: '2024', tags: ['Campaign', 'Digital'], color: 'violet', words: ['COMMON', 'THREAD', 'C/T'], note: 'A campaign space built around the human side of technology.' },
]

function Arrow() { return <span aria-hidden="true" className={styles.arrow}>↗</span> }

function ProjectArt({ project, compact = false }) {
  return <div className={`${styles.art} ${styles[project.color]} ${compact ? styles.artCompact : ''}`} aria-hidden="true">
    <div className={styles.artGrid} /><div className={styles.orb} />
    <span className={styles.artType}>{project.words[0]}</span><span className={styles.artIndex}>{project.words[2]}</span>
    {!compact && <div className={styles.artRule} />}
  </div>
}

function Tags({ tags }) { return <div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div> }

function WorkCard({ project, isActive, onActivate, cardRef }) {
  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onActivate() }
  }
  return <article ref={cardRef} className={`${styles.workCard} ${isActive ? styles.active : ''}`} onMouseEnter={onActivate} onFocus={onActivate} onKeyDown={onKeyDown} tabIndex="0" aria-label={`${project.title}, ${project.year}`}>
    <div className={styles.cardTop}>
      <span className={styles.projectNumber}>{project.number}</span>
      <h3>{project.title} <em>({project.year})</em></h3>
      <Tags tags={project.tags} />
      <div className={styles.previewPair}><ProjectArt project={project} compact /><ProjectArt project={{ ...project, words: [project.words[1], project.words[0], project.number] }} compact /></div>
      <a href="#contact" className={styles.viewLink} onClick={(event) => event.stopPropagation()}>View project <Arrow /></a>
    </div>
    <div className={styles.projectBody} aria-hidden={!isActive}>
      <div className={styles.bodyArt}><ProjectArt project={project} /></div>
      <div className={`${styles.bodyArt} ${styles.centerArt}`}><ProjectArt project={{ ...project, words: [project.words[1], project.words[0], project.number] }} /></div>
      <div className={`${styles.bodyArt} ${styles.tallArt}`}><ProjectArt project={{ ...project, words: [project.words[2], project.words[1], '∞'] }} /></div>
      <aside className={styles.projectNote}><span>Project note</span><p>{project.note}</p><div>Explore case study <Arrow /></div></aside>
    </div>
  </article>
}

export function PortfolioPage({ showNav = true, showFooter = true }) {
  const [activeProject, setActiveProject] = useState(0)
  const root = useRef(null)
  const cardRefs = useRef([])
  const reducedMotion = usePrefersReducedMotion()
  useGSAP(() => {
    if (reducedMotion) return undefined
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro.from(`.${styles.nav}`, { y: -28, opacity: 0, duration: 0.75 }).from(`.${styles.eyebrow}`, { y: 18, opacity: 0, duration: 0.5 }, '-=0.35').from(`.${styles.heroTitle} span`, { yPercent: 115, stagger: 0.08, duration: 0.9 }, '-=0.25').from(`.${styles.heroBottom}`, { y: 22, opacity: 0, duration: 0.55 }, '-=0.45')
    gsap.utils.toArray(`.${styles.reveal}`).forEach((element) => gsap.from(element, { y: 28, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
    return () => intro.kill()
  }, { scope: root, dependencies: [reducedMotion] })

  useGSAP(() => {
    if (reducedMotion) return undefined
    const activeCard = cardRefs.current[activeProject]
    if (!activeCard) return undefined
    const targets = activeCard.querySelectorAll(`.${styles.bodyArt}, .${styles.projectNote}, .${styles.viewLink}`)
    const tween = gsap.fromTo(targets, { y: 28, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.075, ease: 'power3.out', overwrite: 'auto' })
    return () => tween.kill()
  }, { scope: root, dependencies: [activeProject, reducedMotion] })

  return <div ref={root} className={styles.portfolio}>
    {showNav && <nav className={styles.nav} aria-label="Primary navigation"><a className={styles.brand} href="#top"><i /> Alex Rivera <b>⌄</b></a><div className={styles.navLinks}><a href="#work">My work</a><a href="#contact">Contact <Arrow /></a></div></nav>}
    <header id="top" className={styles.hero}>
      <p className={styles.eyebrow}><span /> Independent digital designer · 2026</p>
      <h1 className={styles.heroTitle} aria-label="Design for brands that move differently."><span>Design for</span><span>brands</span><span className={styles.offsetLine}>that move</span><span><i>differently.</i></span></h1>
      <div className={styles.heroBottom}><div className={styles.socialPills}><a href="https://linkedin.com">Li</a><a href="https://instagram.com">In</a></div><a className={styles.roundButton} href="#work">Explore work <span>↓</span></a></div>
    </header>
    <section id="work" className={`${styles.work} ${styles.reveal}`} aria-labelledby="work-heading">
      <div className={styles.workHeading}><p>01 — 04</p><h2 id="work-heading">My work<span>.</span></h2><p>A considered collection<br />of recent collaborations.</p></div>
      <div className={styles.projectList}>{projects.map((project, index) => <WorkCard key={project.title} project={project} isActive={index === activeProject} onActivate={() => setActiveProject(index)} cardRef={(element) => { cardRefs.current[index] = element }} />)}</div>
      <a className={styles.allWork} href="#contact">More selected work <Arrow /></a>
    </section>
    {showFooter && <PortfolioFooter />}
  </div>
}

export function PortfolioFooter() {
  const root = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  useGSAP(() => {
    if (reducedMotion) return undefined
    const lead = root.current?.querySelector(`.${styles.contactLead}`)
    const footer = root.current?.querySelector(`.${styles.studioFooter}`)
    if (!lead || !footer) return undefined
    const leadTween = gsap.from([lead.querySelector('p'), lead.querySelector('h2'), lead.querySelector(`.${styles.contactForm}`)], {
      y: 42, opacity: 0, duration: 0.72, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: lead, start: 'top 74%', once: true },
    })
    const footerTween = gsap.from(footer.querySelectorAll(`.${styles.footerMonogram}, .${styles.footerSocial}, .${styles.footerContact}, .${styles.footerMarquee}, .${styles.footerLegal}`), {
      y: 34, opacity: 0, duration: 0.62, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: footer, start: 'top 78%', once: true },
    })
    return () => { leadTween.kill(); footerTween.kill() }
  }, { scope: root, dependencies: [reducedMotion] })

  return <section ref={root} id="contact" className={styles.contact}>
    <div className={styles.contactLead}>
      <p>Fluent in English, German and Spanish</p>
      <h2>Let’s discuss<br /><i>your</i> vision.</h2>
      <form className={styles.contactForm} onSubmit={(event) => event.preventDefault()}>
        <label><span>Name</span><input name="name" placeholder=" " autoComplete="name" required /></label>
        <label><span>Email</span><input name="email" type="email" placeholder=" " autoComplete="email" required /></label>
        <label><span>Message</span><textarea name="message" placeholder=" " required /></label>
        <label className={styles.consent}><input type="checkbox" required /><span>I have read the privacy policy and consent to the processing of my personal data for the purpose of responding to my enquiry.</span></label>
        <button type="submit">Send a message <Arrow /></button>
      </form>
    </div>
    <footer className={styles.studioFooter}>
      <div className={styles.footerMonogram}>A<i /></div>
      <div className={styles.footerSocial}><strong>Socials</strong><div><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="https://instagram.com" aria-label="Instagram">ig</a></div></div>
      <a className={styles.backTop} href="#top" aria-label="Back to top">▲</a>
      <div className={styles.footerContact}><a href="mailto:hello@alexrivera.studio">hello@alexrivera.studio</a><a href="tel:+493012345678">+49 30 1234 5678</a></div>
      <div className={styles.footerMarquee}><span>BASED IN BERLIN · AVAILABLE WORLDWIDE · BASED IN BERLIN · AVAILABLE WORLDWIDE · </span></div>
      <div className={styles.footerLegal}><span>©2026 Alex Rivera. Built with intent.</span><a href="#privacy">Privacy policy</a></div>
    </footer>
  </section>
}
