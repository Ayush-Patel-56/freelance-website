import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './FaqSection.module.css'

const questions = [
  ['Who do you typically work with?', 'I partner with ambitious founders, growing teams, established businesses, and agencies that value thoughtful design and a strategic approach.', '◉'],
  ['How much does a project cost?', 'Every project is shaped around its goals and scope. After our first conversation, I share a transparent proposal with clear milestones and investment.', '¤'],
  ['How long does a typical project take?', 'Most identity and website projects take between four and eight weeks, depending on the scope, feedback rhythm, and selected deliverables.', '◷'],
  ['What can I expect from our collaboration?', 'You can expect clear communication, honest feedback, and a structured process from start to finish. The best outcomes come from close collaboration.', '⌁'],
  ['What do you need from me to get started?', 'A clear view of your business, goals, and audience is the best start. If you have materials ready, great—if not, I will guide the discovery process.', '▣'],
  ['Can you help with branding, web design, or both?', 'Yes. I can support visual identity, web design, Webflow development, or a combined project that brings every part together.', '◇'],
  ['Why do you choose Webflow?', 'Webflow gives creative freedom alongside fast, secure, scalable websites. It offers a clean foundation and an intuitive editing experience for your team.', '</>'],
  ['Will I be able to edit the website myself?', 'Yes. Every build includes an intuitive CMS so you can update content confidently without relying on a developer for everyday changes.', '╱'],
  ['Do you provide support after launch?', 'Yes. Launch is only the beginning. I am available for support, new sections, improvements, and ongoing maintenance as your business evolves.', '◌'],
  ['Is every website optimized for SEO and performance?', 'Yes. Accessibility, responsive design, technical SEO, and performance are integrated from the beginning, not added as an afterthought.', '⌁'],
]

function Question({ item, index, active, onToggle }) {
  const [question, answer, icon] = item
  const panelId = `faq-panel-${index}`
  return <article className={`${styles.item} ${active ? styles.open : ''}`}>
    <button type="button" onClick={onToggle} aria-expanded={active} aria-controls={panelId}>
      <span className={styles.icon}>{icon}</span><span>{question}</span><b aria-hidden="true">⌄</b>
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
    <div className={styles.heading}><p>Everything you need to know</p><h2 id="faq-title">From pricing and timelines to Webflow and long-term support. Here are the answers to the questions I get asked most often.</h2></div>
    <div className={styles.columns}>{[questions.slice(0, 5), questions.slice(5)].map((column, columnIndex) => <div className={styles.column} key={columnIndex}>{column.map((item, itemIndex) => { const index = itemIndex + columnIndex * 5; return <Question key={item[0]} item={item} index={index} active={active === index} onToggle={() => setActive(active === index ? -1 : index)} /> })}</div>)}</div>
  </section>
}
