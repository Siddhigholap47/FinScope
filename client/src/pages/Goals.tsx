// FinScope Goals Page - Clean Version (Backend Ready)
import { useState, useEffect } from 'react';
import { Target, Plus, Trophy, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
  });

  // Fetch goals from backend (future integration)
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        // Example: const response = await fetch('/api/goals');
        // const data = await response.json();
        // setGoals(data);
      } catch (error) {
        console.error('Failed to fetch goals:', error);
      }
    };
    fetchGoals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      color: 'from-[#4E61D3] to-[#6B7FE8]',
    };

    // For now, just update locally — later integrate API call
    setGoals([...goals, newGoal]);
    setFormData({ title: '', targetAmount: '', deadline: '' });
    setIsDialogOpen(false);
  };

  const achievedGoals = goals.filter((g) => g.currentAmount >= g.targetAmount);

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
                  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
                }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                  opacity: 0,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2 + Math.random() * 2 }}
                onAnimationComplete={() => {
                  if (i === 39) setShowConfetti(false);
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#F4F754', '#E9D484', '#CFADC1', '#4E61D3', '#10B981'][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-gray-900 flex items-center gap-2">
            Your Financial Goals <Target className="w-8 h-8 text-[#4E61D3]" />
          </h1>
          <p className="text-gray-600 mt-1">Track and achieve your savings targets</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] hover:from-[#3d4fb0] hover:to-[#4E61D3] text-white rounded-xl shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label>Goal Title</Label>
                <Input
                  placeholder="e.g., Buy a new laptop"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <Label>Target Amount (₹)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <Label>Deadline</Label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="rounded-xl"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#4E61D3] rounded-xl">
                Create Goal
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#4E61D3] to-[#6B7FE8] rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/80">Total Goals</p>
            <Target className="w-6 h-6" />
          </div>
          <p className="text-white text-2xl">{goals.length}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/80">Achieved</p>
            <Trophy className="w-6 h-6" />
          </div>
          <p className="text-white text-2xl">{achievedGoals.length}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#CFADC1] to-[#E9D484] rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/80">In Progress</p>
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-white text-2xl">{goals.length - achievedGoals.length}</p>
        </motion.div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-lg font-medium">No goals added yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Start by creating your first goal above.
            </p>
          </div>
        ) : (
          goals.map((goal, index) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const isCompleted = progress >= 100;
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            );

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-3xl p-6 shadow-md border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 font-medium">{goal.title}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{goal.currentAmount.toLocaleString()} of ₹
                      {goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      isCompleted
                        ? 'bg-green-100 text-green-700'
                        : daysLeft < 30
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isCompleted ? 'Completed!' : `${daysLeft} days left`}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>{progress.toFixed(1)}% Complete</span>
                    {isCompleted && (
                      <Button
                        size="sm"
                        onClick={() => setShowConfetti(true)}
                        className="bg-[#F4F754] hover:bg-[#E9D484] text-gray-800 rounded-xl"
                      >
                        Celebrate 🎉
                      </Button>
                    )}
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
