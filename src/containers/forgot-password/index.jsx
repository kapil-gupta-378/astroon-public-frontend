import Image from 'next/image';
import React, { useState } from 'react';
import styles from './forgotpassword.module.scss';
import loginUpRightImage from '../../../public/assets/images/forgot-password-page-icon.png';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { toast } from 'react-toastify';
import { forgotPasswordUserApi } from '../../../services/api/admin';
import WebsiteLogo from '../../component/common/website-logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (email) {
      if (
        email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      ) {
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
          toast.error(error.response.data.message);
          if (error.response.data.statusCode === 400) {
            toast.error(error.response.data.message[0].errorDetail.isEmail, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          // throw error;
        }
      } else {
        toast.error('Please enter valid email');
      }
    } else {
      toast.error('Please Fill Email Feild');
    }
  };
  return (
    <div className={styles.forgot_password_wrap}>
      <div className={styles.left_wrap}>
        <div className={styles.heading_log_wrap}>
          <WebsiteLogo />
          <h1>Forgot Your Password</h1>
          <p>
            Enter the email address associated with your
            <br /> account!
          </p>
        </div>
        <div className={styles.form_wrap}>
          <TextInput
            handleType="email"
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
        {/* <p className={styles.not_member_yet}>
          Not a member yet?{' '}
          <Link href="/sign-up">
            <a>Register Now</a>
          </Link>
        </p> */}
      </div>
      <div className={styles.right_wrap}>
        <Image src={loginUpRightImage} layout="responsive" alt="login" />
      </div>
    </div>
  );
};

export default ForgotPassword;
