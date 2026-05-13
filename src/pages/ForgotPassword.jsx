import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function ForgotPassword() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!email.trim()) { setError('Email is required'); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address'); return }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center min-h-[84vh] px-4">
        <div className="w-full max-w-sm bg-card border border-border overflow-hidden">

          <div className="h-px bg-primary" />

          <div className="p-7">
            {!submitted ? (
              <>
                <div className="w-11 h-11 bg-surface border border-border flex items-center justify-center text-primary mb-5">
                  <Mail size={20} />
                </div>

                <h2 className="text-xl font-extrabold text-foreground mb-1 tracking-tight">
                  Forgot password?
                </h2>
                <p className="font-mono text-[13px] text-muted mb-6 leading-relaxed">
                  No worries — enter your email and we'll send reset instructions.
                </p>

                <form onSubmit={handleSubmit}>
                  <label className="block font-mono text-[10px] font-bold text-muted uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    autoFocus
                    className={[
                      'w-full px-3 py-2.5 border text-sm transition-colors duration-150',
                      'focus:outline-none bg-surface text-foreground placeholder:text-muted/50 font-mono',
                      error
                        ? 'border-red-500/50 focus:border-red-400'
                        : 'border-border focus:border-primary hover:border-primary/40',
                    ].join(' ')}
                  />
                  {error && (
                    <p className="font-mono text-[11px] text-red-400 mt-1.5 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-primary hover:bg-accent text-background font-bold transition-colors duration-200"
                  >
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-foreground mb-2 tracking-tight">
                  Check your inbox
                </h3>
                <p className="font-mono text-[13px] text-muted">
                  We sent a reset link to{' '}
                  <span className="font-bold text-primary">{email}</span>
                </p>
                <p className="font-mono text-[11px] text-muted/50 mt-2">
                  Didn't receive it? Check your spam folder.
                </p>
              </div>
            )}

            <Link
              to="/join"
              className="mt-6 flex items-center justify-center gap-1.5 font-mono text-[12px] text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={13} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
