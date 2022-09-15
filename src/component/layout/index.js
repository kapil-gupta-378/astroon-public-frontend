import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import styles from './Layout.module.scss';
const Layout = ({ children }) => {
  return (
    <div className={`${styles.layout_wrapper}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  chindren: PropTypes.node,
};

export default Layout;
