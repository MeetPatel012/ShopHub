import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@shared/schema";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const discount = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice) - parseFloat(product.price)) /
          parseFloat(product.originalPrice)) *
          100
      )
    : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all h-full flex flex-col" data-testid={`card-product-${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 left-2 z-10"
              data-testid={`badge-discount-${product.id}`}
            >
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge
              className="absolute top-2 right-2 z-10 bg-primary"
              data-testid={`badge-featured-${product.id}`}
            >
              Featured
            </Badge>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          
          <Button
            size="sm"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleAddToCart}
            data-testid={`button-quick-add-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>

        <CardContent className="flex-1 p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base line-clamp-2 leading-tight" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold" data-testid={`text-price-${product.id}`}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${parseFloat(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          {!product.inStock && (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
