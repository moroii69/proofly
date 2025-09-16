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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Prediction {
    id: string;
    title: string;
    prediction: string;
    confidence: number;
    risk: "low" | "medium" | "high";
}

type MetricType =
    | "bloodPressure"
    | "bloodGlucose"
    | "heartRate"
    | "cholesterol"
    | "bmi"
    | "oxygenSaturation";

interface MetricThresholds {
    low: number;
    medium: number;
    high: number;
}

const METRIC_THRESHOLDS: Record<MetricType, MetricThresholds> = {
    bloodPressure: { low: 120, medium: 140, high: 180 },
    bloodGlucose: { low: 140, medium: 200, high: 300 },
    heartRate: { low: 60, medium: 100, high: 120 },
    cholesterol: { low: 200, medium: 240, high: 300 },
    bmi: { low: 25, medium: 30, high: 35 },
    oxygenSaturation: { low: 95, medium: 90, high: 85 }, // Note: For O2, lower numbers are worse
};

const PREDICTION_MESSAGES: Record<
    MetricType,
    Record<"low" | "medium" | "high", string>
> = {
    bloodPressure: {
        low: "Your blood pressure is within a healthy range. Continue maintaining your current lifestyle.",
        medium: "Your blood pressure is slightly elevated. Consider reducing sodium intake and increasing physical activity.",
        high: "Your blood pressure requires immediate medical attention. Please consult your healthcare provider.",
    },
    bloodGlucose: {
        low: "Your blood glucose levels are normal. Maintain a balanced diet and regular exercise routine.",
        medium: "Your blood glucose is moderately elevated. Monitor your carbohydrate intake and consider increasing physical activity.",
        high: "Your blood glucose levels require immediate attention. Please seek medical advice and review your diabetes management plan.",
    },
    heartRate: {
        low: "Your resting heart rate is within a healthy range. Continue your current fitness routine.",
        medium: "Your heart rate is slightly elevated. Consider stress-reduction techniques and moderate exercise.",
        high: "Your heart rate is significantly elevated. Please consult a healthcare provider for evaluation.",
    },
    cholesterol: {
        low: "Your cholesterol levels are within a healthy range. Maintain your heart-healthy diet.",
        medium: "Your cholesterol is borderline high. Consider dietary changes and increasing physical activity.",
        high: "Your cholesterol levels require attention. Consult your healthcare provider about management strategies.",
    },
    bmi: {
        low: "Your BMI is within a healthy range. Maintain your balanced diet and exercise routine.",
        medium: "Your BMI indicates overweight status. Consider working with a nutritionist for dietary guidance.",
        high: "Your BMI indicates obesity. Please consult healthcare providers for a comprehensive weight management plan.",
    },
    oxygenSaturation: {
        low: "Your oxygen saturation is normal. Continue monitoring as usual.",
        medium: "Your oxygen saturation is slightly low. Consider deep breathing exercises and monitoring more frequently.",
        high: "Your oxygen saturation is concerning. Seek immediate medical attention.",
    },
};

const CONFIDENCE_LEVELS: Record<"low" | "medium" | "high", number> = {
    low: 85,
    medium: 88,
    high: 92,
};

function calculatePrediction(metrics: any[]): Prediction[] {
    if (metrics.length === 0) return [];

    return metrics.reduce((predictions: Prediction[], metric) => {
        const metricType = metric.metricType as MetricType;
        if (!METRIC_THRESHOLDS[metricType]) return predictions;

        const value = parseFloat(metric.value);
        const thresholds = METRIC_THRESHOLDS[metricType];

        let risk: "low" | "medium" | "high";
        let prediction: string;

        // Special case for oxygen saturation where lower is worse
        if (metricType === "oxygenSaturation") {
            if (value >= thresholds.low) {
                risk = "low";
            } else if (value >= thresholds.medium) {
                risk = "medium";
            } else {
                risk = "high";
            }
        } else {
            // Normal case where higher is worse
            if (value <= thresholds.low) {
                risk = "low";
            } else if (value <= thresholds.medium) {
                risk = "medium";
            } else {
                risk = "high";
            }
        }

        prediction = PREDICTION_MESSAGES[metricType][risk];

        predictions.push({
            id: metric.id,
            title: `${
                metricType.charAt(0).toUpperCase() + metricType.slice(1)
            } Analysis`,
            prediction,
            confidence: CONFIDENCE_LEVELS[risk],
            risk,
        });

        return predictions;
    }, []);
}

export function HealthPrediction() {
    const { user } = useAuth();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
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

            const newPredictions = calculatePrediction(metricsData);
            setPredictions(newPredictions);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return <div>Analyzing your health data...</div>;
    }

    if (predictions.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                        Add health metrics to receive predictions and insights.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {predictions.map((prediction) => (
                <Card key={prediction.id}>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">
                                {prediction.title}
                            </h4>
                            <Badge
                                variant={
                                    prediction.risk === "low"
                                        ? "secondary"
                                        : prediction.risk === "medium"
                                        ? "outline"
                                        : "destructive"
                                }
                            >
                                {prediction.risk.toUpperCase()}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                            {prediction.prediction}
                        </p>
                        <div className="text-xs text-muted-foreground">
                            Confidence: {prediction.confidence}%
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
