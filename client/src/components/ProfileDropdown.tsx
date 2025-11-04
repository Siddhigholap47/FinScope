import { useState } from 'react';
import { User, LogOut, Users, Receipt, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

export function ProfileDropdown() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const partners = JSON.parse(localStorage.getItem('partners') || '[]').filter((p: any) => p.active);
  
  const handleLogout = () => {
    window.location.href = '/logout';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-gray-700">{userName}</p>
            <p className="text-gray-500 text-xs">View Profile</p>
          </div>
          <Avatar className="w-10 h-10 border-2 border-[#4E61D3] shadow-md">
            <AvatarFallback className="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8] text-white">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
          <Users className="mr-2 h-4 w-4" />
          <span>Joint Budgets</span>
          {partners.length > 0 && (
            <Badge className="ml-auto bg-[#4E61D3]">{partners.length}</Badge>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
          <Receipt className="mr-2 h-4 w-4" />
          <span>Manage Receipts</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Preferences</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
