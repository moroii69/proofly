import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
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
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Empower Your Health with AI
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Leverage the power of AI to predict your health trajectory and make proactive choices to lead a healthier life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
