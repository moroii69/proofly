import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Safari from "@/components/ui/safari";
import ShineBorder from "@/components/ui/shine-border";

const HeroSection = () => {
    return (
        <section className="py-32 bg-custom-dark text-white flex items-center justify-center min-h-screen">
            <div className="overflow-hidden border-b border-muted">
                <div className="container">
                    <div className="mx-auto flex max-w-5xl flex-col items-center">
                        <div className="z-10 items-center text-center">
                            <h1 className="mb-8 text-4xl font-medium lg:text-7xl">
                                Empower Your Health with AI Predictions
                            </h1>
                            <p className="mx-auto max-w-screen-md text-lg lg:text-xl text-muted-foreground">
                                Leverage advanced AI to predict, prevent, and protect your health. Stay ahead with personalized insights and real-time monitoring.
                            </p>
                            <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                                <Button className="bg-primary text-white hover:bg-secondary transition-all">
                                    Start your health journey
                                    <ChevronRight className="ml-2 h-4" />
                                </Button>
                                <Button variant="ghost" className="text-white hover:text-primary transition-all">
                                    Learn more
                                    <ChevronRight className="ml-2 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-24">
                        <ShineBorder
                            className="mx-auto"
                            color={[
                                "#FF7F7F", // Light red
                                "#FF4C4C", // Medium red
                                "#FF0000", // Bright red
                                "#A00000", // Dark red
                                "#660000", // Deeper dark red
                                "#330000", // Very dark red
                                "#000000", // Black
                                "#FFFFFF", // White
                                "#FFAFAF", // Light pinkish red
                                "#FFC7C7"  // Soft pastel red
                            ]}
                            borderRadius={8} // Border radius
                            borderWidth={2} // Border width
                            duration={14} // Animation duration in seconds
                        >
                            <Safari
                                url="https://proofly.xyz" // Replace with your website URL
                                imageSrc="https://i.imgur.com/X0LmOEz.png" // Replace with your image URL
                                width={1203} // Safari window width
                                height={753} // Safari window height
                                className="mx-auto"
                            />
                        </ShineBorder>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
