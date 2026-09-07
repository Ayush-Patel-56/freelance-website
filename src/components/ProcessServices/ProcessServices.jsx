import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './ProcessServices.module.css'

const processSteps = [
  { number: '01', title: 'Consultation', text: 'We start face to face: aligning the project goals, scope, and a clear path forward.', theme: 'paper' },
  { number: '02', title: 'Strategy', text: 'I turn the useful conversations into a focused idea, a sharp position, and a practical roadmap.', theme: 'sunset' },
  { number: '03', title: 'Direction', text: 'We explore visual routes and select the one with the most energy and long-term potential.', theme: 'electric' },
  { number: '04', title: 'Design', text: 'The system comes to life across every selected touchpoint, ready to be used with confidence.', theme: 'dark' },
]

const services = [
  { number: '01', title: 'Visual Identity', text: 'Strategic visual identities for businesses ready to be recognised, remembered, and chosen.', palette: 'yellow' },
  { number: '02', title: 'Web Design', text: 'Clear, expressive websites that make your brand feel as considered online as it does everywhere else.', palette: 'cobalt' },
  { number: '03', title: 'Webflow Development', text: 'Fast, scalable Webflow builds with clean structure, thoughtful motion, and an easy-to-manage CMS.', palette: 'red' },
]

function Arrow() { return <span className={styles.arrow} aria-hidden="true">↗</span> }

function ProcessArtwork({ theme }) {
  return <div className={`${styles.processArt} ${styles[theme]}`} aria-hidden="true"><span /><i /><b /></div>
}

function ServiceArtwork({ palette, title }) {
  return <div className={`${styles.serviceArtwork} ${styles[palette]}`} aria-hidden="true">
    <div className={styles.laptop}><div className={styles.screen}><span>{title}</span><i /><b /></div><div className={styles.keyboard} /></div>
  </div>
}

export function ProcessServices() {
  const processRef = useRef(null)
  const cardsRef = useRef([])
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeService, setActiveService] = useState(2)

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (prefersReducedMotion) return undefined
    gsap.set(cards, { zIndex: (index) => cards.length - index })
    gsap.set(cards.slice(1), {
      y: (index) => 30 * (index + 1),
      x: (index) => 10 * (index + 1),
      opacity: (index) => 0.42 - index * 0.06,
      scale: (index) => 0.97 - index * 0.025,
    })
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: processRef.current, start: 'top top', end: '+=240%', scrub: 0.7, pin: true },
    })
    cards.slice(1).forEach((card, index) => {
      timeline.to(cards[index], { y: -36, scale: 0.93, opacity: 0.28, duration: 1 }, index)
      timeline.set(card, { zIndex: cards.length + index + 1 }, index)
      timeline.to(card, { x: 0, y: 0, scale: 1, opacity: 1, duration: 1 }, index)
    })
    return () => timeline.kill()
  }, { scope: processRef, dependencies: [prefersReducedMotion] })

  return <>
    <section className={styles.process} ref={processRef} aria-labelledby="process-title">
      <div className={styles.processHeading}><p>How we work</p><h2 id="process-title">My Process</h2></div>
      <div className={styles.stack}>
        {processSteps.map((step, index) => <article className={styles.processCard} ref={(element) => { cardsRef.current[index] = element }} key={step.number}>
          <div className={styles.processCardTop}><h3>{step.title}</h3><span>{step.number}</span></div>
          <ProcessArtwork theme={step.theme} />
          <p>{step.text}</p>
          <a href="#services">Next phase <Arrow /></a>
        </article>)}
      </div>
      <a className={styles.processLink} href="#services">See all services <Arrow /></a>
    </section>

    <section className={styles.services} id="services" aria-labelledby="services-title">
      <div className={styles.servicesIntro}><p>What I do</p><h2 id="services-title">Services</h2><p>From first ideas to an expressive, reliable digital home.</p></div>
      <div className={styles.serviceRail}>
        {services.map((service, index) => <article className={`${styles.serviceCard} ${index === activeService ? styles.serviceActive : ''}`} key={service.number} onMouseEnter={() => setActiveService(index)}>
          <button type="button" onClick={() => setActiveService(index)} aria-expanded={index === activeService} aria-label={`${service.title} service`}>
            <span>{service.number}</span><strong>{service.title}</strong>
          </button>
          <div className={styles.serviceDetail}>
            <ServiceArtwork palette={service.palette} title={service.title} />
            <div className={styles.serviceCopy}><p>{service.text}</p><a href="#contact">See related work <Arrow /></a></div>
          </div>
        </article>)}
      </div>
    </section>
  </>
}
