"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Great for individuals just starting out.",
    features: [
      { name: "30 receipts per month", included: true },
      { name: "Basic templates", included: true },
      { name: "Email support", included: true },
      { name: "Custom templates", included: false },
      { name: "Analytics dashboard", included: false },
      { name: "Priority support", included: false },
      { name: "API access", included: false },
      { name: "Team collaboration", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    description: "Ideal for small businesses looking to scale.",
    features: [
      { name: "Unlimited receipts", included: true },
      { name: "All basic templates", included: true },
      { name: "Priority email support", included: true },
      { name: "Custom templates", included: true },
      { name: "Analytics dashboard", included: true },
      { name: "Priority support", included: true },
      { name: "API access", included: false },
      { name: "Team collaboration", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$49.99",
    description: "Comprehensive features for large organizations.",
    features: [
      { name: "Unlimited receipts", included: true },
      { name: "All templates", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Custom templates", included: true },
      { name: "Advanced analytics", included: true },
      { name: "API access", included: true },
      { name: "Team collaboration", included: true },
    ],
  },
];


export default function PricingPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that best fits your needs
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {plans.map((plan, planIdx) => (
          <motion.div
            key={plan.name}
            className="w-full max-w-[400px] border rounded-lg p-6 shadow-sm bg-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: planIdx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg font-semibold leading-8">{plan.name}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              <span className="text-sm font-semibold leading-6">/month</span>
            </p>
            <Button className="mt-6 w-full">Get started</Button>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
              {plan.features.map((feature) => (
                <li key={feature.name} className="flex gap-x-3">
                  {feature.included ? (
                    <Check className="h-6 w-5 flex-none text-green-500" />
                  ) : (
                    <X className="h-6 w-5 flex-none text-red-500" />
                  )}
                  <span className={feature.included ? "" : "text-muted-foreground"}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
