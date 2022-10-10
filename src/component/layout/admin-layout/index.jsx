import React from 'react';
import AdminHeader from './admin-header';
import AdminSidebar from './admin-sidebar';
import styles from './adminLayout.module.scss';
const AdminLayout = ({ children }) => {
  return (
    <div className={styles.admin_layout_wrap}>
      <div className={styles.left_wrap}>
        <AdminSidebar />
      </div>
      <div className={styles.right_wrap}>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
