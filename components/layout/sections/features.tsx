import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Smartphone",
    title: "Mobile Friendly",
    description:
      "Access your health predictions and insights from anywhere, anytime, with our fully responsive mobile app.",
  },
  {
    icon: "ShieldCheck",
    title: "Data Privacy",
    description:
      "Your health data is kept secure and confidential, with end-to-end encryption ensuring your privacy.",
  },
  {
    icon: "Activity",
    title: "Health Tracking",
    description:
      "Track your daily activities, sleep, diet, and other metrics to get accurate health predictions and trends.",
  },
  {
    icon: "Clock",
    title: "Real-Time Updates",
    description:
      "Receive real-time health alerts and updates, keeping you informed of any changes in your health status.",
  },
  {
    icon: "UserCheck",
    title: "Personalized Insights",
    description:
      "Get predictions and insights tailored specifically to your health data, lifestyle, and goals.",
  },
  {
    icon: "Search",
    title: "Health Risk Assessment",
    description:
      "Identify potential health risks early with our AI-powered health risk analysis, guiding you to take proactive measures.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Empowering you with AI-driven health predictions and insights to make proactive, data-backed health decisions.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
