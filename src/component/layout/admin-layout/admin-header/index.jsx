import Image from 'next/image';
import React from 'react';
import styles from './adminHeader.module.scss';
import imageAvatar from '../../../../../public/assets/images/profile-avatar.svg';
const AdminHeader = () => {
  return (
    <div className={styles.admin_header_wrap}>
      <div className={styles.header_nav_wrap}>
        <div className={styles.header_left}>
          <h3>Welcome Back</h3>
          <p>Hello Admin, Good Morning!</p>
        </div>
        <div className={styles.header_right}>
          <div className={styles.avatar_wrap}>
            <Image
              src={imageAvatar}
              layout="fill"
              alt="profile_image"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
