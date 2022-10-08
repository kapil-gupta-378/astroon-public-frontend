import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div
      className={`${
        router.pathname.includes('/sign-up') !== true && styles.layout_wrap
      }`}
    >
      {router.pathname.includes('/sign-up') !== true && <Header />}
      {children}
      {router.pathname.includes('/sign-up') !== true && <Footer />}
    </div>
  );
};

Layout.propTypes = {
  chindren: PropTypes.node,
};

export default Layout;
