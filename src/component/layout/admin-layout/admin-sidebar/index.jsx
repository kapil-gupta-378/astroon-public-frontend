import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './adminSidebar.module.scss';
import dashboardIcon from '../../../../../public/assets/images/dashboard.svg';
import adminManagementIcon from '../../../../../public/assets/images/admin_management.svg';
import contentManagementIcon from '../../../../../public/assets/images/content_management.svg';
import walletManagementIcon from '../../../../../public/assets/images/wallet_management.svg';
import blogIcon from '../../../../../public/assets/images/blog.svg';
import leaderboardIcon from '../../../../../public/assets/images/leader_board.svg';
import saleManagementIcon from '../../../../../public/assets/images/sale_management.svg';
import clientEnquirySupportIcon from '../../../../../public/assets/images/clients_enquiry_support.svg';
import faqIcon from '../../../../../public/assets/images/faq.svg';
import settingsIcon from '../../../../../public/assets/images/settings.svg';
import whiteListedUserIcon from '../../../../../public/assets/images/white_listed_user.svg';

import { useRouter } from 'next/router';
import WebsiteLogo from '../../../common/website-logo';

const AdminSidebar = ({ openSideBar, setOpenSideBar }) => {
  const router = useRouter();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openUserDropDown, setOpenUserDropDown] = useState(false);
  return (
    <aside
      className={`${styles.admin_sidebar_wrap} ${
        openSideBar && styles.openSideBar
      }`}
    >
      <h3 className={styles.logo_wrap}>
        <WebsiteLogo />
      </h3>
      <div className={styles.navigation_wrap}>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/dashboard' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={dashboardIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/dashboard">Dashboard</Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/admin-management' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={adminManagementIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/admin-management">Admin Management</Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/wallet-management' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={walletManagementIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/wallet-management">Wallet Management</Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            (router.pathname === '/admin/content-management' ||
              router.pathname === '/admin/content-management/nft-management' ||
              router.pathname ===
                '/admin/content-management/video-management' ||
              router.pathname ===
                '/admin/content-management/games-management' ||
              router.pathname ===
                '/admin/content-management/gallery-management') &&
            styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={contentManagementIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/content-management">Content Management</Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/blog' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={blogIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/blog">Blog</Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/contact-us' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={clientEnquirySupportIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/contact-us">
            Client Inquiries & Support Request
          </Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/faq' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={faqIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/faq">FAQ</Link>
        </div>
        <div className={`${styles.nav_dropdown_link_wrp} `}>
          <div
            className={`${styles.nav_dropdown_link} ${
              (router.pathname === '/admin/general-settings' ||
                router.pathname === '/admin/general-information') &&
              styles.activeLink
            } `}
          >
            <Image
              width={15}
              height={15}
              src={settingsIcon}
              layout="fixed"
              alt="nav_image"
            />
            <a
              className={styles.dropdown_btn}
              onClick={() => setOpenUserDropDown((value) => !value)}
            >
              Settings
            </a>
          </div>

          {openUserDropDown && (
            <div className={styles.dropdown_wrap}>
              <div
                className={`${
                  router.pathname === '/admin/general-settings' &&
                  styles.activeLink
                }`}
                onClick={() => setOpenSideBar(false)}
              >
                <Link href={'/admin/general-settings'}>General Settings</Link>
              </div>
              <div
                className={
                  router.pathname === '/admin/general-information' &&
                  styles.activeLink
                }
                onClick={() => setOpenSideBar(false)}
              >
                <Link href={'/admin/general-information'}>
                  General Information
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className={`${styles.nav_dropdown_link_wrp} `}>
          <div
            className={`${styles.nav_dropdown_link} ${
              (router.pathname === '/admin/seed-sale' ||
                router.pathname === '/admin/private-sale') &&
              styles.activeLink
            } `}
          >
            <Image
              width={15}
              height={15}
              src={whiteListedUserIcon}
              layout="fixed"
              alt="nav_image"
            />
            <a
              className={styles.dropdown_btn}
              onClick={() => setOpenDropDown((value) => !value)}
            >
              White Listed User
            </a>
          </div>

          {openDropDown && (
            <div className={styles.dropdown_wrap}>
              <div
                className={
                  router.pathname === '/admin/seed-sale' && styles.activeLink
                }
                onClick={() => setOpenSideBar(false)}
              >
                <Link href={'/admin/seed-sale'}>Seed Sale</Link>
              </div>
              <div
                className={
                  router.pathname === '/admin/private-sale' && styles.activeLink
                }
                onClick={() => setOpenSideBar(false)}
              >
                <Link href={'/admin/private-sale'}>Private Sale</Link>
              </div>
            </div>
          )}
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/leader-board' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={leaderboardIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/leader-board">Leaderboard</Link>
        </div>

        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/sale-controls' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={saleManagementIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/sale-controls">Manage Sale</Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
