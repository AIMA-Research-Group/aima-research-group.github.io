import { AdminCms } from "@/components/admin/AdminCms";

export const metadata = {
  title: "AIMA Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main id="main-content">
      <AdminCms />
      <noscript>Enable JavaScript to use the AIMA content admin.</noscript>
    </main>
  );
}
