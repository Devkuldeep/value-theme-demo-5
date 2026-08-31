import React, { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { UserRole } from '../types/user.types';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  HardHat, 
  Calculator, 
  Sparkles 
} from 'lucide-react';
import { ThemeSwitcher } from '../components/common/ThemeSwitcher';

/**
 * Enterprise Login Page (Frontend Mock Demo Mode)
 */
export const LoginPage: React.FC = () => {
  const { login } = useProjectContext();
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('vikram.singhania@valueconstructions.in');
  const [password, setPassword] = useState('Enterprise@2026');
  const [phone, setPhone] = useState('+91 98450 12890');
  const [otp, setOtp] = useState('567890');
  const [selectedRole, setSelectedRole] = useState<UserRole>('PROJECT_DIRECTOR');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'PROJECT_DIRECTOR') {
      setIdentifier('vikram.singhania@valueconstructions.in');
      setPhone('+91 98450 12890');
    } else if (role === 'SITE_ENGINEER') {
      setIdentifier('anand.kulkarni@valueconstructions.in');
      setPhone('+91 98200 44512');
    } else if (role === 'CHIEF_ESTIMATOR') {
      setIdentifier('priya.nair@valueconstructions.in');
      setPhone('+91 97110 33281');
    } else if (role === 'SAFETY_OFFICER') {
      setIdentifier('rakesh.sharma@valueconstructions.in');
      setPhone('+91 94440 88219');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Left Showcase Hero Panel */}
      <div className="relative lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-slate-900 via-slate-850 to-orange-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        
        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-black text-white text-lg shadow-md">
              VC
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                Value Constructions
              </span>
              <span className="text-[10px] tracking-widest font-semibold uppercase text-orange-400">
                INDIA PRIVATE LIMITED
              </span>
            </div>
          </div>

          <div className="lg:hidden">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 my-12 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Project Directory & UI Design Variants
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Precision Engineering for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Mega Indian Infrastructure</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Real-time milestone tracking, task governance, RERA certificates, and blueprint version management for commercial tech parks across Bengaluru, Pune, and Hyderabad.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl font-mono font-black text-white">₹ 1,740 Cr+</div>
              <div className="text-[11px] text-slate-400">Sanctioned Portfolio</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400">RERA Compliant</div>
            </div>
            <div>
              <div className="text-2xl font-mono font-black text-amber-400">9 Active</div>
              <div className="text-[11px] text-slate-400">Indian Projects</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ISO 27001 Certified • RERA Gateway</span>
          </div>
          <span>© 2026 Value Constructions India</span>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 bg-white dark:bg-slate-900">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="hidden lg:flex justify-end">
            <ThemeSwitcher />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Enterprise Access Portal
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a role profile or click below to enter the client demo showcase
            </p>
          </div>

          {/* Role Presets */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Role Profile Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelect('PROJECT_DIRECTOR')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  selectedRole === 'PROJECT_DIRECTOR'
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600'
                }`}
              >
                <Building2 className="w-4 h-4 shrink-0 text-orange-500" />
                <div className="truncate">
                  <div className="font-semibold text-xs">Project Director</div>
                  <div className="text-[10px] text-slate-400 truncate">V. Singhania</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('SITE_ENGINEER')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  selectedRole === 'SITE_ENGINEER'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600'
                }`}
              >
                <HardHat className="w-4 h-4 shrink-0 text-blue-500" />
                <div className="truncate">
                  <div className="font-semibold text-xs">Site Engineer</div>
                  <div className="text-[10px] text-slate-400 truncate">A. Kulkarni</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('CHIEF_ESTIMATOR')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  selectedRole === 'CHIEF_ESTIMATOR'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600'
                }`}
              >
                <Calculator className="w-4 h-4 shrink-0 text-emerald-500" />
                <div className="truncate">
                  <div className="font-semibold text-xs">Chief Estimator</div>
                  <div className="text-[10px] text-slate-400 truncate">Priya Nair</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('SAFETY_OFFICER')}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                  selectedRole === 'SAFETY_OFFICER'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4 shrink-0 text-purple-500" />
                <div className="truncate">
                  <div className="font-semibold text-xs">HSE Officer</div>
                  <div className="text-[10px] text-slate-400 truncate">R. Sharma</div>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Corporate Email ID
              </label>
              <input
                type="email"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <span>Entering Workspace...</span>
              ) : (
                <>
                  <span>Enter Client Demo Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
