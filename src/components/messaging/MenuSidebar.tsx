import { 
  MessageCircle, 
  Home, 
  Settings, 
  Users, 
  Phone, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function MenuItem({ icon: Icon, label, isActive = false, onClick }: MenuItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`
              w-12 h-12 rounded-xl transition-smooth hover-lift
              ${isActive 
                ? 'bg-accent text-accent-foreground shadow-lg' 
                : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated'
              }
            `}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="glass-elevated">
          <p className="font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function MenuSidebar() {
  return (
    <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-4">
      {/* Logo/Brand */}
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-8 shadow-lg">
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </div>
      
      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        <MenuItem icon={Home} label="Home" />
        <MenuItem icon={MessageCircle} label="Chats" isActive />
        <MenuItem icon={Users} label="Contacts" />
        <MenuItem icon={Phone} label="Calls" />
        <MenuItem icon={Settings} label="Settings" />
      </div>
      
      {/* Bottom Actions */}
      <div className="mt-auto">
        <MenuItem icon={LogOut} label="Logout" />
      </div>
    </div>
  );
}