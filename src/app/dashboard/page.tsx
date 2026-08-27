import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Header from "@/components/Header/Header";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Header title="Dashboard" subtitle="Welcome back, Sunil 👋" />
      <div style={{ padding: "32px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
        Dashboard content coming soon...
      </div>
    </DashboardLayout>
  );
}
