import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Smartphone, Watch, ShoppingBag } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    icon: Headphones,
    href: "/products?category=electronics",
    description: "Audio, smartphones, and tech gear",
  },
  {
    name: "Fashion",
    icon: Watch,
    href: "/products?category=fashion",
    description: "Watches, accessories, and style",
  },
  {
    name: "Lifestyle",
    icon: ShoppingBag,
    href: "/products?category=lifestyle",
    description: "Home, outdoor, and everyday essentials",
  },
  {
    name: "Accessories",
    icon: Smartphone,
    href: "/products?category=accessories",
    description: "Bags, cases, and premium add-ons",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={category.href}>
                <Card className="group hover-elevate active-elevate-2 cursor-pointer transition-all h-full" data-testid={`card-category-${category.name.toLowerCase()}`}>
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
