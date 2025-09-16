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
    doc,
    deleteDoc,
} from "firebase/firestore";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export function RecentMetrics() {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [metrics, setMetrics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [metricToDelete, setMetricToDelete] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check for mobile viewport on mount and window resize
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!user) return;

        const metricsRef = collection(db, "users", user.uid, "metrics");
        const metricsQuery = query(
            metricsRef,
            orderBy("timestamp", "desc"),
            limit(5)
        );

        const unsubscribe = onSnapshot(metricsQuery, (snapshot) => {
            const metricsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                date: format(
                    new Date(doc.data().timestamp),
                    "PPP 'at' HH:mm:ss"
                ),
            }));
            setMetrics(metricsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleDelete = async () => {
        if (!metricToDelete) return;

        try {
            const metricRef = doc(
                db,
                "users",
                user?.uid!,
                "metrics",
                metricToDelete
            );
            await deleteDoc(metricRef);

            toast({
                title: "✅ Success",
                description: "Metric deleted successfully!",
                variant: "default",
            });

            setIsDeleteModalOpen(false);
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to delete metric. Please try again.",
                variant: "destructive",
            });

            console.error("Error deleting metric:", error);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-4">Loading recent metrics...</div>
        );
    }

    if (metrics.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                    no metrics available D: start tracking your health metrics
                    now!!
                </p>
                <Button onClick={() => router.push("/dashboard/metrics/new")}>
                    add your first metric
                </Button>
            </div>
        );
    }

    // Mobile card view
    if (isMobile) {
        return (
            <div className="space-y-4">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className="bg-card rounded-lg shadow p-4 space-y-2 border"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="font-medium">
                                    {metric.metricType}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {metric.date}
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => {
                                            setMetricToDelete(metric.id);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <Trash size={16} />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Are you sure you want to delete this
                                            metric?
                                        </DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. It
                                            will permanently delete the selected
                                            metric.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex justify-end mt-4">
                                        <Button
                                            onClick={() =>
                                                setIsDeleteModalOpen(false)
                                            }
                                            variant="secondary"
                                            className="mr-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleDelete}
                                            variant="destructive"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="text-sm">
                            <span className="font-medium">Value: </span>
                            {metric.value} {metric.unit}
                        </div>
                        {metric.notes && (
                            <div className="text-sm">
                                <span className="font-medium">Notes: </span>
                                {metric.notes}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Desktop table view
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {metrics.map((metric) => (
                        <TableRow key={metric.id}>
                            <TableCell className="whitespace-nowrap">
                                {metric.date}
                            </TableCell>
                            <TableCell>{metric.metricType}</TableCell>
                            <TableCell>
                                {metric.value} {metric.unit}
                            </TableCell>
                            <TableCell>{metric.notes || "-"}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => {
                                                setMetricToDelete(metric.id);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Are you sure you want to delete
                                                this metric?
                                            </DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. It
                                                will permanently delete the
                                                selected metric.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                                onClick={() =>
                                                    setIsDeleteModalOpen(false)
                                                }
                                                variant="secondary"
                                                className="mr-2"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleDelete}
                                                variant="destructive"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
