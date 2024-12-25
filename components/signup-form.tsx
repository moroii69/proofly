"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  condition: z.enum(["diabetes", "hypertension", "copd", "ckd", "chf"], {
    required_error: "Please select a condition",
  }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      condition: undefined,
    },
  });

  // Common user creation logic extracted to a separate function
  async function createUserProfile(user: any, additionalData: any = {}) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // Prepare user data with fallback values
    const userData: any = {
      name: additionalData.name || user.displayName || '',
      email: user.email,
      createdAt: new Date().toISOString(),
    };

    // Only add condition if it's a valid value
    if (additionalData.condition && 
        ["diabetes", "hypertension", "copd", "ckd", "chf"].includes(additionalData.condition)) {
      userData.condition = additionalData.condition;
    }

    // Only create profile if it doesn't already exist
    if (!userSnap.exists()) {
      await setDoc(userRef, userData);
    }

    return userRef;
  }

  async function onSocialSignUp(provider: 'google' | 'github') {
    setLoading(true);
    try {
      const authProvider = provider === 'google' 
        ? new GoogleAuthProvider() 
        : new GithubAuthProvider();

      const userCredential = await signInWithPopup(auth, authProvider);
      
      // Attempt to get condition from form if filled
      const condition = form.getValues('condition');

      await createUserProfile(userCredential.user, { condition });

      toast({
        title: "✅ Success",
        description: `Signed up with ${provider} successfully!`,
        variant: "default",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await createUserProfile(userCredential.user, values);

      toast({
        title: "✅ Success",
        description: "Account created successfully! Redirecting...",
        variant: "default",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>Sign up with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="grid gap-6">
              {/* Google Sign-in Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onSocialSignUp("google")}
                disabled={loading}
              >
                Login with Google
              </Button>

              {/* Or continue with email/password */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Email and Password Fields */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="condition">Health Condition</FormLabel>
                      <FormControl>
                        <Select {...field} defaultValue="">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diabetes">Diabetes</SelectItem>
                            <SelectItem value="hypertension">Hypertension</SelectItem>
                            <SelectItem value="copd">COPD</SelectItem>
                            <SelectItem value="ckd">CKD</SelectItem>
                            <SelectItem value="chf">CHF</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </form>

              {/* Sign-in Link */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login here
                </a>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* Terms of Service and Privacy Policy */}
      <div className="text-center text-xs text-muted-foreground">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
