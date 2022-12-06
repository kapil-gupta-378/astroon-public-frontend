import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from './login.module.scss';
import loginUpRightImage from '../../../public/assets/images/login-page-icon.png';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../../services/api/admin';
import WebsiteLogo from '../../component/common/website-logo';
import { useDispatch } from 'react-redux';
import { setAdminToken } from '../../redux/admin/adminSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const rememberMe = localStorage.getItem('rememberMe');
  const adminToken = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (rememberMe && adminToken && role === 'admin') {
      router.push('admin/admin-management');
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    if (username && password) {
      const data = {
        userName: username,
        password: password,
      };
      try {
        const res = await loginUserApi(data);
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', 'admin');
          dispatch(setAdminToken(res.data.token));
          toast.success(res.message);
          router.push('/admin/dashboard');
        } else {
          toast.error(res.message);
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
        if (error.response.data.statusCode === 400) {
          toast.error(error.response.data.message[0].errorDetail.isEmail);
        }
        // throw error;
      }
    } else {
      toast.error('Please Fill All Feilds');
    }
  }
  const redirectToForgot = () => {
    Router.push('forgot-password');
  };
  const isRememberMe = (event) => {
    if (event.target.checked) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe', 'false');
    }
  };
  return (
    <React.Fragment>
      {isLogin ? (
        <form onSubmit={handleLogin}>
          <div className={styles.login_wrap}>
            <div className={styles.left_wrap}>
              <div className={styles.heading_log_wrap}>
                <WebsiteLogo />
                <h1>Login</h1>
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
                <div className={styles.inline}>
                  <input
                    onChange={isRememberMe}
                    className={styles.check_btn}
                    type="checkbox"
                  />
                  <span className={styles.remember_me}>Remember Me</span>
                </div>
                <span
                  className={styles.forget_pass_text}
                  onClick={redirectToForgot}
                >
                  Forgot Password?
                </span>
              </div>

              <div className={styles.btn_wrap}>
                <span>
                  <Button type="submit">Login</Button>
                </span>
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
        </form>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default Login;
