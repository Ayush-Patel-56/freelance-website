import { Navbar } from './components/Navbar/Navbar'
import { HeroStage } from './components/Hero/HeroStage'
import { SocialLinks } from './components/SocialLinks/SocialLinks'
import { ScrollCue } from './components/ScrollCue/ScrollCue'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.page}>
      <Navbar />
      <HeroStage />
      <SocialLinks />
      <ScrollCue />
    </div>
  )
}
