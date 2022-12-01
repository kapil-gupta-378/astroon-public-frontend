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
import { connectWallet } from '../../../../../services/web3/walletMothods';
import { useDispatch, useSelector } from 'react-redux';
import {
  disconnectAdmin,
  setAdminWalletAddress,
  setIsConnected,
  setIsNeworkId,
} from '../../../../redux/admin/adminSlice';
import { getContractInstance } from '../../../../../services/web3/web3ProviderMethods';
import { toast } from 'react-toastify';
const envNetworkId = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID;
const envNetworkIdInHex = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID_IN_HEX;
const AdminHeader = ({ setOpenSideBar }) => {
  const [dataState, setdataState] = useState({});
  const { isConnected } = useSelector((state) => state.adminReducer);
  const router = useRouter();
  const dispatch = useDispatch();
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

  const adminConnectWalletHandler = async () => {
    try {
      const adminWalletData = await connectWallet(
        envNetworkId,
        envNetworkIdInHex,
      );
      const AstTokenContract = await getContractInstance();
      const ownerWalletAddress = await AstTokenContract.methods.owner().call();
      if (
        adminWalletData.walletAddress.toLowerCase() ===
        ownerWalletAddress.toLowerCase()
      ) {
        dispatch(setAdminWalletAddress(adminWalletData.walletAddress));
        dispatch(setIsNeworkId(adminWalletData.netwrokID));
        dispatch(setIsConnected(true));
        toast.success('Wallet Connected');
      } else {
        toast.error('Please Connect Through Admin Wallet');
      }
    } catch (error) {}
  };

  const adminDisconnectHandler = () => {
    dispatch(disconnectAdmin());
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
              priority
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
              <Dropdown.Item
                onClick={() =>
                  isConnected
                    ? adminDisconnectHandler()
                    : adminConnectWalletHandler()
                }
              >
                <Image
                  src={logout}
                  layout="fixed"
                  height={15}
                  width={15}
                  alt="profile_logout"
                  priority
                />
                {isConnected ? 'Disconnect' : 'Connect Wallet'}
              </Dropdown.Item>
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
