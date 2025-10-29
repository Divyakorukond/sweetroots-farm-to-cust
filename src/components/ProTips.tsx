import { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProTips = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const tips = [
    "💡 Store jaggery in an airtight container to maintain its natural moisture and prevent hardening.",
    "🍯 Replace white sugar with jaggery powder in your morning tea for a healthier start to your day.",
    "🥛 Mix jaggery with warm milk and a pinch of turmeric for a natural immunity booster.",
    "🍪 Use jaggery cubes instead of sugar in baking for richer flavor and added minerals.",
    "🌿 Consume jaggery after meals to aid digestion and cleanse your palate naturally.",
    "❄️ In summer, dissolve jaggery in cold water with mint leaves for a refreshing natural drink.",
    "🍳 Add a small piece of jaggery to dal while cooking to enhance taste and nutrition.",
    "💪 Athletes can use jaggery as a natural energy booster before workouts.",
    "🧘 Jaggery helps reduce stress - have a small piece when feeling anxious.",
    "🌙 Eating jaggery before bed can help improve sleep quality naturally."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-sm bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 shadow-lg z-30 animate-fade-in-up">
      <div className="flex items-start space-x-3">
        <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-amber-800 text-sm mb-1">Pro Tip</h4>
          <p className="text-sm text-amber-700 leading-relaxed">{tips[currentTip]}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-amber-600 hover:bg-amber-100"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-center mt-3 space-x-1">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === currentTip ? 'bg-amber-600' : 'bg-amber-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProTips;