import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Target, Users, Calendar, Receipt } from 'lucide-react';

interface QuickStatsProps {
  totalIncome: number;
  totalExpense: number;
  totalSavings: number;
  partnersCount: number;
}

export function QuickStats({ totalIncome, totalExpense, totalSavings, partnersCount }: QuickStatsProps) {
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const savingsRate = totalIncome > 0 ? ((totalSavings / totalIncome) * 100).toFixed(1) : 0;
  const expenseRate = totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(1) : 0;

  const stats = [
    {
      icon: TrendingUp,
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: TrendingDown,
      label: 'Expense Rate',
      value: `${expenseRate}%`,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      icon: Users,
      label: 'Shared Budgets',
      value: partnersCount.toString(),
      color: 'from-[#4E61D3] to-[#6B7FE8]',
      bgColor: 'bg-blue-50',
      textColor: 'text-[#4E61D3]',
    },
    {
      icon: Calendar,
      label: 'This Month',
      value: new Date().toLocaleDateString('en-IN', { month: 'short' }),
      color: 'from-[#CFADC1] to-[#E9D484]',
      bgColor: 'bg-purple-50',
      textColor: 'text-[#CFADC1]',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`${stat.bgColor} rounded-2xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-all cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className={`text-2xl font-medium ${stat.textColor} mb-1`}>{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
