import { MapPin, Star, ExternalLink } from 'lucide-react'

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-muted">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

const developer = {
  name: 'Nabiha Amir',
  initials: 'NA',
  title: 'Frontend Developer',
  bio: 'Passionate about learning, improving, and creating meaningful work.',
  techStack: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML / CSS', 'Git'],
  github: 'https://github.com/Nabiha-code97',
  githubHandle: 'Nabiha-code97',
  location: 'Pakistan',
  joinDate: 'May 2026',
  stats: { projects: 12, bids: 34, rating: '4.8' },
  availability: 'Open to work',
}

export default function DeveloperProfileCard() {
  return (
    <div className="max-w-sm">
      <h2 className="font-mono text-sm font-bold text-foreground uppercase tracking-widest mb-4">
        My Profile
      </h2>

      <div className="bg-card border border-border overflow-hidden">
        <div className="h-20 bg-primary/5 border-b border-border relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgb(var(--color-primary)) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="w-14 h-14 bg-card border-2 border-primary/30 flex items-center justify-center font-mono font-extrabold text-base text-primary select-none">
              {developer.initials}
            </div>
            <span className="mb-1 px-2.5 py-1 font-mono text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {developer.availability}
            </span>
          </div>

          <div className="mb-3">
            <h3 className="text-base font-extrabold text-foreground leading-tight tracking-tight">{developer.name}</h3>
            <p className="font-mono text-[12px] text-primary mt-0.5">{developer.title}</p>
          </div>

          <p className="text-sm text-muted mb-4 leading-relaxed">{developer.bio}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {developer.techStack.map(t => (
              <span
                key={t}
                className="px-2.5 py-1 bg-surface border border-border text-muted font-mono text-[10px]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-border">
            {[['Projects', developer.stats.projects], ['Bids', developer.stats.bids], ['Rating', developer.stats.rating]].map(([k, v]) => (
              <div key={k} className="text-center">
                <div className="text-base font-extrabold text-foreground flex items-center justify-center gap-0.5">
                  {k === 'Rating' && <Star size={11} className="text-primary fill-primary" />}
                  {v}
                </div>
                <div className="font-mono text-[10px] text-muted">{k}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted">
              <MapPin size={13} className="flex-shrink-0 text-primary" />
              <span className="font-mono text-[12px]">{developer.location}</span>
            </div>
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted hover:text-primary transition-colors group"
            >
              <GithubIcon size={13} />
              <span className="font-mono text-[12px] truncate">{developer.githubHandle}</span>
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
