import React, { useState, useEffect } from 'react';
import BlogTable from '../../component/ui/blog-table';
import SearchBar from '../../component/common/SearchBar';
import Sort from '../../component/common/sort';
import styles from './adminBlogTable.module.scss';
import {
  getBlogDataApi,
  deleteBlogDataApi,
  blogDataOperationApi,
} from '../../../services/api/blog/blog';
import { toast, ToastContainer } from 'react-toastify';
import DialogBox from '../../component/common/dialoag-box';
import { createAdminAuditApi } from '../../../services/api/admin';
import BlogFilter from '../../component/common/blog-filter';
import BlogDialogBox from '../../component/common/blog-dialoag-box';

const AdminBlogTable = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [adminBlogData, setAdminBlogData] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [isSort, setIsSort] = useState(true);
  const [blogId, setBlogId] = useState('');
  const [isDialog, setIsDialog] = useState(false);
  const [comments, setAdminComments] = useState('');
  const [searchBlog, setSearchBlog] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);

  useEffect(() => {
    const Data = async () => {
      await getBlogData();
    };
    Data();
  }, []);

  const getBlogData = async () => {
    const res = await getBlogDataApi();
    if (res) {
      setAdminBlogData(res.rows);
      setBlogLoading(false);
    }
  };

  const handleCommentsPopupOpen = (blogId) => {
    setBlogId(blogId);
    setIsDialog(true);
  };
  const handleCommentsPopupClose = () => {
    setBlogId('');
    setIsDialog(false);
    setAdminComments('');
    setIsFilter(false);
    setStartDate(todayDate);
    setEndDate(todayDate);
    setIsSort(true);
  };

  const handleBlogDelete = async () => {
    if (comments) {
      try {
        const auditParam = {
          comment: comments,
          description: 'test',
          action: 'delete',
        };
        await createAdminAuditApi(auditParam);
        const res = await deleteBlogDataApi(blogId);
        if (res.success) {
          getBlogData();
          setIsDialog(false);
          setAdminComments('');
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
      toast.error('Please Add Comments', {
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

  const handleSorting = async (sortBy) => {
    setAdminBlogData([]);
    setBlogLoading(true);
    if (sortBy == 'DESC') {
      setIsSort(true);
    } else {
      setIsSort(false);
    }
    try {
      const res = await blogDataOperationApi(`sortBy=${sortBy}`);
      if (res.success) {
        setAdminBlogData(res.data.rows);
        setBlogLoading(false);
      } else {
        setBlogLoading(false);
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
      setBlogLoading(false);
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

  const handleSearchBlogTitle = async (e) => {
    try {
      const searchBlog = e.target.value;
      setSearchBlog(searchBlog);
      const res = await blogDataOperationApi(`search=${searchBlog}`);
      if (res.success) {
        setAdminBlogData(res.data.rows);
        setBlogLoading(false);
      } else {
        setBlogLoading(false);
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
      setBlogLoading(false);
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

  const showBlogFilter = () => {
    setIsFilter(true);
  };
  const cancelBlogFilter = () => {
    getBlogData();
    setIsFilter(false);
    setStartDate(todayDate);
    setEndDate(todayDate);
    setIsSort(true);
    setBlogLoading(true);
  };

  const handleBlogFilter = async () => {
    if (startDate && endDate) {
      setBlogLoading(true);
      try {
        const sDate = `${startDate}T00:00:00.000Z`;
        const eDate = `${endDate}T23:59:59.000Z`;
        const res = await blogDataOperationApi(
          `startDate=${sDate}&endDate=${eDate}`,
        );
        if (res.success) {
          setAdminBlogData(res.data.rows);
          setIsFilter(false);
          setBlogLoading(false);
        } else {
          setIsFilter(false);
          setBlogLoading(false);
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
        setIsFilter(false);
        setBlogLoading(false);
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
      toast.error('Please Fill Both Date', {
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
            inputTextValue={searchBlog}
            handleSearch={handleSearchBlogTitle}
          />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <Sort handleSorting={handleSorting} isSort={isSort} />
          </div>
          <div className={styles.filter_wrap}>
            <BlogFilter handleFilter={showBlogFilter} />
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <BlogTable
          data={adminBlogData}
          loading={blogLoading}
          handlePopup={handleCommentsPopupOpen}
        />
      </section>
      <DialogBox
        handleShow={isDialog}
        mainHading="You’re about to delete this Blog"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac nibh ut in. Convallis in tristique dui sit vestibulum habitant"
        leftButtonName="Cancel"
        rightButtonName="Delete"
        value={comments}
        setState={setAdminComments}
        rightButtonHandler={handleBlogDelete}
        leftButtonHandler={handleCommentsPopupClose}
      />
      <BlogDialogBox
        handleFilterBlogShow={isFilter}
        startDatevalue={startDate}
        endDatevalue={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        leftBlogButtonHandler={cancelBlogFilter}
        rightBlogButtonHandler={handleBlogFilter}
      />
      <ToastContainer />
    </main>
  );
};

export default AdminBlogTable;
