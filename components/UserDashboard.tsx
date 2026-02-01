
import React from 'react';
import { User, Document } from '../types';

interface UserDashboardProps {
  user: User;
  docs: Document[];
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, docs }) => {
  return (
    <div className="p-10 space-y-8 bg-[#FDFBF7] min-h-screen">
      <div className="bg-[#1A1A1A] rounded-[2.5rem] p-12 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-10">
          <img src={user.avatar} className="w-32 h-32 rounded-[2rem] border-4 border-[#BF5700]" alt="Profile" />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-400 font-medium mb-4">{user.role} • {user.organization}</p>
            <div className="flex space-x-8">
              <div>
                <p className="text-3xl font-bold text-[#BF5700]">{docs.length}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Documents</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#BF5700]">42</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">AI Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#BF5700]">98%</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Accuracy</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-100 transition-colors">
            Edit Profile
          </button>
        </div>
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#BF5700]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl ml-8 -mb-16"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#BF5700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h2>
          <div className="space-y-6">
            <InfoItem label="Full Name" value={user.name} />
            <InfoItem label="Email Address" value={user.email} />
            <InfoItem label="Organization" value={user.organization} />
            <InfoItem label="Default Analyst Role" value={user.role} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-[#BF5700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            System Settings
          </h2>
          <div className="space-y-4">
            <ToggleItem label="Enable High-Precision Mode" active />
            <ToggleItem label="Auto-Index New Documents" active={false} />
            <ToggleItem label="Dark Sidebar Theme" active={false} />
            <div className="pt-4">
               <button className="text-sm font-bold text-red-500 hover:text-red-600 uppercase tracking-widest">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-b border-gray-50 pb-4">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-gray-900 font-medium">{value}</p>
  </div>
);

const ToggleItem: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-[#BF5700]' : 'bg-gray-300'}`}>
       <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
  </div>
);

export default UserDashboard;
