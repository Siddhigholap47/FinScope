import { motion } from 'motion/react';
import { Users, Sparkles, Heart } from 'lucide-react';
import { AddPartnerDialog } from './AddPartnerDialog';

export function EmptySharedBudgets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-12 text-center shadow-lg"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="inline-block mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4E61D3]/20 to-[#CFADC1]/20 rounded-full blur-2xl"></div>
          <Users className="w-24 h-24 text-[#4E61D3] relative" />
        </div>
      </motion.div>

      <h3 className="text-gray-900 mb-2 flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-[#F4F754]" />
        Start Managing Money Together
        <Sparkles className="w-5 h-5 text-[#F4F754]" />
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Add your partner, friends, or family to create shared budgets. 
        Track expenses together, set joint goals, and achieve financial success as a team!
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-[#4E61D3]/10 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-[#4E61D3]" />
          </div>
          <span>Add Anyone</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-[#CFADC1]/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#CFADC1]" />
          </div>
          <span>Custom Splits</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-8 h-8 bg-[#F4F754]/10 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <span>Shared Goals</span>
        </div>
      </div>

      <AddPartnerDialog
        trigger={
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#4E61D3] to-[#6B7FE8] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
          >
            <Users className="w-5 h-5 inline-block mr-2" />
            Create Your First Shared Budget
          </motion.button>
        }
      />

      <p className="text-xs text-gray-500 mt-6">
        Perfect for couples, roommates, friends planning trips, or families managing household expenses
      </p>
    </motion.div>
  );
}
