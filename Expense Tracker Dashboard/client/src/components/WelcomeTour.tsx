import { useState, useEffect } from 'react';
import { X, ArrowRight, Users, Target, Calendar, Receipt, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

export function WelcomeTour() {
  const [showTour, setShowTour] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the tour
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, []);

  const steps = [
    {
      icon: Sparkles,
      title: 'Welcome to FinScope! 🎉',
      description: 'Your collaborative budgeting companion. Manage finances solo or together with partners and friends.',
      color: 'from-[#F4F754] to-[#E9D484]',
    },
    {
      icon: Users,
      title: 'Share Budgets with Anyone',
      description: 'Add partners, friends, or family members. Set custom contribution splits and track shared expenses together.',
      color: 'from-[#4E61D3] to-[#6B7FE8]',
    },
    {
      icon: Target,
      title: 'Set Goals Together',
      description: 'Create shared financial goals like "Goa Trip" or "New Apartment" and celebrate milestones together!',
      color: 'from-[#CFADC1] to-[#E9D484]',
    },
    {
      icon: Receipt,
      title: 'Track Everything',
      description: 'Upload receipts, add expenses on calendar, and get visual insights with beautiful charts.',
      color: 'from-[#10B981] to-[#34D399]',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setShowTour(false);
  };

  const handleSkip = () => {
    localStorage.setItem('hasSeenTour', 'true');
    setShowTour(false);
  };

  if (!showTour) return null;

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r ${currentStep.color} p-8 text-white text-center relative`}>
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              key={step}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="inline-block"
            >
              <Icon className="w-16 h-16 mx-auto mb-4" />
            </motion.div>
            <motion.h2
              key={`title-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white mb-2"
            >
              {currentStep.title}
            </motion.h2>
          </div>

          {/* Content */}
          <div className="p-8">
            <motion.p
              key={`desc-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-center mb-6"
            >
              {currentStep.description}
            </motion.p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === step
                      ? 'w-8 bg-[#4E61D3]'
                      : index < step
                      ? 'w-2 bg-[#4E61D3]/50'
                      : 'w-2 bg-gray-300'
                  }`}
                  animate={index === step ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 rounded-xl"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className={`flex-1 bg-gradient-to-r ${currentStep.color} rounded-xl`}
              >
                {step < steps.length - 1 ? (
                  <>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Get Started <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
