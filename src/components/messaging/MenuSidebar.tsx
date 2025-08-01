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
              w-11 h-11 rounded-lg transition-all
              ${isActive 
                ? 'bg-accent text-accent-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-card border border-card-border shadow-md">
          <p className="font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function MenuSidebar() {
  return (
    <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-3">
      {/* Logo/Brand */}
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-6">
        <MessageCircle className="h-5 w-5 text-primary-foreground" />
      </div>
      
      {/* Menu Items */}
      <div className="flex flex-col gap-2">
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