"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, FileText, BarChart2, Settings as SettingsIcon } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Settings from "./settings/page";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase authentication import
import next from "next";
import Link from 'next/link';
import { User } from "firebase/auth";

function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("generate");
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Show welcome toast when the component mounts
    toast({
      title: "Welcome to Proofly! 👋",
      description: "Let's get you started with managing your documents.",
      duration: 5000,
    });

    // Check if user is signed in
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // If user is signed in, store the user object
      } else {
        setUser(null); // If not signed in, clear user data
        router.push("/signup"); // Redirect to signin page if not signed in
      }
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, [router, toast]);

  const handleGenerate = () => {
    router.push("/generate");
  };

  if (!user) {
    return null; // Optionally, show a loading indicator or null while checking auth status
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-4 relative">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        DASHBOARD
      </h1>
      <p className="text-lg mb-6 text-gray-300">Manage and track your invoices, bills, and receipts</p>

      <TooltipProvider>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-md mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 shadow-lg rounded-lg">
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger 
                  id="generate-tab" 
                  value="generate" 
                  className="text-white hover:bg-gray-700 transition-all duration-300 group"
                >
                  <FileText className="mr-2 w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  Generate
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create new financial documents instantly</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger 
                  id="analytics-tab" 
                  value="analytics" 
                  className="text-white hover:bg-gray-700 transition-all duration-300 group"
                >
                  <BarChart2 className="mr-2 w-5 h-5 text-green-400 group-hover:text-green-300" />
                  Analytics
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Financial insights coming soon</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger 
                  id="settings-tab" 
                  value="settings" 
                  className="text-white hover:bg-gray-700 transition-all duration-300 group"
                >
                  <SettingsIcon className="mr-2 w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  Settings
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure your account preferences</p>
              </TooltipContent>
            </Tooltip>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="generate" className="mt-4">
                <Card className="bg-gray-800 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Generate Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Generate invoices, bills, and receipts with ease. Click below to start creating your documents.
                    </p>
                    <Button
                      onClick={handleGenerate}
                      className="w-full text-black bg-white py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Go to Generate
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <Card className="bg-gray-800 shadow-2xl flex flex-col items-center justify-center min-h-[200px]">
                  <div className="text-center">
                    <BarChart2 className="mx-auto mb-4 w-16 h-16 text-green-400 opacity-50" />
                    <p className="text-gray-400 text-lg font-semibold mb-2">Analytics Coming Soon</p>
                    <p className="text-gray-500 max-w-xs">
                      We&apos;re working hard to bring you powerful financial insights and tracking.
                    </p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <Card className="bg-gray-800 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Settings />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </TooltipProvider>

      <div className="flex items-center text-sm text-gray-500 opacity-50 mt-4">
        <HelpCircle className="mr-2 w-4 h-4" />
        Need help? Check our <Link href="/docs" className="ml-1 underline">documentation</Link>
      </div>

      <Toaster />
    </div>
  );
}

export default DashboardPage;
