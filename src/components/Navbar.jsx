import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '#browse', label: 'Browse' },
  { href: '#about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const close = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-16 h-16 flex items-center justify-between gap-8">

        <Link to="/" className="font-extrabold text-xl tracking-tight select-none flex-shrink-0">
          <span className="text-primary">Dev</span>
          <span className="text-foreground">Connect</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? location.pathname === '/' : false
            return (
              <a
                key={label}
                href={href}
                className={[
                  'px-4 py-2 text-sm font-medium transition-colors duration-200',
                  active
                    ? 'text-primary bg-surface'
                    : 'text-muted hover:text-foreground hover:bg-surface',
                ].join(' ')}
              >
                {label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/join')}
              className="px-4 py-2 text-sm font-medium text-muted border border-border hover:border-primary hover:text-foreground transition-all duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/join')}
              className="px-5 py-2 text-sm font-bold bg-primary hover:bg-accent text-background transition-colors duration-200"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground hover:bg-surface transition-all duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className="block px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-foreground transition-all"
            >
              {label}
            </a>
          ))}
          <div className="pt-2 border-t border-border flex gap-2">
            <button
              onClick={() => { navigate('/join'); close() }}
              className="flex-1 py-2.5 text-sm font-medium border border-border text-muted hover:border-primary hover:text-foreground transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => { navigate('/join'); close() }}
              className="flex-1 py-2.5 text-sm font-bold bg-primary text-background"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
