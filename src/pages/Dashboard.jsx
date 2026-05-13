import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, TrendingUp, CheckCircle, Eye, Plus, Calendar, DollarSign } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import DeveloperProfileCard from '../components/DeveloperProfileCard'

const MOCK_PROJECTS = [
  { id: 1, title: 'E-Commerce Platform',  status: 'Active',  tech: ['React', 'Node.js', 'MongoDB'],       deadline: '2026-06-15', budget: '$2,000', client: 'TechCorp Inc.', progress: 65 },
  { id: 2, title: 'Portfolio Website',    status: 'Active',  tech: ['React', 'Tailwind CSS'],              deadline: '2026-05-30', budget: '$500',   client: 'Sarah J.',     progress: 80 },
  { id: 3, title: 'Blog CMS',             status: 'Active',  tech: ['Next.js', 'PostgreSQL'],              deadline: '2026-07-01', budget: '$1,500', client: 'MediaBlog',    progress: 40 },
]

const MOCK_BIDS = [
  { id: 1, project: 'Mobile App UI',       amount: '$800',   status: 'Pending',      date: '2026-05-10', client: 'AppVenture'   },
  { id: 2, project: 'API Integration',     amount: '$600',   status: 'Accepted',     date: '2026-05-08', client: 'DataFlow Ltd.' },
  { id: 3, project: 'Dashboard Redesign',  amount: '$1,200', status: 'Under Review', date: '2026-05-05', client: 'FinTech Co.'   },
  { id: 4, project: 'Landing Page',        amount: '$400',   status: 'Rejected',     date: '2026-05-01', client: 'StartupX'     },
]

const STATUS_STYLES = {
  Active:         'bg-primary/10 text-primary border border-primary/20',
  Pending:        'bg-surface text-muted border border-border',
  Accepted:       'bg-primary/10 text-primary border border-primary/20',
  'Under Review': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  Rejected:       'bg-red-500/10 text-red-400 border border-red-500/20',
  Completed:      'bg-surface text-muted border border-border',
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-card border border-border hover:border-primary/30 p-4 transition-colors duration-200">
      <div className="w-9 h-9 border border-border flex items-center justify-center text-primary mb-3">
        <Icon size={16} />
      </div>
      <div className="text-2xl font-extrabold text-foreground">{value}</div>
      <div className="font-mono text-[11px] text-muted mt-0.5">{label}</div>
      {sub && <div className="font-mono text-[11px] text-muted/50 mt-0.5">{sub}</div>}
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="bg-card border border-border hover:border-primary/30 p-5 transition-colors duration-200">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-foreground text-sm leading-tight pr-2">{project.title}</h3>
        <span className={`flex-shrink-0 px-2 py-0.5 font-mono text-[10px] font-medium ${STATUS_STYLES[project.status]}`}>
          {project.status}
        </span>
      </div>
      <p className="font-mono text-[11px] text-muted/60 mb-3">Client: {project.client}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map(t => (
          <span key={t} className="px-2 py-0.5 bg-surface border border-border text-muted font-mono text-[10px]">
            {t}
          </span>
        ))}
      </div>

      <div className="mb-3">
        <div className="flex justify-between font-mono text-[11px] text-muted mb-1.5">
          <span>Progress</span>
          <span className="text-primary">{project.progress}%</span>
        </div>
        <div className="h-1 bg-border overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {project.deadline}
        </span>
        <span className="flex items-center gap-1 text-primary font-bold">
          <DollarSign size={11} />
          {project.budget.replace('$', '')}
        </span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate    = useNavigate()
  const [user, setUser]         = useState(null)
  const [activeNav, setActiveNav] = useState('projects')
  const [projects, setProjects] = useState([])
  const [bids, setBids]         = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('dc_user')
    if (!stored) { navigate('/join'); return }
    setUser(JSON.parse(stored))

    const p = localStorage.getItem('dc_projects')
    const b = localStorage.getItem('dc_bids')
    const loadedProjects = p ? JSON.parse(p) : MOCK_PROJECTS
    const loadedBids     = b ? JSON.parse(b) : MOCK_BIDS
    setProjects(loadedProjects)
    setBids(loadedBids)
    if (!p) localStorage.setItem('dc_projects', JSON.stringify(MOCK_PROJECTS))
    if (!b) localStorage.setItem('dc_bids',     JSON.stringify(MOCK_BIDS))
  }, [navigate])

  if (!user) return null

  const stats = [
    { icon: FolderOpen,  label: 'Active Projects', value: projects.filter(p => p.status === 'Active').length },
    { icon: TrendingUp,  label: 'Total Bids',      value: bids.length,                                          sub: 'All time' },
    { icon: CheckCircle, label: 'Accepted Bids',   value: bids.filter(b => b.status === 'Accepted').length },
    { icon: Eye,         label: 'Profile Views',   value: 48,                                                   sub: 'This month' },
  ]

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar user={user} activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-5xl">

          <div className="mb-7">
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Welcome back, {user.name?.split(' ')[0]}
            </h1>
            <p className="font-mono text-[12px] text-muted mt-1">{today}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {activeNav === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">
                  Active Projects
                </h2>
                <button className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] font-bold bg-primary hover:bg-accent text-background transition-colors duration-150">
                  <Plus size={12} /> New Project
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {projects.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            </div>
          )}

          {activeNav === 'bids' && (
            <div>
              <h2 className="font-mono text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Recent Bids
              </h2>
              <div className="bg-card border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-surface">
                      <tr>
                        {['Project', 'Client', 'Amount', 'Date', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-mono text-[10px] font-semibold text-muted uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {bids.map(bid => (
                        <tr key={bid.id} className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-3.5 font-medium text-foreground">{bid.project}</td>
                          <td className="px-4 py-3.5 font-mono text-[12px] text-muted">{bid.client}</td>
                          <td className="px-4 py-3.5 font-bold text-primary">{bid.amount}</td>
                          <td className="px-4 py-3.5 font-mono text-[12px] text-muted">{bid.date}</td>
                          <td className="px-4 py-3.5">
                            <span className={`px-2 py-0.5 font-mono text-[10px] font-medium ${STATUS_STYLES[bid.status]}`}>
                              {bid.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'profile' && <DeveloperProfileCard />}
        </div>
      </main>
    </div>
  )
}
