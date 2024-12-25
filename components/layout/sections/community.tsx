import { FaGithub } from "react-icons/fa"; // Import GitHub icon from react-icons
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CommunitySection = () => {
  return (
    <section id="community" className="py-12 ">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <FaGithub size={48} className="mb-6"/> 
                <div>
                  Ready to give this project a
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    Star on GitHub?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Show your support by starring this project on GitHub! Help us grow
              and improve together. Click the button below to give a star! ⭐
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href="https://github.com/moroii69/proofly" target="_blank">
                  Star on GitHub
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
