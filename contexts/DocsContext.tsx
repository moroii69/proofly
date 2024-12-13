"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Book, FileText, Clipboard, DollarSign, Cloud } from "lucide-react";

export type DocSection = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  children?: DocSection[];
};

type DocsContextType = {
  currentSection: DocSection;
  activeHref: string;
  sections: DocSection[];
  setActiveSection: (href: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const docsContent: DocSection[] = [
  {
    title: "getting started",
    href: "#getting-started",
    icon: <Book className="h-4 w-4" />,
    content: (
      <div>
        <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
        <section id="installation">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Installation</h3>
          <p>To install Proofly, run the following command:</p>
          <pre className="bg-secondary p-4 rounded-md my-4">
            <code>npm install proofly</code>
          </pre>
        </section>
        <section id="quick-start-guide">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Quick Start Guide</h3>
          <ol className="list-decimal list-inside">
            <li>Create an account</li>
            <li>Navigate to the dashboard</li>
            <li>Create your first document</li>
          </ol>
        </section>
      </div>
    ),
    children: [
      {
        title: "installation",
        href: "#installation",
        content: (
          <section id="installation">
            <h3 className="text-2xl font-semibold">Installation Details</h3>
            <p>Detailed installation instructions for Proofly, including prerequisites and setup.</p>
          </section>
        )
      },
      {
        title: "quick start guide",
        href: "#quick-start-guide",
        content: (
          <section id="quick-start-guide">
            <h3 className="text-2xl font-semibold">Quick Start Guide Details</h3>
            <p>Comprehensive guide to getting started with Proofly, including step-by-step instructions.</p>
          </section>
        )
      }
    ]
  },
  {
    title: "document types",
    href: "#document-types",
    icon: <FileText className="h-4 w-4" />,
    content: (
      <div>
        <h2 className="text-3xl font-semibold mb-4">Document Types</h2>
        <section id="invoices">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Invoices</h3>
          <p>Create professional invoices with ease using Proofly.</p>
        </section>
        <section id="bills">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Bills</h3>
          <p>Generate and manage bills efficiently within Proofly.</p>
        </section>
        <section id="receipts">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Receipts</h3>
          <p>Track and create receipts seamlessly using Proofly’s tools.</p>
        </section>
      </div>
    ),
    children: [
      {
        title: "invoices",
        href: "#invoices",
        content: (
          <section id="invoices">
            <h3 className="text-2xl font-semibold">Invoice Details</h3>
            <p>Comprehensive guide to creating invoices, including customizable templates and settings.</p>
          </section>
        )
      },
      {
        title: "bills",
        href: "#bills",
        content: (
          <section id="bills">
            <h3 className="text-2xl font-semibold">Bill Details</h3>
            <p>Learn about bill management, including setting up recurring bills and tracking payments.</p>
          </section>
        )
      },
      {
        title: "receipts",
        href: "#receipts",
        content: (
          <section id="receipts">
            <h3 className="text-2xl font-semibold">Receipt Details</h3>
            <p>Mastering receipt creation and management, including tax and discount options.</p>
          </section>
        )
      }
    ]
  },
  {
    title: "features",
    href: "#features",
    icon: <Clipboard className="h-4 w-4" />,
    content: (
      <div>
        <h2 className="text-3xl font-semibold mb-4">Features</h2>
        <section id="multi-currency-support">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Multi-Currency Support</h3>
          <p>Handle transactions in multiple currencies seamlessly within Proofly.</p>
        </section>
        <section id="tax-handling">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Tax Handling</h3>
          <p>Comprehensive tax calculation and reporting, including VAT and other tax structures.</p>
        </section>
        <section id="email-integration">
          <h3 className="text-2xl font-semibold mt-6 mb-4">Email Integration</h3>
          <p>Seamlessly send generated documents via email to clients and partners.</p>
        </section>
      </div>
    ),
    children: [
      {
        title: "multi-currency support",
        href: "#multi-currency-support",
        content: (
          <section id="multi-currency-support">
            <h3 className="text-2xl font-semibold">Multi-Currency Details</h3>
            <p>In-depth guide to multi-currency features, including exchange rate management and localization.</p>
          </section>
        )
      },
      {
        title: "tax handling",
        href: "#tax-handling",
        content: (
          <section id="tax-handling">
            <h3 className="text-2xl font-semibold">Tax Handling Details</h3>
            <p>Comprehensive tax management explanation, including custom tax rates for different regions.</p>
          </section>
        )
      },
      {
        title: "email integration",
        href: "#email-integration",
        content: (
          <section id="email-integration">
            <h3 className="text-2xl font-semibold">Email Integration Details</h3>
            <p>How to use email integration effectively to send invoices, receipts, and bills directly to users.</p>
          </section>
        )
      }
    ]
  },
  {
    title: "pricing",
    href: "#pricing",
    icon: <DollarSign className="h-4 w-4" />,
    content: (
      <section id="pricing">
        <h2 className="text-3xl font-semibold mb-4">Pricing</h2>
        <p>Detailed pricing information for Proofly, including subscription plans and discounts.</p>
      </section>
    )
  },
  {
    title: "deployment",
    href: "#deployment",
    icon: <Cloud className="h-4 w-4" />,
    content: (
      <section id="deployment">
        <h2 className="text-3xl font-semibold mb-4">Deployment</h2>
        <p>Comprehensive deployment guide for Proofly, including how to deploy on various platforms like Vercel.</p>
      </section>
    )
  }
];

const DocsContext = createContext<DocsContextType | undefined>(undefined);

export const DocsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeHref, setActiveHref] = useState("#getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  // Recursive function to find section by href
  const findSectionByHref = (sections: DocSection[], href: string): DocSection | undefined => {
    for (const section of sections) {
      if (section.href === href) return section;
      if (section.children) {
        const childSection = findSectionByHref(section.children, href);
        if (childSection) return childSection;
      }
    }
    return undefined;
  };

  const currentSection = findSectionByHref(docsContent, activeHref) || docsContent[0];

  const setActiveSection = (href: string) => {
    setActiveHref(href);
  };

  return (
    <DocsContext.Provider 
      value={{ 
        currentSection, 
        activeHref,
        sections: docsContent, 
        setActiveSection, 
        searchQuery, 
        setSearchQuery 
      }}
    >
      {children}
    </DocsContext.Provider>
  );
};

export const useDocsContext = () => {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error('useDocsContext must be used within a DocsProvider');
  }
  return context;
};
