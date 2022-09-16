import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Whitepaper from './whitepaper';
import Roadmap from './Roadmap';
const Layout = ({ children }) => {
  return (
    <div className={`${styles.layout_wrapper}`}>
      <Header />
      <Home/>
      <Roadmap />
      <Whitepaper/>
   
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  chindren: PropTypes.node,
};

export default Layout;
