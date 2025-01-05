"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const FAQList = [
  {
    question: "Is Proofly free to use?",
    answer: "Yes, Proofly is completely free to use! Our core features include:\n\n• Health prediction analytics\n• Personal health tracking\n• Basic health insights and recommendations\n\nWhile we may introduce premium features in the future, our commitment is to keep essential health prediction tools accessible to everyone.",
    value: "pricing",
    icon: "💰",
  },
  {
    question: "How accurate are the health predictions?",
    answer: "Our AI models achieve a high degree of accuracy through:\n\n• Training on 1B+ anonymized health records\n• Regular updates with latest medical research\n• Validation by healthcare professionals\n• Continuous model refinement\n\nTypical accuracy rates range from 85-95% depending on the specific health condition being analyzed. We always provide confidence scores with our predictions for transparency.",
    value: "accuracy",
    icon: "🎯",
  },
  {
    question: "Is my personal health data secure?",
    answer: "Your privacy and data security are our top priorities. We implement multiple layers of protection:\n\n• End-to-end encryption for all data\n• HIPAA and GDPR compliance\n• Regular security audits\n• Optional 2FA authentication\n• Data deletion on request\n\nWe never share your personal health information with third parties without your explicit consent.",
    value: "security",
    icon: "🔒",
  },
  {
    question: "Can I access Proofly on mobile devices?",
    answer: "Proofly is fully optimized for all devices:\n\n• Responsive web app for all screen sizes\n• Native iOS and Android apps coming soon\n• Offline capability for key features\n• Sync across multiple devices\n• Touch-optimized interface\n\nYour health insights are accessible wherever you go, on any device with a web browser.",
    value: "accessibility",
    icon: "📱",
  },
  {
    question: "How do I get started with Proofly?",
    answer: "Getting started is quick and easy:\n\n1. Sign up with email or Google\n2. Complete a brief health profile\n3. Connect any health devices (Coming Soon)\n4. Start receiving personalized insights\n\nThe entire process takes less than 5 minutes, and our onboarding guide will help you make the most of Proofly's features.",
    value: "getting-started",
    icon: "🚀",
  },
  {
    question: "What types of health predictions can Proofly make?",
    answer: "Proofly offers a wide range of health predictions and insights:\n\n• Chronic condition risk assessment\n• Lifestyle impact analysis\n• Mental health tracking\n• Sleep pattern optimization\n• Nutrition recommendations\n\nOur AI continuously learns to provide more accurate and personalized predictions based on your health data.",
    value: "features",
    icon: "🔮",
  }
];

export const FAQSection = () => {
  const [activeItem, setActiveItem] = React.useState("");

  return (
    <section id="faq" className="container max-w-3xl py-24 sm:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-primary tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </h3>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Got Questions? We're Here to Help
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about Proofly's health prediction platform. Can't find what you're looking for? Reach out to our support team.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Accordion 
          type="single" 
          collapsible 
          className="space-y-4"
          value={activeItem}
          onValueChange={setActiveItem}
        >
          {FAQList.map(({ question, answer, value, icon }) => (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccordionItem 
                value={value}
                className="border border-muted rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline px-6 py-4 [&[data-state=open]]:text-primary">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-xl">{icon}</span>
                    <span className="text-lg font-medium">{question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="pl-10 text-muted-foreground prose-sm">
                    {answer.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <p className="text-muted-foreground">
          Still have questions?{" "}
          <a 
            href="mailto:support@proofly.xyz" 
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Contact our support team
          </a>
        </p>
      </motion.div>
    </section>
  );
};