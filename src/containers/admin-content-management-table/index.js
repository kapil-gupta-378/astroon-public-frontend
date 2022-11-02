import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { adminAuditApi } from '../../../services/api/admin';
import { deleteContentApi } from '../../../services/api/content/content';
import BlogDialogBox from '../../component/common/blog-dialoag-box';
import BlogFilter from '../../component/common/blog-filter';
import DialogBox from '../../component/common/dialoag-box';
import SearchBar from '../../component/common/SearchBar';
import Sort from '../../component/common/sort';
import ContentTable from '../../component/ui/content-table';
import { fetchAdminListData } from '../../redux/admin/adminAction';
import { fetchContentListData } from '../../redux/content/contentAction';
import styles from './contentManagement.module.scss';
const ContentManagement = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteItemComment, setDeleteItemComment] = useState('');
  const [pageNumber, setPageNumber] = useState();
  const [pageLimit, setPageLimit] = useState();
  const [sortBy, setSortBy] = useState('ASC');
  const [isSorted, setIsSorted] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState();
  const [isFilter, setIsFilter] = useState(false);
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);
  const { contentListData, contentLoading, contentListCount } = useSelector(
    (state) => state.contentReducer,
  );

  const dispatch = useDispatch();
  const route = useRouter();
  useEffect(() => {
    setPageLimit(6);
    setPageNumber(1);
    const paramsObj = {
      page: 1,
      limit: 6,
      sortBy: sortBy,
    };
    dispatch(fetchContentListData(paramsObj));
    setPageNumber((value) => value + 1);
  }, []);

  useEffect(() => {
    if (searchKeyWord) {
      const paramsObj = {
        page: 1,
        limit: 6,
        sortBy: sortBy,
        search: searchKeyWord,
      };
      dispatch(fetchContentListData(paramsObj));
    }
  }, [searchKeyWord]);

  const fetchMoreData = () => {
    const paramsObj = {
      page: pageNumber,
      limit: pageLimit,
      sortBy: sortBy,
      search: searchKeyWord,
    };
    dispatch(fetchContentListData(paramsObj, true));
    setPageNumber((value) => value + 1);
  };
  const handleSortingFunction = (value) => {
    setSortBy(value);
    setIsSorted((value) => !value);
    const paramsObj = {
      page: 1,
      limit: 6,
      sortBy: value,
    };
    dispatch(fetchContentListData(paramsObj));
  };
  const handleDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialog(true);
  };
  const handleDeleteContent = async (id, comment) => {
    const data = {
      comment: comment.toString(),
      description: id.toString(),
      action: 'delete',
    };
    try {
      if (comment) {
        await adminAuditApi(data);
        setDeleteItemComment('');
      }
      const res = await deleteContentApi(id);
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
        dispatch(fetchAdminListData());
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
  const gotoProfile = (id) => {
    route.push(`/admin/view-profile/${id}`);
  };
  const showContentFilter = () => {
    setIsFilter(true);
  };
  const cancelContentFilter = () => {
    setIsFilter(false);
    setStartDate(todayDate);
    setEndDate(todayDate);
  };
  const handleContentFilter = () => {
    const paramsObj = {
      page: 1,
      limit: 6,
      sortBy: sortBy,
      startDate: startDate,
      endDate: endDate,
    };
    dispatch(fetchContentListData(paramsObj));
    setIsFilter(false);
  };
  return (
    <main className={styles.content_management_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar
            inputValue={searchKeyWord}
            onChangeInputHandler={(e) => setSearchKeyWord(e.target.value)}
          />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <Sort handleSorting={handleSortingFunction} isSort={isSorted} />
          </div>
          <div className={styles.filter_wrap}>
            <BlogFilter handleFilter={showContentFilter} />
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <ContentTable
          data={contentListData}
          loading={contentLoading}
          handleDeleteItem={handleDeleteDialog}
          fetchMoreData={fetchMoreData}
          dataCount={contentListCount}
          onClickUserName={gotoProfile}
        />
      </section>
      <DialogBox
        mainHading="You’re about to delete this Content"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac nibh ut in. Convallis in tristique dui sit vestibulum habitant"
        leftButtonHandler={() => setDeleteDialog(false)}
        rightButtonHandler={() =>
          handleDeleteContent(deleteItemId, deleteItemComment)
        }
        leftButtonName="Cancel"
        rightButtonName="Delete"
        handleShow={deleteDialog}
        inputValue={deleteItemComment}
        onChangeInput={(value) => setDeleteItemComment(value)}
      />
      <BlogDialogBox
        handleFilterBlogShow={isFilter}
        startDatevalue={startDate}
        endDatevalue={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        leftBlogButtonHandler={cancelContentFilter}
        rightBlogButtonHandler={handleContentFilter}
      />
      <ToastContainer />
    </main>
  );
};

export default ContentManagement;
