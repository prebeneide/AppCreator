import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/landing/Hero'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* LogoWall, FeaturesSection, TemplatesSection, PricingSection, CTASection — kommer */}
      </main>
      <Footer />
    </>
  )
}
