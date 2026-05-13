import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, User, LogOut, Menu, X,
  ChevronLeft, ChevronRight, ChevronDown, Plus,
  FolderOpen, Gavel,
} from 'lucide-react'

const MESSAGES = [
  { id: 1, name: 'Erik Gunsel',   initials: 'EG' },
  { id: 2, name: 'Emily Smith',   initials: 'ES' },
  { id: 3, name: 'Arthur Adelk',  initials: 'AA' },
]

export default function Sidebar({ user, activeNav, setActiveNav }) {
  const [collapsed, setCollapsed]     = useState(false)
  const [dashOpen, setDashOpen]       = useState(true)
  const [mobileOpen, setMobileOpen]   = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  const handleLogout = () => {
    localStorage.removeItem('dc_user')
    window.location.href = '/'
  }

  const isDashActive = activeNav === 'projects' || activeNav === 'bids'

  const navItemCls = (active) =>
    `w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-colors duration-150 ${
      active
        ? 'text-primary bg-card'
        : 'text-muted hover:text-foreground hover:bg-card'
    }`

  const ExpandedContent = () => (
    <div className="flex flex-col h-full">

      <div className="h-14 border-b border-border flex items-center justify-between px-4 flex-shrink-0">
        <Link to="/" className="font-extrabold text-base tracking-tight select-none">
          <span className="text-primary">Dev</span>
          <span className="text-foreground">Connect</span>
        </Link>
        <button
          onClick={() => { setCollapsed(true); setMobileOpen(false) }}
          className="p-1.5 text-muted hover:text-foreground hover:bg-card transition-colors hidden md:block"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-1.5 text-muted hover:text-foreground hover:bg-card transition-colors md:hidden"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-4 py-4 border-b border-border flex-shrink-0">
        <div className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1">
          {user?.role || 'developer'}
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-mono font-bold text-primary flex-shrink-0 select-none">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-foreground truncate">{user?.name}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-3 px-2">
        <div className="font-mono text-[10px] text-muted/50 uppercase tracking-widest px-3 mb-2">
          Main
        </div>

        <button
          onClick={() => setDashOpen(o => !o)}
          className={navItemCls(isDashActive)}
        >
          <LayoutDashboard size={15} className={isDashActive ? 'text-primary' : ''} />
          <span>Dashboard</span>
          <ChevronDown
            size={13}
            className={`ml-auto transition-transform duration-200 ${dashOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {dashOpen && (
          <div className="ml-5 pl-3 border-l border-border mt-0.5 mb-0.5 space-y-0.5">
            {[
              { id: 'projects', label: 'Projects',    icon: FolderOpen },
              { id: 'bids',     label: 'Recent Bids', icon: Gavel },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveNav(id); setMobileOpen(false) }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                  activeNav === id
                    ? 'text-primary'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {activeNav === id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                )}
                {activeNav !== id && <Icon size={12} className="flex-shrink-0" />}
                {label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => { setActiveNav('profile'); setMobileOpen(false) }}
          className={navItemCls(activeNav === 'profile')}
        >
          <User size={15} className={activeNav === 'profile' ? 'text-primary' : ''} />
          <span>Profile</span>
        </button>
      </div>

      <div className="px-2 py-3 border-t border-border flex-shrink-0">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="font-mono text-[10px] text-muted/50 uppercase tracking-widest">Messages</span>
          <Plus size={12} className="text-muted hover:text-foreground cursor-pointer transition-colors" />
        </div>
        {MESSAGES.map(m => (
          <div
            key={m.id}
            className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-card transition-colors cursor-default"
          >
            <div className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center font-mono text-[9px] text-muted flex-shrink-0">
              {m.initials}
            </div>
            <span className="text-[13px] text-muted">{m.name}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border flex-shrink-0">
        <div className="bg-card border border-border p-3 mb-3">
          <p className="text-sm font-bold text-foreground mb-0.5">Let's start!</p>
          <p className="font-mono text-[11px] text-muted leading-relaxed">
            Creating or adding new tasks couldn't be easier
          </p>
          <button
            onClick={() => setActiveNav('projects')}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-primary hover:bg-accent text-background text-xs font-bold transition-colors duration-150"
          >
            <Plus size={13} /> Add New Task
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:text-red-400 hover:bg-card transition-colors duration-150"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  )

  const CollapsedContent = () => (
    <div className="flex flex-col h-full items-center overflow-hidden">

      <div className="h-14 border-b border-border w-full flex items-center justify-center flex-shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="p-1.5 text-muted hover:text-foreground hover:bg-card transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="py-4 border-b border-border w-full flex justify-center flex-shrink-0">
        <div className="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-mono font-bold text-primary select-none">
          {initials}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center py-3 gap-0.5 w-full">
        <button
          onClick={() => { setCollapsed(false); setDashOpen(true) }}
          title="Dashboard"
          className={`p-2.5 transition-colors duration-150 ${isDashActive ? 'text-primary' : 'text-muted hover:text-foreground'}`}
        >
          <LayoutDashboard size={17} />
        </button>
        <button
          onClick={() => setActiveNav('profile')}
          title="Profile"
          className={`p-2.5 transition-colors duration-150 ${activeNav === 'profile' ? 'text-primary' : 'text-muted hover:text-foreground'}`}
        >
          <User size={17} />
        </button>
      </div>

      <div className="flex flex-col items-center py-3 border-t border-border gap-2 w-full flex-shrink-0">
        {MESSAGES.map(m => (
          <div
            key={m.id}
            title={m.name}
            className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center font-mono text-[9px] text-muted cursor-default"
          >
            {m.initials}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border w-full flex justify-center flex-shrink-0">
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 text-muted hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-border text-muted hover:text-foreground transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 w-60 h-full bg-surface border-r border-border shadow-2xl">
            <ExpandedContent />
          </aside>
        </div>
      )}

      <aside
        className={`hidden md:flex flex-col bg-surface border-r border-border h-screen flex-shrink-0 transition-all duration-200 ${
          collapsed ? 'w-14' : 'w-60'
        }`}
      >
        {collapsed ? <CollapsedContent /> : <ExpandedContent />}
      </aside>
    </>
  )
}
