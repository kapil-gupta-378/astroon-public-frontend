import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
const Layout = ({ children }) => {
  return (
    <div>
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
