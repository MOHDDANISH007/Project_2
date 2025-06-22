import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react'

export default function LoginPage () {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
      window.location.reload() // Reload to ensure user info is updated
      // navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      {/* Floating particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='absolute animate-float hidden sm:block'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className='w-4 h-4 text-white/20' />
          </div>
        ))}
      </div>

      {/* Login container */}
      <div className='relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg'>
        <div className='bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20'>
          <div className='text-center mb-6 sm:mb-8'>
            <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg'>
              <Lock className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
              Welcome Back
            </h1>
            <p className='text-sm sm:text-base text-white/70'>
              Sign in to your account
            </p>
          </div>

          {error && (
            <div className='mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-sm'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
            {/* Email Field */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
                <Mail className='w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-focus-within:text-purple-400 transition-colors' />
              </div>
              <input
                type='email'
                placeholder='Email address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm sm:text-base'
                required
              />
            </div>

            {/* Password Field */}
            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
                <Lock className='w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-focus-within:text-purple-400 transition-colors' />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm sm:text-base'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center'
              >
                {showPassword ? (
                  <EyeOff className='w-4 h-4 sm:w-5 sm:h-5 text-white/50 hover:text-white transition-colors' />
                ) : (
                  <Eye className='w-4 h-4 sm:w-5 sm:h-5 text-white/50 hover:text-white transition-colors' />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className='text-center mt-4'>
            <p className='text-white/70'>
              Don't have an account?{' '}
              <button
                onClick={handleSignupClick}
                className='text-purple-300 hover:text-purple-200 font-semibold transition-colors hover:underline'
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Animation Keyframe Style */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  )
}
