import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowUpRight, Code2, Users, Zap, Star, Shield, TrendingUp } from 'lucide-react'
import gsap from 'gsap'
import Navbar from '../components/Navbar'

const STATS = [
  { target: 10000, display: n => `${Math.round(n / 1000)}K+`, label: 'Developers' },
  { target: 5000, display: n => `${Math.round(n / 1000)}K+`, label: 'Projects Done' },
  { target: 94, display: n => `${Math.round(n)}%`, label: 'Success Rate' },
]

const FEATURES = [
  { icon: <Code2 size={20} />, title: 'Hire Skilled Devs', desc: 'Browse verified developers by skill, stack, and experience level.' },
  { icon: <Users size={20} />, title: 'Post Projects', desc: 'Describe your project, set a budget, and receive proposals fast.' },
  { icon: <Zap size={20} />, title: 'Build & Ship', desc: 'Collaborate, review work, and release faster than ever before.' },
]

const TRUST = [
  { icon: <Shield size={14} />, text: 'verified profiles' },
  { icon: <Star size={14} />, text: 'rated developers' },
  { icon: <TrendingUp size={14} />, text: 'live projects' },
]

function CountUp({ target, display, started }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!started) return
    const duration = 1800
    const startTime = performance.now()
    const tick = now => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [started, target])

  return <>{display(count)}</>
}

