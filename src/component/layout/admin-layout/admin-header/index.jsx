import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import styles from './adminHeader.module.scss';
import imageAvatar from '../../../../../public/assets/images/profile-avatar.svg';
import logout from '../../../../../public/assets/images/logout.svg';
import Dropdown from 'react-bootstrap/Dropdown';

const AdminHeader = () => {
  const router = useRouter();
  const Logout = () => {
    localStorage.clear();
    router.push('/login');
  };
  return (
    <div className={styles.admin_header_wrap}>
      <div className={styles.header_nav_wrap}>
        <div className={styles.header_left}>
          <h3>Welcome Back</h3>
          <p>Hello Admin, Good Morning!</p>
        </div>
        <div className={styles.header_right}>
          <Dropdown className="profile_dropdown">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              <Image
                src={imageAvatar}
                layout="fill"
                alt="profile_image"
                priority
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={Logout}>
                <Image
                  src={logout}
                  layout="fixed"
                  height={15}
                  width={15}
                  alt="profile_logout"
                  priority
                />
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
