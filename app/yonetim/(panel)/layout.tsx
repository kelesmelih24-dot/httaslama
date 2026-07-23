import AdminSidebar from "@/components/admin/AdminSidebar";
import ClearBadgeOnView from "@/components/admin/ClearBadgeOnView";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-graphite lg:flex">
      <ClearBadgeOnView />
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto px-5 py-6 lg:px-12 lg:py-8">{children}</div>
    </div>
  );
}
