
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#BF5700] mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">A</div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Welcome back</h1>
          <p className="text-gray-500">Log in to access your analysis lab</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#BF5700]/20 transition-all"
              placeholder="alex@nexus-innovation.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#BF5700]/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-500 font-medium cursor-pointer">
              <input type="checkbox" className="rounded text-[#BF5700]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-[#BF5700] font-bold">Forgot?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#1A1A1A] text-white py-5 rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Enter Dashboard
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          New to AuraInsight? <a href="#" className="text-[#BF5700] font-bold">Request Access</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
