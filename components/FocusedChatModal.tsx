
import React, { useState } from 'react';
import { Document, FocusedChat } from '../types';

interface FocusedChatModalProps {
  documents: Document[];
  onClose: () => void;
  onConfirm: (chat: FocusedChat) => void;
}

const FocusedChatModal: React.FC<FocusedChatModalProps> = ({ documents, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const toggleDoc = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredDocs = documents.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || selectedIds.length === 0) return;

    const newChat: FocusedChat = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      documentIds: selectedIds,
      messages: [],
      createdAt: new Date(),
    };
    onConfirm(newChat);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A]">New Focused Lab</h2>
            <p className="text-gray-500">Isolate specific documents for deep analysis.</p>
          </div>
          <button onClick={onClose} className="bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Lab Discussion Name</label>
            <input 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#BF5700]/20 transition-all font-medium"
              placeholder="e.g., Graphene IP Comparison"
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select References ({selectedIds.length})</label>
              <div className="relative w-48">
                <input 
                  placeholder="Search docs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs outline-none"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {filteredDocs.map(doc => (
                <div 
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedIds.includes(doc.id)
                      ? 'bg-orange-50 border-[#BF5700]/30 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    selectedIds.includes(doc.id) ? 'bg-[#BF5700] border-[#BF5700]' : 'border-gray-300'
                  }`}>
                    {selectedIds.includes(doc.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{doc.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{doc.sourceType} • {doc.type}</p>
                  </div>
                </div>
              ))}
              {filteredDocs.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-sm font-medium">No matching documents found</p>
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit"
            disabled={!name || selectedIds.length === 0}
            className="w-full bg-[#1A1A1A] text-white py-5 rounded-[1.5rem] font-bold text-lg hover:bg-black transition-all shadow-xl disabled:opacity-20 disabled:cursor-not-allowed mt-4"
          >
            Launch Focused Lab
          </button>
        </form>
      </div>
    </div>
  );
};

export default FocusedChatModal;
