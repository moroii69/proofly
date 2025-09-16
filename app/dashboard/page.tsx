"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import {
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
} from "firebase/firestore";
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
                const score = Math.min(
                    100,
                    Math.max(0, 75 + Math.random() * 10)
                );
                setHealthScore(Math.round(score));
                setRiskLevel(
                    score > 80 ? "Low" : score > 60 ? "Medium" : "High"
                );
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
        <div className="flex-1 p-4 space-y-4 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Dashboard
                </h2>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Health Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl sm:text-2xl font-bold">
                            {healthScore ? `${healthScore}/100` : "No Data"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Based on recent metrics
                        </p>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Risk Level
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`text-xl sm:text-2xl font-bold ${getRiskLevelColor(
                                riskLevel
                            )}`}
                        >
                            {riskLevel}
                        </div>

                        <p className="text-xs text-muted-foreground">
                            {riskLevel === "Low"
                                ? "You're in great shape!"
                                : riskLevel === "Medium"
                                ? "Keep an eye on your health."
                                : "Consult a healthcare provider immediately."}
                        </p>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Next Check-up
                        </CardTitle>
                    </CardHeader>
                    <NextCheckupCard />
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
                <Card className="w-full lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                            Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 overflow-x-auto">
                        <Overview />
                    </CardContent>
                </Card>

                <Card className="w-full lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                            Health Predictions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <HealthPrediction />
                    </CardContent>
                </Card>
            </div>

            {/* Recent Metrics Section */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">
                        Recent Metrics
                    </CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <RecentMetrics />
                </CardContent>
            </Card>
        </div>
    );
}
