import { useState } from 'react'
import productEngineering from '../../assets/service-product-engineering.png'
import aiData from '../../assets/service-ai-data.png'
import platformSecurity from '../../assets/service-platform-security.png'
import processDiscover from '../../assets/process-discover.jpg'
import processDefine from '../../assets/process-define.jpg'
import processBuild from '../../assets/process-build.jpg'
import processEvolve from '../../assets/process-evolve.jpg'
import styles from './ProcessServices.module.css'

const processSteps = [
  { number: '01', title: 'Discover', text: 'We dig into the problem, the users, and what actually needs to ship, no guessing, no assumptions carried in from another project.', image: processDiscover, alt: 'Team collaborating around sticky notes during a discovery session' },
  { number: '02', title: 'Define', text: "We turn what we've learned into a clear technical plan, an honest timeline, and a scope you can hold us to.", image: processDefine, alt: 'Team planning a technical roadmap on a glass wall' },
  { number: '03', title: 'Build', text: "Design and engineering move together, we write code that's built for production, not just built to demo.", image: processBuild, alt: 'Close-up of code on a computer screen' },
  { number: '04', title: 'Evolve', text: 'We ship with confidence, then keep improving performance, features, and reliability as you grow.', image: processEvolve, alt: 'Analytics dashboard showing growth data' },
]

const services = [
  {
    number: '01', title: 'Product Engineering',
    text: 'Digital products designed around real user needs, then built across responsive web, mobile and backend systems.',
    capabilities: ['UX & UI design', 'Responsive web apps', 'Mobile applications', 'Backend APIs'],
    outcome: 'A coherent product experience, ready for real users and future growth.',
    bestFor: 'New digital products, internal tools and businesses improving a key customer journey.',
    delivery: ['User flows & wireframes', 'Interface & design system', 'Frontend implementation', 'Backend, QA & release'],
    image: productEngineering, alt: 'Laptop and mobile product interface visual',
  },
  {
    number: '02', title: 'AI & Data Systems',
    text: 'Useful AI, machine learning and data solutions that turn complex information into practical momentum.',
    capabilities: ['Gen AI workflows', 'Machine learning', 'Data science', 'Analytics & automation'],
    outcome: 'Intelligence that supports faster decisions and more useful customer experiences.',
    bestFor: 'Teams with valuable data, repetitive workflows or a clear opportunity for AI-assisted products.',
    delivery: ['Data & use-case audit', 'AI workflow design', 'Model & API integration', 'Measurement & iteration'],
    image: aiData, alt: 'Abstract AI and data visualisation',
  },
  {
    number: '03', title: 'Secure Platforms',
    text: 'Scalable solution architecture, security and DevOps foundations that keep ambitious products dependable.',
    capabilities: ['Solution architecture', 'Cloud & DevOps', 'Application security', 'Performance engineering'],
    outcome: 'A resilient technical foundation that can launch confidently and scale safely.',
    bestFor: 'Growing products that need a stronger technical foundation before the next stage of scale.',
    delivery: ['Architecture review', 'Cloud & CI/CD setup', 'Security hardening', 'Monitoring & optimisation'],
    image: platformSecurity, alt: 'Abstract secure platform infrastructure visual',
  },
]

function Arrow() { return <span className={styles.arrow} aria-hidden="true">↗</span> }

function ProcessArtwork({ image, alt }) {
  return <div className={styles.processArt}>
    <img src={image} alt={alt} />
  </div>
}

function ServiceArtwork({ image, alt }) {
  return <div className={styles.serviceArtwork}>
    <img src={image} alt={alt} />
  </div>
}

export function ProcessServices() {
  const [activeService, setActiveService] = useState(2)

  return <>
    <section className={styles.process} aria-labelledby="process-title">
      <div className={styles.processHeading}><p>How we work</p><h2 id="process-title">Our Process</h2></div>
      <div className={styles.stack}>
        {processSteps.map((step) => <article className={styles.processCard} key={step.number}>
          <div className={styles.processCardTop}><h3>{step.title}</h3><span>{step.number}</span></div>
          <ProcessArtwork image={step.image} alt={step.alt} />
          <p>{step.text}</p>
          <a href="#services">Next phase <Arrow /></a>
        </article>)}
      </div>
      <a className={styles.processLink} href="#services">See all services <Arrow /></a>
    </section>

    <section className={styles.services} id="services" aria-labelledby="services-title">
      <div className={styles.servicesIntro}><p>What we do</p><h2 id="services-title">Services</h2><p>From product ideas to intelligent, secure systems built to perform and scale.</p></div>
      <div className={styles.serviceRail}>
        {services.map((service, index) => <article className={`${styles.serviceCard} ${index === activeService ? styles.serviceActive : ''}`} key={service.number} onMouseEnter={() => setActiveService(index)}>
          <button type="button" onClick={() => setActiveService(index)} aria-expanded={index === activeService} aria-label={`${service.title} service`}>
            <span>{service.number}</span><strong>{service.title}</strong>
          </button>
          <div className={styles.serviceDetail}>
            <ServiceArtwork image={service.image} alt={service.alt} />
            <div className={styles.serviceCopy}>
              <p>{service.text}</p>
              <div className={styles.serviceCapabilities}><span>Capabilities</span><ul>{service.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div>
              <div className={styles.serviceOutcome}><span>What you get</span><strong>{service.outcome}</strong></div>
              <div className={styles.serviceBestFor}><span>Best for</span><p>{service.bestFor}</p></div>
              <div className={styles.serviceDelivery}><span>Typical delivery</span><ul>{service.delivery.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </div>
        </article>)}
      </div>
    </section>
  </>
}
