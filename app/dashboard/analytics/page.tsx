"use client"
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { collection, query, orderBy, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/lib/firebase";
import { format } from "date-fns";

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
  const calculateTrend = () => {
    if (data.length < 2) return 0;
    const lastValue = data[data.length - 1].value;
    const previousValue = data[data.length - 2].value;
    return parseFloat(((lastValue - previousValue) / previousValue * 100).toFixed(1));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip 
                cursor={false}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              />
              <Line
                type="natural"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--primary))",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
  Metric value shows {Number(calculateTrend()) >= 0 ? "an increase" : "a decrease"} by {Math.abs(calculateTrend())}% today
  {Number(calculateTrend()) >= 0 ? (
    <TrendingUp className="h-4 w-4 text-green-500" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-500" />
  )}
</div>

        <div className="leading-none text-muted-foreground">
          Showing {title.toLowerCase()} for the last {data.length} day(s)
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
    
    const unsubscribe = onSnapshot(metricsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
      const metricsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Metric[];
      setMetrics(metricsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);

  const groupedMetrics = metrics.reduce<Record<string, Metric[]>>((acc, metric) => {
    if (!acc[metric.metricType]) {
      acc[metric.metricType] = [];
    }
    acc[metric.metricType].push({
      ...metric,
      date: format(new Date(metric.timestamp), "MMM dd"),
      value: metric.value,
    });
    return acc;
  }, {});

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      {Object.entries(groupedMetrics).map(([metricType, data]) => (
        <MetricChart
          key={metricType}
          data={data}
          title={`${metricType} Metrics`}
          description={`${format(new Date(), 'MMMM yyyy')}`}
        />
      ))}
      {metrics.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No metrics data available. Start adding metrics to see analytics.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
function useAuth(): { user: any; } {
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
