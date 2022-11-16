import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './adminHeader.module.scss';
import imageAvatar from '../../../../../public/assets/images/profile-avatar.svg';
import logout from '../../../../../public/assets/images/logout.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import hamburgerIcon from '../../../../../public/assets/images/hamburgerIcon.svg';
import logoIcon from '../../../../../public/assets/images/Logo.png';
import { getCurrentLoginAdminData } from '../../../../../services/api/admin';

const AdminHeader = ({ setOpenSideBar }) => {
  const [dataState, setdataState] = useState({});
  const router = useRouter();
  const Logout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const response = await getCurrentLoginAdminData();
    setdataState(response.data);
  };

  const greetingForAdmin = () => {
    let greeting;
    const date = new Date();
    const hour = date.getHours();

    if (hour < 12) {
      greeting = 'Good morning !';
    } else if (hour < 17) {
      greeting = 'Good afternoon !';
    } else {
      greeting = 'Good evening !';
    }
    return greeting;
  };

  return (
    <div className={styles.admin_header_wrap}>
      <div className={styles.header_nav_wrap}>
        <div className={styles.header_left}>
          <div className={styles.logo_wrap}>
            <Image
              src={logoIcon}
              width={100}
              layout="fixed"
              height={60}
              alt="logo"
            />
          </div>
          <h3>Welcome Back</h3>
          <p>{`Hello ${dataState.firstName}, ${greetingForAdmin()}`}</p>
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

          <button
            onClick={() => setOpenSideBar((value) => !value)}
            className={styles.sidebar_open_btn}
          >
            <Image
              src={hamburgerIcon}
              width={20}
              height={20}
              layout={'fixed'}
              alt={'hamburgerimag'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
