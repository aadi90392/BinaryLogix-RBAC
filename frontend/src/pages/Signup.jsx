import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  if (token && role) {
    if (role === 'Admin') return <Navigate to="/admin" replace />;
    if (role === 'Manager') return <Navigate to="/manager" replace />;
    return <Navigate to="/user" replace />;
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      toast.success(response.data.message);
      navigate('/login'); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create an Account</h2>
          <p className="text-slate-500 mt-2">Join BinaryLogix RBAC Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input type="text" name="name" onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white" placeholder="John Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <input type="email" name="email" onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white" placeholder="name@company.com" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
            <input type="text" name="phone" onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white" placeholder="9876543210" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <input type="password" name="password" onChange={handleChange} required className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 focus:bg-white" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95 mt-2">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}