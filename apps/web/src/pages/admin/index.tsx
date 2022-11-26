import AdminGuard from "components/Guards/AdminGuard";
import Societies from "components/UI/Admin/Society/Index";

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="flex justify-center mb-72">
        <Societies />
      </div>
    </AdminGuard>
  );
}
