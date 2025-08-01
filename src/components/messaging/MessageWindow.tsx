import { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'sent' | 'received';
}

interface MessageWindowProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

function MessageBubble({ message }: { message: Message }) {
  const isSent = message.type === 'sent';
  
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4 message-enter`}>
      <div
        className={`
          max-w-[70%] px-4 py-3 rounded-2xl shadow-sm
          ${isSent 
            ? 'bg-message-sent text-message-sent-foreground rounded-br-md' 
            : 'bg-message-received text-message-received-foreground rounded-bl-md'
          }
        `}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-1 ${isSent ? 'text-message-sent-foreground/70' : 'text-message-received-foreground/70'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

export function MessageWindow({ contact, messages, onSendMessage }: MessageWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-card-border bg-surface-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(contact.status)} rounded-full border-2 border-surface-elevated`} />
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{getStatusText(contact.status)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover-lift">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-lift">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-lift">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
        <div className="space-y-1">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <div className="p-6 border-t border-card-border bg-surface-elevated">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none border-border focus:border-accent transition-smooth bg-background"
            />
          </div>
          <Button 
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-accent hover:bg-accent-hover text-accent-foreground transition-smooth hover-lift"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}