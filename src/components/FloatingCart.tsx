import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCart = () => {
  return (
    <Button
      size="icon"
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-primary/50 transition-all duration-300 z-40 group"
    >
      <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
        0
      </span>
    </Button>
  );
};

export default FloatingCart;
