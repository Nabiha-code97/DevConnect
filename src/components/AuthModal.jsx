import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-muted">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  )
}

const TECH_OPTIONS = [
  'React.js', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
  'TypeScript', 'Python', 'Go', 'PHP', 'Ruby', 'Java',
]

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block font-mono text-[10px] font-semibold text-muted uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-mono text-[11px] text-red-400 mt-1.5 flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function inputCls(error) {
  return [
    'w-full px-3 py-2.5 border text-sm transition-colors duration-150',
    'focus:outline-none bg-surface text-foreground placeholder:text-muted/50 font-mono',
    error
      ? 'border-red-500/50 focus:border-red-400'
      : 'border-border focus:border-primary hover:border-primary/40',
  ].join(' ')
}

export default function AuthModal({ role, mode: initialMode, onClose }) {
  const [mode, setMode]         = useState(initialMode)
  const [form, setForm]         = useState({ techStack: [] })
  const [errors, setErrors]     = useState({})
  const [showPass, setShowPass] = useState(false)
  const backdropRef             = useRef(null)
  const navigate                = useNavigate()

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleBackdrop = e => { if (e.target === backdropRef.current) onClose() }

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  const toggleTech = tech => {
    const current = form.techStack || []
    const next = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech]
    set('techStack', next)
  }

  const validate = () => {
    const e = {}
    if (!form.email?.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.password || form.password.length < 6) e.password = 'Minimum 6 characters'
    if (mode === 'signup') {
      if (!form.name?.trim()) e.name = 'Full name is required'
      if (role === 'developer' && !form.techStack?.length) e.techStack = 'Pick at least one technology'
      if (form.githubUrl && !/^https?:\/\/(www\.)?github\.com\/.+/.test(form.githubUrl)) {
        e.githubUrl = 'Enter a valid GitHub URL (https://github.com/...)'
      }
    }
    return e
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const user = {
      name: mode === 'signup' ? form.name : (role === 'developer' ? 'Nabiha Amir' : 'User'),
      email: form.email,
      role,
      techStack: form.techStack || [],
      githubUrl: form.githubUrl || '',
    }
    localStorage.setItem('dc_user', JSON.stringify(user))
    onClose()
    navigate('/dashboard')
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login')
    setErrors({})
    setForm({ techStack: [] })
  }

  const roleLabel = role === 'developer' ? 'Developer' : 'Client'

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-card w-full max-w-md border border-border shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto">

        <div className="h-px bg-primary w-full flex-shrink-0" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all duration-150 z-10"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="p-6">

          <div className="mb-5 pr-8">
            <span className="inline-block font-mono text-[10px] text-muted uppercase tracking-widest border border-border px-2.5 py-1 mb-3">
              {roleLabel} Account
            </span>
            <h3 className="text-xl font-extrabold text-foreground tracking-tight">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h3>
            <p className="font-mono text-[13px] text-muted mt-1">
              {mode === 'login'
                ? `Sign in to DevConnect as ${roleLabel}`
                : `Join DevConnect as a ${roleLabel} today`}
            </p>
          </div>

          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border text-sm text-muted/50 cursor-not-allowed mb-4 bg-surface/30"
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
            <span className="ml-auto font-mono text-[10px] text-muted/30">(soon)</span>
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[11px] text-muted/60">or with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Field label="Full Name" error={errors.name}>
                <div className="relative">
                  <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name || ''}
                    onChange={e => set('name', e.target.value)}
                    className={`${inputCls(errors.name)} pl-9`}
                    autoFocus
                  />
                </div>
              </Field>
            )}

            <Field label="Email Address" error={errors.email}>
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email || ''}
                  onChange={e => set('email', e.target.value)}
                  className={`${inputCls(errors.email)} pl-9`}
                  autoFocus={mode === 'login'}
                />
              </div>
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                  value={form.password || ''}
                  onChange={e => set('password', e.target.value)}
                  className={`${inputCls(errors.password)} pl-9 pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </Field>

            {mode === 'signup' && role === 'developer' && (
              <>
                <Field label="Tech Stack" error={errors.techStack}>
                  <div className="flex flex-wrap gap-1.5 p-3 border border-border bg-surface/30 min-h-[76px] focus-within:border-primary transition-colors">
                    {TECH_OPTIONS.map(tech => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={[
                          'px-2.5 py-1 font-mono text-[11px] font-semibold transition-all duration-150 border',
                          form.techStack?.includes(tech)
                            ? 'bg-primary text-background border-transparent'
                            : 'bg-card text-muted border-border hover:border-primary/50 hover:text-primary',
                        ].join(' ')}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="GitHub URL (optional)" error={errors.githubUrl}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <GithubIcon size={13} />
                    </span>
                    <input
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={form.githubUrl || ''}
                      onChange={e => set('githubUrl', e.target.value)}
                      className={`${inputCls(errors.githubUrl)} pl-9`}
                    />
                  </div>
                </Field>
              </>
            )}

            {mode === 'login' && (
              <div className="text-right -mt-1">
                <Link
                  to="/forgot-password"
                  onClick={onClose}
                  className="font-mono text-[11px] text-primary hover:text-accent transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-accent text-background font-bold transition-colors duration-200 mt-2"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center font-mono text-[12px] text-muted mt-5">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={switchMode}
              className="text-primary font-bold hover:text-accent transition-colors"
            >
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
