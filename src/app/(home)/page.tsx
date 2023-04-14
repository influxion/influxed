import AboutMe from './components/AboutMe'
import AsciiObject from './components/AsciiObject'
import Contact from './components/Contact'
import HeroHeading from './components/HeroHeading'
import Reports from './components/Reports'
import ScrollDown from './components/ScrollDown'

export default function HomePage() {
  return (
    <>
      <div className="h-screen bg-neutral-800">
        <HeroHeading />
        <AsciiObject />
        <ScrollDown />
      </div>
      <AboutMe />
      <Reports />
      <Contact />
    </>
  )
}
