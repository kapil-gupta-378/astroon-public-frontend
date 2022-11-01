import Image from 'next/image';
import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import defaltProfileImage from '../../../../public/assets/images/dummyProfileImage.png';
import ethereumIconWhite from '../../../../public/assets/images/ethereum-icon-white.svg';
import styles from './userProfileDropdown.module.scss';
import editIcon from '../../../../public/assets/images/edit-icon-white.svg';
import logoutIcon from '../../../../public/assets/images/logout-icon-white.svg';
const UserProfileDropDown = () => {
  return (
    <div className={'user_profile_dropdown'}>
      <NavDropdown
        title={
          <Image
            width={25}
            height={25}
            src={defaltProfileImage}
            layout="fixed"
            alt="profileImage"
          />
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>
          <div className="item_div">
            <Image src={editIcon} width={14} height={14} alt="icon" />
            <span>Edit Profile</span>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <div className="item_div">
            <Image src={logoutIcon} width={14} height={14} alt="icon" />

            <span>Sign Out</span>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          <div className={styles.balance}> Balance</div>
          <div className={styles.ethereum}>
            <Image
              src={ethereumIconWhite}
              width={15}
              height={15}
              alt="ethereum_icon"
              layout="fixed"
            />
            0.00 ETH
          </div>
          <div className={styles.usd}>$0.00 USD</div>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default UserProfileDropDown;
