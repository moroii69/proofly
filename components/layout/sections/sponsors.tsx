"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';
import { FaNodeJs, FaPuzzlePiece, FaPython, FaCookie, FaFire, FaCrown } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import { LiaDocker } from "react-icons/lia";
import { TbBrandNextjs } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";

// Types
interface TechStackProps {
  icon: JSX.Element;
  name: string;
}

// Tech stack data
const techStack: TechStackProps[] = [
  {
    icon: <TbBrandNextjs />,
    name: "Next.js",
  },
  {
    icon: <RiTailwindCssFill />,
    name: "Tailwind CSS",
  },
  {
    icon: <FaNodeJs />,
    name: "Node.js",
  },
  {
    icon: <SiTypescript />,
    name: "TypeScript",
  },
  {
    icon: <FaPython />,
    name: "Python",
  },
  {
    icon: <SiTensorflow />,
    name: "TensorFlow",
  },
  {
    icon: <IoLogoFirebase />,
    name: "Firebase",
  },
  {
    icon: <IoLogoVercel />,
    name: "Vercel",
  },
  {
    icon: <LiaDocker />,
    name: "Docker",
  },
];

// Loading skeleton component
const LoadingSkeleton = () => (
  <section className="max-w-[75%] mx-auto pb-24 sm:pb-32">
    <div className="text-lg md:text-xl text-center mb-6 mt-12 animate-pulse">
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
    </div>
    <div className="flex gap-[3rem] overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </section>
);

export const SponsorsSection = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to ensure the theme is set correctly
  const currentTheme = resolvedTheme || theme;

  // Show loading skeleton until mounted
  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <section id="sponsors" className="max-w-[75%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6 mt-12">
        Built With
      </h2>
      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          fade
          innerClassName="gap-[3rem]"
          pauseOnHover
        >
          {techStack.map(({ icon, name }) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium"
            >
              <div
                className={`mr-2 ${
                  currentTheme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {icon}
              </div>
              {name}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};