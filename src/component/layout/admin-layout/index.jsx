import React from 'react';
import Login from '../../../containers/login';
import AdminHeader from './admin-header';
import AdminSidebar from './admin-sidebar';
import styles from './adminLayout.module.scss';
const AdminLayout = ({ children }) => {
  let token = localStorage.getItem('token');
  return (
    <>
      {token ? (
        <div className={styles.admin_layout_wrap}>
          <div className={styles.left_wrap}>
            <AdminSidebar />
          </div>
          <div className={styles.right_wrap}>
            <AdminHeader />
            {children}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AdminLayout;
