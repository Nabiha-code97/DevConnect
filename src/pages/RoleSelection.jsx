import { useState } from 'react'
import { Code2, Briefcase, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import AuthModal from '../components/AuthModal'

const roles = [
  {
    id: 'developer',
    icon: <Code2 size={28} />,
    title: "I'm a Developer",
    subtitle: 'Find work & build your career',
    desc: 'Showcase your skills, bid on projects, and grow your freelance career with clients who value your work.',
    perks: ['Build your portfolio', 'Competitive pay', 'Flexible projects'],
    tag: 'Developer',
  },
  {
    id: 'user',
    icon: <Briefcase size={28} />,
    title: "I'm a Client",
    subtitle: 'Hire talent & ship ideas',
    desc: 'Post your project, receive bids from vetted developers, and ship your ideas with confidence.',
    perks: ['Verified developers', 'Milestone payments', 'Dedicated support'],
    tag: 'Client',
  },
]

export default function RoleSelection() {
  const [modal, setModal] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-14">

        <div className="text-center mb-12">
          <span className="inline-block font-mono text-[11px] text-muted uppercase tracking-widest border border-border px-3 py-1 mb-5">
            Get started in seconds
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            How do you want to join?
          </h1>
          <p className="font-mono text-[13px] text-muted max-w-sm mx-auto leading-relaxed">
            Choose your role on DevConnect — you can always change it later.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
          {roles.map(role => (
            <div
              key={role.id}
              onClick={() => setModal({ role: role.id, mode: 'login' })}
              className="group relative bg-card border border-border hover:border-primary cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,232,123,0.08)] p-8"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="inline-block font-mono text-[10px] text-muted uppercase tracking-widest border border-border px-2.5 py-1 mb-5">
                {role.tag}
              </span>

              <div className="w-12 h-12 border border-border group-hover:border-primary flex items-center justify-center text-primary mb-5 transition-colors duration-200">
                {role.icon}
              </div>

              <h2 className="text-base font-extrabold text-foreground mb-1 tracking-tight">{role.title}</h2>
              <p className="font-mono text-[11px] text-muted uppercase tracking-wider mb-4">{role.subtitle}</p>
              <p className="text-sm text-muted leading-relaxed mb-6">{role.desc}</p>

              <ul className="space-y-2 mb-7">
                {role.perks.map(p => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle size={13} className="flex-shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 text-sm font-bold bg-primary hover:bg-accent text-background transition-colors duration-200">
                Get Started
              </button>
            </div>
          ))}
        </div>

        <p className="mt-9 font-mono text-[11px] text-muted/50 text-center">
          Let's connect!
        </p>
      </div>

      {modal && (
        <AuthModal
          role={modal.role}
          mode={modal.mode}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
