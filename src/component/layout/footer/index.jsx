import React from 'react';
import styles from './footer.module.scss';
import twitter from '../../../../public/images/twitter.svg';
import insta from '../../../../public/images/instagram.svg';
import message from '../../../../public/images/message.svg';
import opensea from '../../../../public/images/opensea_icon.svg';
import discord from '../../../../public/images/discord_icon.svg';
import Image from 'next/image';
const Footer = () => {
  return (
    <div className={styles.footer_wrap}>
      <div className={`row container ${styles.container}`}>
        <span className="col-9">&#169; 2022 Astroon NFT</span>
        <div className={`col-3 ${styles.footer_social_media}`}>
          <Image src={opensea} width={15} height={15} alt="twitter" />
          <Image src={discord} width={15} height={15} alt="twitter" />
          <Image src={twitter} width={15} height={15} alt="twitter" />
          <Image src={insta} width={15} height={15} alt="twitter" />
          <Image src={message} width={15} height={15} alt="twitter" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
