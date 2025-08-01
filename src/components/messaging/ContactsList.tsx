import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

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

interface ContactsListProps {
  contacts: Contact[];
  selectedContact: Contact;
  onContactSelect: (contact: Contact) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
}

function ContactCard({ contact, isSelected, onClick }: {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div
      className={`
        p-4 cursor-pointer contact-hover rounded-lg border transition-smooth
        ${isSelected 
          ? 'bg-accent/10 border-accent shadow-md' 
          : 'border-transparent hover:border-card-border'
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={contact.avatar} alt={contact.name} />
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-surface`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground truncate">{contact.name}</h3>
            <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
        </div>
      </div>
    </div>
  );
}

export function ContactsList({ 
  contacts, 
  selectedContact, 
  onContactSelect, 
  searchTerm, 
  onSearchChange 
}: ContactsListProps) {
  return (
    <div className="w-80 bg-surface border-r border-card-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-card-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Messages</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background-secondary border-border focus:border-accent transition-smooth"
          />
        </div>
      </div>
      
      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-2">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={selectedContact.id === contact.id}
              onClick={() => onContactSelect(contact)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}