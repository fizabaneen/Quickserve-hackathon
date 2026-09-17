import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wrench, Mail, Lock, User, UserCheck, Briefcase, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Register() {
  const navigate = useNavigate()
  const { register, loginWithGoogle } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      register(email, role, name)
      setLoading(false)
      if (role === 'provider') {
        navigate('/provider/dashboard')
      } else {
        navigate('/customer/dashboard')
      }
    }, 400)
  }

  const handleGoogleRegister = () => {
    setError('')
    setGoogleLoading(true)
    setTimeout(() => {
      loginWithGoogle(role)
      setGoogleLoading(false)
      if (role === 'provider') {
        navigate('/provider/dashboard')
      } else {
        navigate('/customer/dashboard')
      }
    }, 600)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-stone-200 p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Wrench size={22} />
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">Create Your Account</h1>
          <p className="text-xs text-stone-500 mt-1">
            Join thousands booking and offering verified local home services
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
            Select Your Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                role === 'customer'
                  ? 'border-stone-900 bg-stone-50 text-stone-900 shadow-sm ring-1 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-400 text-stone-600'
              }`}
            >
              {role === 'customer' && (
                <CheckCircle2 size={16} className="absolute top-3 right-3 text-stone-900" />
              )}
              <div className="w-8 h-8 rounded-xl bg-pastel-yellow text-stone-800 flex items-center justify-center mb-2">
                <UserCheck size={16} />
              </div>
              <h3 className="font-extrabold text-xs">Customer</h3>
              <p className="text-[11px] text-stone-500">Book vetted local pros</p>
            </button>

            <button
              type="button"
              onClick={() => setRole('provider')}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                role === 'provider'
                  ? 'border-stone-900 bg-stone-50 text-stone-900 shadow-sm ring-1 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-400 text-stone-600'
              }`}
            >
              {role === 'provider' && (
                <CheckCircle2 size={16} className="absolute top-3 right-3 text-stone-900" />
              )}
              <div className="w-8 h-8 rounded-xl bg-pastel-mint text-stone-800 flex items-center justify-center mb-2">
                <Briefcase size={16} />
              </div>
              <h3 className="font-extrabold text-xs">Service Provider</h3>
              <p className="text-[11px] text-stone-500">Offer services & get hired</p>
            </button>
          </div>
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={googleLoading || loading}
          className="w-full py-3 px-4 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-xs hover:shadow-md active:scale-[0.99]"
        >
          {googleLoading ? (
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500 animate-spin" />
              Connecting with Google ({role})...
            </span>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200"></div>
          </div>
          <span className="relative bg-white px-3 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
            or sign up with email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-xs"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-stone-900 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
