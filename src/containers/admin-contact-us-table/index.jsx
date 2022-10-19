import React, { useState, useEffect } from 'react';
import ContactTable from '../../component/ui/contact-us-table';
import SearchBar from '../../component/common/SearchBar';
import styles from './adminContactUsTable.module.scss';
import {
  getContactUsDataApi,
  contactUsDataOperationApi,
  getcontactUsDataDetailsApi,
  replyByUserApi,
} from '../../../services/api/contactUs';
import { toast, ToastContainer } from 'react-toastify';
import ContactUsDialogBox from '../../component/common/contact-us-dialog-box';
import ReplyDialogBox from '../../component/common/reply-dialoag-box ';

const ContactUsTable = () => {
  const [adminContactUsData, setContactUsData] = useState([]);
  const [contactUsLoading, setContactUsLoading] = useState(true);
  const [searchContact, setContactUs] = useState('');
  const [isDialogShow, setIsDialogShow] = useState(false);
  const [contactUsViewData, setContactUsViewData] = useState('');
  const [reply, setReply] = useState('');
  const [isReplyDialogShow, setIsReplyDialogShow] = useState(false);
  const [parentId, setParentId] = useState('');

  useEffect(() => {
    const Data = async () => {
      await getContactUsData();
    };
    Data();
  }, []);

  const getContactUsData = async () => {
    const res = await getContactUsDataApi();
    if (res) {
      setContactUsData(res.data);
      setContactUsLoading(false);
    }
  };

  const handleOpenContactUsPopup = async (id) => {
    try {
      const res = await getcontactUsDataDetailsApi(id);
      if (res.success) {
        setContactUsViewData(res.data);
        setIsDialogShow(true);
      } else {
        setContactUsLoading(false);
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
      setContactUsLoading(false);
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
  const handleCloseContactUsPopup = () => {
    setContactUsViewData('');
    setIsDialogShow(false);
  };

  const handleContactUsSearch = async (e) => {
    try {
      const searchContactUs = e.target.value;
      setContactUs(searchContactUs);
      const res = await contactUsDataOperationApi(
        `username=${searchContactUs}`,
      );
      if (res.success) {
        setContactUsData(res.data);
        setContactUsLoading(false);
      } else {
        setContactUsLoading(false);
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
      setContactUsLoading(false);
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

  const handleCloseReplyPopup = () => {
    setIsReplyDialogShow(false);
    setReply('');
    setParentId('');
  };

  const handleReply = (parentID) => {
    setParentId(parentID);
    setIsReplyDialogShow(true);
  };

  const handleSendReply = async () => {
    if (parentId && reply) {
      try {
        let data = {
          parentId: parentId,
          description: reply,
        };
        const res = await replyByUserApi(data);
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
          setTimeout(() => {
            setIsDialogShow(false);
            setIsReplyDialogShow(false);
            getContactUsData();
          }, 2000);
        } else {
          setContactUsLoading(false);
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
        setContactUsLoading(false);
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
      setContactUsLoading(false);
      toast.error('Fill The Reply Field', {
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
    <main className={styles.blog_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar
            inputValue={searchContact}
            onChangeInputHandler={handleContactUsSearch}
          />
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <ContactTable
          data={adminContactUsData}
          loading={contactUsLoading}
          handlePopup={handleOpenContactUsPopup}
        />
      </section>
      <ContactUsDialogBox
        leftBlogButtonHandler={handleCloseContactUsPopup}
        rightBlogButtonHandler={handleReply}
        handleShow={isDialogShow}
        finalData={contactUsViewData}
        reply={reply}
        setReply={setReply}
      />
      <ReplyDialogBox
        leftReplyButtonHandler={handleCloseReplyPopup}
        rightReplyButtonHandler={handleSendReply}
        handleReplyShow={isReplyDialogShow}
        reply={reply}
        setReply={setReply}
      />
      <ToastContainer />
    </main>
  );
};

export default ContactUsTable;
