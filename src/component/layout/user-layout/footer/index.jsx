import React, { useEffect, useState } from 'react';
import styles from './footer.module.scss';
import twitter from '../../../../../public/assets/images/twitter.svg';
import insta from '../../../../../public/assets/images/instagram.svg';
import telegram from '../../../../../public/assets/images/telegram.svg';
import opensea from '../../../../../public/assets/images/opensea_icon.svg';
import discord from '../../../../../public/assets/images/discord_icon.svg';
import contact from '../../../../../public/assets/images/contact.svg';
import privacyIcon from '../../../../../public/assets/images/privacy-Icon.svg';
import facebookIcon from '../../../../../public/assets/images/facebook.svg';
import tiktokIcon from '../../../../../public/assets/images/tiktok.svg';
import Image from 'next/image';
import ContactUs from '../../../common/contact-us';
import { getGeneralInformationApi } from '../../../../../services/api/general-information/general-information';
import { toast } from 'react-toastify';

const Footer = () => {
  const [modalShow, setModalShow] = useState(false);
  const [year, setYear] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const date = new Date();
    let year = date.getFullYear();
    fetchComponentData();
    setYear(year);
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
        <span className="col-lg-6 col-md-5 col-sm-12  mb-lg-0 mb-md-0 mb-sm-3">
          &#169;{`${year} Astroon NFT`}
        </span>
        <div
          className={`col-lg-6 col-md-7 col-sm-12 ${styles.footer_social_media}`}
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
          <a target={'_blank'} href={data.facebookUrl} rel="noreferrer">
            <Image src={facebookIcon} width={18} height={18} alt="facebook" />
          </a>
          <a target={'_blank'} href={data.tikTokUrl} rel="noreferrer">
            <Image src={tiktokIcon} width={18} height={18} alt="tiktok" />
          </a>
          <a target={'_blank'} href={data.telegramUrl} rel="noreferrer">
            <Image src={telegram} width={18} height={18} alt="telegram" />
          </a>
        </div>
      </div>
      <ContactUs show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Footer;
