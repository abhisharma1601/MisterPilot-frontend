import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Extension from './components/Extension'
import ApiSection from './components/ApiSection'
import MCPSection from './components/MCPSection'
import Privacy from './components/Privacy'
import Pricing from './components/Pricing'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Extension />
        <ApiSection />
        <MCPSection />
        <Privacy />
        <Pricing />
        <GetStarted />
      </main>
      <Footer />
    </>
  )
}
