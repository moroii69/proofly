import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Terminal, BookOpen, Code2, Database } from 'lucide-react';

const PythonPackageSection = () => {
  return (
    <section className="container max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary tracking-wider mb-2">
          Installation
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Get Started with Proofly
        </h3>
        <p className="mx-auto text-xl text-muted-foreground mb-4">
          A powerful Python package for AI-driven health predictions
        </p>
        <a 
          href="https://pypi.org/project/proofly/1.1.2/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          Latest version: 1.1.2
        </a>
      </div>

      <div className="grid gap-6">
        {/* Prerequisites */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <CardTitle>Prerequisites</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-4 text-sm sm:text-base">
              <li>Python 3.8 or higher</li>
              <li>pip package manager</li>
              <li>Virtual environment (recommended)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Installation */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <CardTitle>Quick Install</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="font-mono bg-muted p-3 rounded block overflow-x-auto text-sm sm:text-base">
              pip install proofly==1.1.2
            </code>
          </CardContent>
        </Card>

        {/* Basic Usage */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <CardTitle>Basic Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-mono bg-muted p-3 rounded overflow-x-auto text-sm sm:text-base">
              <code>
                <span className="text-purple-500">from</span>{" "}
                <span className="text-blue-500">proofly</span>{" "}
                <span className="text-purple-500">import</span>{" "}
                <span className="text-green-500">HealthAnalyzer</span>
                {"\n"}
                <span className="text-purple-500">from</span>{" "}
                <span className="text-blue-500">proofly.models</span>{" "}
                <span className="text-purple-500">import</span>{" "}
                <span className="text-green-500">DiabetesMetrics</span>
                {"\n"}
                <span className="text-purple-500">from</span>{" "}
                <span className="text-blue-500">datetime</span>{" "}
                <span className="text-purple-500">import</span>{" "}
                <span className="text-green-500">datetime</span>
                {"\n\n"}
                <span className="text-gray-500"># Initialize the analyzer</span>{"\n"}
                <span className="text-blue-500">analyzer</span>{" "}
                <span className="text-orange-500">=</span>{" "}
                <span className="text-green-500">HealthAnalyzer</span>(
                {"\n    "}
                <span className="text-blue-500">config</span>
                <span className="text-orange-500">=</span>
                {"{"}
                {"\n        "}
                <span className="text-yellow-500">&quot;logging_level&quot;</span>
                <span className="text-orange-500">:</span>{" "}
                <span className="text-yellow-500">&quot;INFO&quot;</span>,
                {"\n        "}
                <span className="text-yellow-500">&quot;cache_enabled&quot;</span>
                <span className="text-orange-500">:</span>{" "}
                <span className="text-purple-500">True</span>,
                {"\n        "}
                <span className="text-yellow-500">&quot;validation_mode&quot;</span>
                <span className="text-orange-500">:</span>{" "}
                <span className="text-yellow-500">&quot;strict&quot;</span>
                {"\n    "}
                {"}"}{"\n"}){"\n\n"}
                <span className="text-gray-500"># Create metrics using the type-safe model</span>{"\n"}
                <span className="text-blue-500">metrics</span>{" "}
                <span className="text-orange-500">=</span>{" "}
                <span className="text-green-500">DiabetesMetrics</span>(
                {"\n    "}
                <span className="text-blue-500">blood_glucose</span>
                <span className="text-orange-500">=</span>
                <span className="text-purple-500">120</span>,
                {"\n    "}
                <span className="text-blue-500">hba1c</span>
                <span className="text-orange-500">=</span>
                <span className="text-purple-500">6.5</span>,
                {"\n    "}
                <span className="text-blue-500">blood_pressure</span>
                <span className="text-orange-500">=</span>
                <span className="text-purple-500">130</span>,
                {"\n    "}
                <span className="text-blue-500">timestamp</span>
                <span className="text-orange-500">=</span>
                <span className="text-green-500">datetime</span>.
                <span className="text-blue-500">now</span>()
                {"\n"})
              </code>
            </pre>
          </CardContent>
        </Card>

        {/* Documentation Link */}
        <div className="text-center mt-6">
          <a 
            href="https://pypi.org/project/proofly/1.1.2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <BookOpen className="h-5 w-5" />
            View Full Documentation
          </a>
        </div>
      </div>
    </section>
  );
};

export default PythonPackageSection;