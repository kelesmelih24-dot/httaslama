import AdminSidebar from "@/components/admin/AdminSidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-graphite">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto px-8 py-8 lg:px-12">{children}</div>
    </div>
  );
}
