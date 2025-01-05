import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Heart",
    title: "Personalized Health Insights",
    description:
      "Receive tailored health predictions and insights based on your unique data and lifestyle, helping you make informed decisions about your well-being.",
  },
  {
    icon: "TrendingUp",
    title: "Track Health Trends",
    description:
      "Monitor changes in your health metrics over time to spot trends and patterns that can guide your health management strategy.",
  },
  {
    icon: "RefreshCcw",
    title: "Preventive Health Measures",
    description:
      "Identify potential health risks before they become critical and take preventive actions to maintain a healthy lifestyle.",
  },
  {
    icon: "Shield",
    title: "Data Privacy and Security",
    description:
      "Your health data is securely stored and only used to provide personalized health predictions, ensuring privacy and confidentiality.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="bg-background">
      <div className="container py-24 sm:py-32">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-lg font-semibold text-primary mb-3">Benefits</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empower Your Health with AI
          </h2>
          <p className="text-xl text-muted-foreground">
            Leverage the power of AI to predict your health trajectory and make proactive choices to lead a healthier life.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitList.map(({ icon, title, description }, index) => {
            const Icon = icons[icon as keyof typeof icons];
            return (
              <Card
                key={title}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 dark:shadow-dark shadow-light"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <span className="text-6xl font-bold">{index + 1}</span>
                </div>
                <CardHeader className="relative z-10">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2 text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;