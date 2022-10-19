import React, { useState } from 'react';
import styles from './footer.module.scss';
import twitter from '../../../../../public/assets/images/twitter.svg';
import insta from '../../../../../public/assets/images/instagram.svg';
import message from '../../../../../public/assets/images/message.svg';
import opensea from '../../../../../public/assets/images/opensea_icon.svg';
import discord from '../../../../../public/assets/images/discord_icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import ContactUs from '../../../common/contact-us';
const Footer = () => {
  const [isContact, setIsContact] = useState(false);
  const handleShow = () => {
    setIsContact(true);
  };
  const handleClose = () => {
    setIsContact(false);
  };
  return (
    <div className={styles.footer_wrap}>
      <div className={`row container ${styles.container}`}>
        <span className="col-6 col-md-7 col-sm-7">&#169; 2022 Astroon NFT</span>
        <div
          className={`col-6 col-md-4 col-sm-5 ${styles.footer_social_media}`}
        >
          <Link href="/">
            <a onClick={handleShow}>Contact Us</a>
          </Link>
          <Image src={opensea} width={18} height={18} alt="twitter" />
          <Image src={discord} width={18} height={18} alt="twitter" />
          <Image src={twitter} width={18} height={18} alt="twitter" />
          <Image src={insta} width={18} height={18} alt="twitter" />
          <Image src={message} width={18} height={18} alt="twitter" />
        </div>
      </div>
      <ContactUs handleShow={isContact} handleClose={handleClose} />
    </div>
  );
};

export default Footer;
