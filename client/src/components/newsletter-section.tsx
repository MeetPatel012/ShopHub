import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Mail className="h-12 w-12 mx-auto mb-6 opacity-90" />
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Stay in the Loop
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-foreground"
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            variant="secondary"
            data-testid="button-newsletter-subscribe"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
