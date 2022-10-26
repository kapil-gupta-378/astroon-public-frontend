import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './generalInformation.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import { useRouter } from 'next/router';
import TextInput from '../../component/common/text-input';
import FileInput from '../../component/common/file-input';
import Button from '../../component/common/button';
import { toast, ToastContainer } from 'react-toastify';
import {
  getGeneralInformationApi,
  updateGeneralInformationApi,
  uploadHomePageYoutubeThumbnailApi,
} from '../../../services/api/general-information/general-information';

const GeneralInformation = () => {
  const [facebookURL, setFacebookURL] = useState('');
  const [twitterURL, setTwitterURL] = useState('');
  const [discordURL, setDiscordURL] = useState('');
  const [youtubeURL, setYoutubeURL] = useState('');
  const [emailLink, setEmailLink] = useState();
  const [homeVideoLink, setHomeVideoLink] = useState('');
  const [homeVideoThumbnail, setHomeVideoThumbnail] = useState('');
  const [settingsId, setSettingsId] = useState('');

  const route = useRouter();

  useEffect(() => {
    fetchIntialData();
  }, []);
  const fetchIntialData = async () => {
    const response = await getGeneralInformationApi();
    if (response.data) {
      setFacebookURL(response.data.facebookUrl);
      setTwitterURL(response.data.twitterUrl);
      setDiscordURL(response.data.discordUrl);
      setYoutubeURL(response.data.youtubeUrl);
      setEmailLink(response.data.emailLink);
      setHomeVideoLink(response.data.youtubeVideoLink);
      setSettingsId(response.data.id);
    }
  };

  const updateSettingsData = async () => {
    try {
      const youtubeThumbnail = new FormData();
      youtubeThumbnail.append('file', homeVideoThumbnail);
      const youtubeThumbnailresponse =
        await uploadHomePageYoutubeThumbnailApi();
      const data = {
        facebookUrl: facebookURL,
        twitterUrl: twitterURL,
        discordUrl: discordURL,
        youtubeUrl: youtubeURL,
        emailLink: emailLink,
        youtubeVideoLink: homeVideoLink,
        youtubeThumbnailImage: youtubeThumbnailresponse.fileName,
      };
      const response = await updateGeneralInformationApi(settingsId, data);
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
    <main className={styles.general_information_wrap}>
      <section className={styles.header}>
        <div onClick={() => route.back()} className={styles.header_left}>
          <Image
            src={backArrowIcon}
            width={20}
            height={20}
            alt="backarrow"
            layout="fixed"
          />
          <h3>General Information</h3>
        </div>
      </section>
      <section className={styles.body}>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={facebookURL}
            handleOnChange={(e) => setFacebookURL(e.target.value)}
            title={'Facebook URL'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={twitterURL}
            handleOnChange={(e) => setTwitterURL(e.target.value)}
            title={'Twitter URL'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={discordURL}
            handleOnChange={(e) => setDiscordURL(e.target.value)}
            title={'Discord URL'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={youtubeURL}
            handleOnChange={(e) => setYoutubeURL(e.target.value)}
            title={'Youtube URL'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={emailLink}
            handleOnChange={(e) => setEmailLink(e.target.value)}
            title={'Website Name'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <TextInput
            handleValue={homeVideoLink}
            handleOnChange={(e) => setHomeVideoLink(e.target.value)}
            title={'Website Name'}
          />
        </div>
        <div className={styles.flex_box_item}>
          <FileInput
            inputOnChange={(e) => setHomeVideoThumbnail(e.target.files[0])}
            title={'Branding Logo'}
            titleBackground={'#05052d'}
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

export default GeneralInformation;
