import { useState } from 'react';
import { Heart, Users, TrendingUp, TrendingDown, Target, Sparkles, ArrowUpDown, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  emoji: string;
}

export function CouplesDashboard() {
  const userName = localStorage.getItem('userName') || 'You';
  const partnerName = localStorage.getItem('partnerName') || 'Partner';
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  // Placeholder data – replace with backend data
  const totalIncome = 0;
  const totalExpenses = 0;
  const jointSavings = 0;
  const userContribution = 0;
  const partnerContribution = 0;
  const userPercentage = 0;
  const partnerPercentage = 0;

  const [goals, setGoals] = useState<Goal[]>([]);

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-gray-900">Couple Dashboard</h1>
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        </div>
        <p className="text-gray-600">Track and manage your shared finances</p>
      </motion.div>

      {/* Partner Info */}
      <div className="bg-white/70 rounded-3xl p-8 shadow-lg">
        <div className="flex items-center justify-center gap-12 mb-8">
          <div className="text-center">
            <Avatar className="h-16 w-16 mx-auto mb-2 border-2 border-[#4E61D3]">
              <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-gray-900">{userName}</p>
            <Badge className="mt-2 bg-[#4E61D3]">{userPercentage}%</Badge>
          </div>

          <Users className="w-8 h-8 text-gray-800" />

          <div className="text-center">
            <Avatar className="h-16 w-16 mx-auto mb-2 border-2 border-[#CFADC1]">
              <AvatarFallback>{partnerName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-gray-900">{partnerName}</p>
            <Badge className="mt-2 bg-[#CFADC1]">{partnerPercentage}%</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Income" value={formatINR(totalIncome)} icon={<TrendingUp className="w-5 h-5 text-green-600" />} />
          <StatCard label="Total Expenses" value={formatINR(totalExpenses)} icon={<TrendingDown className="w-5 h-5 text-red-600" />} />
          <StatCard label="Joint Savings" value={formatINR(jointSavings)} icon={<Target className="w-5 h-5 text-[#4E61D3]" />} />
        </div>
      </div>

      {/* Contributions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 rounded-3xl p-6 shadow-lg">
        <h3 className="text-gray-900 mb-6 flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-[#4E61D3]" />
          Contributions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContributionCard name={userName} color="#4E61D3" amount={userContribution} percentage={userPercentage} />
          <ContributionCard name={partnerName} color="#CFADC1" amount={partnerContribution} percentage={partnerPercentage} />
        </div>
      </motion.div>

      {/* Goals Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#4E61D3]" />
            Shared Goals
          </h3>
          <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] rounded-xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Goal Title</Label>
                  <Input placeholder="e.g., New Home, Travel Fund" />
                </div>
                <div>
                  <Label>Target Amount (₹)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div>
                  <Label>Deadline</Label>
                  <Input type="date" />
                </div>
                <Button className="w-full bg-[#4E61D3] rounded-xl">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {goals.length === 0 ? (
          <p className="text-gray-600 text-center">No goals added yet.</p>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-white/80 border rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{goal.emoji}</span>
                    <div>
                      <h4 className="text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">Due: {new Date(goal.deadline).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <p className="text-[#4E61D3]">{formatINR(goal.current)}</p>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-3" />
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/60 rounded-2xl p-6 text-center shadow-md">
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon}
        <p className="text-gray-700">{label}</p>
      </div>
      <p className="text-xl text-gray-900">{value}</p>
    </div>
  );
}

function ContributionCard({
  name,
  color,
  amount,
  percentage,
}: {
  name: string;
  color: string;
  amount: number;
  percentage: number;
}) {
  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="rounded-2xl p-5 border shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10" style={{ borderColor: color }}>
          <AvatarFallback style={{ background: color, color: 'white' }}>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-gray-700">{name}'s Contribution</p>
          <p style={{ color }} className="text-2xl">
            {formatINR(amount)}
          </p>
        </div>
      </div>
      <Progress value={percentage} className="h-3 bg-gray-200" />
      <p className="text-sm text-gray-600 mt-2">{percentage}% of total</p>
    </div>
  );
}
