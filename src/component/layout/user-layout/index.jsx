import React from 'react';
import Footer from './footer';
import { Header } from './header';
import styles from './userLayout.module.scss';
const UserLayout = ({ children }) => {
  return (
    <div className={styles.user_layout_wrap}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
