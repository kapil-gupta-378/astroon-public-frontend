import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import {
  getGeneralSettingsApi,
  updateGeneralSettingsApi,
} from '../../../services/api/general-settings';
import Button from '../../component/common/button';
import FileInput from '../../component/common/file-input';
import TextInput from '../../component/common/text-input';
import styles from './generalSettings.module.scss';

const GeneralSettings = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteEmail, setWebsiteEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [, setWebsiteLogo] = useState('');
  // const [websiteLogoURL, setWebsiteLogoURL] = useState('');
  const [, setBrandingLogo] = useState('');
  // const [brandingLogoURL, setBrandingLogoURL] = useState('');
  const [brandingWebsite, setBrandingWebsite] = useState('');
  const [settingsId, setSettingsId] = useState('');
  const route = useRouter();
  useEffect(() => {
    fetchIntialData();
  }, []);

  const fetchIntialData = async () => {
    const response = await getGeneralSettingsApi();
    if (response.data) {
      setWebsiteName(response.data.websiteName);
      setWebsiteEmail(response.data.websiteEmail);
      setAdminEmail(response.data.adminEmail);
      setBrandingWebsite(response.data.brandingWebsite);
      setSettingsId(response.data.id);
    }
  };

  const updateSettingsData = async () => {
    const data = {
      websiteName: websiteName,
      websiteEmail: websiteEmail,
      adminEmail: adminEmail,
      websiteLogo: 'logo',
      brandingLogo: 'logo',
      brandingWebsite: brandingWebsite,
    };
    try {
      const response = await updateGeneralSettingsApi(settingsId, data);
      if (response.success) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <main className={styles.GeneralSettings_wrap}>
      <section className={styles.header}>
        <div onClick={() => route.back()} className={styles.header_left}>
          <Image
            src={backArrowIcon}
            width={20}
            height={20}
            alt="backarrow"
            layout="fixed"
          />
          <h3>General Settings</h3>
        </div>
      </section>
      <section className={styles.inputs_wrap}>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={websiteName}
            handleOnChange={(e) => setWebsiteName(e.target.value)}
            title={'Website Name'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={websiteEmail}
            handleOnChange={(e) => setWebsiteEmail(e.target.value)}
            title={'Website Email'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={adminEmail}
            handleOnChange={(e) => setAdminEmail(e.target.value)}
            title={'Admin Email'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <FileInput
            inputOnChange={(e) => setWebsiteLogo(e.target.files[0])}
            title={'Website Logo'}
            titleBackground={'#05052d'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <FileInput
            inputOnChange={(e) => setBrandingLogo(e.target.files[0])}
            title={'Branding Logo'}
            titleBackground={'#05052d'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={brandingWebsite}
            handleOnChange={(e) => setBrandingWebsite(e.target.value)}
            title={'Branding Website'}
          />
        </div>
      </section>
      <section className={styles.footer_wrap}>
        <Button onClick={updateSettingsData}>Submit</Button>
      </section>
      <ToastContainer />
    </main>
  );
};

export default GeneralSettings;
