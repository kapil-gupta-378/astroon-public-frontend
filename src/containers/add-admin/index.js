import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import {
  createAdminAccountApi,
  updateAdminProfileApi,
} from '../../../services/api/admin';
import styles from './addAdmin.module.scss';
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
const AddAdmin = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUseraName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState();
  const [, setStatus] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [newUpadateImageURL, setNewUpadateImageURL] = useState();
  const router = useRouter();
  const ImageInputRef = useRef();

  const ImageLoader = ({ src }) => {
    return `${src}`;
  };

  const uploadImageToProfiel = () => {
    ImageInputRef.current.click();
  };

  const uploadNewProfileImage = async (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    const body = new FormData();
    body.append('file', e.target.files[0]);
    const imageResponse = await updateAdminProfileApi(body);
    setNewUpadateImageURL(imageResponse.fileName);
  };

  const uploadDataToServer = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      profileImage: newUpadateImageURL,
      userName: userName,
      email: email,
      password: password,
      roleId: role,
    };
    try {
      const res = await createAdminAccountApi(data);
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
      } else {
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
            <h3>Add Account</h3>
          </div>
          <div className={styles.form_body}>
            <div className={styles.name_input_wrap}>
              <TextInput
                titleBackground={'#05052d'}
                title={'First Name'}
                kind={'fullborder'}
                handleValue={firstName}
                handleType={'text'}
                handleOnChange={(e) => setFirstName(e.target.value)}
              />
              <TextInput
                titleBackground={'#05052d'}
                title={'Last Name'}
                kind={'fullborder'}
                handleValue={lastName}
                handleType={'text'}
                handleOnChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <TextInput
              titleBackground={'#05052d'}
              title={'Username'}
              kind={'fullborder'}
              handleValue={userName}
              handleType={'text'}
              handleOnChange={(e) => setUseraName(e.target.value)}
            />
            <TextInput
              titleBackground={'#05052d'}
              title={'Email Address'}
              kind={'fullborder'}
              handleValue={email}
              handleType={'email'}
              handleOnChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              titleBackground={'#05052d'}
              title={'Password'}
              kind={'fullborder'}
              handleValue={password}
              handleType={'password'}
              handleOnChange={(e) => setPassword(e.target.value)}
            />

            <div className={styles.name_input_wrap}>
              <FormSelect
                selectedOption={role}
                label={'Role'}
                options={rollSelectOptions}
                handleChange={(value) => setRole(value.value)}
              />
              <FormSelect
                label={'Status'}
                options={statusSelctOptions}
                handleChange={(value) => setStatus(value.value)}
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
      <ToastContainer />
    </main>
  );
};

export default AddAdmin;
