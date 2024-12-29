"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const metricsSchema = z.object({
  metricType: z.string(),
  value: z.string(),
  unit: z.string(),
  notes: z.string().optional(),
});

const metricOptions = {
  diabetes: [
    { value: "bloodGlucose", label: "blood glucose", unit: "mg/dL" },
    { value: "hba1c", label: "HbA1c", unit: "%" },
    { value: "bloodPressure", label: "blood pressure", unit: "mmHg" },
  ],
  hypertension: [
    { value: "systolic", label: "systolic pressure", unit: "mmHg" },
    { value: "diastolic", label: "diastolic pressure", unit: "mmHg" },
    { value: "heartRate", label: "heart rate", unit: "bpm" },
  ],
  copd: [
    { value: "oxygenSaturation", label: "oxygen saturation", unit: "%" },
    { value: "peakFlow", label: "peak flow", unit: "L/min" },
    { value: "respiratoryRate", label: "respiratory rate", unit: "breaths/min" },
  ],
  ckd: [
    { value: "creatinine", label: "creatinine", unit: "mg/dL" },
    { value: "gfr", label: "GFR", unit: "mL/min" },
    { value: "bloodPressure", label: "blood pressure", unit: "mmHg" },
  ],
  chf: [
    { value: "weight", label: "weight", unit: "kg" },
    { value: "bloodPressure", label: "blood pressure", unit: "mmHg" },
    { value: "heartRate", label: "heart rate", unit: "bpm" },
  ],
};

const valueRange = {
  diabetes: {
    bloodGlucose: { min: 50, max: 400 }, // mg/dL
    hba1c: { min: 4, max: 15 }, // %
    bloodPressure: { min: 90, max: 180 }, // mmHg
  },
  hypertension: {
    systolic: { min: 90, max: 180 }, // mmHg
    diastolic: { min: 60, max: 120 }, // mmHg
    heartRate: { min: 40, max: 200 }, // bpm
  },
  copd: {
    oxygenSaturation: { min: 80, max: 100 }, // %
    peakFlow: { min: 50, max: 800 }, // L/min
    respiratoryRate: { min: 10, max: 40 }, // breaths/min
  },
  ckd: {
    creatinine: { min: 0.5, max: 2.0 }, // mg/dL
    gfr: { min: 30, max: 120 }, // mL/min
    bloodPressure: { min: 90, max: 180 }, // mmHg
  },
  chf: {
    weight: { min: 30, max: 300 }, // kg
    bloodPressure: { min: 90, max: 180 }, // mmHg
    heartRate: { min: 40, max: 200 }, // bpm
  },
};
const getDiseasesForMetric = (metricValue: string) => {
  return Object.entries(metricOptions)
    .filter(([_, metrics]) => metrics.some(m => m.value === metricValue))
    .map(([disease]) => disease)
    .join(', ');
};

const getDisplayLabel = (value: string) => {
  console.log('getDisplayLabel called with:', value);
  const metric = Object.values(metricOptions)
    .flat()
    .find((m) => m.value === value);
  console.log('Found metric for display:', metric);
  if (metric) {
    const diseases = getDiseasesForMetric(value);
    console.log('Diseases for display:', diseases);
    return `${metric.label} (${diseases})`;
  }
  return value;
};


export default function NewMetricPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>("");

  const form = useForm<z.infer<typeof metricsSchema>>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      metricType: "",
      value: "",
      unit: "",
      notes: "",
    },
  });



  const handleMetricTypeChange = (value: string) => {
    console.log('Selected value:', value);
    console.log('Current form values:', form.getValues());
    setSelectedMetric(value);
    const metric = Object.values(metricOptions)
      .flat()
      .find((m) => m.value === value);
    console.log('Found metric:', metric);
    if (metric) {
      const diseases = getDiseasesForMetric(value);
      console.log('Associated diseases:', diseases);
      form.setValue("unit", `${metric.unit} (${diseases})`);
    }
  };
  async function onSubmit(values: z.infer<typeof metricsSchema>) {
    if (!user) return;

    const { metricType, value } = values;

    // Get the selected metric's range
    const metricRange = Object.entries(valueRange)
      .flatMap(([category, metrics]) => {
        return Object.entries(metrics).map(([metric, range]) => ({
          category,
          metric,
          range,
        }));
      })
      .find((item) => item.metric === selectedMetric);

    if (metricRange) {
      const numericValue = parseFloat(value);
      // Validate if the entered value is within the valid range
      if (isNaN(numericValue)) {
        toast({
          title: "Invalid Value",
          description: "Please enter a valid numeric value.",
          variant: "destructive",
        });
        return;
      }

      if (numericValue < metricRange.range.min || numericValue > metricRange.range.max) {
        toast({
          title: "Value Out of Range",
          description: `The value must be between ${metricRange.range.min} and ${metricRange.range.max} for ${metricRange.metric}.`,
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "users", user.uid, "metrics"), {
        ...values,
        timestamp: new Date().toISOString(),
      });

      toast({
        title: "Success",
        description: "Health metric added successfully",
        variant: "default",
      });

      form.reset();
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-6">
      <div className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Add New Health Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="metricType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metric type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleMetricTypeChange(value);
                        }}
                      >
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Select metric type"
                          />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(metricOptions).map(([category, metrics]) => (
                            <div key={category}>
                              <div className="font-bold p-2">{category}</div>
                              {metrics.map((metric) => (
                                <SelectItem key={metric.value} value={metric.value}>
                                  {metric.label} ({metric.unit})
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
<FormField
  control={form.control}
  name="value"
  render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter metric value"
                    {...field}
                    onKeyPress={(e) => {
                      if (e.key === '-' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (parseFloat(target.value) < 0) {
                        target.value = '';
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Add any additional notes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Metric"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
