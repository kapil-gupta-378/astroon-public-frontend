import Image from 'next/image';
import React, { useState } from 'react';
import styles from './signUp.module.scss';
import signUpRightImage from '../../../public/assets/images/sign-up-page-icon.svg';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { createUserApi } from '../../../services/api/user';
import { toast, ToastContainer } from 'react-toastify';
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUaserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerBtn, setRegisterBtn] = useState('Register Now');
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (!password.includes(e.target.value)) {
      setConfirmPasswordError('The password confirm does not match');
    } else {
      setConfirmPasswordError('');
    }
  };
  const hadnleCreateUser = async () => {
    if (firstName && lastName && email && userName && password) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      };
      try {
        const res = await createUserApi(data);
        if (res.success) {
          setRegisterBtn('Registered');
          toast.error(res.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
        throw error;
      }
    } else {
      toast.error('Please Fill All Feilds', {
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
    <div className={styles.sign_up_wrap}>
      <div className={styles.left_wrap}>
        <div>
          <h1>Register Now</h1>
        </div>
        <div className={styles.form_wrap}>
          <div className={styles.name_wrap}>
            <div className={styles.fist_name}>
              <TextInput
                handleType="text"
                handleValue={firstName}
                handleOnChange={(e) => setFirstName(e.target.value)}
                title="First Name"
                placeHolder="Enter your first name"
                kind="cornerborder"
              />
            </div>
            <div className={styles.last_name}>
              <TextInput
                handleType="text"
                handleValue={lastName}
                handleOnChange={(e) => setLastname(e.target.value)}
                title="Last Name"
                placeHolder="Enter your last name"
                kind="cornerborder"
              />
            </div>
          </div>
          <TextInput
            handleType="email"
            handleValue={email}
            handleOnChange={(e) => setEmail(e.target.value)}
            title="Email Address"
            placeHolder="Enter your email address"
            kind="fullborder"
          />
          <TextInput
            handleType="text"
            handleValue={userName}
            handleOnChange={(e) => setUaserName(e.target.value)}
            title="Username"
            placeHolder="Enter your username"
            kind="fullborder"
          />
          <div className={styles.name_wrap}>
            <div className={styles.fist_name}>
              <TextInput
                handleType="text"
                handleValue={password}
                handleOnChange={(e) => setPassword(e.target.value)}
                title="Password"
                placeHolder="Enter your password"
                kind="fullborder"
              />
            </div>
            <div className={styles.last_name}>
              <TextInput
                handleType="text"
                handleValue={confirmPassword}
                handleOnChange={(e) => handleConfirmPassword(e)}
                title="Confirm Password"
                placeHolder="Enter your password again"
                kind="fullborder"
              />
            </div>
          </div>
          <p className={styles.confirmPasswordError}>{confirmPasswordError}</p>
        </div>
        <div className={styles.btn_wrap}>
          <Button onClick={hadnleCreateUser}>{registerBtn}</Button>
        </div>
        <p className={styles.already_have_account}>
          Already have an account? <span>Login Now</span>
        </p>
      </div>
      <div className={styles.right_wrap}>
        <Image src={signUpRightImage} layout="responsive" alt="sign-up" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
