import React, { useState, useEffect } from 'react';
import ContactTable from '../../component/ui/contact-us-table';
import SearchBar from '../../component/common/SearchBar';
import FilterBy from '../../component/common/FilterBy';
import styles from './adminContactUsTable.module.scss';
import {
  getContactUsDataApi,
  contactUsDataOperationApi,
  getcontactUsDataDetailsApi,
  replyByUserApi,
} from '../../../services/api/contactUs';
import { toast } from 'react-toastify';
import ContactUsDialogBox from '../../component/common/contact-us-dialog-box';
import ReplyDialogBox from '../../component/common/reply-dialoag-box';

const statusSelectOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'replied', label: 'Replied' },
];

const ContactUsTable = () => {
  const [adminContactUsData, setContactUsData] = useState([]);
  const [contactUsLoading, setContactUsLoading] = useState(true);
  const [searchContact, setContactUs] = useState('');
  const [isDialogShow, setIsDialogShow] = useState(false);
  const [contactUsViewData, setContactUsViewData] = useState('');
  const [reply, setReply] = useState('');
  const [isReplyDialogShow, setIsReplyDialogShow] = useState(false);
  const [parentId, setParentId] = useState('');
  const [pageNumber, setPageNumber] = useState();
  const [pageLimit, setPageLimit] = useState();
  const [adminContactUsCount, setAdminContactUsCount] = useState('');
  const [getFileType, setFileType] = useState('');

  useEffect(() => {
    setPageLimit(6);
    setPageNumber(1);
    getContactUsData(1, 6);
    setPageNumber((value) => value + 1);
  }, []);

  useEffect(() => {
    if (getFileType) {
      filterContactUsData(getFileType);
    }
  }, [getFileType]);

  const filterContactUsData = async (file) => {
    const res = await contactUsDataOperationApi(`status=${file}`);
    if (res.success) {
      setContactUsData(res.data.rows);
      setContactUsLoading(false);
    } else {
      toast.error(res.message);
    }
  };

  const getContactUsData = async (pageNo, pageLim) => {
    const res = await getContactUsDataApi(pageNo, pageLim);
    if (res.success) {
      setContactUsData(res.data.rows);
      setContactUsLoading(false);
      setAdminContactUsCount(res.data.count);
    } else {
      toast.error(res.message);
    }
  };

  const fetchMoreData = async () => {
    const res = await getContactUsDataApi(pageNumber, pageLimit);
    setContactUsData((value) => [...value, ...res.data.rows]);
    setContactUsLoading(false);
    setAdminContactUsCount((value) => {
      return value - 6;
    });
    setPageNumber((value) => value + 1);
  };

  const handleOpenContactUsPopup = async (id) => {
    try {
      const res = await getcontactUsDataDetailsApi(id);
      if (res.success) {
        setContactUsViewData(res.data);
        setIsDialogShow(true);
      } else {
        setContactUsLoading(false);
        toast.error(res.message);
      }
    } catch (error) {
      setContactUsLoading(false);
      toast.error(error.response.data.message);
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
        setContactUsData(res.data.rows);
        setContactUsLoading(false);
        setAdminContactUsCount(res.data.count);
      } else {
        setContactUsLoading(false);
        toast.error(res.message);
      }
    } catch (error) {
      setContactUsLoading(false);
      toast.error(error.response.data.message);
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
          toast.success(res.message);
          setTimeout(() => {
            setIsDialogShow(false);
            setIsReplyDialogShow(false);
            getContactUsData();
          }, 2000);
        } else {
          setContactUsLoading(false);
          toast.error(res.message);
        }
      } catch (error) {
        setContactUsLoading(false);
        toast.error(error.response.data.message);
        // throw error;
      }
    } else {
      setContactUsLoading(false);
      toast.error('Fill The Reply Field');
    }
  };

  return (
    <main className={styles.contact_us_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar
            inputValue={searchContact}
            typeValue={handleContactUsSearch}
            // onChangeInputHandler={handleContactUsSearch}
          />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <FilterBy
              options={statusSelectOptions}
              handleChange={(value) => setFileType(value.value)}
            />
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <ContactTable
          data={adminContactUsData}
          loading={contactUsLoading}
          handlePopup={handleOpenContactUsPopup}
          fetchMoreData={fetchMoreData}
          dataCount={adminContactUsCount}
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
    </main>
  );
};

export default ContactUsTable;
