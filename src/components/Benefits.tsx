import { Heart, Shield, Sparkles, Zap } from "lucide-react";

const Benefits = () => {
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

        <div className="mt-12 bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
          <p className="text-accent font-medium text-lg">
            💡 Pro Tip: Replace refined sugar with our organic jaggery for a healthier lifestyle!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
