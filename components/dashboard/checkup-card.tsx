"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, addDoc, Timestamp, where } from "firebase/firestore";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, Calendar as CalendarIcon, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface MetricData {
  metricType: string;
  value: number;
  timestamp: Timestamp;
}

export function NextCheckupCard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [nextCheckup, setNextCheckup] = useState<Date | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [recommendedDate, setRecommendedDate] = useState<Date | null>(null);
  const [urgency, setUrgency] = useState<"normal" | "soon" | "urgent">("normal");
  const [daysUntilCheckup, setDaysUntilCheckup] = useState<number | null>(null);
  const [lastCheckup, setLastCheckup] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) return;

    const checkupsRef = collection(db, "users", user.uid, "schedules");
    const futureCheckupsQuery = query(
      checkupsRef,
      where("date", ">=", Timestamp.now()),
      orderBy("date", "asc"),
      limit(1)
    );

    const pastCheckupsQuery = query(
      checkupsRef,
      where("date", "<", Timestamp.now()),
      orderBy("date", "desc"),
      limit(1)
    );

    const metricsRef = collection(db, "users", user.uid, "metrics");
    const metricsQuery = query(
      metricsRef,
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribeFuture = onSnapshot(futureCheckupsQuery, (snapshot) => {
      if (!snapshot.empty) {
        setNextCheckup(snapshot.docs[0].data().date.toDate());
      }
      setLoading(false);
    });

    const unsubscribePast = onSnapshot(pastCheckupsQuery, (snapshot) => {
      if (!snapshot.empty) {
        setLastCheckup(snapshot.docs[0].data().date.toDate());
      }
    });

    const unsubscribeMetrics = onSnapshot(metricsQuery, (snapshot) => {
      const metrics = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          metricType: data.metricType,
          value: data.value,
          timestamp: data.timestamp,
        } as MetricData;
      });

      calculateRecommendedDate(metrics);
    });

    return () => {
      unsubscribeFuture();
      unsubscribePast();
      unsubscribeMetrics();
    };
  }, [user]);

  const calculateRecommendedDate = (metrics: MetricData[]) => {
    if (metrics.length === 0) {
      setRecommendedDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      setUrgency("normal");
      return;
    }

    let daysToAdd = 30;
    let maxUrgency: "normal" | "soon" | "urgent" = "normal";

    metrics.forEach(metric => {
      const value = metric.value;
      
      if (metric.metricType === "bloodPressure" && value > 140 ||
          metric.metricType === "bloodGlucose" && value > 200 ||
          metric.metricType === "heartRate" && value > 100 ||
          metric.metricType === "cholesterol" && value > 240) {
        daysToAdd = Math.min(daysToAdd, 7);
        maxUrgency = "soon";
      }
      
      if (metric.metricType === "bloodPressure" && value > 180 ||
          metric.metricType === "bloodGlucose" && value > 300 ||
          metric.metricType === "heartRate" && value > 120 ||
          metric.metricType === "cholesterol" && value > 300) {
        daysToAdd = Math.min(daysToAdd, 2);
        maxUrgency = "urgent";
      }
    });

    setRecommendedDate(new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000));
    setUrgency(maxUrgency);
  };

  const getTimeUntilCheckup = (checkupDate: Date) => {
    const today = new Date();
    const diffTime = checkupDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    if (nextCheckup) {
      setDaysUntilCheckup(getTimeUntilCheckup(nextCheckup));
    }
  }, [nextCheckup]);

  const getUrgencyBadge = () => {
    const variants = {
      normal: { color: "secondary", label: "Routine" },
      soon: { color: "warning", label: "Soon" },
      urgent: { color: "destructive", label: "Urgent" }
    };
    
    return (
      <Badge variant={variants[urgency].color as any}>
        {variants[urgency].label}
      </Badge>
    );
  };

  const handleSchedule = async () => {
    if (!selectedDate || !user) return;
    try {
      await addDoc(collection(db, "users", user.uid, "schedules"), {
        date: Timestamp.fromDate(selectedDate),
        createdAt: Timestamp.now(),
        type: "checkup",
        urgency,
        recommendedDate: recommendedDate ? Timestamp.fromDate(recommendedDate) : null
      });
      setIsScheduling(false);
    } catch (error) {
      console.error("Error scheduling:", error);
    }
  };

  return (
    <Dialog open={isScheduling} onOpenChange={setIsScheduling}>
      <DialogTrigger asChild>
        <CardContent className="relative cursor-pointer hover:bg-muted/50 transition-colors p-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-2 right-2"
          >
            {nextCheckup ? "Reschedule" : "Schedule Now"}
          </Button>

          <div className="space-y-6 mt-6">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-2 w-full" />
              </div>
            ) : (
              <>
                <div className="flex items-start space-x-4">
                  <CalendarIcon className="h-6 w-6 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">
                        {nextCheckup ? nextCheckup.toLocaleDateString() : "No checkup scheduled"}
                      </div>
                      {getUrgencyBadge()}
                    </div>
                    {daysUntilCheckup && (
                      <div className="text-sm text-muted-foreground">
                        {daysUntilCheckup} days until next checkup
                      </div>
                    )}
                  </div>
                </div>

                {nextCheckup && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Time until checkup</span>
                      <span>{daysUntilCheckup} days remaining</span>
                    </div>
                    <Progress 
                      value={Math.max(0, Math.min(100, (daysUntilCheckup || 0) / 30 * 100))} 
                      className="h-2"
                    />
                  </div>
                )}

                {lastCheckup && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Last checkup: {lastCheckup.toLocaleDateString()}
                  </div>
                )}

                {urgency === "urgent" && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="ml-2">
                      Urgent: Schedule recommended within 48 hours based on your health metrics
                    </AlertDescription>
                  </Alert>
                )}

                {urgency === "soon" && (
                  <Alert variant="default">
                    <Clock className="h-4 w-4" />
                    <AlertDescription className="ml-2">
                      Recommended: Schedule within 7 days for optimal health monitoring
                    </AlertDescription>
                  </Alert>
                )}

                {urgency === "normal" && recommendedDate && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="ml-2">
                      Suggested next checkup by {recommendedDate.toLocaleDateString()}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        </CardContent>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Next Checkup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {recommendedDate && (
            <Alert>
              <AlertDescription>
                {urgency === "urgent" 
                  ? "Urgent: Please schedule within 48 hours"
                  : urgency === "soon"
                  ? "Recommended: Schedule within 7 days"
                  : `Recommended next checkup by ${recommendedDate.toLocaleDateString()}`}
              </AlertDescription>
            </Alert>
          )}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
          <Button 
            onClick={handleSchedule} 
            disabled={!selectedDate}
            className="w-full"
            variant={urgency === "urgent" ? "destructive" : "default"}
          >
            {selectedDate ? `Schedule for ${selectedDate.toLocaleDateString()}` : "Select a date"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}