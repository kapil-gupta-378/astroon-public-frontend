import React, { useState, useEffect } from 'react';
// import Button from '../../component/common/button';
import FilterBy from '../../component/common/FilterBy';
import BlogTable from '../../component/ui/blog-table';
import SearchBar from '../../component/common/SearchBar';
import Sort from '../../component/common/sort';
import styles from './adminBlogTable.module.scss';
import {
  getBlogDataApi,
  deleteBlogDataApi,
  sortBlogDataApi,
} from '../../../services/api/blog/blog';
import { toast, ToastContainer } from 'react-toastify';
import DialogBox from '../../component/common/dialoag-box';
import { createAdminAuditApi } from '../../../services/api/admin';
const AdminBlogTable = () => {
  const [adminBlogData, setAdminBlogData] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [isSort, setIsSort] = useState(true);
  const [blogId, setBlogId] = useState('');
  const [isDialog, setIsDialog] = useState(false);
  const [comments, setAdminComments] = useState('');

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
  };

  const handleBlogDelete = async () => {
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

  const handleSorting = async (sortBy) => {
    setAdminBlogData([]);
    setBlogLoading(true);
    if (sortBy == 'DESC') {
      setIsSort(true);
    } else {
      setIsSort(false);
    }
    const res = await sortBlogDataApi(sortBy);
    if (res) {
      setAdminBlogData(res.rows);
      setBlogLoading(false);
    }
  };

  return (
    <main className={styles.blog_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <Sort handleSorting={handleSorting} isSort={isSort} />
          </div>
          <div className={styles.filter_wrap}>
            <FilterBy
            //   options={filterByOptions}
            />
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
        inputValue={comments}
        onChangeInput={setAdminComments}
        rightButtonHandler={handleBlogDelete}
        leftButtonHandler={handleCommentsPopupClose}
      />
      <ToastContainer />
    </main>
  );
};

export default AdminBlogTable;
