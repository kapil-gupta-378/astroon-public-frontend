import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './adminSidebar.module.scss';
import sidebarLinkIcon from '../../../../../public/assets/images/sidebar-link-icon.svg';
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
            router.pathname === '/admin/admin-management' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/admin-management">Admin Management</Link>
        </div>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/content-management' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
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
            src={sidebarLinkIcon}
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
            src={sidebarLinkIcon}
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
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/faq">FAQ</Link>
        </div>
        {/* <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">Category Management</Link>
        </div> */}
        {/* <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">CMS Page Management</Link>
        </div> */}
        {/* <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">News & Announcements</Link>
        </div> */}
        <div className={`${styles.nav_dropdown_link} `}>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <a
            className={styles.dropdown_btn}
            onClick={() => setOpenUserDropDown((value) => !value)}
          >
            Settings
          </a>

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
        {/* <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">
            Client Inquiries & Support Request
          </Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">Menu System</Link>
        </div> */}
        {/* <div onClick={() => setOpenSideBar(false)}>
        <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/white-list-user' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/white-list-user">White Listed User</Link>
        </div> */}
        <div className={`${styles.nav_dropdown_link} `}>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <a
            className={styles.dropdown_btn}
            onClick={() => setOpenDropDown((value) => !value)}
          >
            White Listed User
          </a>

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

        {/* <div
          className={`${styles.nav_link_div} ${
            router.pathname === '/admin/sale-controls' && styles.activeLink
          }`}
          onClick={() => setOpenSideBar(false)}
        >
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/sale-controls">Sale Controls</Link>
        </div> */}
      </div>
    </aside>
  );
};

export default AdminSidebar;
