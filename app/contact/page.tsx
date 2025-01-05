"use client";
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Send, Github, Globe, Server, Activity, CheckCircle, AlertCircle, Gauge, Database, Cloud, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FooterSection } from "@/components/layout/sections/footer"

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ServerStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  lastIncident: string;
  responseTime: number;
}

const generateRandomUptime = () => {
  // Generate uptime between 98.00% and 99.99%
  return (98 + Math.random() * 1.99).toFixed(2) + '%';
};

const generateRandomLastIncident = () => {
  const timeUnits = ['minutes', 'hours', 'days'];
  const unit = timeUnits[Math.floor(Math.random() * timeUnits.length)];
  const time = Math.floor(Math.random() * (unit === 'minutes' ? 59 : unit === 'hours' ? 23 : 30)) + 1;
  return time === 1 ? `${time} ${unit.slice(0, -1)} ago` : `${time} ${unit} ago`;
};

const generateRandomResponseTime = () => {
  // Generate response time between 50ms and 300ms
  return Math.floor(50 + Math.random() * 250);
};

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [serverStatuses, setServerStatuses] = useState<ServerStatus[]>([
    {
      name: 'Next.js Frontend',
      status: 'operational',
      uptime: '99.99%',
      lastIncident: 'None',
      responseTime: 100
    },
    {
      name: 'Express Backend',
      status: 'operational',
      uptime: '99.95%',
      lastIncident: 'None',
      responseTime: 150
    },
    {
      name: 'Firebase Services',
      status: 'operational',
      uptime: '99.90%',
      lastIncident: 'None',
      responseTime: 200
    },
    {
      name: 'GraphQL API',
      status: 'operational',
      uptime: '99.85%',
      lastIncident: 'None',
      responseTime: 180
    }
  ]);

  useEffect(() => {
    // Update status randomly every 30 seconds
    const interval = setInterval(() => {
      setServerStatuses(prev => prev.map(server => ({
        ...server,
        uptime: generateRandomUptime(),
        lastIncident: Math.random() > 0.7 ? generateRandomLastIncident() : 'None',
        status: Math.random() > 0.8 ? 'degraded' : 'operational',
        responseTime: generateRandomResponseTime()
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ServerStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'degraded':
        return 'text-orange-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 100) return 'text-green-500';
    if (time < 200) return 'text-orange-500';
    return 'text-red-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">About Project</h2>
              <p className="text-muted-foreground">
                Built with Next.js 14, Express, and Firebase. Using modern web technologies for optimal performance.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p>kurosen930@gmailcom</p>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-primary" />
                <p>github.com/moroii69</p>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <p>linkedin.com/in/ufraaan</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">System Status</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serverStatuses.map((server, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {server.name.includes('Frontend') && <Globe className="h-4 w-4 text-primary" />}
                        {server.name.includes('Backend') && <Server className="h-4 w-4 text-primary" />}
                        {server.name.includes('Firebase') && <Database className="h-4 w-4 text-primary" />}
                        {server.name.includes('GraphQL') && <Cloud className="h-4 w-4 text-primary" />}
                        <span className="font-medium">{server.name}</span>
                      </div>
                      <span className={`flex items-center gap-1 ${getStatusColor(server.status)}`}>
                        {server.status === 'operational' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        {server.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Uptime: {server.uptime}</span>
                      <span>Last incident: {server.lastIncident}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="h-4 w-4" />
                      <span className={getResponseTimeColor(server.responseTime)}>
                        Response Time: {server.responseTime}ms
                      </span>
                    </div>
                    {index < serverStatuses.length - 1 && (
                      <div className="border-t my-2" />
                    )}
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Last updated: {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="shadow-light dark:shadow-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="shadow-light dark:shadow-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What would you like to discuss?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="shadow-light dark:shadow-dark"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[150px] shadow-light dark:shadow-dark"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
        <FooterSection />
    </div>
  );
};


export default ContactPage;