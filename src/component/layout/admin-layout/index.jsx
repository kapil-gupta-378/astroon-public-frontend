import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import AdminHeader from './admin-header';
import AdminSidebar from './admin-sidebar';
import styles from './adminLayout.module.scss';
const AdminLayout = ({ children }) => {
  let token = localStorage.getItem('token');
  const [openSideBar, setOpenSideBar] = useState(false);

  useEffect(() => {
    if (!token) {
      Router.push('/login');
    }
  }, []);

  return (
    <>
      {token ? (
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
