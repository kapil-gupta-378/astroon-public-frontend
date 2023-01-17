import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import {
  getGeneralSettingsApi,
  updateGeneralSettingsApi,
  uploadBrandingLogoApi,
  uploadWebsiteLogoApi,
} from '../../../services/api/general-settings';
import Button from '../../component/common/button';
import FileInput from '../../component/common/file-input';
import GlobalLoading from '../../component/common/global-loading';
import TextInput from '../../component/common/text-input';
import { setGlobalLoading } from '../../redux/global-loading/globalLoadingSlice';
import styles from './generalSettings.module.scss';

const GeneralSettings = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteEmail, setWebsiteEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [websiteLogo, setWebsiteLogo] = useState('');
  // const [websiteLogoURL, setWebsiteLogoURL] = useState('');
  const [brandingLogo, setBrandingLogo] = useState('');
  // const [brandingLogoURL, setBrandingLogoURL] = useState('');
  const [brandingWebsite, setBrandingWebsite] = useState('');
  const [settingsId, setSettingsId] = useState('');
  const route = useRouter();
  const dispatch = useDispatch();

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

  const updateSettingsData = async (e) => {
    e.preventDefault();
    try {
      dispatch(setGlobalLoading(true));

      const { brandingLogoResponse, websiteLogoResponse } =
        await uploadImagetoServer();
      const data = {
        websiteName: websiteName,
        websiteEmail: websiteEmail,
        adminEmail: adminEmail,
        websiteLogo: websiteLogoResponse,
        brandingLogo: brandingLogoResponse,
        brandingWebsite: brandingWebsite,
      };
      const response = await updateGeneralSettingsApi(settingsId, data);
      if (response.success) {
        toast.success(response.message);
      }
      dispatch(setGlobalLoading(false));
    } catch (error) {
      dispatch(setGlobalLoading(false));
      return error;
    }
  };

  async function uploadImagetoServer() {
    try {
      let brandingLogoResponse;
      let websiteLogoResponse;
      if (brandingLogo) {
        const brandingImageData = new FormData();
        brandingImageData.append('file', brandingLogo);
        brandingLogoResponse = await uploadBrandingLogoApi(brandingImageData);
      }
      if (websiteLogo) {
        const websiteLogoData = new FormData();
        websiteLogoData.append('file', websiteLogo);
        websiteLogoResponse = await uploadWebsiteLogoApi(websiteLogoData);
      }

      return {
        brandingLogoResponse: brandingLogoResponse?.fileName,
        websiteLogoResponse: websiteLogoResponse?.fileName,
      };
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.GeneralSettings_wrap}>
      <form onSubmit={updateSettingsData}>
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
              height={'50px'}
              handleValue={websiteName}
              handleOnChange={(e) => setWebsiteName(e.target.value)}
              title={'Website Name'}
            />
          </div>
          <div className={styles.flex_box_item}>
            <TextInput
              height={'50px'}
              handleValue={websiteEmail}
              handleOnChange={(e) => setWebsiteEmail(e.target.value)}
              title={'Website Email'}
              handleType="email"
            />
          </div>
          <div className={styles.flex_box_item}>
            <TextInput
              height={'50px'}
              handleValue={adminEmail}
              handleOnChange={(e) => setAdminEmail(e.target.value)}
              title={'Admin Email'}
              handleType="email"
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
              height={'50px'}
              handleValue={brandingWebsite}
              handleOnChange={(e) => setBrandingWebsite(e.target.value)}
              title={'Branding Website'}
            />
          </div>
        </section>
        <section className={styles.footer_wrap}>
          <Button type="submit">Submit</Button>
        </section>
      </form>
      <GlobalLoading />
    </main>
  );
};

export default GeneralSettings;
