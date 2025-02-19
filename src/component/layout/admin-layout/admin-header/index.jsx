import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './adminHeader.module.scss';
import imageAvatar from '../../../../../public/assets/images/profile-avatar.svg';
import logout from '../../../../../public/assets/images/logout.svg';
import walletIcon from '../../../../../public/assets/images/payment_wallets.svg';
import ethIconWhite from '../../../../../public/assets/images/ethereum-icon-white.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import hamburgerIcon from '../../../../../public/assets/images/hamburgerIcon.svg';
import WebsiteLogo from '../../../common/website-logo';
import { getCurrentLoginAdminData } from '../../../../../services/api/admin';
import { connectWallet } from '../../../../../services/web3/walletMothods';
import { useDispatch, useSelector } from 'react-redux';
import {
  disconnectAdmin,
  setAdminWalletAddress,
  setIsConnected,
  setIsNetworkId,
} from '../../../../redux/admin/adminSlice';
import { getContractInstance } from '../../../../../services/web3/web3ProviderMethods';
import { toast } from 'react-toastify';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const envNetworkId = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID;
const envNetworkIdInHex = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID_IN_HEX;
const AdminHeader = ({ setOpenSideBar }) => {
  const [dataState, setdataState] = useState({});
  const { isConnected, adminToken, walletAddress } = useSelector(
    (state) => state.adminReducer,
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    loadInitialData();
  }, [adminToken]);

  const loadInitialData = async () => {
    const response = await getCurrentLoginAdminData();
    setdataState(response.data);
  };

  const adminConnectWalletHandler = async () => {
    try {
      const adminWalletData = await connectWallet(
        envNetworkId,
        envNetworkIdInHex,
      );
      const AstTokenContract = await getContractInstance('ILO CONTRACT');
      const ownerWalletAddress = await AstTokenContract.methods.owner().call();
      if (
        adminWalletData.walletAddress.toLowerCase() ===
        ownerWalletAddress.toLowerCase()
      ) {
        dispatch(setAdminWalletAddress(adminWalletData.walletAddress));
        dispatch(setIsNetworkId(adminWalletData.networkID));
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

  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  const Logout = () => {
    adminDisconnectHandler();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };
  return (
    <div className={styles.admin_header_wrap}>
      <div className={styles.header_nav_wrap}>
        <div className={styles.header_left}>
          <div className={styles.logo_wrap}>
            <WebsiteLogo />
          </div>
          <h3>Welcome Back</h3>
          <p>{`Hello ${dataState.firstName ? dataState.firstName : ''}`}</p>
        </div>

        <div className={styles.header_right}>
          {isConnected && (
            <OverlayTrigger
              placement={'auto'}
              overlay={
                <Tooltip>
                  <strong>{walletAddress}</strong>
                </Tooltip>
              }
            >
              <div className={styles.wallet_address}>
                <Image
                  loader={ImageLoader}
                  src={ethIconWhite}
                  width={13}
                  height={13}
                  alt="eth"
                  layout="fixed"
                />
                {`${walletAddress ? `${walletAddress.slice(0, 9)}...` : ''}`}
              </div>
            </OverlayTrigger>
          )}
          <Dropdown className="profile_dropdown">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              <Image
                src={
                  dataState.profileImage ? dataState.profileImage : imageAvatar
                }
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
                  src={walletIcon}
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
