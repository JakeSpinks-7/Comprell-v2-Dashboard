
import React, { useState } from 'react';
import { DashboardView, Document, FocusedChat, ChatMessage } from './types';
import { INITIAL_DOCUMENTS, MOCK_USER } from './constants';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import LibraryView from './components/LibraryView';
import UserDashboard from './components/UserDashboard';
import LoginScreen from './components/LoginScreen';
import FocusedChatModal from './components/FocusedChatModal';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>(DashboardView.CHAT);
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCUMENTS);
  const [focusedChats, setFocusedChats] = useState<FocusedChat[]>([]);
  const [activeFocusedChatId, setActiveFocusedChatId] = useState<string | null>(null);
  const [isFocusedModalOpen, setIsFocusedModalOpen] = useState(false);

  const handleUpload = (newDoc: Document) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleCreateFocusedChat = (newChat: FocusedChat) => {
    setFocusedChats(prev => [...prev, newChat]);
    setActiveFocusedChatId(newChat.id);
    setCurrentView(DashboardView.CHAT);
    setIsFocusedModalOpen(false);
  };

  const updateFocusedChatMessages = (messages: ChatMessage[]) => {
    if (!activeFocusedChatId) return;
    setFocusedChats(prev => prev.map(chat => 
      chat.id === activeFocusedChatId ? { ...chat, messages } : chat
    ));
  };

  const selectFocusedChat = (id: string) => {
    setActiveFocusedChatId(id);
    setCurrentView(DashboardView.CHAT);
  };

  const switchToGeneralView = (view: DashboardView) => {
    setActiveFocusedChatId(null);
    setCurrentView(view);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const activeChat = activeFocusedChatId 
    ? focusedChats.find(c => c.id === activeFocusedChatId) 
    : null;

  return (
    <div className="flex bg-[#FDFBF7] min-h-screen">
      <Sidebar 
        currentView={currentView} 
        setView={switchToGeneralView} 
        userName={MOCK_USER.name}
        focusedChats={focusedChats}
        activeFocusedChatId={activeFocusedChatId}
        onSelectFocusedChat={selectFocusedChat}
        onCreateFocusedChat={() => setIsFocusedModalOpen(true)}
      />
      
      <main className="flex-1 ml-64 overflow-hidden h-screen">
        {currentView === DashboardView.CHAT && (
          <ChatView 
            documents={documents} 
            focusedChat={activeChat}
            onUpdateMessages={activeFocusedChatId ? updateFocusedChatMessages : undefined}
          />
        )}
        {currentView === DashboardView.LIBRARY && (
          <LibraryView documents={documents} onUpload={handleUpload} />
        )}
        {currentView === DashboardView.PROFILE && (
          <UserDashboard user={MOCK_USER} docs={documents} />
        )}
      </main>

      {isFocusedModalOpen && (
        <FocusedChatModal 
          documents={documents}
          onClose={() => setIsFocusedModalOpen(false)}
          onConfirm={handleCreateFocusedChat}
        />
      )}
    </div>
  );
};

export default App;
