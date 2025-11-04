import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TransactionCardProps {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  onDelete?: (id: string) => void;
}

export function TransactionCard({ id, title, category, amount, date, type, onDelete }: TransactionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-white rounded-xl p-4 border border-gray-200 hover:border-[#4E61D3] hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div>
              <p className="text-gray-800">{title}</p>
              <p className="text-gray-500 text-xs">{category}</p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {type === 'income' ? '+' : '-'}₹{amount.toLocaleString('en-IN')}
          </p>
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
        
        {isHovered && onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="absolute -right-2 -top-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 hover:scale-110"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
