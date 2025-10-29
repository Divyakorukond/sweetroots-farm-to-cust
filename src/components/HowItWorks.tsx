import { Tractor, Package, Home } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Tractor,
      title: "From the Farmer",
      description:
        "Our partner farmers cultivate sugarcane using traditional, organic methods without any chemicals or pesticides.",
    },
    {
      icon: Package,
      title: "Traditional Processing",
      description:
        "Jaggery is extracted and processed using time-tested methods that preserve all natural minerals and nutrients.",
    },
    {
      icon: Home,
      title: "To Your Doorstep",
      description:
        "Carefully packaged and delivered fresh to ensure you receive the highest quality jaggery products.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="text-gradient-honey">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From farm to home, we ensure quality at every step of the journey.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary transform -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border-2 border-primary/20">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>

                  <div className="pt-6 space-y-4 text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <div className="w-1 h-12 bg-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
