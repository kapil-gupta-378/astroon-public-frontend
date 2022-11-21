import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './adminSidebar.module.scss';
import sidebarLinkIcon from '../../../../../public/assets/images/sidebar-link-icon.svg';
import logoIcon from '../../../../../public/assets/images/Logo.png';

const AdminSidebar = ({ openSideBar, setOpenSideBar }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <aside
      className={`${styles.admin_sidebar_wrap} ${
        openSideBar && styles.openSideBar
      }`}
    >
      <Link href={'/'}>
        <h3 className={styles.logo_wrap}>
          <Image
            src={logoIcon}
            height={100}
            width={150}
            layout="fixed"
            alt="logo"
          />
        </h3>
      </Link>
      <div className={styles.navigation_wrap}>
        <div onClick={() => setOpenSideBar(false)}>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/admin-management">Admin Management</Link>
        </div>
        <div onClick={() => setOpenSideBar(false)}>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/content-management">Content Management</Link>
        </div>
        <div onClick={() => setOpenSideBar(false)}>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/blog">Blog</Link>
        </div>
        <div onClick={() => setOpenSideBar(false)}>
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
        <div onClick={() => setOpenSideBar(false)}>
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
        <div>
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
            Settings
          </a>

          {openDropDown && (
            <div className={styles.dropdown_wrap}>
              <div onClick={() => setOpenSideBar(false)}>
                <Link href={'/admin/general-settings'}>General Settings</Link>
              </div>
              <div onClick={() => setOpenSideBar(false)}>
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
        <div onClick={() => setOpenSideBar(false)}>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/faq">White Listed User</Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
