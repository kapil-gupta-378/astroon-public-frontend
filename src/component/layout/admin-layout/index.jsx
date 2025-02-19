import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import AdminHeader from './admin-header';
import AdminSidebar from './admin-sidebar';
import styles from './adminLayout.module.scss';
const AdminLayout = ({ children }) => {
  let adminToken = localStorage.getItem('token');
  let role = localStorage.getItem('role');
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    if (!adminToken || role === 'user') {
      Router.push('/login');
    }
  }, []);

  return (
    <>
      {role === 'admin' ? (
        <div className={styles.admin_layout_wrap}>
          <div
            className={`${styles.left_wrap} ${
              openSideBar && styles.openSideBar
            }`}
          >
            <AdminSidebar
              setOpenSideBar={setOpenSideBar}
              openSideBar={openSideBar}
            />
          </div>
          <div className={styles.right_wrap}>
            <AdminHeader setOpenSideBar={setOpenSideBar} />
            {children}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AdminLayout;
