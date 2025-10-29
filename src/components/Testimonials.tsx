import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Home Chef, Mumbai",
      rating: 5,
      text: "The quality is exceptional! My family loves the authentic taste. We've completely switched from refined sugar to SweetRoots jaggery.",
    },
    {
      name: "Rajesh Kumar",
      role: "Café Owner, Bangalore",
      rating: 5,
      text: "We use their jaggery syrup in our specialty drinks. Our customers absolutely love it, and we appreciate supporting local farmers.",
    },
    {
      name: "Anita Desai",
      role: "Wellness Coach, Delhi",
      rating: 5,
      text: "Finally, a trustworthy source for pure jaggery! I recommend SweetRoots to all my clients looking for healthy sugar alternatives.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            What Our <span className="text-gradient-honey">Customers Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of happy customers who've made the switch to natural sweetness.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift border border-border/50"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-semibold">4.9/5.0 Average Rating</span>
            <span className="text-muted-foreground">from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
