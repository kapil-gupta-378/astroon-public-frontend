import React from 'react';
import styles from './adminDashboard.module.scss';

const AdminDashboard = () => {
  return (
    <main className={styles.admin_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <h3>Welcome</h3>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