export default function Landing() {
  const [query, setQuery] = useState('')
  const [statsStarted, setStatsStarted] = useState(false)
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.anim-logo-dev span',     { opacity: 0, y: -60, stagger: 0.08, duration: 0.6 })
        .from('.anim-logo-connect span', { opacity: 0, x: 60,  stagger: 0.08, duration: 0.6 }, '-=0.4')
        .from('.anim-badge',             { opacity: 0, y: 12,  duration: 0.5 }, '-=0.2')
        .from('.anim-heading',           { opacity: 0, y: 40,  duration: 0.6 }, '-=0.15')
        .from('.anim-sub',               { opacity: 0, y: 20,  duration: 0.5 }, '-=0.25')
        .from('.anim-search',            { opacity: 0, y: 20,  duration: 0.5 }, '-=0.2')
        .from('.anim-ctas',              { opacity: 0, y: 16,  duration: 0.45 }, '-=0.2')
        .from('.anim-stat',              { opacity: 0, y: 14,  stagger: 0.12, duration: 0.4 }, '-=0.15')
        .from('.anim-features',          { opacity: 0, y: 30,  stagger: 0.1,  duration: 0.5 }, '-=0.1')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect() } },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={heroRef} className="bg-[#050505] text-[#e8e8e8] min-h-screen overflow-x-hidden font-sans">

      <div
        className="fixed inset-0 pointer-events-none z-0 flex justify-between px-[8%]"
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="w-px h-full bg-[#1a1a1a] opacity-50" />
        ))}
      </div>

      <Navbar />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-16">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-20 sm:pt-24 pb-6 gap-2">
          <span className="anim-badge font-mono text-sm text-[#6b6b6b] tracking-[0.02em]">
            welcome to devconnect
          </span>
          <span className="anim-badge flex items-center gap-2 font-mono text-[13px] text-[#6b6b6b] tracking-[0.02em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e87b] animate-pulse" />
            connecting 10,000+ developers globally
          </span>
        </div>

        <div className="py-6">
          <div className="text-[clamp(2rem,9vw,3rem)] sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-[-0.03em] leading-none flex flex-col sm:flex-row select-none">
            <span className="anim-logo-dev text-[#00e87b] whitespace-nowrap">
              {'Dev'.split('').map((l, i) => (
                <span key={i} className="inline-block">{l}</span>
              ))}
            </span>
            <span className="anim-logo-connect text-[#e8e8e8] whitespace-nowrap">
              {'Connect'.split('').map((l, i) => (
                <span key={i} className="inline-block">{l}</span>
              ))}
            </span>
          </div>
        </div>

        <h1 className="anim-heading text-[40px] sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.08] tracking-[-0.03em] max-w-[820px] pt-12 pb-6 text-[#e8e8e8]">
          Build Together.{' '}
          <span className="bg-gradient-to-br from-[#00e87b] to-[#00b8d4] bg-clip-text text-transparent">
            Grow Together.
          </span>
        </h1>

        <p className="anim-sub text-[15px] md:text-[18px] text-[#6b6b6b] max-w-[520px] leading-[1.65] pb-10 font-normal">
          Connect with talented developers, post projects, and bring your ideas to life — all in one place.
        </p>

        <div className="anim-search max-w-[540px] w-full mb-9">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#6b6b6b] pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="search developers, skills, or projects..."
              className="w-full py-4 pl-12 pr-4 sm:pr-[130px] bg-[#0d0d0d] border border-[#1a1a1a] text-[#e8e8e8] font-mono text-[13px] outline-none focus:border-[#00e87b] transition-all duration-200 placeholder:text-[#6b6b6b]/60"
              onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,232,123,0.12)' }}
              onBlur={e => { e.currentTarget.style.boxShadow = 'none' }}
              onKeyDown={e => e.key === 'Enter' && navigate('/join')}
            />
            <button
              onClick={() => navigate('/join')}
              className="hidden sm:block absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#00e87b] text-[#050505] font-sans font-bold text-[13px] hover:bg-[#00c566] transition-colors duration-200 active:scale-[0.97]"
            >
              Search
            </button>
          </div>
          <button
            onClick={() => navigate('/join')}
            className="sm:hidden mt-2.5 w-full py-3.5 bg-[#00e87b] text-[#050505] font-sans font-bold text-[13px] hover:bg-[#00c566] transition-colors duration-200"
          >
            Search
          </button>
        </div>

        <div className="anim-ctas flex flex-col sm:flex-row gap-4 pb-20">
          <button
            onClick={() => navigate('/join')}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#00e87b] text-[#050505] font-sans font-bold text-[15px] hover:-translate-y-0.5 hover:bg-[#00c566] transition-all duration-200"
            style={{ boxShadow: '0 4px 24px rgba(0,232,123,0.25)' }}
          >
            Get Started Free <ArrowUpRight size={16} />
          </button>
          <button
            onClick={() => navigate('/join')}
            className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-transparent text-[#e8e8e8] font-sans font-semibold text-[15px] border border-[#1a1a1a] hover:border-[#00e87b] hover:text-[#00e87b] hover:bg-[rgba(0,232,123,0.12)] transition-all duration-200"
          >
            Browse Developers
          </button>
        </div>

        <div ref={statsRef} className="flex flex-col sm:flex-row border-t border-b border-[#1a1a1a] mb-24">
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              className={`anim-stat flex-1 py-9 text-center border-[#1a1a1a] ${
                idx < STATS.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
              }`}
            >
              <div className="text-[clamp(28px,4vw,40px)] font-extrabold text-[#00e87b] tabular-nums tracking-[-0.02em]">
                <CountUp target={s.target} display={s.display} started={statsStarted} />
              </div>
              <div className="font-mono text-[11px] text-[#6b6b6b] lowercase tracking-[0.06em] mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-20 border border-[#1a1a1a] bg-[#1a1a1a] gap-px overflow-hidden">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="group anim-features bg-[#050505] hover:bg-[#0d0d0d] p-8 lg:p-12 transition-colors duration-300 cursor-default"
            >
              <div className="w-11 h-11 border border-[#1a1a1a] group-hover:border-[#00e87b] group-hover:shadow-[0_0_12px_rgba(0,232,123,0.12)] flex items-center justify-center text-[#00e87b] mb-6 transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-[15px] font-bold text-[#e8e8e8] mb-2.5 tracking-[-0.01em]">{f.title}</h3>
              <p className="text-[13px] text-[#6b6b6b] leading-[1.6] font-normal">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center flex-wrap gap-10 py-8 border-t border-[#1a1a1a] mb-5">
          {TRUST.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-2 font-mono text-[12px] text-[#6b6b6b] tracking-[0.02em]"
            >
              <span className="text-[#00e87b]">{icon}</span>
              {text}
            </span>
          ))}
        </div>

        <div className="text-center py-20">
          <p className="text-[clamp(28px,5vw,48px)] font-bold leading-[1.15] tracking-[-0.03em] max-w-[600px] mx-auto mb-8 text-[#e8e8e8]">
            Got a project?<br />Let's talk.
          </p>
          <button
            onClick={() => navigate('/join')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-[#e8e8e8] font-mono text-[13px] border border-[#1a1a1a] hover:border-[#00e87b] hover:text-[#00e87b] hover:bg-[rgba(0,232,123,0.12)] transition-all duration-200"
          >
            contact us <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-7 border-t border-[#1a1a1a] mt-10 gap-4 flex-wrap">
          <span className="font-mono text-[13px] text-[#6b6b6b]">devconnect</span>
          <div className="flex gap-6 flex-wrap">
            {['projects', 'about', 'contact'].map(link => (
              <span
                key={link}
                className="font-mono text-[12px] text-[#6b6b6b] hover:text-[#00e87b] cursor-pointer transition-colors duration-200"
              >
                {link}
              </span>
            ))}
          </div>
          <span className="font-mono text-[11px] text-[#6b6b6b] opacity-50">
            ©2026 DevConnect
          </span>
        </div>

      </div>
    </div>
  )
}
