import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">BinaryLogix</h1>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="text-sm font-bold bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-blue-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Enterprise RBAC 2.0
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[1.1]">
              Secure Access Management, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Simplified.
              </span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Take complete control over your organization's security hierarchy. A centralized portal to manage roles, permissions, and profiles efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <Link to="/signup" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:-translate-y-1 transition-all duration-300">
                Create Free Account
              </Link>
              <Link to="/login" className="w-full sm:w-auto bg-white text-slate-800 px-8 py-4 rounded-2xl text-lg font-bold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                Access Dashboard
              </Link>
            </div>
        </div>
      </main>
      <section className="py-32 px-6 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">Built for Modern Teams</h3>
                <p className="text-lg text-slate-500 font-medium">Everything you need to deploy enterprise-grade access control in minutes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
              <div className="group p-8 border border-slate-100 rounded-3xl bg-slate-50 hover:bg-white hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-4">Admin Supremacy</h4>
                <p className="text-slate-600 leading-relaxed">Absolute control over the system directory. Appoint managers, modify standard users, and audit the entire organization seamlessly.</p>
              </div>

              <div className="group p-8 border border-slate-100 rounded-3xl bg-slate-50 hover:bg-white hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-4">Manager Delegation</h4>
                <p className="text-slate-600 leading-relaxed">Empower your mid-level leadership. Managers can securely onboard standard users and oversee their teams without accessing global admin tools.</p>
              </div>

              <div className="group p-8 border border-slate-100 rounded-3xl bg-slate-50 hover:bg-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-4">Secure Profiles</h4>
                <p className="text-slate-600 leading-relaxed">Give users autonomy over their data. Standard accounts feature dedicated dashboards with secure profile photo and personal detail management.</p>
              </div>
            </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">BinaryLogix</h1>
                </div>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                  Setting the standard for modern Role-Based Access Control. Secure, intuitive, and scalable for organizations of all sizes.
                </p>
            </div>
            
            <div>
                <h5 className="font-bold text-slate-900 tracking-wide mb-4">Repository</h5>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li><a href="https://github.com/aadi90392/BinaryLogix-RBAC" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">GitHub Source</a></li>
                  <li><a href="#" className="hover:text-blue-600 transition-colors">Setup Documentation</a></li>
                </ul>
            </div>
            
            <div>
                <h5 className="font-bold text-slate-900 tracking-wide mb-4">Support</h5>
                <ul className="space-y-3 text-sm text-slate-500">
                  <li>developer@binarylogix.app</li>
                  <li>careers@binarylogix.app</li>
                </ul>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 font-medium">
                © {new Date().getFullYear()} BinaryLogix Task. Built by Aditya Upadhyay.
            </p>
            <div className="flex gap-4 text-sm text-slate-400">
                <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
                <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            </div>
        </div>
      </footer>
      
    </div>
  );
}