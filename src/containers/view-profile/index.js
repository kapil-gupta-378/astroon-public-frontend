import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../../services/api/admin';
import styles from './viewProfile.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import defaltProfileImage from '../../../public/assets/images/Dummy_Image.svg';
import Button from '../../component/common/button';

const ViewProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUseraName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState();
  const [status, setStatus] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [pageLoadinng, setPageLoading] = useState(true);
  const route = useRouter();
  const { id } = route.query;
  useEffect(() => {
    if (id) {
      fatchProfileData(id);
    }
  }, [id]);

  const ImageLoader = ({ src }) => {
    return `${src}`;
  };
  const fatchProfileData = async (id) => {
    setPageLoading(true);
    const data = await fetchAdminApi(id);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setUseraName(data.userName);
    setEmail(data.email);
    setRole(data.role.name);
    setStatus(() => (data.isBlocked ? 'inactive' : 'active'));
    setProfileImage(data.profileImage);
    setPageLoading(false);
  };

  const gotoEditProfile = () => {
    route.push(`/admin/edit-profile/${id}`);
  };
  return (
    <main className={styles.profile_details_wrap}>
      {pageLoadinng ? (
        <div className={styles.laoding_wrap}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.profile_details_right}>
            <div className={styles.header}>
              <div onClick={() => route.back()} className={styles.header_left}>
                <Image
                  src={backArrowIcon}
                  width={20}
                  height={20}
                  alt="backarrow"
                  layout="fixed"
                />
                <h3>View Account</h3>
              </div>
              <div className={styles.header_right}>
                <Button onClick={gotoEditProfile}>Edit Profile</Button>
              </div>
            </div>
            <div className={styles.form_body}>
              <div className={styles.name_input_wrap}>
                <div className={styles.details_text_wrap}>
                  <h6 className={styles.detail_text}>First Name :</h6>
                  <span>{firstName} </span>
                </div>
                <div className={styles.details_text_wrap}>
                  <h6 className={styles.detail_text}>Last Name :</h6>
                  <span>{lastName} </span>
                </div>
                <div className={styles.details_text_wrap}>
                  <h6 className={styles.detail_text}>Username :</h6>
                  <span>{userName} </span>
                </div>
                <div className={styles.details_text_wrap}>
                  <h6 className={styles.detail_text}>Email Address:</h6>
                  <span>{email} </span>
                </div>
                <div className={styles.details_text_wrap}>
                  <h6 className={styles.detail_text}>Role :</h6>
                  <span>{role} </span>
                </div>
                <div className={styles.details_text_wrap}>
                  <h6 className={styles.detail_text}>Status :</h6>
                  <span>{status} </span>
                </div>
              </div>

              <div className={styles.profile_image_wrap}>
                <Image
                  loader={ImageLoader}
                  src={profileImage ? profileImage : defaltProfileImage}
                  width={180}
                  height={180}
                  layout="fixed"
                  alt="profile_image"
                  priority
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default ViewProfile;
