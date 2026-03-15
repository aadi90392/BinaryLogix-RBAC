import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: '',
    profilePhoto: null
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUserData(response.data);
      setEditForm({
        name: response.data.name || '',
        phone: response.data.phone || '',
        address: response.data.address || '',
        profilePhoto: null
      });
      setLoading(false);
    } catch (err) {
      toast.error('Session expired. Please login again.');
      localStorage.clear();
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleEditChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      setEditForm({ ...editForm, profilePhoto: e.target.files[0] });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('phone', editForm.phone);
    formData.append('address', editForm.address);
    if (editForm.profilePhoto) {
      formData.append('profilePhoto', editForm.profilePhoto);
    }

    try {
      await axios.put('http://localhost:5000/api/users/profile', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile(); 
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-slate-600">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center border-b border-slate-200">
        <h1 className="text-xl font-bold text-blue-600">User Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition">
          Logout
        </button>
      </nav>

      <main className="max-w-4xl mx-auto mt-10 p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          
          {!isEditing ? (
            <>
              <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
                {userData.profilePhoto ? (
                  <img src={`http://localhost:5000${userData.profilePhoto}`} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-slate-100" />
                ) : (
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                    {userData.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{userData.name}</h2>
                  <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {userData.role}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium mb-1">Email Address</p>
                  <p className="text-lg font-semibold text-slate-900">{userData.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-500 font-medium mb-1">Phone Number</p>
                  <p className="text-lg font-semibold text-slate-900">{userData.phone || 'Not provided'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 md:col-span-2">
                  <p className="text-sm text-slate-500 font-medium mb-1">Address</p>
                  <p className="text-lg font-semibold text-slate-900">{userData.address || 'Not provided'}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                  Edit Profile
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={submitEdit} className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-b pb-4">Edit Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input type="text" name="address" value={editForm.address} onChange={handleEditChange} className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
                  <input type="file" name="profilePhoto" accept="image/*" onChange={handleEditChange} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition">
                  Cancel
                </button>
                <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}