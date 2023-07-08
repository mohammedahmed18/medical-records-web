import protectedRoute from '@components/common/protectedRoute';

import AdminLayout from '@/components/admin/adminLayout';

function AdminUsersPage() {
  return (
    <AdminLayout>
      <h1>Users hey</h1>
    </AdminLayout>
  );
}

export default protectedRoute(AdminUsersPage, { requireAdmin: true });
