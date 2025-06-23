import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'

    if (!formData.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    // Prevent submission if there are validation errors
    // This ensures the form is validated before proceeding
    if (!validateForm()) return

    setIsLoading(true)
    const fullName = `${formData.firstName} ${formData.lastName}`

    try {
      await signup(fullName, formData.email, formData.password)
      navigate('/')
    } catch (err) {
      console.error('Signup error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

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

      <div className='relative z-10 w-full max-w-lg'>
        <div className='bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20'>
          <div className='text-center mb-6'>
            <div className='inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg mb-4'>
              <User className='w-6 h-6 text-white' />
            </div>
            <h1 className='text-3xl font-bold text-white mb-2'>
              Create Account
            </h1>
            <p className='text-white/70'>Join us and get started</p>
          </div>

          <div className='space-y-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {['firstName', 'lastName'].map(field => (
                <div key={field} className='relative group'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                    <User className='w-5 h-5 text-white/50' />
                  </div>
                  <input
                    type='text'
                    placeholder={
                      field === 'firstName' ? 'First name' : 'Last name'
                    }
                    value={formData[field]}
                    onChange={e => handleInputChange(field, e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                      errors[field] ? 'border-red-400' : 'border-white/20'
                    } rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors[field] && (
                    <p className='text-red-300 text-xs mt-1'>{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className='relative group'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <Mail className='w-5 h-5 text-white/50' />
              </div>
              <input
                type='email'
                placeholder='Email address'
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-white/10 border ${
                  errors.email ? 'border-red-400' : 'border-white/20'
                } rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {errors.email && (
                <p className='text-red-300 text-xs mt-1'>{errors.email}</p>
              )}
            </div>

            {['password', 'confirmPassword'].map((field, idx) => (
              <div className='relative group' key={field}>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <Lock className='w-5 h-5 text-white/50' />
                </div>
                <input
                  type={
                    (field === 'password' ? showPassword : showConfirmPassword)
                      ? 'text'
                      : 'password'
                  }
                  placeholder={
                    field === 'password' ? 'Password' : 'Confirm password'
                  }
                  value={formData[field]}
                  onChange={e => handleInputChange(field, e.target.value)}
                  className={`w-full pl-12 pr-12 py-3 bg-white/10 border ${
                    errors[field] ? 'border-red-400' : 'border-white/20'
                  } rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type='button'
                  onClick={() =>
                    field === 'password'
                      ? setShowPassword(!showPassword)
                      : setShowConfirmPassword(!showConfirmPassword)
                  }
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                >
                  {(
                    field === 'password' ? showPassword : showConfirmPassword
                  ) ? (
                    <EyeOff className='w-5 h-5 text-white/50' />
                  ) : (
                    <Eye className='w-5 h-5 text-white/50' />
                  )}
                </button>
                {errors[field] && (
                  <p className='text-red-300 text-xs mt-1'>{errors[field]}</p>
                )}
              </div>
            ))}

            <div className='flex items-start space-x-3'>
              <input
                type='checkbox'
                id='terms'
                className='w-4 h-4 mt-1 text-purple-500 border-white/20 bg-white/10 rounded'
                required
              />
              <label htmlFor='terms' className='text-sm text-white/70'>
                I agree to the{' '}
                <a
                  href='#'
                  className='text-purple-300 underline hover:text-purple-200'
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href='#'
                  className='text-purple-300 underline hover:text-purple-200'
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className='w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className='text-center mt-6'>
            <p className='text-white/70 text-sm'>
              Already have an account?{' '}
              <button
                onClick={handleLoginClick}
                className='text-purple-300 font-semibold hover:underline'
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default SignupPage
