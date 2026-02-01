
export enum DocSourceType {
  INTERNAL = 'Internal',
  EXTERNAL = 'External'
}

export interface Document {
  id: string;
  title: string;
  type: string; // e.g., 'Patent', 'Research Paper', 'CSV'
  sourceType: DocSourceType;
  uploadedAt: string;
  description: string;
  content: string; // Mock content for the AI to "read"
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface FocusedChat {
  id: string;
  name: string;
  documentIds: string[];
  messages: ChatMessage[];
  createdAt: Date;
}

export enum DashboardView {
  CHAT = 'chat',
  LIBRARY = 'library',
  PROFILE = 'profile'
}

export interface User {
  name: string;
  email: string;
  role: string;
  organization: string;
  avatar: string;
}
