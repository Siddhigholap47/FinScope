import { motion } from 'motion/react';
import { Users, TrendingUp, TrendingDown, Target, IndianRupee, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

interface SharedBudgetCardProps {
  budget: {
    id: string;
    name: string;
    type: string;
    budgetName: string;
    description?: string;
    yourContribution: number;
    theirContribution: number;
  };
  onDelete: (id: string) => void;
}

const budgetTypeEmoji: { [key: string]: string } = {
  couple: '💑',
  friend: '👥',
  family: '👨‍👩‍👧‍👦',
  roommate: '🏠',
};

export function SharedBudgetCard({ budget, onDelete }: SharedBudgetCardProps) {
  const userName = localStorage.getItem('userName') || 'You';
  
  // Mock data - in real app, this would come from backend
  const totalBudget = 50000;
  const spent = 28500;
  const remaining = totalBudget - spent;
  const percentageSpent = (spent / totalBudget) * 100;

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${budget.budgetName}"?`)) {
      onDelete(budget.id);
      toast.success('Shared budget deleted');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <Avatar className="h-10 w-10 border-2 border-white shadow-md">
              <AvatarFallback className="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8] text-white">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-10 w-10 border-2 border-white shadow-md">
              <AvatarFallback className="bg-gradient-to-br from-[#CFADC1] to-[#E9D484] text-white">
                {budget.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-gray-900 flex items-center gap-2">
              <span>{budgetTypeEmoji[budget.type] || '💰'}</span>
              {budget.budgetName}
            </h3>
            <p className="text-xs text-gray-600">with {budget.name}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="w-4 h-4 mr-2" />
              Edit Budget
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Budget
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Budget Progress */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Budget Progress</span>
          <span className="text-gray-900 font-medium">{percentageSpent.toFixed(0)}% used</span>
        </div>
        <Progress value={percentageSpent} className="h-2" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Spent: {formatINR(spent)}</span>
          <span className="text-xs text-gray-600">Remaining: {formatINR(remaining)}</span>
        </div>
      </div>

      {/* Contribution Split */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gradient-to-br from-[#4E61D3]/10 to-[#4E61D3]/5 rounded-xl p-3">
          <p className="text-xs text-gray-600 mb-1">Your Share</p>
          <p className="text-lg font-medium text-[#4E61D3]">{budget.yourContribution}%</p>
        </div>
        <div className="bg-gradient-to-br from-[#CFADC1]/10 to-[#CFADC1]/5 rounded-xl p-3">
          <p className="text-xs text-gray-600 mb-1">{budget.name}'s Share</p>
          <p className="text-lg font-medium text-[#CFADC1]">{budget.theirContribution}%</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <TrendingDown className="w-3 h-3 text-red-500" />
          <span>12 expenses</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Target className="w-3 h-3 text-green-500" />
          <span>3 goals</span>
        </div>
      </div>
    </motion.div>
  );
}
