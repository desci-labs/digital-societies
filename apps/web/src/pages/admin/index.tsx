import AdminGuard from "components/Guards/AdminGuard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen flex justify-center items-center">
        <p>Welcome to the admin page</p>
      </div>
    </AdminGuard>
  );
}
