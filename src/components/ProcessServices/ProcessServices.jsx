import { useState } from 'react'
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
  const [activeService, setActiveService] = useState(2)

  return <>
    <section className={styles.process} aria-labelledby="process-title">
      <div className={styles.processHeading}><p>How we work</p><h2 id="process-title">My Process</h2></div>
      <div className={styles.stack}>
        {processSteps.map((step) => <article className={styles.processCard} key={step.number}>
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
