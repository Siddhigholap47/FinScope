import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  gradient: string;
}

export function SummaryCard({ title, amount, icon: Icon, gradient }: SummaryCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/80 mb-2">{title}</p>
          <p className="text-white text-3xl">₹{amount.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
    </div>
  );
}
