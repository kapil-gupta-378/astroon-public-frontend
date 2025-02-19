import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './signUp.module.scss';
import signUpRightImage from '../../../public/assets/images/sign-up-page-icon.png';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { toast } from 'react-toastify';
import { createUserApi } from '../../../services/api/admin';
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
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        if (error.response.data.statusCode === 400) {
          toast.error(error.response.data.message[0].errorDetail.isEmail);
        }
        // throw error;
      }
    } else {
      toast.error('Please Fill All Feilds');
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
                handleType="password"
                handleValue={password}
                handleOnChange={(e) => setPassword(e.target.value)}
                title="Password"
                placeHolder="Enter your password"
                kind="fullborder"
              />
            </div>
            <div className={styles.last_name}>
              <TextInput
                handleType="password"
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
          Already have an account?{' '}
          <Link href="/login">
            <a>Login Now</a>
          </Link>
        </p>
      </div>
      <div className={styles.right_wrap}>
        <Image src={signUpRightImage} layout="responsive" alt="sign-up" />
      </div>
    </div>
  );
};

export default SignUp;
