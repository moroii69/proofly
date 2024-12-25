import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Our Team
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Meet the Team Behind the Project
        </h2>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {teamList.map(
          (
            { imageUrl, firstName, lastName, positions, socialNetworks },
            index
          ) => (
            <Card
              key={index}
              className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
            >
              <CardHeader className="p-0 gap-0">
                <div className="h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                  />
                </div>
                <CardTitle className="py-6 pb-4 px-6">
                  {firstName}
                  <span className="text-primary ml-2">{lastName}</span>
                </CardTitle>
              </CardHeader>
              {positions.map((position, index) => (
                <CardContent
                  key={index}
                  className={`pb-0 text-muted-foreground ${
                    index === positions.length - 1 && "pb-6"
                  }`}
                >
                  {position}
                  {index < positions.length - 1 && <span>,</span>}
                </CardContent>
              ))}

              <CardFooter className="space-x-4 mt-auto">
                {socialNetworks.map(({ name, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className="hover:opacity-80 transition-all"
                  >
                    {socialIcon(name)}
                  </Link>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-muted-foreground">
          If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@proofly.xyz" className="text-primary">support@proofly.xyz</a>.
        </p>
      </div>

    </section>
  );
};
