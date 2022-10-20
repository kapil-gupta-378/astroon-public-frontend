import Image from 'next/image';
import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './login.module.scss';
import loginUpRightImage from '../../../public/assets/images/login-page-icon.svg';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { loginUserApi } from '../../../services/api/user';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (username && password) {
      const data = {
        userName: username,
        password: password,
      };
      try {
        const res = await loginUserApi(data);
        if (res.success) {
          router.push('/admin/admin-management');
          localStorage.setItem('token', res.data.token);
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
  const redirectToForgot = () => {
    Router.push('forgot-password');
  };
  return (
    <div className={styles.login_wrap}>
      <div className={styles.left_wrap}>
        <div>
          <h1>Login Now</h1>
        </div>
        <div className={styles.form_wrap}>
          <TextInput
            handleType="text"
            handleValue={username}
            handleOnChange={(e) => setUsername(e.target.value)}
            title="Username/Email"
            placeHolder="Enter your username/email"
            kind="fullborder"
          />
          <TextInput
            handleType="password"
            handleValue={password}
            handleOnChange={(e) => setPassword(e.target.value)}
            title="Password"
            placeHolder="Enter your password"
            kind="fullborder"
          />
        </div>
        <div className={styles.remember_me_btn}>
          <input className={styles.check_btn} type="checkbox" />
          <span className={styles.remember_me}>Remember Me</span>
          <span className={styles.forget_pass_text} onClick={redirectToForgot}>
            Forgot Password?
          </span>
        </div>

        <div className={styles.btn_wrap}>
          <span>
            <Button onClick={handleLogin}>Login Now</Button>
          </span>
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

export default Login;
