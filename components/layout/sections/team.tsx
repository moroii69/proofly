import React from 'react';
import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
  socialNetworks: SocialNetworkProps[];
}

interface SocialNetworkProps {
  name: string;
  url: string;
}

export const TeamSection = () => {
  const teamList: TeamProps[] = [
    {
      imageUrl: "https://i.imgur.com/wPdloI2.jpeg",
      firstName: "Mohammed",
      lastName: "Ufraan",
      positions: ["Project Lead", "Machine Learning Engineer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/ufraaan/",
        },
        {
          name: "Github",
          url: "https://github.com/moroii69",
        },
        {
          name: "X",
          url: "https://x.com/Ufraan1",
        },
      ],
    },
    {
      imageUrl:
        "https://i.imgur.com/TcoZO6R.jpeg",
      firstName: "Mohammed",
      lastName: "Faheem",
      positions: ["FrontEnd Developer", "Research Lead"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/faheeem",
        },
      ],
    },
    {
      imageUrl:
        "https://i.imgur.com/xRYoAda.jpeg",
      firstName: "Mohd",
      lastName: "Abrar",
      positions: ["Research and Marketing", "Quality Assurance"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/abraar",
        },
        {
          name: "Github",
          url: "https://github.com/abrarr",
        },
      ],
    },
    {
      imageUrl:
        "https://i.imgur.com/pRIsUmC.jpeg",
      firstName: "Abdul",
      lastName: "Raqueeb",
      positions: ["Python Developer", "Support Engineer"],
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/leopoldo-miranda/",
        },
        {
          name: "Github",
          url: "https://github.com/leoMirandaa",
        },
        {
          name: "X",
          url: "https://x.com/leo_mirand4",
        },
      ],
    },
    {
      imageUrl:
        "https://i.imgur.com/WfKUY5Z.jpeg",
      firstName: "Dr. Mohammed Abdul",
      lastName: "Wajeed",
      positions: ["Professor", "Project Mentor"],
      socialNetworks: [],
    },
  ];

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <section id="team" className="container px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary tracking-wider mb-2">Our Team</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team Behind the Project</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We&apos;re a committed team of professionals focused on delivering innovative and accurate solutions for health prediction.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {teamList.map(({ imageUrl, firstName, lastName, positions, socialNetworks }, index) => (
          <Card key={index} className="bg-muted/60 dark:bg-card overflow-hidden group/card hover:shadow-lg transition-all duration-300">
            <CardHeader className="p-0 gap-0">
              <div className="relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={`${firstName} ${lastName}`}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover saturate-0 group-hover/card:saturate-100 transition-all duration-300 scale-100 group-hover/card:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
              </div>
              <CardTitle className="p-3 text-sm sm:text-base">
                {firstName}
                <span className="text-primary ml-1">{lastName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-xs sm:text-sm text-muted-foreground">
                {positions.join(", ")}
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex gap-2">
              {socialNetworks.map(({ name, url }, index) => (
                <Link
                  key={index}
                  href={url}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {socialIcon(name)}
                </Link>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-muted/60 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Join Our Team</h4>
          <p className="text-muted-foreground mb-4">
            We&apos;re always looking for talented individuals to join our team. Check out our open positions or send us your resume.
          </p>
          <Link href="https://forms.gle/V5QSr548j3Q6eyPu5" target="_blank" className="text-primary hover:underline">
            Join Us →
          </Link>
        </div>
        
        <div className="bg-muted/60 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <p className="text-muted-foreground mb-4">
            Have questions or want to learn more about our team? We&apos;d love to hear from you.
          </p>
          <a href="mailto:support@proofly.xyz" className="text-primary hover:underline">
            support@proofly.xyz
          </a>
        </div>
      </div>

    </section>
  );
};

export default TeamSection;