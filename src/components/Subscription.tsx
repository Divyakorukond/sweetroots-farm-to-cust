import { Button } from "@/components/ui/button";
import { Check, Gift } from "lucide-react";

const Subscription = () => {
  const benefits = [
    "Save 15% on every order",
    "Free delivery on all boxes",
    "Flexible delivery schedule",
    "Cancel anytime, no commitments",
    "Exclusive subscriber-only products",
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border-2 border-primary/20">
            <div className="md:flex">
              {/* Left side - Content */}
              <div className="md:w-2/3 p-10 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-medium">Special Offer</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Get Your Monthly{" "}
                  <span className="text-gradient-honey">Jaggery Box</span>
                </h2>

                <p className="text-muted-foreground text-lg">
                  Never run out of natural sweetness. Subscribe and save while
                  enjoying premium organic jaggery delivered to your doorstep
                  every month.
                </p>

                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="bg-primary/10 rounded-full p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Subscribe Now
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    Starting from ₹599/month
                  </p>
                </div>
              </div>

              {/* Right side - Highlight */}
              <div className="md:w-1/3 bg-gradient-to-br from-primary to-primary/80 p-10 flex flex-col justify-center items-center text-center text-primary-foreground">
                <div className="space-y-4">
                  <div className="text-6xl font-bold">15%</div>
                  <div className="text-2xl font-semibold">OFF</div>
                  <div className="text-sm opacity-90">
                    On Every Subscription Order
                  </div>
                  <div className="pt-4 border-t border-primary-foreground/20">
                    <div className="text-sm font-medium">Plus</div>
                    <div className="text-lg font-semibold">FREE Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
