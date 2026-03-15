import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('directory'); 
  const [users, setUsers] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', role: 'User' });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [usersRes, profileRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users/all', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/users/profile', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setUsers(usersRes.data);
      setMyProfile(profileRes.data);
      setLoading(false);
    } catch (err) { navigate('/login'); }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/create', formData, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Normal User registered!');
      setShowAddForm(false);
      setFormData({ name: '', email: '', password: '', phone: '', role: 'User' });
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Creation failed'); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/edit/${editModal._id}`, editModal, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      toast.success('User details updated!');
      setEditModal(null);
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-600">Loading Manager Portal...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-blue-900 shadow-md px-8 py-4 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">💼 Manager Portal</h1>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('directory')} className={`px-4 py-2 rounded-lg transition font-medium ${activeTab === 'directory' ? 'bg-blue-600' : 'hover:bg-blue-800'}`}>User Directory</button>
          <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-lg transition font-medium ${activeTab === 'profile' ? 'bg-blue-600' : 'hover:bg-blue-800'}`}>My Profile</button>
          <button onClick={() => {localStorage.clear(); navigate('/');}} className="bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600">Logout</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-8 p-6">
        {activeTab === 'directory' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
              <button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-blue-700 transition">
                {showAddForm ? 'Close Form' : '+ Add Standard User'}
              </button>
            </div>

            {showAddForm && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                <p className="text-xs text-red-500 font-bold mb-4 uppercase tracking-tighter">Permission: Restricted to creating standard 'User' only.</p>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input type="text" placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required className="p-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500" />
                  <input type="email" placeholder="Email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required className="p-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500" />
                  <input type="password" placeholder="Password" value={formData.password} onChange={(e)=>setFormData({...formData, password:e.target.value})} required className="p-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500" />
                  <input type="text" placeholder="Phone" value={formData.phone} onChange={(e)=>setFormData({...formData, phone:e.target.value})} required className="p-2.5 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500" />
                  <button type="submit" className="bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 lg:col-span-4 transition">Register User</button>
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider">
                  <tr><th className="p-4">User Details</th><th className="p-4">Role</th><th className="p-4 text-center">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50">
                      <td className="p-4 flex items-center gap-4">
                        <img 
                          src={u.profilePhoto ? `http://localhost:5000${u.profilePhoto}` : `https://ui-avatars.com/api/?name=${u.name}`} 
                          className="w-10 h-10 rounded-full object-cover border ring-1 ring-slate-200" 
                          alt="p" 
                          onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${u.name}`}}
                        />
                        <div><p className="font-bold text-slate-900">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></div>
                      </td>
                      <td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${u.role === 'Admin' ? 'bg-red-100 text-red-700' : u.role === 'Manager' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{u.role}</span></td>
                      <td className="p-4 text-center space-x-3">
                        <button onClick={() => setViewModal(u)} className="text-blue-600 font-bold text-sm hover:underline">View</button>
                        {u.role === 'User' && (
                           <button onClick={() => setEditModal(u)} className="text-emerald-600 font-bold text-sm hover:underline">Edit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold border-b pb-4 mb-6">My Profile</h2>
            <div className="flex items-center gap-6 mb-8">
              <img src={myProfile?.profilePhoto ? `http://localhost:5000${myProfile.profilePhoto}` : `https://ui-avatars.com/api/?name=${myProfile?.name}`} className="w-24 h-24 rounded-full border-4 border-slate-100 object-cover" alt="My Profile"/>
              <div><h2 className="text-3xl font-bold">{myProfile?.name}</h2><span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest">{myProfile?.role}</span></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100"><strong>Email:</strong><br/>{myProfile?.email}</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100"><strong>Phone:</strong><br/>{myProfile?.phone || 'N/A'}</div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2"><strong>Address:</strong><br/>{myProfile?.address || 'Not Provided'}</div>
            </div>
          </div>
        )}

        {viewModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl relative text-center">
              <button onClick={() => setViewModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold">&times;</button>
              <img src={viewModal.profilePhoto ? `http://localhost:5000${viewModal.profilePhoto}` : `https://ui-avatars.com/api/?name=${viewModal.name}`} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-slate-100" alt="Avatar"/>
              <h3 className="text-2xl font-bold">{viewModal.name}</h3>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">{viewModal.role}</p>
              <div className="text-left space-y-3 bg-slate-50 p-4 rounded-xl text-sm border">
                <p><strong>Email:</strong> {viewModal.email}</p>
                <p><strong>Phone:</strong> {viewModal.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {viewModal.address || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {editModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Edit User Details</h3>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                  <input type="text" value={editModal.name} onChange={(e)=>setEditModal({...editModal, name:e.target.value})} className="w-full p-2.5 border rounded-lg bg-slate-50" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                  <input type="text" value={editModal.phone} onChange={(e)=>setEditModal({...editModal, phone:e.target.value})} className="w-full p-2.5 border rounded-lg bg-slate-50" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={()=>setEditModal(null)} className="flex-1 bg-slate-200 p-2.5 rounded-lg font-bold hover:bg-slate-300">Cancel</button>
                  <button type="submit" className="flex-1 bg-blue-600 text-white p-2.5 rounded-lg font-bold hover:bg-blue-700">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}