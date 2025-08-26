
import React, { useState } from 'react';

export default function AdminPanel({ onSignOut }: { onSignOut: () => void }) {
  const [view, setView] = useState<'home' | 'bookstall' | 'sponsor' | 'visitor'>('home');
  type BookStall = {
    _id?: string;
    fullName: string;
    businessName: string;
    city: string;
    contactNumber: string;
    email: string;
    message: string;
    createdAt?: string;
  };
  const [bookStallData, setBookStallData] = useState<BookStall[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<BookStall | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  // Handle delete
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    setActionLoading(true);
    await fetch(`http://localhost:5000/api/bookstall/${id}`, { method: 'DELETE' });
    await fetchBookStall();
    setActionLoading(false);
  };

  // Handle edit
  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditForm({ ...bookStallData[idx] });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!editForm || !editForm._id) return;
    setActionLoading(true);
    await fetch(`http://localhost:5000/api/bookstall/${editForm._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditIdx(null);
    setEditForm(null);
    await fetchBookStall();
    setActionLoading(false);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditForm(null);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookStall = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/bookstall');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBookStallData(data);
    } catch {
      setError('Could not load Book Stall data');
    }
    setLoading(false);
  };

  // Auto-refresh Book Stall data every 10 seconds when viewing Book Stall
  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (view === 'bookstall') {
      fetchBookStall();
      interval = setInterval(fetchBookStall, 10000);
    }
    return () => interval && clearInterval(interval);
  }, [view]);

  return (
    <div className="min-h-screen min-w-screen w-screen h-screen flex flex-col bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute bg-blue-300 opacity-20 rounded-full w-[600px] h-[600px] top-[-200px] left-[-200px] animate-pulse-slow" />
        <div className="absolute bg-green-300 opacity-20 rounded-full w-[400px] h-[400px] bottom-[-120px] right-[-120px] animate-pulse-slow2" />
        <div className="absolute bg-yellow-200 opacity-10 rounded-full w-[350px] h-[350px] top-[60%] left-[60%] animate-pulse-slow3" />
      </div>
      {/* Modern sticky navbar */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-10 py-4 bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100">
        <div className="flex items-center gap-4">
          <img src="/logo1.png" alt="FoodMech Logo" className="w-30 h-20 object-contain drop-shadow-xl animate-bounce-slow" style={{maxHeight:'60px'}} />
          
        </div>
        <div className="flex gap-2">
          
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${view === 'bookstall' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
            onClick={() => setView('bookstall')}
          >
            Book Stall
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${view === 'sponsor' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
            onClick={() => setView('sponsor')}
          >
            Sponsor
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${view === 'visitor' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
            onClick={() => setView('visitor')}
          >
            Visitor
          </button>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('foodmech_admin');
            onSignOut();
          }}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition ml-4"
        >
          Sign Out
        </button>
      </nav>
      <div className="flex-1 flex flex-col bg-white/90 backdrop-blur-lg p-8 rounded-none shadow-none w-full h-full relative z-10 animate-fade-in">
        {/* SPONSOR SECTION */}
        {view === 'sponsor' && (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Sponsor Submissions</h2>
            <div className="text-gray-500 text-center">(Sponsor data integration coming soon)</div>
          </div>
        )}
        {/* VISITOR SECTION */}
        {view === 'visitor' && (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Visitor Submissions</h2>
            <div className="text-gray-500 text-center">(Visitor data integration coming soon)</div>
          </div>
        )}
        {view === 'home' && (
          <div className="text-center text-xl text-gray-700 font-medium py-12">
            Welcome, <span className="text-blue-600 font-bold">FOODMECH</span> admin!<br />
            Use the navigation above to manage submissions.
          </div>
        )}
        {view === 'bookstall' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Book Stall Inquiries</h2>
            {loading && <div className="text-center text-blue-600">Loading...</div>}
            {error && <div className="text-center text-red-600">{error}</div>}
            {!loading && !error && (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 border-b">Full Name</th>
                      <th className="py-2 px-4 border-b">Business Name</th>
                      <th className="py-2 px-4 border-b">City</th>
                      <th className="py-2 px-4 border-b">Contact Number</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">Message</th>
                      <th className="py-2 px-4 border-b">Date</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookStallData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6 text-gray-500">No submissions yet.</td>
                      </tr>
                    ) : (
                      bookStallData.map((row, idx) => (
                        <tr key={row._id || idx} className="hover:bg-blue-50">
                          {editIdx === idx ? (
                            <>
                              <td className="py-2 px-4 border-b"><input name="fullName" value={editForm?.fullName || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" /></td>
                              <td className="py-2 px-4 border-b"><input name="businessName" value={editForm?.businessName || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" /></td>
                              <td className="py-2 px-4 border-b"><input name="city" value={editForm?.city || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-24" /></td>
                              <td className="py-2 px-4 border-b"><input name="contactNumber" value={editForm?.contactNumber || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-28" /></td>
                              <td className="py-2 px-4 border-b"><input name="email" value={editForm?.email || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" /></td>
                              <td className="py-2 px-4 border-b"><textarea name="message" value={editForm?.message || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" /> </td>
                              <td className="py-2 px-4 border-b">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ''}</td>
                              <td className="py-2 px-4 border-b flex gap-2">
                                <button onClick={handleEditSave} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" disabled={actionLoading}>Save</button>
                                <button onClick={handleEditCancel} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500" disabled={actionLoading}>Cancel</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-2 px-4 border-b">{row.fullName}</td>
                              <td className="py-2 px-4 border-b">{row.businessName}</td>
                              <td className="py-2 px-4 border-b">{row.city}</td>
                              <td className="py-2 px-4 border-b">{row.contactNumber}</td>
                              <td className="py-2 px-4 border-b">{row.email}</td>
                              <td className="py-2 px-4 border-b">{row.message}</td>
                              <td className="py-2 px-4 border-b">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ''}</td>
                              <td className="py-2 px-4 border-b flex gap-2">
                                <button onClick={() => handleEdit(idx)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" disabled={actionLoading}>Edit</button>
                                <button onClick={() => handleDelete(row._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" disabled={actionLoading}>Delete</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
