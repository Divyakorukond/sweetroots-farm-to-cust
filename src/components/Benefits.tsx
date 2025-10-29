import { useState, useEffect } from 'react';
import { Heart, Shield, Sparkles, Zap, Lightbulb } from "lucide-react";

const Benefits = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const proTips = [
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
      setCurrentTip((prev) => (prev + 1) % proTips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [proTips.length]);

  const benefits = [
    {
      icon: Heart,
      title: "Rich in Minerals",
      description: "Packed with iron, calcium, and magnesium for overall wellness",
    },
    {
      icon: Shield,
      title: "Immunity Booster",
      description: "Natural antioxidants strengthen your immune system",
    },
    {
      icon: Sparkles,
      title: "Chemical-Free",
      description: "No artificial sweeteners, colors, or preservatives",
    },
    {
      icon: Zap,
      title: "Instant Energy",
      description: "Natural sugars provide quick, sustained energy release",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Health <span className="text-gradient-honey">Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nature's perfect sweetener, loaded with essential nutrients and
            health benefits that refined sugar simply can't match.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative space-y-4">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-amber-800">Pro Tips</h3>
          </div>
          <p className="text-amber-700 text-lg leading-relaxed mb-4">
            {proTips[currentTip]}
          </p>
          <div className="flex justify-center space-x-2">
            {proTips.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentTip ? 'bg-amber-600' : 'bg-amber-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
