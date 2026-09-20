import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, User, Shield, Activity, Database, Sun, Moon, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react';
import adaniLogo from 'figma:asset/6f29c1a0f289e97c582d0783215dfe3554c97f37.png';

interface LoginPageProps {
  onLogin: (username: string, role: 'supervisor' | 'sitepm' | 'admin') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function LoginPage({ onLogin, theme, onToggleTheme }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Authentication logic
    if (password !== '123') {
      setError('Invalid password. Demo password is 123');
      return;
    }

    if (username === 'supervisor') {
      onLogin(username, 'supervisor');
    } else if (username === 'sitepm') {
      onLogin(username, 'sitepm');
    } else if (username === 'admin') {
      onLogin(username, 'admin');
    } else {
      setError('Invalid username. Use: supervisor, sitepm, or admin');
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ 
      background: isLight 
        ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #e0e7ff 100%)' 
        : 'radial-gradient(circle at 80% 20%, #2e1065 0%, #1a1625 60%, #0f0d18 100%)' 
    }}>
      {/* Dynamic Background Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          onClick={onToggleTheme}
          className={`p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${
            isLight 
              ? 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200/80 shadow-gray-200/50' 
              : 'bg-purple-950/60 text-purple-200 hover:bg-purple-900/80 border border-purple-700/60 shadow-purple-950/50'
          }`}
        >
          {isLight ? <Moon className="w-5 h-5 text-purple-700" /> : <Sun className="w-5 h-5 text-amber-300" />}
        </Button>
      </div>

      {/* Left Side - PSP Branding */}
      <div className="hidden lg:flex lg:w-7/12 flex-col justify-center items-center p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #6b3ba4 0%, #75479C 40%, #BD3861 100%)' }}>
        
        {/* Decorative Background Lighting Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-pink-300 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute inset-0 bg-[radial-gradient(#rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        
        <div className="max-w-3xl w-full space-y-10 relative z-10">
          {/* Main Hero Header */}
          <div className="space-y-6" data-aos="fade-down">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl inline-block shadow-2xl border border-white/40 transform hover:scale-105 transition-all">
                <img src={adaniLogo} alt="Adani Renewables" className="h-12 w-auto object-contain" />
              </div>
              <span className="bg-white/20 text-white font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border border-white/30 backdrop-blur-xl shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                PSP Module
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl leading-[1.15] text-white font-extrabold tracking-tight drop-shadow-sm">
              Project Status<br />Portal (PSP)<br />
              <span className="bg-gradient-to-r from-pink-200 via-white to-pink-300 bg-clip-text text-transparent text-xl lg:text-2xl font-semibold">
                Workflow Automation
              </span>
            </h1>
            <p className="text-lg xl:text-xl text-pink-100/90 leading-relaxed font-normal max-w-xl">
              Real-time daily progress monitoring, Excel summary generation, and Primavera P6 database integration.
            </p>
          </div>
          
          {/* Feature Cards Single Row */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div 
              className="flex flex-col gap-3 bg-white/15 backdrop-blur-xl p-5 rounded-2xl border border-white/30 shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.03]"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/40">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug">Real-Time Progress Entry</h3>
                <p className="text-pink-100/90 text-xs leading-relaxed">Site Supervisors track daily quantities with automated catch-up plans</p>
              </div>
            </div>

            <div 
              className="flex flex-col gap-3 bg-white/15 backdrop-blur-xl p-5 rounded-2xl border border-white/30 shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.03]"
              data-aos="fade-up" 
              data-aos-delay="200"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/40">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug">Multi-Role RBAC Workflow</h3>
                <p className="text-pink-100/90 text-xs leading-relaxed">Structured verification flow from Supervisor → Site PM → PMAG Admin</p>
              </div>
            </div>

            <div 
              className="flex flex-col gap-3 bg-white/15 backdrop-blur-xl p-5 rounded-2xl border border-white/30 shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-[1.03]"
              data-aos="fade-up" 
              data-aos-delay="300"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/40">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-snug">P6 Database Sync & Monthly Reports</h3>
                <p className="text-pink-100/90 text-xs leading-relaxed">Automated summary generation and Primavera P6 database integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md" data-aos="zoom-in" data-aos-delay="150">
          <div className={`p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-2xl transition-all ${
            isLight 
              ? 'bg-white/95 border border-gray-200/90 shadow-gray-200/60' 
              : 'bg-gray-900/90 border-2 border-purple-900/60 shadow-purple-950/60'
          }`}>
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-3 transition-transform" 
                  style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
                  <LayoutDashboard className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-extrabold ${isLight ? 'text-gray-900' : 'text-white'}`}>PSP Module Login</h2>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-gray-500' : 'text-purple-300'}`}>Select your role & sign in to continue</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="username" className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Username</Label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isLight ? 'text-gray-400' : 'text-purple-400'}`} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username (supervisor / sitepm / admin)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={`pl-12 h-13 text-sm rounded-2xl font-medium transition-all ${
                      isLight 
                        ? 'bg-gray-50/80 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500' 
                        : 'bg-gray-800/80 border-purple-900/60 text-white placeholder:text-gray-500 focus:bg-gray-800 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400'
                    }`}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="password" className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Password</Label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isLight ? 'text-gray-400' : 'text-purple-400'}`} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password (123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`pl-12 h-13 text-sm rounded-2xl font-medium transition-all ${
                      isLight 
                        ? 'bg-gray-50/80 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500' 
                        : 'bg-gray-800/80 border-purple-900/60 text-white placeholder:text-gray-500 focus:bg-gray-800 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400'
                    }`}
                  />
                </div>
              </div>

              {error && (
                <div className={`p-3.5 rounded-xl border flex items-center gap-2 ${
                  isLight ? 'bg-red-50 border-red-200 text-red-700' : 'bg-red-950/40 border-red-800/60 text-red-300'
                }`}>
                  <p className="text-xs font-medium">{error}</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-13 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base rounded-2xl font-bold hover:scale-[1.01] active:scale-[0.99] mt-2"
                style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}
              >
                Sign In to PSP Portal
              </Button>

              {/* Demo Login Quick Switcher */}
              <div className={`pt-5 border-t ${isLight ? 'border-gray-200' : 'border-gray-800'}`}>
                <p className={`text-[11px] font-bold uppercase tracking-wider mb-2.5 flex items-center justify-between ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  <span>Role-Based Demo Logins</span>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">Click row to auto-fill</span>
                </p>
                <div className="space-y-2 text-xs">
                  <div 
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:translate-x-1 border ${
                      username === 'supervisor'
                        ? 'border-purple-500 bg-purple-100/80 dark:bg-purple-950/80 font-bold'
                        : isLight ? 'bg-purple-50/70 hover:bg-purple-100/90 text-purple-950 border-purple-100' : 'bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 border-purple-900/50'
                    }`} 
                    onClick={() => { setUsername('supervisor'); setPassword('123'); setError(''); }}
                  >
                    <div className="flex items-center gap-2">
                      {username === 'supervisor' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />}
                      <span className="font-semibold">1. Site Supervisor</span>
                    </div>
                    <span className="text-[11px] bg-purple-200/80 dark:bg-purple-900/90 px-2 py-0.5 rounded-md font-mono text-purple-950 dark:text-purple-100 font-semibold">
                      supervisor / 123
                    </span>
                  </div>

                  <div 
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:translate-x-1 border ${
                      username === 'sitepm'
                        ? 'border-blue-500 bg-blue-100/80 dark:bg-blue-950/80 font-bold'
                        : isLight ? 'bg-blue-50/70 hover:bg-blue-100/90 text-blue-950 border-blue-100' : 'bg-blue-950/40 hover:bg-blue-900/60 text-blue-200 border-blue-900/50'
                    }`} 
                    onClick={() => { setUsername('sitepm'); setPassword('123'); setError(''); }}
                  >
                    <div className="flex items-center gap-2">
                      {username === 'sitepm' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />}
                      <span className="font-semibold">2. Site PM</span>
                    </div>
                    <span className="text-[11px] bg-blue-200/80 dark:bg-blue-900/90 px-2 py-0.5 rounded-md font-mono text-blue-950 dark:text-blue-100 font-semibold">
                      sitepm / 123
                    </span>
                  </div>

                  <div 
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:translate-x-1 border ${
                      username === 'admin'
                        ? 'border-pink-500 bg-pink-100/80 dark:bg-pink-950/80 font-bold'
                        : isLight ? 'bg-pink-50/70 hover:bg-pink-100/90 text-pink-950 border-pink-100' : 'bg-pink-950/40 hover:bg-pink-900/60 text-pink-200 border-pink-900/50'
                    }`} 
                    onClick={() => { setUsername('admin'); setPassword('123'); setError(''); }}
                  >
                    <div className="flex items-center gap-2">
                      {username === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 dark:text-pink-300" />}
                      <span className="font-semibold">3. PMAG Admin</span>
                    </div>
                    <span className="text-[11px] bg-pink-200/80 dark:bg-pink-900/90 px-2 py-0.5 rounded-md font-mono text-pink-950 dark:text-pink-100 font-semibold">
                      admin / 123
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
