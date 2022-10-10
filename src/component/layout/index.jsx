import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';
const Layout = ({ children }) => {
  const router = useRouter();
  const currectRoute = [
    '/login',
    '/sign-up',
    '/forgot-password',
    `${`/reset/[token]`}`,
  ];

  return (
    <div
      className={`${
        currectRoute.includes(router.pathname) !== true && styles.layout_wrap
      }`}
    >
      {currectRoute.includes(router.pathname) !== true && <Header />}
      {children}
      {currectRoute.includes(router.pathname) !== true && <Footer />}
    </div>
  );
};

Layout.propTypes = {
  chindren: PropTypes.node,
};

export default Layout;
