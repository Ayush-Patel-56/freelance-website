import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import academicDashboard from '../../assets/academic-dashboard.png'
import academicPlanning from '../../assets/academic-planning.png'
import drParthPortfolio from '../../assets/dr-parth-portfolio.png'
import jaiRamdevBusiness from '../../assets/jai-ramdev-business.png'
import fitoraDashboard from '../../assets/fitora-dashboard.png'
import sahajWork from '../../assets/sahaj.png'
import sahajPhilosophy from '../../assets/sahaj-1.png'
import pivotpackHero from '../../assets/pivotpack.png'
import pivotpackDesigns from '../../assets/pivotpack-1.png'
import styles from './PortfolioPage.module.css'

const projects = [
  {
    number: '01', title: 'Large Scale Projects', year: '2026', tags: ['LMS', 'Academic management system', 'Development'], color: 'academic',
    words: ['ACADEMIC', 'PLANNING', 'LMS'], note: 'A large-scale academic management system for planning lessons, tracking progress, and supporting faculty workflows.',
    images: [academicDashboard, academicPlanning], demoUrl: 'https://academic-planning-system-two.vercel.app/teacher',
  },
  {
    number: '02', title: 'Professional Portfolio', year: '2026', tags: ['Professional portfolio', 'Web design', 'Development'], color: 'teal',
    words: ['DR PARTH', 'CLINIC', 'P/P'], note: 'A professional digital presence for Dr. Parth’s Brain & Spine Clinic, designed to make care information and appointments easy to access.',
    images: [drParthPortfolio], demoUrl: 'https://www.parthsorathiya.com/',
  },
  {
    number: '03', title: 'Business Website', year: '2026', tags: ['Business website', 'Web design', 'Development'], color: 'forest',
    words: ['JAI RAMDEV', 'TIMBER', 'J/R'], note: 'A clear, conversion-focused website for Jai Ramdev Timber & Plywood, connecting customers to products and enquiries.',
    images: [jaiRamdevBusiness], demoUrl: 'https://jai-ramdev-timber-and-plywood.vercel.app/',
  },
  {
    number: '04', title: 'Architecture Studio Website', year: '2026', tags: ['Architecture portfolio', 'Web design', 'Development'], color: 'violet',
    words: ['STUDIO SAHAJ', 'ARCHITECTURE', 'S/S'], note: 'A portfolio site for Studio Sahaj, an Ahmedabad-rooted architecture studio with a global presence, presenting cultural, residential, and institutional work through a filterable project grid.',
    images: [sahajWork, sahajPhilosophy], demoUrl: 'https://studiosahaj.vercel.app/',
  },
]

const smallScaleProjects = [
  {
    number: '04', title: 'Fitora', year: '2026', tags: ['Fitness platform', 'Web app'], image: fitoraDashboard,
    demoUrl: 'https://fitora-alpha.vercel.app/',
    note: 'A focused training platform that gives every workout a clearer, more motivating home.',
    images: [fitoraDashboard, fitoraDashboard],
  },
  {
    number: '05', title: 'PivotPack', year: '2026', tags: ['Custom packaging', 'Web design'],
    demoUrl: 'https://pivot-pack.vercel.app/',
    note: 'A patent-pending custom cup packaging brand, letting customers design personalized coffee cups for festivals, weddings, and corporate events.',
    images: [pivotpackHero, pivotpackDesigns],
  },
]

function Arrow() { return <span aria-hidden="true" className={styles.arrow}>↗</span> }

function ProjectArt({ project, compact = false, image, imagePosition }) {
  if (image) return <div className={`${styles.art} ${styles.projectImage} ${imagePosition ? styles[imagePosition] : ''} ${compact ? styles.artCompact : ''}`} aria-hidden="true"><img src={image} alt="" /></div>
  return <div className={`${styles.art} ${styles[project.color]} ${compact ? styles.artCompact : ''}`} aria-hidden="true">
    <div className={styles.artGrid} /><div className={styles.orb} />
    <span className={styles.artType}>{project.words[0]}</span><span className={styles.artIndex}>{project.words[2]}</span>
    {!compact && <div className={styles.artRule} />}
  </div>
}

