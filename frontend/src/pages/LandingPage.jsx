import { Link, Navigate } from 'react-router-dom';

export default function LandingPage() {
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (token && role) {
    if (role === 'Admin') return <Navigate to="/admin" replace />;
    if (role === 'Manager') return <Navigate to="/manager" replace />;
    return <Navigate to="/user" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">BinaryLogix</h1>
        <div className="space-x-5">
          <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium transition">Login</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 font-medium transition shadow-sm">Sign Up</Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Smart Access Management
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          A secure, fast, and reliable way to manage roles and permissions. Simplify administration with our powerful RBAC system built for modern teams.
        </p>
        <div className="flex gap-4">
          <Link to="/signup" className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 shadow-md transition hover:-translate-y-0.5">Get Started</Link>
          <Link to="/login" className="bg-white text-slate-700 px-8 py-3.5 rounded-lg font-semibold border border-slate-300 hover:bg-slate-50 transition hover:-translate-y-0.5">Login</Link>
        </div>
      </main>

      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Admin Control</h3>
            <p className="text-slate-600">Complete visibility and control over all managers and users in the system.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Manager Access</h3>
            <p className="text-slate-600">Efficiently manage team members and oversee user profiles with delegated access.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition duration-300">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">User Profiles</h3>
            <p className="text-slate-600">Secure personal accounts with profile management and personalized dashboards.</p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 text-center py-6">
        <p className="text-sm">&copy; 2026 BinaryLogix RBAC Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}