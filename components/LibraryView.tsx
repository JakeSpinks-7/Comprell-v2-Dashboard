
import React, { useState } from 'react';
import { Document, DocSourceType } from '../types';

interface LibraryViewProps {
  documents: Document[];
  onUpload: (doc: Document) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ documents, onUpload }) => {
  const [filter, setFilter] = useState<'all' | DocSourceType>('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDocs = documents.filter(doc => {
    const matchesFilter = filter === 'all' || doc.sourceType === filter;
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || 
                          doc.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-10 space-y-8 bg-[#FDFBF7] min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Knowledge Base</h1>
          <p className="text-gray-500">Manage research papers, patents, and datasets.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1A1A1A] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#333] flex items-center space-x-2 transition-all shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add material</span>
        </button>
      </div>

      <div className="flex items-center space-x-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <svg className="w-5 h-5 absolute left-4 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-gray-700"
          />
        </div>
        <div className="h-8 w-px bg-gray-200"></div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-widest px-2">Source</span>
          {(['all', DocSourceType.INTERNAL, DocSourceType.EXTERNAL] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === type ? 'bg-gray-100 text-[#BF5700]' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                doc.sourceType === DocSourceType.INTERNAL 
                  ? 'bg-orange-50 text-[#BF5700]' 
                  : 'bg-blue-50 text-blue-600'
              }`}>
                {doc.sourceType}
              </div>
              <button className="text-gray-300 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#BF5700] transition-colors">{doc.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-6">{doc.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center space-x-2">
                 <span className="text-xs text-gray-400 flex items-center">
                   <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   {doc.uploadedAt}
                 </span>
              </div>
              <span className="text-xs font-bold text-gray-400">{doc.type}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">New Material</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newDoc: Document = {
                id: Math.random().toString(36),
                title: formData.get('title') as string,
                type: formData.get('type') as string,
                sourceType: formData.get('sourceType') as DocSourceType,
                uploadedAt: new Date().toISOString().split('T')[0],
                description: formData.get('description') as string,
                content: 'Simulated document content based on upload.',
              };
              onUpload(newDoc);
              setIsModalOpen(false);
            }}>
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input required name="title" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#BF5700]/20" placeholder="e.g., Solid State Batteries" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Source Type</label>
                <select name="sourceType" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none">
                  <option value={DocSourceType.INTERNAL}>Internal (Proprietary)</option>
                  <option value={DocSourceType.EXTERNAL}>External (Public Domain)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Format</label>
                <select name="type" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none">
                  <option>Patent</option>
                  <option>Research Paper</option>
                  <option>CSV / Data</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea name="description" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none" rows={3}></textarea>
              </div>
              <button type="submit" className="w-full bg-[#BF5700] text-white py-4 rounded-2xl font-bold hover:bg-[#A64C00] transition-colors mt-4">
                Upload to Library
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryView;
