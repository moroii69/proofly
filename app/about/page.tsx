"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Linkedin, Github, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link'
export default function AboutPage() {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const membersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollHint(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  const scrollToMembers = () => {
    membersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  type MemberLinks = {
    [key: string]: {
      linkedin: string;
      github: string;
    };
  };

  const memberLinks: MemberLinks = {
    "Mohammed Ufraan": {
      linkedin: "https://www.linkedin.com/in/ufraaan/",
      github: "https://github.com/moroii69"
    },
    "Faheem Ahmed": {
      linkedin: "https://www.linkedin.com/in/faheeem/",
      github: "https://github.com/faheemahm"
    },
    "Mohd Abrar": {
      linkedin: "https://www.linkedin.com/in/shaik-mohd-abrar-019812294/",
      github: "https://github.com/Abrarr12"
    },
    "Abdul Raqueeb": {
      linkedin: "https://www.linkedin.com/in/mohammed-abdul-raqueeb-895abb327/",
      github: "https://github.com/raqueeeb"
    }
  };

  const teamMembers = [
    { 
        name: "Mohammed Ufraan", 
        role: "Project Lead & Full-Stack Developer", 
        img: "https://i.imgur.com/wPdloI2.jpeg",
        // description: "\"Control is an illusion.\" ",

    },
    { 
        name: "Faheem Ahmed", 
        role: "Frontend Developer & Backend Engineer", 
        img: "https://i.imgur.com/TcoZO6R.jpeg",
        // description: "\"The world is a bug that needs fixing.\""
    },
    { 
        name: "Mohd Abrar", 
        role: "QA Specialist", 
        img: "https://i.imgur.com/Nm7NbDF.jpeg",
        // description: "\"Excellence is not an act, but a habit.\" "
    },
    { 
        name: "Abdul Raqueeb", 
        role: "Backend Developer & QA Specialist", 
        img: "https://i.imgur.com/pRIsUmC.jpeg",
        // description: "\"Details make perfection, and perfection is not a detail.\""
    }
];


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center relative"
      >
        <div className="max-w-4xl relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            About Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We are a passionate team of innovators dedicated to transforming business operations through cutting-edge technology. Our mission is to provide intuitive, powerful solutions that empower businesses to thrive in a digital world.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center space-x-4"
          >
            <Button variant="default">
              <Link href="/pricing">
                Explore Premium
              </Link>
            </Button>

            <Button variant="outline">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>

        {showScrollHint && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={scrollToMembers}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center cursor-pointer group"
          >
            <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors mb-2 mt-0">
              Meet the Team
            </p>
            <ChevronDown className="h-6 w-6 mx-auto text-muted-foreground group-hover:text-primary animate-bounce" />
          </motion.div>
        )}
      </motion.div>

      {/* Rest of the code remains the same */}
      <div 
        ref={membersRef} 
        className="min-h-screen bg-background flex flex-col justify-center items-center px-6 sm:px-8 lg:px-12 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-12">
          Meet the Crew
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
              className="bg-card border rounded-2xl p-6 shadow-sm transform transition-all duration-300 hover:shadow-lg group"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/20 overflow-hidden">
                  <img 
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                {/* <p className="text-xs text-muted-foreground mb-4">{member.description}</p> */}
                
                <div className="flex justify-center space-x-4 mt-4">
                  <a 
                    href={memberLinks[member.name].linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href={memberLinks[member.name].github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}