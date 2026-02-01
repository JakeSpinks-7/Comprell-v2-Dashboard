
import { Document, DocSourceType, User } from './types';

export const COLORS = {
  burntOrange: '#BF5700',
  bone: '#FDFBF7',
  black: '#1A1A1A',
  mutedText: '#6B7280',
};

export const MOCK_USER: User = {
  name: 'Alex Sterling',
  email: 'alex.sterling@aura-insight.ai',
  role: 'Senior Patent Analyst',
  organization: 'Nexus Innovations Ltd.',
  avatar: 'https://picsum.photos/seed/alex/200/200',
};

export const INITIAL_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Graphene-based Superconductors',
    type: 'Research Paper',
    sourceType: DocSourceType.EXTERNAL,
    uploadedAt: '2024-05-12',
    description: 'A study on the zero-resistance state of twisted bilayer graphene.',
    content: 'This study explores the electronic properties of twisted bilayer graphene at a magic angle of 1.1 degrees. Findings suggest a transition to a superconducting state below 1.7K.'
  },
  {
    id: '2',
    title: 'Method for Quantum Error Correction',
    type: 'Patent',
    sourceType: DocSourceType.INTERNAL,
    uploadedAt: '2023-11-20',
    description: 'Proprietary internal patent for surface code error correction in superconducting qubits.',
    content: 'Our internal IP covers a specific implementation of surface code decoding that reduces overhead by 30% compared to standard minimum-weight perfect matching algorithms.'
  },
  {
    id: '3',
    title: 'Regional R&D Investment Trends',
    type: 'CSV',
    sourceType: DocSourceType.INTERNAL,
    uploadedAt: '2024-01-15',
    description: 'Raw data analysis of innovation spending across EMEA for the previous fiscal year.',
    content: 'Data indicates a 15% increase in quantum computing R&D investment in the DACH region, primarily driven by automotive manufacturers.'
  }
];
