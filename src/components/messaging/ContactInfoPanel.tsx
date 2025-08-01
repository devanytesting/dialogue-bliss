import { useState } from 'react';
import { Edit3, Save, X, Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface ContactInfoPanelProps {
  contact: Contact;
  onContactUpdate: (contact: Contact) => void;
}

export function ContactInfoPanel({ contact, onContactUpdate }: ContactInfoPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  };

  const handleSave = () => {
    const updatedContact = {
      ...contact,
      ...editForm,
    };
    onContactUpdate(updatedContact);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      default: return 'Offline';
    }
  };

  return (
    <div className="w-80 bg-surface border-l border-card-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="hover-lift text-muted-foreground hover:text-foreground"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative group">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-accent text-accent-foreground font-bold text-xl">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* Edit overlay on profile picture */}
            {isEditing && (
              <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-background/90 transition-smooth">
                <Edit3 className="h-6 w-6 text-foreground" />
              </div>
            )}
            
            {/* Status indicator */}
            <div className={`absolute bottom-4 right-0 w-6 h-6 ${getStatusColor(contact.status)} rounded-full border-4 border-surface`} />
          </div>
          
          <Badge 
            variant="secondary" 
            className="bg-surface-elevated text-muted-foreground border-card-border"
          >
            {getStatusText(contact.status)}
          </Badge>
        </div>
      </div>
      
      {/* Contact Details */}
      <div className="flex-1 p-6 space-y-6">
        {isEditing ? (
          <>
            {/* Edit Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10 border-border focus:border-accent transition-smooth"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 border-border focus:border-accent transition-smooth"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="pl-10 border-border focus:border-accent transition-smooth"
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground transition-smooth"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex-1 border-border hover:bg-surface-elevated transition-smooth"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Read-only View */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated border border-card-border">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
                    <p className="font-medium text-foreground">{contact.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated border border-card-border">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <p className="font-medium text-foreground">{contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated border border-card-border">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                    <p className="font-medium text-foreground">{contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}