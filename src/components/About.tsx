import { Leaf, Users, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "No chemicals, no additives. Just pure, natural jaggery from traditional methods.",
    },
    {
      icon: Users,
      title: "Supporting Farmers",
      description: "Direct partnerships with small-scale farmers ensuring fair prices and sustainable practices.",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Carefully processed and quality-checked to bring you the finest jaggery products.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            From Our Farmers to{" "}
            <span className="text-gradient-honey">Your Cup</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe in purity, sustainability, and supporting the backbone of
            our agricultural heritage. Every product tells a story of dedication,
            tradition, and natural goodness.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border border-border/50"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
