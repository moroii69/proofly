import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQList = [
  {
    question: "Is Proofly free to use?",
    answer: "Yes, Proofly is 100% free to use. All features are available without any charges, making it accessible to everyone.",
    value: "item-1",
  },
  {
    question: "How accurate are the health predictions?",
    answer: "Our models are trained on over a billion data points to ensure high accuracy and reliability.",
    value: "item-2",
  },
  {
    question: "Is my personal health data secure?",
    answer: "We prioritize your privacy and security. Proofly adheres to the highest standards of data protection and uses advanced encryption to keep your information safe.",
    value: "item-3",
  },
  {
    question: "Can I access Proofly on mobile devices?",
    answer: "Yes, Proofly is fully accessible on web browsers, whether you're using a desktop or mobile device.",
    value: "item-4",
  },
  {
    question: "How do I get started with Proofly?",
    answer: "Simply sign up on our website, create an account, and start using our health prediction tools right away.",
    value: "item-5",
  },
];

export const FAQSection = () => (
  <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
    <div className="text-center mb-8">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">FAQS</h2>
      <h2 className="text-3xl md:text-4xl text-center font-bold">Common Questions</h2>
    </div>
    <Accordion type="single" collapsible className="AccordionRoot">
      {FAQList.map(({ question, answer, value }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger className="text-left">{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);
