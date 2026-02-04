"use client";

import AdminDashboardPage from "@/components/AdminDashboard";
import { AdminGuard } from "@/middleware/AdminGuard";

export default function AdminPage() {
  return (
    <>
      <AdminGuard>
        <AdminDashboardPage />
      </AdminGuard>
    </>
  );
}
