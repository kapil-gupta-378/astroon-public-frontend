import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './forgotpassword.module.scss';
import loginUpRightImage from '../../../public/assets/images/forgot-password-page-icon.svg';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { forgotPasswordUserApi } from '../../../services/api/user';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    const data = {
      email: email,
    };
    try {
      const res = await forgotPasswordUserApi(data);
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
      // throw error;
    }
  };
  return (
    <div className={styles.forgot_password_wrap}>
      <div className={styles.left_wrap}>
        <div>
          <h1>Forgot Your Password</h1>
          <p>
            Enter the email address associated with your
            <br /> account!
          </p>
        </div>
        <div className={styles.form_wrap}>
          <TextInput
            handleValue={email}
            handleOnChange={(e) => setEmail(e.target.value)}
            title="Email"
            placeHolder="Enter your email"
            kind="fullborder"
          />
        </div>
        <div className={styles.btn_wrap}>
          <Button onClick={handleForgotPassword}>Submit</Button>
        </div>
        <p className={styles.not_member_yet}>
          Not a member yet?{' '}
          <Link href="/sign-up">
            <a>Register Now</a>
          </Link>
        </p>
      </div>
      <div className={styles.right_wrap}>
        <Image src={loginUpRightImage} layout="responsive" alt="login" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