function Tags({ tags }) { return <div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div> }

function ProjectNote({ project }) {
  return <aside className={styles.projectNote}>
    <span>Project note</span>
    <p>{project.note}</p>
    {project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noreferrer">Explore demo <Arrow /></a> : <div>Explore case study <Arrow /></div>}
  </aside>
}

function WorkCard({ project, isActive, onActivate, onDeactivate, cardRef }) {
  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onActivate() }
  }
  return <article ref={cardRef} className={`${styles.workCard} ${isActive ? styles.active : ''}`} onMouseEnter={onActivate} onMouseLeave={onDeactivate} onFocus={onActivate} onKeyDown={onKeyDown} tabIndex="0" aria-label={`${project.title}, ${project.year}`}>
    <div className={styles.cardTop}>
      <span className={styles.projectNumber}>{project.number}</span>
      <h3>{project.title} <em>({project.year})</em></h3>
      <Tags tags={project.tags} />
      <div className={styles.previewPair}>{project.images ? project.images.map((image, index) => <ProjectArt key={`${image}-${index}`} project={project} image={image} imagePosition={project.title === 'Fitora' ? (index === 0 ? 'fitoraOverview' : 'fitoraDetail') : undefined} compact />) : <><ProjectArt project={project} compact /><ProjectArt project={{ ...project, words: [project.words[1], project.words[0], project.number] }} compact /></>}</div>
      <a href={project.demoUrl || '#contact'} target={project.demoUrl ? '_blank' : undefined} rel={project.demoUrl ? 'noreferrer' : undefined} className={styles.viewLink} onClick={(event) => event.stopPropagation()}>View demo <Arrow /></a>
    </div>
    <div className={`${styles.projectBody} ${project.images ? styles.projectBodyWithImages : ''} ${project.images?.length === 1 ? styles.projectBodySingleImage : ''}`} aria-hidden={!isActive}>
      {project.images ? project.images.map((image, index) => <div className={styles.bodyArt} key={`${image}-${index}`}><ProjectArt project={project} image={image} imagePosition={project.title === 'Fitora' ? (index === 0 ? 'fitoraOverview' : 'fitoraDetail') : undefined} />{index === 0 && <ProjectNote project={project} />}</div>) : <><div className={styles.bodyArt}><ProjectArt project={project} /></div><div className={`${styles.bodyArt} ${styles.centerArt}`}><ProjectArt project={{ ...project, words: [project.words[1], project.words[0], project.number] }} /></div><div className={`${styles.bodyArt} ${styles.tallArt}`}><ProjectArt project={{ ...project, words: [project.words[2], project.words[1], '∞'] }} /></div><ProjectNote project={project} /></>}
    </div>
  </article>
}

