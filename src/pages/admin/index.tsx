import protectedRoute from '@components/common/protectedRoute';

import AdminLayout from '@/components/admin/adminLayout';

function AdminPage() {
  return (
    <AdminLayout>
      <div></div>
    </AdminLayout>
  );
}

export default protectedRoute(AdminPage, { requireAdmin: true });
