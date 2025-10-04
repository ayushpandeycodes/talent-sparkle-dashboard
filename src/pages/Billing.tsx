import { useState } from "react";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out Jobplexity",
    icon: Sparkles,
    features: [
      "Up to 3 active job postings",
      "Basic candidate search",
      "Standard support",
      "100 applicant views/month",
      "Email notifications",
    ],
    limitations: [
      "No AI matching",
      "No Verified Talent access",
      "No campus integration",
    ],
  },
  {
    name: "Premium",
    price: 199,
    description: "For growing teams",
    icon: Zap,
    popular: true,
    features: [
      "Unlimited job postings",
      "Advanced AI matching",
      "Full Verified Talent access",
      "Campus drive integration",
      "Priority support",
      "Custom interview templates",
      "Advanced analytics",
      "Bulk messaging",
      "Team collaboration (5 seats)",
    ],
    limitations: [],
  },
  {
    name: "Enterprise",
    price: 499,
    description: "For large organizations",
    icon: Crown,
    features: [
      "Everything in Premium",
      "SAML SSO",
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited team seats",
      "White-label options",
      "Custom workflows",
      "API access",
      "SLA guarantee",
      "Advanced security features",
    ],
    limitations: [],
  },
];

export default function Billing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [processing, setProcessing] = useState(false);

  const currentPlan = "Premium"; // Simulated

  const handleUpgrade = (planName: string) => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      toast.success(`Successfully upgraded to ${planName}!`, {
        description: "Your plan has been activated immediately.",
      });
      setProcessing(false);
    }, 1500);
  };

  const getPrice = (basePrice: number) => {
    if (basePrice === 0) return "$0";
    if (billingCycle === "annual") {
      const annualPrice = Math.round(basePrice * 12 * 0.8); // 20% discount
      return `$${annualPrice}`;
    }
    return `$${basePrice}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
        <p className="text-muted-foreground text-lg">
          Scale your hiring with plans designed for teams of all sizes
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <Label htmlFor="billing-cycle" className={billingCycle === "monthly" ? "font-semibold" : ""}>
          Monthly
        </Label>
        <Switch
          id="billing-cycle"
          checked={billingCycle === "annual"}
          onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
        />
        <Label htmlFor="billing-cycle" className={billingCycle === "annual" ? "font-semibold" : ""}>
          Annual
          <Badge className="ml-2 bg-success/10 text-success border-success/20">
            Save 20%
          </Badge>
        </Label>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 lg:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.name === currentPlan;
          const displayPrice = getPrice(plan.price);

          return (
            <Card
              key={plan.name}
              className={`glass-card relative ${
                plan.popular
                  ? "border-primary shadow-glow scale-105"
                  : "hover-lift"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold">
                    {displayPrice}
                    {plan.price > 0 && (
                      <span className="text-sm font-normal text-muted-foreground">
                        /{billingCycle === "annual" ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  {billingCycle === "annual" && plan.price > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ${plan.price}/month billed annually
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {isCurrentPlan ? (
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : plan.price === 0 ? "Get Started" : "Upgrade Now"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Usage */}
      <Card className="glass-card max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
          <CardDescription>Your usage this billing period</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-xl bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Active Jobs</p>
              <p className="text-2xl font-bold">12 <span className="text-sm font-normal text-muted-foreground">/ unlimited</span></p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">Team Seats</p>
              <p className="text-2xl font-bold">3 <span className="text-sm font-normal text-muted-foreground">/ 5</span></p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">AI Matches</p>
              <p className="text-2xl font-bold">847 <span className="text-sm font-normal text-muted-foreground">this month</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="glass-card max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Can I change plans anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, debit cards, and ACH transfers for Enterprise plans.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Is there a free trial?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Start with our Free plan and upgrade when you're ready. Premium plans include a 14-day money-back guarantee.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">What happens if I exceed my limits?</h4>
            <p className="text-sm text-muted-foreground">
              We'll notify you as you approach your limits and make it easy to upgrade. Your service won't be interrupted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
