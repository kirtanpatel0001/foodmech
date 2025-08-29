import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import * as XLSX from 'xlsx';

export default function AdminPanel({ onSignOut }: { onSignOut: () => void }) {
  const [view, setView] = useState<'home' | 'bookstall' | 'sponsor' | 'visitor'>('home');
  type Entry = {
    _id?: string;
    fullName: string;
    businessName: string;
    city: string;
    contactNumber: string;
    email: string;
    message: string;
    createdAt?: string;
  };
  type ExtendedEntry = Entry & { createdDateString?: string; nameLower?: string };
  const [bookStallData, setBookStallData] = useState<ExtendedEntry[]>([]);
  const [sponsorData, setSponsorData] = useState<ExtendedEntry[]>([]);
  const bookstallLoadedRef = useRef(false);
  const sponsorLoadedRef = useRef(false);
  const [deletingIdx, setDeletingIdx] = useState<number | null>(null);
  const [pageFade, setPageFade] = useState<'in' | 'out'>('in');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Entry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const API_BASE = "https://foodmech.onrender.com";
  // Handle delete (works for both bookstall and sponsor)
  const handleDelete = async (id: string | undefined, idx?: number, type: 'bookstall' | 'sponsor' = 'bookstall') => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    setDeletingIdx(idx ?? null);
    setActionLoading(true);
    try {
      await fetch(`${API_BASE}/api/${type}/${id}`, { method: 'DELETE' });
      if (type === 'bookstall') await fetchBookStall();
      if (type === 'sponsor') await fetchSponsor();
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingIdx(null);
      setActionLoading(false);
    }
  };

  // Handle edit (works for both bookstall and sponsor)
  const handleEdit = (idx: number, type: 'bookstall' | 'sponsor' = 'bookstall') => {
    setEditIdx(idx);
    setEditForm(type === 'bookstall' ? { ...bookStallData[idx] } : { ...sponsorData[idx] });
    setShowModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (type: 'bookstall' | 'sponsor' = 'bookstall') => {
    if (!editForm || !editForm._id) return;
    setActionLoading(true);
    await fetch(`${API_BASE}/api/${type}/${editForm._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setEditIdx(null);
    setEditForm(null);
    setShowModal(false);
    if (type === 'bookstall') await fetchBookStall();
    if (type === 'sponsor') await fetchSponsor();
    setActionLoading(false);
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditForm(null);
    setShowModal(false);
  };
  // Separate loading / error states per dataset to avoid blocking UI when only one view is loading
  const [loadingBookstall, setLoadingBookstall] = useState(false);
  const [loadingSponsor, setLoadingSponsor] = useState(false);
  const [errorBookstall, setErrorBookstall] = useState('');
  const [errorSponsor, setErrorSponsor] = useState('');

  // Search debounce to avoid filtering every keystroke
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 250);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const processEntries = useCallback((data: Entry[] = []): ExtendedEntry[] => data.map(d => ({
    ...d,
    createdDateString: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '',
    nameLower: (d.fullName || '').toLowerCase(),
  })), []);

  const fetchBookStall = useCallback(async (force = false) => {
    if (!force && bookstallLoadedRef.current) return;
    const shouldShowLoading = force || !bookstallLoadedRef.current;
    if (shouldShowLoading) {
      setLoadingBookstall(true);
      setErrorBookstall('');
    }
    try {
      const res = await fetch(`${API_BASE}/api/bookstall`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: Entry[] = await res.json();
      setBookStallData(processEntries(data || []));
      bookstallLoadedRef.current = true;
    } catch (e) {
      setErrorBookstall('Could not load Book Stall data');
      console.error(e);
    } finally {
      if (shouldShowLoading) setLoadingBookstall(false);
    }
  }, [processEntries]);

  const fetchSponsor = useCallback(async (force = false) => {
    if (!force && sponsorLoadedRef.current) return;
    const shouldShowLoading = force || !sponsorLoadedRef.current;
    if (shouldShowLoading) {
      setLoadingSponsor(true);
      setErrorSponsor('');
    }
    try {
      const res = await fetch(`${API_BASE}/api/sponsor`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data: Entry[] = await res.json();
      setSponsorData(processEntries(data || []));
      sponsorLoadedRef.current = true;
    } catch (e) {
      setErrorSponsor('Could not load Sponsor data');
      console.error(e);
    } finally {
      if (shouldShowLoading) setLoadingSponsor(false);
    }
  }, [processEntries]);

  // Auto-refresh Book Stall/Sponsor data every 2 minutes when viewing
  React.useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (view === 'bookstall') {
      fetchBookStall(true);
      interval = setInterval(() => fetchBookStall(true), 120000);
    }
    if (view === 'sponsor') {
      fetchSponsor(true);
      interval = setInterval(() => fetchSponsor(true), 120000);
    }
    return () => interval && clearInterval(interval);
  }, [view, fetchBookStall, fetchSponsor]);

  // Prefetch both datasets on mount so switching views feels instant
  useEffect(() => {
    fetchBookStall(true);
    fetchSponsor(true);
  }, [fetchBookStall, fetchSponsor]);

  // Animate page transitions
  const handleSetView = (v: typeof view) => {
    setPageFade('out');
    setTimeout(() => {
      setView(v);
      setPageFade('in');
      setPage(1); // reset pagination when switching views
    }, 350);
  };

  // (Excel export is now handled inline in the button, so this function is removed)

  // Filter state and logic
  // Filter states
  const [filter, setFilter] = useState(''); // kept for compatibility with existing controlled input names
  const [dateFilter, setDateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  // Keep search term in sync with legacy `filter` input
  useEffect(() => setSearchTerm(filter), [filter]);

  // Unique values for dropdowns (bookstall)
  // Memoized unique filters and filtered lists to avoid recomputation on unrelated re-renders
  const uniqueDates = useMemo(() => Array.from(new Set(bookStallData.map(row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : ''))).filter(Boolean), [bookStallData]);
  const uniqueCities = useMemo(() => Array.from(new Set(bookStallData.map(row => row.city))).filter(Boolean), [bookStallData]);
  const uniqueSponsorDates = useMemo(() => Array.from(new Set(sponsorData.map(row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : ''))).filter(Boolean), [sponsorData]);
  const uniqueSponsorCities = useMemo(() => Array.from(new Set(sponsorData.map(row => row.city))).filter(Boolean), [sponsorData]);

  const filteredBookStall = useMemo(() => {
    const q = (debouncedSearch || '').toLowerCase();
    return bookStallData.filter(row => {
      const nameMatch = row.fullName.toLowerCase().includes(q);
      const dateMatch = dateFilter ? (row.createdAt && new Date(row.createdAt).toLocaleDateString() === dateFilter) : true;
      const cityMatch = cityFilter ? row.city === cityFilter : true;
      return nameMatch && dateMatch && cityMatch;
    });
  }, [bookStallData, debouncedSearch, dateFilter, cityFilter]);

  const filteredSponsor = useMemo(() => {
    const q = (debouncedSearch || '').toLowerCase();
    return sponsorData.filter(row => {
      const nameMatch = row.fullName.toLowerCase().includes(q);
      const dateMatch = dateFilter ? (row.createdAt && new Date(row.createdAt).toLocaleDateString() === dateFilter) : true;
      const cityMatch = cityFilter ? row.city === cityFilter : true;
      return nameMatch && dateMatch && cityMatch;
    });
  }, [sponsorData, debouncedSearch, dateFilter, cityFilter]);

  // Paginated slices
  const paginatedBookStall = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredBookStall.slice(start, start + PAGE_SIZE);
  }, [filteredBookStall, page]);

  const paginatedSponsor = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredSponsor.slice(start, start + PAGE_SIZE);
  }, [filteredSponsor, page]);

  // Reset page when filters/search change
  useEffect(() => setPage(1), [debouncedSearch, dateFilter, cityFilter]);

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
          <img src="/images/logo1\.png" alt="FoodMech Logo" className="w-30 h-20 object-contain drop-shadow-xl animate-bounce-slow" style={{maxHeight:'60px'}} />
          
        </div>
        <div className="flex gap-2">
          
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${view === 'bookstall' ? 'bg-red-600 text-white border-b-gray-950' : 'bg-gray-200 text-gray-700'} transition`}
            onClick={() => handleSetView('bookstall')}
          >
            Book Stall
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${view === 'sponsor' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
            onClick={() => handleSetView('sponsor')}
          >
            Sponsor
          </button>
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${view === 'visitor' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} transition`}
            onClick={() => handleSetView('visitor')}
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
  <div className={`flex-1 flex flex-col bg-white/90 backdrop-blur-lg p-8 rounded-none shadow-none w-full h-full relative z-10 transition-opacity duration-500 ${pageFade === 'in' ? 'opacity-100 animate-fade-in' : 'opacity-0 animate-fade-out'}`}>
        {/* SPONSOR SECTION */}
        {view === 'sponsor' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h2 className="text-2xl font-bold text-blue-700">Sponsor Submissions</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search Name..."
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition w-48"
                />
                <select
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                >
                  <option value="">All Dates</option>
                  {uniqueSponsorDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
                <select
                  value={cityFilter}
                  onChange={e => setCityFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                >
                  <option value="">All Cities</option>
                  {uniqueSponsorCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (!filteredSponsor.length) return;
                    const data = filteredSponsor.map((row, idx) => ({
                      ID: `SPONSOR${String(idx + 1).padStart(2, '0')}`,
                      ...row
                    }));
                    const ws = XLSX.utils.json_to_sheet(data);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'Sponsor');
                    XLSX.writeFile(wb, 'sponsor_data.xlsx');
                  }}
                  className="px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <span className="material-icons text-white text-lg">download</span>
                 
                </button>
              </div>
            </div>
            {loadingSponsor && <div className="text-center text-blue-600">Loading...</div>}
            {errorSponsor && <div className="text-center text-red-600">{errorSponsor}</div>}
            {!loadingSponsor && !errorSponsor && (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 border-b">ID</th>
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
                    {filteredSponsor.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-6 text-gray-500">No submissions yet.</td>
                      </tr>
                    ) : (
                      paginatedSponsor.map((row, idx) => {
                        const globalIdx = (page - 1) * PAGE_SIZE + idx;
                        return (
                        <tr
                          key={row._id || idx}
                          className={`hover:bg-blue-50 transition-all duration-400 ${deletingIdx === globalIdx ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
                          style={{ transition: 'opacity 0.4s, transform 0.4s' }}
                        >
                          {editIdx === globalIdx ? (
                            <>
                              <td className="py-2 px-4 border-b font-bold text-gray-500">{`SPONSOR${String(globalIdx + 1).padStart(2, '0')}`}</td>
                              <td className="py-2 px-4 border-b"><input name="fullName" value={editForm?.fullName || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" /></td>
                              <td className="py-2 px-4 border-b"><input name="businessName" value={editForm?.businessName || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" /></td>
                              <td className="py-2 px-4 border-b"><input name="city" value={editForm?.city || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-24" /></td>
                              <td className="py-2 px-4 border-b"><input name="contactNumber" value={editForm?.contactNumber || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-28" /></td>
                              <td className="py-2 px-4 border-b"><input name="email" value={editForm?.email || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" /></td>
                              <td className="py-2 px-4 border-b"><textarea name="message" value={editForm?.message || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" /> </td>
                              <td className="py-2 px-4 border-b">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ''}</td>
                              <td className="py-2 px-4 border-b flex gap-2"></td>
                            </>
                          ) : (
                            <>
                              <td className="py-2 px-4 border-b font-bold text-gray-500">{`SPONSOR${String(globalIdx + 1).padStart(2, '0')}`}</td>
                              <td className="py-2 px-4 border-b">{row.fullName}</td>
                              <td className="py-2 px-4 border-b">{row.businessName}</td>
                              <td className="py-2 px-4 border-b">{row.city}</td>
                              <td className="py-2 px-4 border-b">{row.contactNumber}</td>
                              <td className="py-2 px-4 border-b">{row.email}</td>
                              <td className="py-2 px-4 border-b">{row.message}</td>
                              <td className="py-2 px-4 border-b">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ''}</td>
                              <td className="py-2 px-4 border-b flex gap-2 justify-center">
                                <button
                                  onClick={() => handleEdit(globalIdx, 'sponsor')}
                                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 shadow transition flex items-center justify-center"
                                  title="Edit"
                                  disabled={actionLoading}
                                >
                                  <span className="material-icons text-blue-600 text-xl">edit</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(row._id, globalIdx, 'sponsor')}
                                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 shadow transition flex items-center justify-center"
                                  title="Delete"
                                  disabled={actionLoading}
                                >
                                  <span className="material-icons text-red-600 text-xl">delete</span>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })
                    )}
                  </tbody>
                </table>
                {/* Pagination controls */}
                {filteredSponsor.length > PAGE_SIZE && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button className="px-3 py-1 bg-gray-200 rounded" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                    <button className="px-3 py-1 bg-gray-200 rounded" disabled={(page * PAGE_SIZE) >= filteredSponsor.length} onClick={() => setPage(p => p + 1)}>Next</button>
                  </div>
                )}
              </div>
            )}
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
              <h2 className="text-2xl font-bold text-green-700">Book Stall Inquiries</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  placeholder="Search Name..."
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition w-48"
                />
                <select
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                >
                  <option value="">All Dates</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
                <select
                  value={cityFilter}
                  onChange={e => setCityFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition"
                >
                  <option value="">All Cities</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (!filteredBookStall.length) return;
                    const data = filteredBookStall.map((row, idx) => ({
                      ID: `FOODMECH${String(idx + 1).padStart(2, '0')}`,
                      ...row
                    }));
                    const ws = XLSX.utils.json_to_sheet(data);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'BookStall');
                    XLSX.writeFile(wb, 'bookstall_data.xlsx');
                  }}
                  className="px-5 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition flex items-center gap-2"
                >
                  <span className="material-icons text-white text-lg">download</span>
                  
                </button>
              </div>
            </div>
            
            {loadingBookstall && <div className="text-center text-blue-600">Loading...</div>}
            {errorBookstall && <div className="text-center text-red-600">{errorBookstall}</div>}
            {!loadingBookstall && !errorBookstall && (
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 border-b">ID</th>
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
                    {filteredBookStall.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-6 text-gray-500">No submissions yet.</td>
                      </tr>
                    ) : (
                      paginatedBookStall.map((row, idx) => {
                        const globalIdx = (page - 1) * PAGE_SIZE + idx;
                        return (
                        <tr
                          key={row._id || idx}
                          className={`hover:bg-blue-50 transition-all duration-400 ${deletingIdx === globalIdx ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
                          style={{ transition: 'opacity 0.4s, transform 0.4s' }}
                        >
                          {editIdx === globalIdx ? (
                            <>
                              <td className="py-2 px-4 border-b font-bold text-gray-500">{`FOODMECH${String(globalIdx + 1).padStart(2, '0')}`}</td>
                              <td className="py-2 px-4 border-b"><input name="fullName" value={editForm?.fullName || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" /></td>
                              <td className="py-2 px-4 border-b"><input name="businessName" value={editForm?.businessName || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-32" /></td>
                              <td className="py-2 px-4 border-b"><input name="city" value={editForm?.city || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-24" /></td>
                              <td className="py-2 px-4 border-b"><input name="contactNumber" value={editForm?.contactNumber || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-28" /></td>
                              <td className="py-2 px-4 border-b"><input name="email" value={editForm?.email || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" /></td>
                              <td className="py-2 px-4 border-b"><textarea name="message" value={editForm?.message || ''} onChange={handleEditChange} className="border rounded px-2 py-1 w-40" /> </td>
                              <td className="py-2 px-4 border-b">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ''}</td>
                              <td className="py-2 px-4 border-b flex gap-2"></td>
                            </>
                          ) : (
                            <>
                              <td className="py-2 px-4 border-b font-bold text-gray-500">{`FOODMECH${String(globalIdx + 1).padStart(2, '0')}`}</td>
                              <td className="py-2 px-4 border-b">{row.fullName}</td>
                              <td className="py-2 px-4 border-b">{row.businessName}</td>
                              <td className="py-2 px-4 border-b">{row.city}</td>
                              <td className="py-2 px-4 border-b">{row.contactNumber}</td>
                              <td className="py-2 px-4 border-b">{row.email}</td>
                              <td className="py-2 px-4 border-b">{row.message}</td>
                              <td className="py-2 px-4 border-b">{row.createdAt ? new Date(row.createdAt).toLocaleString() : ''}</td>
                              <td className="py-2 px-4 border-b flex gap-2 justify-center">
                                <button
                                  onClick={() => handleEdit(globalIdx)}
                                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 shadow transition flex items-center justify-center"
                                  title="Edit"
                                  disabled={actionLoading}
                                >
                                  <span className="material-icons text-blue-600 text-xl">edit</span>
                                </button>
                                <button
                                  onClick={() => handleDelete(row._id, globalIdx)}
                                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 shadow transition flex items-center justify-center"
                                  title="Delete"
                                  disabled={actionLoading}
                                >
                                  <span className="material-icons text-red-600 text-xl">delete</span>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pagination controls for Bookstall */}
            {filteredBookStall.length > PAGE_SIZE && (
              <div className="flex justify-end gap-2 mt-3">
                <button className="px-3 py-1 bg-gray-200 rounded" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                <button className="px-3 py-1 bg-gray-200 rounded" disabled={(page * PAGE_SIZE) >= filteredBookStall.length} onClick={() => setPage(p => p + 1)}>Next</button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Global modal / styles / icon link */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
        .animate-fade-in { animation: fade-in 0.5s; }
        .animate-fade-out { animation: fade-out 0.5s; }
      `}</style>
      {showModal && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in">
            <button
              onClick={handleEditCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Edit Entry</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(view as 'sponsor' | 'bookstall'); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                  <input name="fullName" value={editForm.fullName} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Business Name</label>
                  <input name="businessName" value={editForm.businessName} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">City</label>
                  <input name="city" value={editForm.city} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Contact Number</label>
                  <input name="contactNumber" value={editForm.contactNumber} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Email</label>
                  <input name="email" value={editForm.email} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-1">Message</label>
                  <textarea name="message" value={editForm.message} onChange={handleEditChange} className="w-full border rounded px-3 py-2" />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={handleEditCancel} className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" disabled={actionLoading}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </div>
  );
}

