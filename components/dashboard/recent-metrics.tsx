"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, onSnapshot, doc, deleteDoc } from "firebase/firestore";
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
import { Toast } from "@/components/ui/toast";

export function RecentMetrics() {
  const { user } = useAuth();
  const router = useRouter();
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [metricToDelete, setMetricToDelete] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
        date: format(new Date(doc.data().timestamp), "PPP 'at' HH:mm:ss"),
      }));
      setMetrics(metricsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async () => {
    if (!metricToDelete) return;

    try {
      const metricRef = doc(db, "users", user?.uid!, "metrics", metricToDelete);
      await deleteDoc(metricRef);
      setToastMessage("Metric deleted successfully!");
      setIsToastVisible(true);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting metric:", error);
      setToastMessage("Failed to delete metric. Please try again.");
      setIsToastVisible(true);
    }
  };

  if (loading) {
    return <div>Loading recent metrics...</div>;
  }

  if (metrics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          no metrics available  D:  start tracking your health metrics now!!
        </p>
        <Button onClick={() => router.push("/dashboard/metrics/new")}>
          add your first metric
        </Button>
      </div>
    );
  }

  return (
    <>
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
              <TableCell>{metric.date}</TableCell>
              <TableCell>{metric.metricType}</TableCell>
              <TableCell>{metric.value} {metric.unit}</TableCell>
              <TableCell>{metric.notes || "-"}</TableCell>
              <TableCell>
                {/* Delete Button (Dialog) */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setMetricToDelete(metric.id);
                        setIsDeleteModalOpen(true);
                      }}
                      color="destructive"
                      size="icon"
                    >
                      <Trash size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure you want to delete this metric?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. It will permanently delete the selected metric.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end mt-4">
                      <Button
                        onClick={() => setIsDeleteModalOpen(false)}
                        variant="secondary"
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleDelete} color="destructive">
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

      {/* Toast Notification */}
      {isToastVisible && (
        <div className="toast">
          <div className="toast-message">{toastMessage}</div>
          <button onClick={() => setIsToastVisible(false)}>Close</button>
        </div>
      )}
    </>
  );
}
