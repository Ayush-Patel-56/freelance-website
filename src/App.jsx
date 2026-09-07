import { PortfolioFooter, PortfolioPage } from './components/PortfolioPage/PortfolioPage'
import { Navbar } from './components/Navbar/Navbar'
import { HeroStage } from './components/Hero/HeroStage'
import { BrandStatement } from './components/BrandStatement/BrandStatement'
import { SocialLinks } from './components/SocialLinks/SocialLinks'
import { ScrollCue } from './components/ScrollCue/ScrollCue'
import { ProcessServices } from './components/ProcessServices/ProcessServices'
import { TrustAndAbout } from './components/TrustAndAbout/TrustAndAbout'
import { FaqSection } from './components/FaqSection/FaqSection'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.page}>
      <Navbar />
      <section className={styles.previousWork} aria-label="Previous portfolio work">
        <HeroStage />
        <BrandStatement />
      </section>
      <PortfolioPage showNav={false} showFooter={false} />
      <ProcessServices />
      <TrustAndAbout />
      <FaqSection />
      <PortfolioFooter />
      <SocialLinks />
      <ScrollCue />
    </div>
  )
}
