import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './FaqSection.module.css'

const questions = [
  ['Who do you typically work with?', 'We partner with ambitious founders, growing teams, established businesses, and agencies that value thoughtful design and a strategic approach.', 'clients'],
  ['How much does a project cost?', 'Every project is shaped around its goals and scope. After our first conversation, we share a transparent proposal with clear milestones and investment.', 'pricing'],
  ['How long does a typical project take?', 'Most product and platform projects take between four and eight weeks, depending on the scope, feedback rhythm, and selected deliverables.', 'timeline'],
  ['What can I expect from our collaboration?', 'You can expect clear communication, honest feedback, and a structured process from start to finish. The best outcomes come from close collaboration.', 'collaboration'],
  ['What do you need to get started?', 'A clear view of your business, goals, and audience is the best start. If you have materials ready, great—if not, we will guide the discovery process.', 'discovery'],
  ['Can you help with product design, development, or both?', 'Yes. We can support product strategy, UX and UI design, web and mobile development, AI workflows, or a combined delivery that brings every part together.', 'services'],
  ['How do you choose the right technology?', 'We select the tools, architecture, and platforms around your users, goals, operational needs, and the scale you expect after launch.', 'development'],
  ['Will I be able to edit the website myself?', 'Yes. Every build includes an intuitive CMS so you can update content confidently without relying on a developer for everyday changes.', 'editing'],
  ['Do you provide support after launch?', 'Yes. Launch is only the beginning. We are available for support, new sections, improvements, and ongoing maintenance as your business evolves.', 'support'],
  ['Is every website optimized for SEO and performance?', 'Yes. Accessibility, responsive design, technical SEO, and performance are integrated from the beginning, not added as an afterthought.', 'performance'],
]

function FaqIcon({ name }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    clients: <><rect x="3.5" y="7.5" width="17" height="11" rx="2" /><path d="M9 7.5V6a3 3 0 016 0v1.5M3.5 12h17M10 12v2h4v-2" /></>,
    pricing: <><path d="M6 3.5h9l3 3v14H6zM15 3.5v3h3M9 11h6M9 15h4" /><circle cx="8" cy="11" r=".5" fill="currentColor" stroke="none" /><circle cx="8" cy="15" r=".5" fill="currentColor" stroke="none" /></>,
    timeline: <><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3.5v4M16 3.5v4M4 10h16M12 13v3l2.5 1.5" /></>,
    collaboration: <><circle cx="7" cy="5" r="2" /><circle cx="17" cy="8" r="2" /><circle cx="7" cy="19" r="2" /><path d="M7 7v10M9 5h4a4 4 0 014 4M9 19h4a4 4 0 004-4v-5" /></>,
    discovery: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="M15 15l4.5 4.5M10.5 8v5M8 10.5h5" /></>,
    services: <><path d="M12 3l7 4v8l-7 4-7-4V7zM5 7l7 4 7-4M12 11v8" /></>,
    development: <><path d="M8 6l-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" /></>,
    editing: <><path d="M5 4h10a2 2 0 012 2v5M5 4v16h10a2 2 0 002-2v-2M8 15l7.8-7.8 2 2L10 17l-3 1zM14.8 8.2l2 2" /></>,
    support: <><path d="M4 13v-1a8 8 0 0116 0v1M4 13h3v5H5a1 1 0 01-1-1v-4zM20 13h-3v5h2a1 1 0 001-1v-4zM17 20c-1.1 1-2.6 1.5-5 1.5" /></>,
    performance: <><path d="M4 16a8 8 0 1116 0M12 12l3.7-3.7M12 12l-4.4 1.6M6 18h12" /></>,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>{paths[name]}</svg>
}

function Question({ item, index, active, onToggle }) {
  const [question, answer, iconName] = item
  const panelId = `faq-panel-${index}`
  return <article className={`${styles.item} ${active ? styles.open : ''}`}>
    <button type="button" onClick={onToggle} aria-expanded={active} aria-controls={panelId}>
      <span className={styles.icon}><FaqIcon name={iconName} /></span><span>{question}</span><b aria-hidden="true">⌄</b>
    </button>
    <div id={panelId} className={styles.answer} aria-hidden={!active}><p>{answer}</p></div>
  </article>
}

export function FaqSection() {
  const [active, setActive] = useState(6)
  const root = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  useGSAP(() => {
    if (reducedMotion) return undefined
    gsap.from(`.${styles.item}`, { y: 36, opacity: 0, stagger: 0.065, duration: 0.58, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
  }, { scope: root, dependencies: [reducedMotion] })
  return <section ref={root} className={styles.faq} aria-labelledby="faq-title">
    <div className={styles.heading}><p>Everything you need to know</p><h2 id="faq-title">From pricing and timelines to Webflow and long-term support. Here are the answers to the questions we get asked most often.</h2></div>
    <div className={styles.columns}>{[questions.slice(0, 5), questions.slice(5)].map((column, columnIndex) => <div className={styles.column} key={columnIndex}>{column.map((item, itemIndex) => { const index = itemIndex + columnIndex * 5; return <Question key={item[0]} item={item} index={index} active={active === index} onToggle={() => setActive(active === index ? -1 : index)} /> })}</div>)}</div>
  </section>
}
