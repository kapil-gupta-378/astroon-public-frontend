import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  fetchAdminApi,
  updateAdminDataApi,
  updateAdminProfileApi,
} from '../../../services/api/admin';
import styles from './profileDetail.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import TextInput from '../../component/common/text-input';
import defaltProfileImage from '../../../public/assets/images/Dummy_Image.svg';
import Button from '../../component/common/button';
import FormSelect from '../../component/common/form-select';
import { toast, ToastContainer } from 'react-toastify';
const rollSelectOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'subadmin', label: 'Sub Admin' },
];
const statusSelctOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
const ProfileEdit = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUseraName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState();
  const [status, setStatus] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [newUpadateImageURL, setNewUpadateImageURL] = useState();
  const [pageLoadinng, setPageLoading] = useState(true);
  const router = useRouter();
  const ImageInputRef = useRef();
  const { id } = router.query;
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
    setStatus(() => (data.isActive ? 'active' : 'inactive'));
    setProfileImage(data.profileImage);
    setPageLoading(false);
  };

  const uploadImageToProfiel = () => {
    ImageInputRef.current.click();
  };

  const uploadNewProfileImage = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    setNewUpadateImageURL(e.target.files[0]);
  };

  const uploadDataToServer = async () => {
    const body = new FormData();
    body.append('file', newUpadateImageURL);
    const imageResponse = await updateAdminProfileApi(body);
    const data = {
      firstName: firstName,
      lastName: lastName,
      profileImage: imageResponse.fileName,
    };
    try {
      const res = await updateAdminDataApi(id, data);
      if (res.success) {
        toast.success(res.message, {
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
      toast.error(error.response.data.message, {
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
            <div onClick={() => router.back()} className={styles.header}>
              <Image
                src={backArrowIcon}
                width={20}
                height={20}
                alt="backarrow"
                layout="fixed"
              />
              <h3>Edit Account</h3>
            </div>
            <div className={styles.form_body}>
              <div className={styles.name_input_wrap}>
                <TextInput
                  title={'First Name'}
                  kind={'fullborder'}
                  handleValue={firstName}
                  handleType={'text'}
                  handleOnChange={(e) => setFirstName(e.target.value)}
                />
                <TextInput
                  title={'Last Name'}
                  kind={'fullborder'}
                  handleValue={lastName}
                  handleType={'text'}
                  handleOnChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <TextInput
                title={'Username'}
                kind={'fullborder'}
                handleValue={userName}
                handleType={'text'}
                inputDiabled={true}
                handleOnChange={(e) => setUseraName(e.target.value)}
              />
              <TextInput
                title={'Email Address'}
                kind={'fullborder'}
                handleValue={email}
                handleType={'email'}
                inputDiabled={true}
                handleOnChange={(e) => setEmail(e.target.value)}
              />

              <div className={styles.name_input_wrap}>
                <FormSelect
                  selectedOption={role}
                  label={'Role'}
                  options={rollSelectOptions}
                  handleChange={(value) => setRole(value)}
                />
                <FormSelect
                  selectedOption={status}
                  label={'Status'}
                  options={statusSelctOptions}
                  handleChange={(value) => setStatus(value)}
                />
              </div>
            </div>
            <div className={styles.submit_button}>
              <Button onClick={uploadDataToServer}>Submit</Button>
            </div>
          </div>
          <div className={styles.profile_details_left}>
            <div className={styles.profile_details}>
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
              <div className={styles.profile_upload_image_wrap}>
                <Button onClick={uploadImageToProfiel}>Update Image</Button>
                <input
                  accept="image/*"
                  ref={ImageInputRef}
                  type="file"
                  onChange={uploadNewProfileImage}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </main>
  );
};

export default ProfileEdit;
