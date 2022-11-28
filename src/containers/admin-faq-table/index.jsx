import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from '../../component/common/button';
import FAQDialogBox from '../../component/common/faq-dialoag-box';
import FAQTable from '../../component/common/faq-table';
import SearchBar from '../../component/common/SearchBar';
import {
  getFaqDataApi,
  faqDataOperationApi,
  deleteFaqDataApi,
} from '../../../services/api/faq';
import styles from './adminFAQTable.module.scss';
const AdminFAQTable = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState();
  const [pageNumber, setPageNumber] = useState();
  const [pageLimit, setPageLimit] = useState();
  const [adminFAQData, setAdminFAQData] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminFAQCount, setAdminFAQCount] = useState('');
  const [isSort, setIsSort] = useState(true);
  const route = useRouter();

  useEffect(() => {
    setPageLimit(6);
    setPageNumber(1);
    getFAQData(1, 6);
    setPageNumber((value) => value + 1);
  }, []);

  const getFAQData = async (pageNo, pageLim) => {
    const res = await getFaqDataApi(pageNo, pageLim);
    if (res) {
      setAdminFAQData(res.rows);
      setAdminLoading(false);
      setAdminFAQCount(res.count);
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
  };

  const fetchMoreData = async () => {
    const res = await getFaqDataApi(pageNumber, pageLimit);
    setAdminFAQData((value) => [...value, ...res.rows]);
    setAdminLoading(false);
    setAdminFAQCount((value) => {
      return value - 6;
    });
    setPageNumber((value) => value + 1);
  };
  const handleSearchFAQTitle = async (e) => {
    try {
      const searchFAQ = e.target.value;
      setSearchKeyWord(searchFAQ);
      const res = await faqDataOperationApi(`title=${searchFAQ}`);
      if (res.success) {
        setAdminFAQData(res.data.rows);
        setAdminLoading(false);
        setAdminFAQCount(res.data.count);
      } else {
        setAdminLoading(false);
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
      setAdminLoading(false);
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
  const handleDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialog(true);
  };
  const handleDeleteDialogCancel = () => {
    setDeleteItemId('');
    setDeleteDialog(false);
  };
  const handleDeleteFAQ = async (id) => {
    try {
      const res = await deleteFaqDataApi(id);
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
        setDeleteDialog(false);
        getFaqDataApi(1, 6);
        setDeleteItemId('');
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
      setDeleteDialog(false);
    }
  };

  const handleSorting = async (sortBy) => {
    setAdminLoading(true);
    if (sortBy == 'DESC') {
      setIsSort(true);
    } else {
      setIsSort(false);
    }
    try {
      const res = await faqDataOperationApi(`sortBy=${sortBy}`);
      if (res.success) {
        setAdminFAQData(res.data.rows);
        setAdminLoading(false);
      } else {
        setAdminLoading(false);
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
      setAdminLoading(false);
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
    <main className={styles.admin_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          
          <SearchBar
            inputValue={searchKeyWord}
            typeValue={handleSearchFAQTitle}
            // onChangeInputHandler={handleSearchFAQTitle}
          />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.add_btn_wrap}>
            <Button onClick={() => route.push('addFAQ')}>Add FAQ</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <FAQTable
          data={adminFAQData}
          loading={adminLoading}
          handleDeleteItem={handleDeleteDialog}
          fetchMoreData={fetchMoreData}
          dataCount={adminFAQCount}
          handleSorting={handleSorting}
          isSort={isSort}
        />
      </section>
      <ToastContainer />
      <FAQDialogBox
        mainHading="You’re about to delete this FAQ"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac nibh ut in. Convallis in tristique dui sit vestibulum habitant"
        leftButtonHandler={handleDeleteDialogCancel}
        rightButtonHandler={() => handleDeleteFAQ(deleteItemId)}
        leftButtonName="Cancel"
        rightButtonName="Delete"
        handleShow={deleteDialog}
      />
    </main>
  );
};
export default AdminFAQTable;
