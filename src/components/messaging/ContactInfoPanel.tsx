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
    <div className="w-72 bg-surface border-l border-card-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative">
            <Avatar className="w-20 h-20 mb-3">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-muted text-foreground font-semibold text-lg">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* Status indicator */}
            <div className={`absolute bottom-3 right-0 w-5 h-5 ${getStatusColor(contact.status)} rounded-full border-3 border-surface`} />
          </div>
          
          <Badge 
            variant="secondary" 
            className="bg-muted text-muted-foreground text-xs"
          >
            {getStatusText(contact.status)}
          </Badge>
        </div>
      </div>
      
      {/* Contact Details */}
      <div className="flex-1 p-4 space-y-4">
        {isEditing ? (
          <>
            {/* Edit Form */}
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-9 border-border focus:border-ring"
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
                    className="pl-9 border-border focus:border-ring"
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
                    className="pl-9 border-border focus:border-ring"
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 pt-3">
              <Button 
                onClick={handleSave}
                size="sm"
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
                className="flex-1 border-border hover:bg-muted"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Read-only View */}
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-card-border">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
                    <p className="font-medium text-foreground">{contact.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-card-border">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                    <p className="font-medium text-foreground">{contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-card-border">
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