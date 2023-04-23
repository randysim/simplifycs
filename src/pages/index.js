import { Navbar, Footer } from "@/components/home/components"
import { Block, About, Explore, GetStarted, WhatsNew, Feedback } from "@/components/home/sections"

export default function Home() {
  return (
    <div className = "bg-primary-black overflow-hidden">
      <Navbar />
      <Block />
      <div className="relative"> 
        <About />
          <div className="gradient-03 z-0"/>
        <Explore />
      </div>
      <div className="relative"> 
        <GetStarted />
          <div className="gradient-04 z-0"/>
        <WhatsNew />
      </div>
      <div className="relative"> 
          <div className="gradient-04 z-0"/>
        <Feedback />
      </div>
      <Footer />
    </div>
  )
}
