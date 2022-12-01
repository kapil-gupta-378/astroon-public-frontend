import React, { useEffect, useState } from 'react';
import styles from './footer.module.scss';
import twitter from '../../../../../public/assets/images/twitter.svg';
import insta from '../../../../../public/assets/images/instagram.svg';
import message from '../../../../../public/assets/images/message.svg';
import opensea from '../../../../../public/assets/images/opensea_icon.svg';
import discord from '../../../../../public/assets/images/discord_icon.svg';
import contact from '../../../../../public/assets/images/contact.svg';
import privacyIcon from '../../../../../public/assets/images/privacy-Icon.svg';
import Image from 'next/image';
import ContactUs from '../../../common/contact-us';
import { getGeneralInformationApi } from '../../../../../services/api/general-information/general-information';
import { toast, ToastContainer } from 'react-toastify';

const Footer = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchComponentData();
  }, []);

  const fetchComponentData = async () => {
    const res = await getGeneralInformationApi();
    setData(res.data);
    if (res.success) {
    } else {
      toast.error(res.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className={styles.footer_wrap}>
      <div className={`row container ${styles.container}`}>
        <span className="col-6 col-md-7 col-sm-7">&#169; 2022 Astroon NFT</span>
        <div
          className={`col-6 col-md-4 col-sm-5 ${styles.footer_social_media}`}
        >
          <Image
            src={contact}
            width={18}
            height={18}
            alt="contact"
            onClick={() => setModalShow(true)}
          />
          <a
            style={{ height: '20px' }}
            target={'_blank'}
            href="https://www.tutorialspoint.com/website_development/website_development_tutorial.pdf"
            rel="noreferrer"
          >
            <Image src={privacyIcon} width={18} height={18} alt="contact" />
          </a>
          <a target={'_blank'} href={`${data.openseaUrl}`} rel="noreferrer">
            <Image src={opensea} width={18} height={18} alt="opensea" />
          </a>
          <a target={'_blank'} href={data.discordUrl} rel="noreferrer">
            <Image src={discord} width={18} height={18} alt="discord" />
          </a>
          <a target={'_blank'} href={data.twitterUrl} rel="noreferrer">
            <Image src={twitter} width={18} height={18} alt="twitter" />
          </a>
          <a target={'_blank'} href={data.instagramUrl} rel="noreferrer">
            <Image src={insta} width={18} height={18} alt="insta" />
          </a>
          <a target={'_blank'} href={data.emailLink} rel="noreferrer">
            <Image src={message} width={18} height={18} alt="message" />
          </a>
        </div>
      </div>
      <ContactUs show={modalShow} onHide={() => setModalShow(false)} />
      <ToastContainer />
    </div>
  );
};

export default Footer;
