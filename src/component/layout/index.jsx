import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import UserLayout from './user-layout';
import AdminLayout from './admin-layout';
const Layout = ({ children }) => {
  const router = useRouter();
  const currectRoute = [
    '/login',
    '/sign-up',
    '/forgot-password',
    `${`/reset/[token]`}`,
  ];
  return (
    <>
      {router.pathname.includes('/admin') ? (
        <AdminLayout>{children}</AdminLayout>
      ) : currectRoute.includes(router.pathname) ? (
        <div>{children}</div>
      ) : (
        <UserLayout>{children}</UserLayout>
      )}
    </>
  );
};
Layout.propTypes = {
  chindren: PropTypes.node,
};

export default Layout;
