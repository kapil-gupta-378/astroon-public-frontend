import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './resetpassword.module.scss';
import loginUpRightImage from '../../../public/assets/images/reset-password-page-icon.svg';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { toast } from 'react-toastify';
import {
  resetPasswordUserApi,
  verifyResetPasswordTokenUserApi,
} from '../../../services/api/admin';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const data = async () => {
      await verifyResetPasswordToken(token);
    };
    if (token) {
      data();
    }
  }, [token]);

  const verifyResetPasswordToken = async (verifyToken) => {
    try {
      const res = await verifyResetPasswordTokenUserApi(verifyToken);
      if (res.success) {
        toast.success(res.message);
      } else {
        router.push('/forgot-password');
        toast.error(res.message);
      }
    } catch (error) {
      router.push('/forgot-password');
      toast.error(error.response.data.message);
      // throw error;
    }
  };

  const handleResetPassword = async () => {
    if (password) {
      const data = {
        password: password,
      };
      try {
        const res = await resetPasswordUserApi(data, token);
        if (res.success) {
          toast.success(res.message);
          router.push('/login');
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        // throw error;
      }
    } else {
      toast.error('Please Fill Password Feild');
    }
  };
  return (
    <div className={styles.reset_password_wrap}>
      <div className={styles.left_wrap}>
        <div>
          <h1>Reset Your Password</h1>
        </div>
        <div className={styles.form_wrap}>
          <TextInput
            handleType="password"
            handleValue={password}
            handleOnChange={(e) => setPassword(e.target.value)}
            title="Password"
            placeHolder="Enter your new password"
            kind="fullborder"
          />
        </div>
        <div className={styles.btn_wrap}>
          <Button onClick={handleResetPassword}>Submit</Button>
        </div>
        <p className={styles.do_you_know_password}>
          Do you know password?{' '}
          <Link href="/login">
            <a>Login Now</a>
          </Link>
        </p>
      </div>
      <div className={styles.right_wrap}>
        <Image src={loginUpRightImage} layout="responsive" alt="login" />
      </div>
    </div>
  );
};

export default ResetPassword;
