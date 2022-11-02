import Image from 'next/image';
import React from 'react';
import styles from './profile.module.scss';
import avatar from '../../../public/assets/images/profile-avatar.svg';
import ethIconWhite from '../../../public/assets/images/ethereum-icon-white.svg';
import NFTCard from '../../component/common/nft-card';
import { useRouter } from 'next/router';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
const Profile = () => {
  const route = useRouter();

  return (
    <main className={`container ${styles.profile_wrap}`}>
      <section>
        <div className={styles.user_profile_image_wrap}>
          <div className={styles.user_cover_image}>
            <div className={styles.profile_image}>
              <Image src={avatar} alt="avatar" width={80} height={80} />
            </div>
            <button className={styles.Update_image_btn}>
              Add/Update Cover
            </button>
          </div>

          <div className={styles.wallet_address}>
            <Image src={ethIconWhite} width={13} height={13} alt="eth" />
            isjsdf8994e....
          </div>
        </div>
      </section>

      {route.pathname === '/profile/[id]' && (
        <section className={styles.user_nft_wrapper}>
          <h3 className={styles.section_headeing}>My NFT’s</h3>
          <div className={styles.nft_list}>
            {[...Array(8).keys()].map((_, idx) => (
              <NFTCard key={idx} />
            ))}
          </div>
        </section>
      )}
      {route.pathname === '/user-edit-profile/[id]' && (
        <section className={styles.user_edit_profile_form_wrap}>
          <TextInput
            title={'Display Name'}
            placeHolder="Enter your display name"
            inputHeight={'63px'}
            titleBackground={'rgb(15 15 45)'}
          />
          <TextInput
            title={'Custom URL'}
            placeHolder="astroon.abc/enter your custom url"
            inputHeight={'63px'}
            titleBackground={'rgb(14 16 44)'}
          />
          <TextInput
            titleBackground={'rgb(33 33 64)'}
            title={'Email Address'}
            placeHolder="Enter your email address"
            inputHeight={'63px'}
          />
          <TextInput
            title={'Email Address'}
            placeHolder="Write a brief description about yourself"
            inputHeight={'120px'}
            textarea={true}
            titleBackground={'rgb(89 47 93)'}
          />
          <div className={styles.submit_btn}>
            <Button>Submit</Button>
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
