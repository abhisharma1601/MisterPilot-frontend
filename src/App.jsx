import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import AutoSection from './components/AutoSection'
import WhyAuto from './components/WhyAuto'
import Models from './components/Models'
import Extension from './components/Extension'
import AgentSection from './components/AgentSection'
import MCPSection from './components/MCPSection'
import Reliability from './components/Reliability'
import Privacy from './components/Privacy'
import ApiSection from './components/ApiSection'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <AutoSection />
        <WhyAuto />
        <Models />
        <Extension />
        <AgentSection />
        <MCPSection />
        <Reliability />
        <Privacy />
        <ApiSection />
        <Pricing />
        <FAQ />
        <GetStarted />
      </main>
      <Footer />
    </>
  )
}
