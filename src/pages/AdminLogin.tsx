import React, { useState } from 'react';

const ADMIN_USER = 'FOODMECH';
const ADMIN_PASS = 'FOODADMINMECH123';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('foodmech_admin', 'true');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute bg-blue-300 opacity-30 rounded-full w-[500px] h-[500px] top-[-150px] left-[-150px] animate-pulse-slow" />
        <div className="absolute bg-green-300 opacity-30 rounded-full w-[400px] h-[400px] bottom-[-100px] right-[-100px] animate-pulse-slow2" />
        <div className="absolute bg-yellow-200 opacity-20 rounded-full w-[350px] h-[350px] top-[60%] left-[60%] animate-pulse-slow3" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center animate-fade-in"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
      >
        <img src="/images/logo1\.png" alt="FoodMech Logo" className="w-24 h-24 mb-4 drop-shadow-lg animate-bounce-slow" />
        <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-700 tracking-tight">Admin Login</h2>
        <p className="mb-6 text-center text-gray-500 font-medium">Welcome to the FoodMech Admin Portal</p>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={e => setUser(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          autoComplete="current-password"
        />
        {error && <div className="text-red-500 mb-2 text-center animate-shake">{error}</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-green-500 transition-all duration-200 mt-2"
        >
          Sign In
        </button>
      </form>
      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s infinite alternate; }
        @keyframes pulse-slow2 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        .animate-pulse-slow2 { animation: pulse-slow2 8s infinite alternate; }
        @keyframes pulse-slow3 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .animate-pulse-slow3 { animation: pulse-slow3 10s infinite alternate; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.4s; }
      `}</style>
    </div>
  );
}

