import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createAdminFAQApi } from '../../../services/api/faq';
import styles from './addFAQ.module.scss';
import backArrowIcon from '../../../public/assets/images/backArrow.svg';
import TextInput from '../../component/common/text-input';
import Button from '../../component/common/button';
import { toast, ToastContainer } from 'react-toastify';
import inputStyles from '../../component/common/text-input/textInput.module.scss';

const AddFAQ = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ordering, setOrdering] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (title && description && ordering) {
      const data = {
        title: title,
        description: description,
        ordering: Number(ordering),
      };
      try {
        const res = await createAdminFAQApi(data);
        if (res.success) {
          setTitle('');
          setOrdering('');
          setDescription('');
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
        toast.error(error?.response?.data?.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('Please Fill All Fields', {
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
    <main className={styles.faq_details_wrap}>
      <>
        <div className={styles.faq_details_right}>
          <div onClick={() => router.back()} className={styles.header}>
            <Image
              src={backArrowIcon}
              width={20}
              height={20}
              alt="backarrow"
              layout="fixed"
            />
            <h3>Add FAQ</h3>
          </div>
          <div className={styles.form_body}>
            <div className={styles.name_input_wrap}>
              <TextInput
                titleBackground={'#05052d'}
                title={'Title'}
                kind={'fullborder'}
                handleValue={title}
                handleType={'text'}
                handleOnChange={(e) => setTitle(e.target.value)}
                placeHolder="Enter your title"
              />
            </div>
            <div className={inputStyles.input_wrap}>
              <label
                className={inputStyles.corner_border_label}
                style={{ background: 'rgb(5, 5, 45)' }}
              >
                Description
              </label>
              <textarea
                placeholder="Enter your description"
                className={styles.faq_text_area}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                cols={4}
              />
            </div>
            <div className={styles.name_input_wrap}>
              <TextInput
                titleBackground={'#05052d'}
                title={'Ordering'}
                kind={'fullborder'}
                handleValue={ordering}
                handleType={'text'}
                handleOnChange={(e) => setOrdering(e.target.value)}
                placeHolder="Enter your ordering"
              />
            </div>
          </div>
          <div className={styles.submit_button}>
            <Button onClick={handleSubmit}>Save and Continue</Button>
          </div>
        </div>
      </>
      <ToastContainer />
    </main>
  );
};

export default AddFAQ;
