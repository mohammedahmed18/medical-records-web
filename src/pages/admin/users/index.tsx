import { useQuery } from 'react-query';

import protectedRoute from '@components/common/protectedRoute';

import { getAllUsers } from '@/api/admin';
import AdminLayout from '@/components/admin/adminLayout';
import UserProfileImage from '@/components/common/UserProfileImage';

function AdminUsersPage() {
  const { data: users } = useQuery('ADMIN_USERS', {
    queryFn: getAllUsers,
  });
  return (
    <AdminLayout>
      <div className='w-full overflow-x-auto'>
        <table className='table w-full text-2xl'>
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className='text-lg'>National id</th>
              <th className='text-lg'>Name</th>
              <th className='text-lg'>email</th>
              <th className='text-lg'>Gender</th>
              <th className='text-lg'>Employment Status</th>
              <th className='text-lg'>Marital Status</th>
              <th className='text-lg'>Employment Status</th>
              <th className='text-lg'>Medical Specialization</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <UserProfileImage src={user.image_src} size={50} rounded />
                </td>
                <td>{user.nationalId}</td>
                <td>{user.name}</td>
                <th>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </th>
                <td>{user.gender}</td>
                <td>{user.employmentStatus}</td>
                <td>{user.maritalStatus}</td>
                <td>{user.employmentStatus}</td>
                <td>{user.medicalSpecialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default protectedRoute(AdminUsersPage, { requireAdmin: true });
