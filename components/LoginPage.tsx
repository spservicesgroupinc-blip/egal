import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Icons } from '../constants';

type AuthView = 'sign-in' | 'sign-up' | 'forgot-password';

const LoginPage: React.FC = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [view, setView] = useState<AuthView>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setError('');
    setMessage('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await signUp(email, password);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email to confirm your account before signing in.');
      setView('sign-in');
      setPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await resetPassword(email);
    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset instructions have been sent to your email.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-legal-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-legal-700 p-2.5 rounded-lg">
              <Icons.Scale />
            </div>
            <span className="text-2xl font-serif font-bold tracking-wide">HoosierLaw</span>
          </div>

          <h1 className="text-4xl font-serif font-bold leading-tight mb-6">
            Indiana Civil Law<br />Research & Drafting
          </h1>
          <p className="text-legal-300 text-lg leading-relaxed max-w-md">
            AI-powered legal research, motion drafting, and case file management built for Indiana practitioners.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 bg-legal-800 p-2 rounded-md shrink-0">
              <Icons.Search />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Deep Legal Research</h3>
              <p className="text-legal-400 text-sm mt-1">Multi-model analysis across case law and Indiana Code.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-0.5 bg-legal-800 p-2 rounded-md shrink-0">
              <Icons.Document />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Motion Drafting</h3>
              <p className="text-legal-400 text-sm mt-1">Generate court-ready motions with proper Trial Rules formatting.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-0.5 bg-legal-800 p-2 rounded-md shrink-0">
              <Icons.Chat />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Expert AI Assistant</h3>
              <p className="text-legal-400 text-sm mt-1">Case strategy consultation with context-aware analysis.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-legal-800">
            <p className="text-legal-500 text-xs">
              This tool provides legal information, not legal advice. No attorney-client relationship is formed.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="bg-legal-900 p-2.5 rounded-lg text-white">
              <Icons.Scale />
            </div>
            <span className="text-2xl font-serif font-bold text-legal-900 tracking-wide">HoosierLaw</span>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-legal-900">
              {view === 'sign-in' && 'Sign in to your account'}
              {view === 'sign-up' && 'Create an account'}
              {view === 'forgot-password' && 'Reset your password'}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {view === 'sign-in' && 'Enter your credentials to access HoosierLaw.'}
              {view === 'sign-up' && 'Get started with your legal research workspace.'}
              {view === 'forgot-password' && 'We\'ll send reset instructions to your email.'}
            </p>
          </div>

          {/* Status messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          {/* Sign In Form */}
          {view === 'sign-in' && (
            <form onSubmit={handleSignIn} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-legal-500 focus:ring-2 focus:ring-legal-100 outline-none transition text-sm"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button
                    type="button"
                    onClick={() => { resetForm(); setView('forgot-password'); }}
                    className="text-xs text-legal-600 hover:text-legal-800 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-legal-500 focus:ring-2 focus:ring-legal-100 outline-none transition text-sm"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-legal-900 text-white font-semibold rounded-lg hover:bg-legal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { resetForm(); setView('sign-up'); }}
                  className="text-legal-700 font-semibold hover:text-legal-900 transition-colors"
                >
                  Create one
                </button>
              </p>
            </form>
          )}

          {/* Sign Up Form */}
          {view === 'sign-up' && (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-legal-500 focus:ring-2 focus:ring-legal-100 outline-none transition text-sm"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-legal-500 focus:ring-2 focus:ring-legal-100 outline-none transition text-sm"
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-legal-500 focus:ring-2 focus:ring-legal-100 outline-none transition text-sm"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-legal-900 text-white font-semibold rounded-lg hover:bg-legal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { resetForm(); setView('sign-in'); }}
                  className="text-legal-700 font-semibold hover:text-legal-900 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* Forgot Password Form */}
          {view === 'forgot-password' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-legal-500 focus:ring-2 focus:ring-legal-100 outline-none transition text-sm"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-legal-900 text-white font-semibold rounded-lg hover:bg-legal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {loading ? 'Sending...' : 'Send reset instructions'}
              </button>
              <p className="text-center text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => { resetForm(); setView('sign-in'); }}
                  className="text-legal-700 font-semibold hover:text-legal-900 transition-colors"
                >
                  Back to sign in
                </button>
              </p>
            </form>
          )}

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              By signing in, you acknowledge that HoosierLaw AI provides legal information, not legal advice.
              No attorney-client relationship is formed. Always consult a licensed Indiana attorney.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
