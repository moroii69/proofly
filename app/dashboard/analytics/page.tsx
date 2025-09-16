"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tooltip as UITooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    QuerySnapshot,
    DocumentData,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Metric {
    id: string;
    timestamp: number;
    value: number;
    metricType: string;
    date?: string;
}

interface MetricChartProps {
    data: Metric[];
    title: string;
    description: string;
}

const MetricChart = ({ data, title, description }: MetricChartProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const calculateStats = () => {
        if (data.length < 2)
            return { trend: 0, min: 0, max: 0, avg: 0, lastValue: 0 };
        const values = data.map((d) => d.value);
        const lastValue = values[values.length - 1];
        const previousValue = values[values.length - 2];
        const trend = parseFloat(
            (((lastValue - previousValue) / previousValue) * 100).toFixed(1)
        );
        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = parseFloat(
            (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
        );
        const lastRecordedValue =
            data.length > 0 ? data[data.length - 1].value : 0;
        return { trend, min, max, avg, lastValue, lastRecordedValue };
    };

    const stats = calculateStats();
    // get the last recorded value (previous method not working)
    // moved up 👇
    const lastRecordedValue = data.length > 0 ? data[data.length - 1].value : 0;

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">
                        Value: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl sm:text-2xl">
                            {title}
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <TooltipProvider>
                        <UITooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    Statistical insights for your{" "}
                                    {title.toLowerCase()}
                                </p>
                            </TooltipContent>
                        </UITooltip>
                    </TooltipProvider>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            Last Recorded Value
                        </p>
                        <p className="text-lg font-medium">
                            {stats.lastRecordedValue}
                        </p>{" "}
                        {/* Last Recorded Value */}
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Minimum</p>
                        <p className="text-lg font-medium">{stats.min}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Maximum</p>
                        <p className="text-lg font-medium">{stats.max}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            Record Count
                        </p>{" "}
                        {/* Total Records */}
                        <p className="text-lg font-medium">{data.length}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 5,
                                left: isMobile ? -20 : 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="hsl(var(--muted))"
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tick={{ fontSize: isMobile ? 12 : 14 }}
                                tickFormatter={(value) =>
                                    isMobile ? value.slice(0, 3) : value
                                }
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tick={{ fontSize: isMobile ? 12 : 14 }}
                                domain={[
                                    0,
                                    Math.ceil(
                                        Math.max(...data.map((d) => d.value)) /
                                            25
                                    ) * 25,
                                ]}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                dot={{
                                    fill: "hsl(var(--primary))",
                                    r: isMobile ? 3 : 4,
                                }}
                                activeDot={{
                                    r: isMobile ? 5 : 6,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm border-t">
                <div className="flex items-center gap-2 mt-6">
                    <span className="font-medium">Wellness Score:</span>{" "}
                    {/* Change / Health Progression */}
                    <span className="flex items-center gap-1">
                        {Number(stats.trend) >= 0 ? "+" : ""}
                        {stats.trend}%
                        {Number(stats.trend) >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                    </span>
                </div>
                <div className="text-muted-foreground">
                    Last updated: {format(new Date(data[0].timestamp), "PPP")}
                </div>
            </CardFooter>
        </Card>
    );
};

export default function AnalyticsPage() {
    const { user } = useAuth();
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const metricsRef = collection(db, "users", user.uid, "metrics");
        const metricsQuery = query(metricsRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(
            metricsQuery,
            (snapshot: QuerySnapshot<DocumentData>) => {
                const metricsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Metric[];
                setMetrics(metricsData);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    const groupedMetrics = metrics.reduce<Record<string, Metric[]>>(
        (acc, metric) => {
            if (!acc[metric.metricType]) {
                acc[metric.metricType] = [];
            }
            acc[metric.metricType].push({
                ...metric,
                date: format(new Date(metric.timestamp), "MMM dd"),
                value: metric.value,
            });
            return acc;
        },
        {}
    );

    if (loading) {
        return (
            <div className="space-y-6 p-4">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-6">
                    {[1, 2].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-[300px]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Analytics Dashboard
                </h1>
            </div>
            <div className="grid gap-6">
                {Object.entries(groupedMetrics).map(([metricType, data]) => (
                    <MetricChart
                        key={metricType}
                        data={data.sort((a, b) => a.timestamp - b.timestamp)}
                        title={`${metricType} Metrics`}
                        description={`${format(new Date(), "MMMM yyyy")}`}
                    />
                ))}
                {metrics.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-lg text-muted-foreground">
                                No metrics data available yet
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Start adding metrics to see your analytics
                                dashboard come to life
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function useAuth(): { user: any } {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return { user };
}
