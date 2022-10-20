import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './adminSidebae.module.scss';
import sidebarLinkIcon from '../../../../../public/assets/images/sidebar-link-icon.svg';
const AdminSidebar = () => {
  return (
    <aside className={styles.admin_sidebar_wrap}>
      <Link href={'/'}>
        <h3 className={styles.logo_wrap}>Logo</h3>
      </Link>
      <div className={styles.navigation_wrap}>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/admin-management">Admin Management</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">Content Management</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/blog">Blog</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/contact-us">Contact-Us</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">Category Management</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">CMS Page Management</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">News & Announcements</Link>
        </div>
        <div>
          <Image
            width={15}
            height={15}
            src={sidebarLinkIcon}
            layout="fixed"
            alt="nav_image"
          />
          <Link href="/admin/management">Settings</Link>
        </div>
        <div>
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
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
