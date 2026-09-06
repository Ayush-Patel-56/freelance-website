import { Navbar } from './components/Navbar/Navbar'
import { HeroTagline } from './components/Hero/HeroTagline'
import { HeroHeadline } from './components/Hero/HeroHeadline'
import { HeroActions } from './components/Hero/HeroActions'
import { BackgroundMarquee } from './components/BackgroundMarquee/BackgroundMarquee'
import { SocialLinks } from './components/SocialLinks/SocialLinks'
import { ScrollCue } from './components/ScrollCue/ScrollCue'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.page}>
      <Navbar />
      <section className={styles.hero}>
        <HeroTagline />
        <HeroHeadline />
        <HeroActions />
      </section>
      <BackgroundMarquee />
      <SocialLinks />
      <ScrollCue />
    </div>
  )
}
