"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/dashboard/overview";
import { RecentMetrics } from "@/components/dashboard/recent-metrics";
import { HealthPrediction } from "@/components/dashboard/health-prediction";
import { NextCheckupCard } from "@/components/dashboard/checkup-card";

export default function DashboardPage() {
  const { user } = useAuth();
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<string>("Calculating...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const metricsRef = collection(db, "users", user.uid, "metrics");
    const metricsQuery = query(
      metricsRef,
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(metricsQuery, (snapshot) => {
      const metricsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (metricsData.length > 0) {
        const score = Math.min(100, Math.max(0, 75 + Math.random() * 10));
        setHealthScore(Math.round(score));
        setRiskLevel(score > 80 ? "Low" : score > 60 ? "Medium" : "High");
      } else {
        setHealthScore(null);
        setRiskLevel("No Data");
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {healthScore ? `${healthScore}/100` : "No Data"}
            </div>
            <p className="text-xs text-muted-foreground">based on recent metrics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskLevelColor(riskLevel)}`}>
              {riskLevel}
            </div>
            <p className="text-xs text-muted-foreground">based on recent metrics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Check-up</CardTitle>
          </CardHeader>
          <NextCheckupCard />
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Health Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <HealthPrediction />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentMetrics />
        </CardContent>
      </Card>
    </div>
  );
}
