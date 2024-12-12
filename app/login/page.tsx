"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  signInWithEmailAndPassword, 
  sendSignInLinkToEmail, 
  sendPasswordResetEmail, 
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Check for Magic Link sign-in on component mount
  const checkMagicLinkSignIn = async () => {
    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        
        // If email is not in localStorage, prompt user
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        if (email) {
          const result = await signInWithEmailLink(auth, email, window.location.href);
          
          // Clear the email from localStorage
          window.localStorage.removeItem('emailForSignIn');

          toast({
            title: "Success",
            description: "Signed in successfully with Magic Link",
          });

          router.push('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not complete Magic Link sign-in",
        variant: "destructive",
      });
    }
  };

  // Run Magic Link check on component mount
  useState(() => {
    checkMagicLinkSignIn();
  });

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });

      // Redirect to dashboard
      router.push('/dashboard');
      
      // Fallback redirection
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);

    } catch (error) {
      const firebaseError = error as { code?: string, message?: string };
      
      // More specific error handling
      let errorMessage = "Invalid email or password";
      switch (firebaseError.code) {
        case 'auth/invalid-credential':
          errorMessage = "Invalid email or password";
          break;
        case 'auth/user-disabled':
          errorMessage = "This account has been disabled";
          break;
        case 'auth/user-not-found':
          errorMessage = "No user found with this email";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password";
          break;
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("Login error:", {
        code: firebaseError.code,
        message: firebaseError.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (email: string) => {
    try {
      setIsLoading(true);
      const actionCodeSettings = {
        url: window.location.origin + '/login', // Point back to login page
        handleCodeInApp: true,
      };
      
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Store the email locally for later confirmation
      window.localStorage.setItem('emailForSignIn', email);
      
      toast({
        title: "Magic Link Sent",
        description: "Check your email for the login link. The link will be valid for 1 hour.",
      });
    } catch (error) {
      const firebaseError = error as { code?: string, message?: string };
      
      toast({
        title: "Error",
        description: firebaseError.message || "Could not send magic link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">Welcome back</h2>
        </div>

        {!showForgotPassword ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as HTMLFormElement).email.value;
            handleForgotPassword(email);
          }} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => {
                const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value;
                if (email) handleMagicLink(email);
              }}
              disabled={isLoading}
              className="w-full cursor-not-allowed"
              onMouseMove={(e) => {
                setHoverPosition({ x: e.clientX, y: e.clientY });
                setIsHovering(true);
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              Sign in with Magic Link
            </Button>
            {!isLoading && isHovering && (
              <div 
                className="fixed text-gray-500 text-sm bg-white/70 px-2 py-1 rounded-md shadow-md"
                style={{ 
                  left: `${hoverPosition.x + 10}px`, 
                  top: `${hoverPosition.y + 10}px`,
                  zIndex: 50
                }}
              >
                Coming Soon
              </div>
            )}
          </div>
          <Button
            variant="link"
            onClick={() => setShowForgotPassword(!showForgotPassword)}
          >
            {showForgotPassword ? "Back to Login" : "Forgot Password?"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}