
import React from 'react';
import { DashboardView, FocusedChat } from '../types';

interface SidebarProps {
  currentView: DashboardView;
  setView: (view: DashboardView) => void;
  userName: string;
  focusedChats: FocusedChat[];
  activeFocusedChatId: string | null;
  onSelectFocusedChat: (id: string) => void;
  onCreateFocusedChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setView, 
  userName, 
  focusedChats, 
  activeFocusedChatId,
  onSelectFocusedChat,
  onCreateFocusedChat
}) => {
  const mainItems = [
    { id: DashboardView.CHAT, label: 'General Assistant', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: DashboardView.LIBRARY, label: 'The Library', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: DashboardView.PROFILE, label: 'Dashboard', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg bg-[#BF5700] flex items-center justify-center text-white font-bold shadow-md">A</div>
        <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">BizLink</span>
      </div>

      <nav className="flex-1 px-4 mt-4 overflow-y-auto custom-scrollbar">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-4">Main Menu</div>
        <div className="space-y-1 mb-8">
          {mainItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id && !activeFocusedChatId
                  ? 'bg-gray-100 text-[#BF5700] font-bold' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 ml-4 pr-2">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Focused Chats</div>
          <button 
            onClick={onCreateFocusedChat}
            className="text-[#BF5700] hover:bg-orange-50 p-1 rounded-md transition-colors"
            title="Start New Focused Chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="space-y-1">
          {focusedChats.length === 0 && (
            <p className="text-xs text-gray-400 italic px-4 py-2">No focused chats yet</p>
          )}
          {focusedChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectFocusedChat(chat.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
                activeFocusedChatId === chat.id 
                  ? 'bg-[#BF5700]/10 text-[#BF5700] font-bold' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeFocusedChatId === chat.id ? 'bg-[#BF5700]' : 'bg-gray-300 group-hover:bg-[#BF5700]/50'}`}></div>
              <span className="truncate flex-1 text-left">{chat.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-100">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
          <img src={`https://picsum.photos/seed/${userName}/40/40`} className="w-10 h-10 rounded-full border border-gray-200" alt="User" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">{userName}</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Expert Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
