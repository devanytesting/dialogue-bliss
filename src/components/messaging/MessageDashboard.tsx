import { useState } from 'react';
import { MenuSidebar } from './MenuSidebar';
import { ContactsList } from './ContactsList';
import { MessageWindow } from './MessageWindow';
import { ContactInfoPanel } from './ContactInfoPanel';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'sent' | 'received';
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    lastMessage: 'Hey! How are you doing today?',
    lastMessageTime: '2 min ago'
  },
  {
    id: '2',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'away',
    lastMessage: 'Thanks for the help earlier!',
    lastMessageTime: '15 min ago'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@example.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    lastMessage: 'Can we schedule a meeting for tomorrow?',
    lastMessageTime: '1 hour ago'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'offline',
    lastMessage: 'Perfect! See you then.',
    lastMessageTime: '3 hours ago'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    status: 'online',
    lastMessage: 'The project looks amazing!',
    lastMessageTime: 'Yesterday'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Hey! How are you doing today?',
    timestamp: '10:30 AM',
    type: 'received'
  },
  {
    id: '2',
    senderId: 'me',
    content: 'I\'m doing great! Just working on some new features.',
    timestamp: '10:32 AM',
    type: 'sent'
  },
  {
    id: '3',
    senderId: '1',
    content: 'That sounds exciting! What kind of features are you working on?',
    timestamp: '10:35 AM',
    type: 'received'
  },
  {
    id: '4',
    senderId: 'me',
    content: 'A modern messaging dashboard with glassmorphism effects! It\'s turning out really nice.',
    timestamp: '10:37 AM',
    type: 'sent'
  }
];

export function MessageDashboard() {
  const [selectedContact, setSelectedContact] = useState<Contact>(mockContacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleContactUpdate = (updatedContact: Contact) => {
    setSelectedContact(updatedContact);
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Menu Sidebar */}
      <MenuSidebar />
      
      {/* Contacts List */}
      <ContactsList 
        contacts={filteredContacts}
        selectedContact={selectedContact}
        onContactSelect={setSelectedContact}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Message Window */}
      <MessageWindow 
        contact={selectedContact}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
      
      {/* Contact Info Panel */}
      <ContactInfoPanel 
        contact={selectedContact}
        onContactUpdate={handleContactUpdate}
      />
    </div>
  );
}