export function PortfolioPage({ showNav = true, showFooter = true, showHero = true }) {
  const [activeProject, setActiveProject] = useState(0)
  const [activeSmallProject, setActiveSmallProject] = useState(null)
  const root = useRef(null)
  const cardRefs = useRef([])
  const smallCardRefs = useRef([])
  const reducedMotion = usePrefersReducedMotion()
  useGSAP(() => {
    if (reducedMotion) return undefined
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro.from(`.${styles.nav}`, { y: -28, opacity: 0, duration: 0.75 }).from(`.${styles.eyebrow}`, { y: 18, opacity: 0, duration: 0.5 }, '-=0.35').from(`.${styles.heroTitle} span`, { yPercent: 115, stagger: 0.08, duration: 0.9 }, '-=0.25').from(`.${styles.heroBottom}`, { y: 22, opacity: 0, duration: 0.55 }, '-=0.45')
    gsap.utils.toArray(`.${styles.reveal}`).forEach((element) => gsap.from(element, { y: 28, opacity: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
    const smallScale = root.current?.querySelector(`.${styles.smallScale}`)
    const smallScaleTween = smallScale && gsap.from(smallScale.querySelectorAll(`.${styles.smallScaleIntro} > *, .${styles.smallProjectCard}`), {
      y: 52, opacity: 0, duration: 0.82, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: smallScale, start: 'top 82%', once: true },
    })
    // The pinned hero above this section changes the document height after mount.
    // Recalculate once layout has settled so the work cards are not left hidden.
    let refreshFrame = requestAnimationFrame(() => {
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    const refreshTriggers = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshTriggers, { once: true })

    return () => {
      cancelAnimationFrame(refreshFrame)
      window.removeEventListener('load', refreshTriggers)
      intro.kill()
      smallScaleTween?.kill()
    }
  }, { scope: root, dependencies: [reducedMotion] })

  useGSAP(() => {
    if (reducedMotion) return undefined
    const activeCard = cardRefs.current[activeProject]
    if (!activeCard) return undefined
    const targets = activeCard.querySelectorAll(`.${styles.bodyArt}, .${styles.projectNote}, .${styles.viewLink}`)
    const tween = gsap.fromTo(targets, { y: 28, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.075, ease: 'power3.out', overwrite: 'auto' })
    return () => tween.kill()
  }, { scope: root, dependencies: [activeProject, reducedMotion] })

  useGSAP(() => {
    if (reducedMotion || activeSmallProject === null) return undefined
    const activeCard = smallCardRefs.current[activeSmallProject]
    if (!activeCard) return undefined
    const targets = activeCard.querySelectorAll(`.${styles.bodyArt}, .${styles.projectNote}, .${styles.viewLink}`)
    const tween = gsap.fromTo(targets, { y: 28, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.075, ease: 'power3.out', overwrite: 'auto' })
    return () => tween.kill()
  }, { scope: root, dependencies: [activeSmallProject, reducedMotion] })

  return <div ref={root} className={styles.portfolio}>
    {showNav && <nav className={styles.nav} aria-label="Primary navigation"><a className={styles.brand} href="#top"><i /> Alex Rivera <b>⌄</b></a><div className={styles.navLinks}><a href="#work">Our work</a><a href="#contact">Contact <Arrow /></a></div></nav>}
    {showHero && <header id="top" className={styles.hero}>
      <p className={styles.eyebrow}><span /> Independent digital designer · 2026</p>
      <h1 className={styles.heroTitle} aria-label="Digital systems built to scale."><span>Digital</span><span>systems</span><span className={styles.offsetLine}>built to</span><span><i>scale.</i></span></h1>
      <div className={styles.heroBottom}><div className={styles.socialPills}><a href="https://linkedin.com">Li</a><a href="https://instagram.com">In</a></div><a className={styles.roundButton} href="#work">Explore work <span>↓</span></a></div>
    </header>}
    <section id="work" className={`${styles.work} ${styles.reveal}`} aria-labelledby="work-heading">
      <div className={styles.workHeading}><p>01 - 03</p><h2 id="work-heading">Projects<span>.</span></h2><p>A considered collection<br />of recent collaborations.</p></div>
      <div className={styles.projectList}>{projects.map((project, index) => <WorkCard key={project.title} project={project} isActive={index === activeProject} onActivate={() => setActiveProject(index)} cardRef={(element) => { cardRefs.current[index] = element }} />)}</div>
      <section className={styles.smallScale} aria-labelledby="small-scale-heading">
        <div className={styles.smallProjectsHeading}><p>04</p><h2 id="small-scale-heading">Small Scale Projects<span>.</span></h2><p>A focused collection<br />of smaller collaborations.</p></div>
        <div className={styles.projectList}>{smallScaleProjects.map((project, index) => <WorkCard key={project.title} project={project} isActive={index === activeSmallProject} onActivate={() => setActiveSmallProject(index)} onDeactivate={() => setActiveSmallProject(null)} cardRef={(element) => { smallCardRefs.current[index] = element }} />)}</div>
      </section>
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
    const leadTween = gsap.from([
      lead.querySelector(`.${styles.contactEyebrow}`),
      lead.querySelector(`.${styles.contactTitle}`),
      lead.querySelector(`.${styles.contactBio}`),
      lead.querySelector(`.${styles.contactDirect}`),
      lead.querySelector(`.${styles.contactForm}`),
    ].filter(Boolean), {
      y: 38, opacity: 0, duration: 0.72, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: lead, start: 'top 74%', once: true },
    })
    const footerTween = gsap.from(footer.querySelectorAll(`.${styles.footerMonogram}, .${styles.backTop}, .${styles.footerContact}, .${styles.footerMarquee}, .${styles.footerLegal}`), {
      y: 34, opacity: 0, duration: 0.62, stagger: 0.09, ease: 'power3.out', scrollTrigger: { trigger: footer, start: 'top 78%', once: true },
    })
    return () => { leadTween.kill(); footerTween.kill() }
  }, { scope: root, dependencies: [reducedMotion] })

  return <section ref={root} id="contact" className={styles.contact}>
    <div className={styles.contactLead}>
      <div className={styles.contactHeader}>
        <p className={styles.contactEyebrow}>Fluent in English and Hindi</p>
        <h2 className={styles.contactTitle}>Let’s discuss<br /><i>your</i> vision.</h2>
        <p className={styles.contactBio}>
          Have a project in mind, an inquiry, or just want to explore possibilities?
          Let’s craft something timeless together.
        </p>
        <div className={styles.contactDirect}>
          <div className={styles.contactDirectItem}>
            <span className={styles.contactDirectLabel}>Direct inquiry</span>
            <a href="mailto:litmusfront@gmail.com" className={styles.contactDirectLink}>
              litmusfront@gmail.com <Arrow />
            </a>
          </div>
          <div className={styles.contactDirectItem}>
            <span className={styles.contactDirectLabel}>Call us</span>
            <a href="tel:+918238427405" className={styles.contactDirectLink}>
              +91 82384 27405 <Arrow />
            </a>
          </div>
          <div className={styles.contactDirectItem}>
            <span className={styles.contactDirectLabel}>Availability</span>
            <span className={styles.contactDirectValue}>Taking select projects for 2026</span>
          </div>
        </div>
      </div>
      <form className={styles.contactForm} onSubmit={(event) => event.preventDefault()}>
        <label className={styles.field} htmlFor="contact-name">
          <span className={styles.fieldTitle}>Your name</span>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
        </label>
        <label className={styles.field} htmlFor="contact-email">
          <span className={styles.fieldTitle}>Your email</span>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
        </label>
        <label className={`${styles.field} ${styles.fieldArea}`} htmlFor="contact-message">
          <span className={styles.fieldTitle}>Your message</span>
          <textarea id="contact-message" name="message" rows="4" required />
        </label>
        <label className={styles.consent}>
          <input type="checkbox" required />
          <span>I have read the privacy policy and consent to the processing of my personal data for the purpose of responding to my enquiry.</span>
        </label>
        <button type="submit" className={styles.submitBtn}>
          <span>Send a message</span>
          <Arrow />
        </button>
      </form>
    </div>
    <footer className={styles.studioFooter}>
      <div className={styles.footerMonogram}>LF<i /></div>
      <a className={styles.backTop} href="#top" aria-label="Back to top">▲</a>
      <div className={styles.footerContact}><a href="mailto:litmusfront@gmail.com">litmusfront@gmail.com</a><a href="tel:+918238427405">+91 82384 27405</a></div>
      <div className={styles.footerMarquee}><span>PRODUCT ENGINEERING · AI &amp; DATA SYSTEMS · SECURE PLATFORMS · PRODUCT ENGINEERING · AI &amp; DATA SYSTEMS · SECURE PLATFORMS · </span></div>
      <div className={styles.footerLegal}><span>©2026 LitmusFront. Built with intent.</span><a href="#privacy">Privacy policy</a></div>
    </footer>
  </section>
}
