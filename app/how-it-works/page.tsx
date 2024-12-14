"use client";

import { motion } from "framer-motion";
import { FileText, Lock, Globe, Check, Share, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: FileText,
      title: "Create Your Receipt",
      description: "Start by inputting your business and transaction details. Our intuitive interface guides you through each step, making receipt creation simple and efficient.",
    },
    {
      icon: Lock,
      title: "Secure Data Entry",
      description: "Enter your financial information with confidence. Our platform uses end-to-end encryption to protect your sensitive data from the moment you start.",
    },
    {
      icon: Globe,
      title: "Multi-Currency Conversion",
      description: "Automatically convert currencies in real-time. Whether you're dealing with local or international transactions, we handle the math for you.",
    },
    {
      icon: Check,
      title: "Review and Validate",
      description: "Double-check all details with our smart validation system. Catch potential errors before finalizing your receipt, ensuring accuracy every time.",
    },
    {
      icon: Share,
      title: "Send and Store",
      description: "Instantly email receipts to clients or save them securely in our cloud storage. Access your financial documents anytime, anywhere.",
    },
    {
      icon: Clock,
      title: "Track and Manage",
      description: "Monitor your financial documents with comprehensive tracking. Generate reports, analyze spending, and keep your financial records organized.",
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Receipt Creation Process
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          A step-by-step journey from receipt creation to financial management
        </p>
      </div>

      {/* Enhanced Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Mobile Timeline */}
        <div className="md:hidden">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="mb-8 flex items-start"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center mr-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-2">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-300"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <step.icon className="mr-3 text-blue-500" />
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-200 h-full" />
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`
                mb-12 flex items-center relative
                ${index % 2 === 0 ? 'flex-row-reverse' : ''}
              `}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Numbered Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center z-10">
                <span className="text-blue-500 font-bold text-lg">{index + 1}</span>
              </div>

              {/* Timeline Card */}
              <div className={`
                w-[calc(50%-60px)] 
                border rounded-lg p-6 
                shadow-sm bg-card
                ${index % 2 === 0 ? 'ml-auto mr-0' : 'mr-auto ml-0'}
              `}>
                <div className="flex items-center mb-4">
                  <div className="mr-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-base">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}