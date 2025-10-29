import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import powderImage from "@/assets/product-powder.jpg";
import cubesImage from "@/assets/product-cubes.jpg";
import syrupImage from "@/assets/product-syrup.jpg";
import popsImage from "@/assets/product-pops.jpg";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Jaggery Powder",
    description: "Finely ground organic jaggery, perfect for cooking and beverages",
    price: 180,
    unit: "500g",
    image: powderImage,
  },
  {
    id: 2,
    name: "Jaggery Cubes",
    description: "Premium quality jaggery cubes for traditional sweetness",
    price: 200,
    unit: "500g",
    image: cubesImage,
  },
  {
    id: 3,
    name: "Jaggery Syrup",
    description: "Golden liquid jaggery syrup for pancakes and desserts",
    price: 250,
    unit: "350ml",
    image: syrupImage,
  },
  {
    id: 4,
    name: "Jaggery Pops",
    description: "Delicious jaggery lollipops, perfect healthy treat for kids",
    price: 150,
    unit: "10 pcs",
    image: popsImage,
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift border border-border/50 group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
          Organic
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">₹{product.price}</div>
            <div className="text-sm text-muted-foreground">{product.unit}</div>
          </div>

          <div className="flex items-center space-x-2 bg-secondary rounded-lg p-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Our <span className="text-gradient-honey">Premium Products</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked selection of the finest organic jaggery products, crafted
            with care by our trusted farmer partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
