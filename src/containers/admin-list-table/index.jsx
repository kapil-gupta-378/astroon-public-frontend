import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { adminAuditApi, deleteAdminApi } from '../../../services/api/admin';
import Button from '../../component/common/button';
import DialogBox from '../../component/common/dialoag-box';
import FilterBy from '../../component/common/FilterBy';
import ListTable from '../../component/common/list-table';
import SearchBar from '../../component/common/SearchBar';
import { fetchAdminListData } from '../../redux/admin/adminAction';
import styles from './adminListTable.module.scss';
const AdminListTable = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [deleteItemComment, setDeleteItemComment] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit] = useState(6);
  const [role, setRole] = useState('admin');
  const dispatch = useDispatch();
  const route = useRouter();
  const filterByOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'subadmin', label: 'Sub Admin' },
  ];
  const { adminListData, adminLoading, adminListCount, adminToken } =
    useSelector((state) => state.adminReducer);
  useEffect(() => {
    const paramsObj = {
      page: pageNumber,
      limit: pageLimit,
      role: role,
    };
    dispatch(fetchAdminListData(paramsObj));
    setPageNumber((value) => value + 1);
  }, [adminToken]);

  useEffect(() => {
    const paramsObj = {
      page: 1,
      limit: pageLimit,
      role: role,
      search: searchKeyWord,
    };
    dispatch(fetchAdminListData(paramsObj));
  }, [searchKeyWord]);

  useEffect(() => {
    const paramsObj = {
      page: 1,
      limit: pageLimit,
      role: role,
    };
    dispatch(fetchAdminListData(paramsObj));
  }, [role]);

  const handleDeleteDialog = (id) => {
    setDeleteItemId(id);
    setDeleteDialog(true);
  };

  const handleDeleteDialogCancel = () => {
    setDeleteItemId('');
    setDeleteItemComment('');
    setDeleteDialog(false);
  };
  const fetchMoreData = () => {
    const paramsObj = {
      page: pageNumber,
      limit: pageLimit,
      role: role,
    };
    dispatch(fetchAdminListData(paramsObj, true));
    setPageNumber((value) => value + 1);
  };
  const handleDeleteAdmin = async (id, comment) => {
    const paramsObj = {
      page: pageNumber,
      limit: pageLimit,
      role: role,
    };
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
      const res = await deleteAdminApi(id);
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
        dispatch(fetchAdminListData(paramsObj));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleteDialog(false);
    }
  };

  const gotoProfile = (id) => {
    route.push(`/admin/view-profile/${id}`);
  };
  // start callback handler with debounce technic
  const changeHandler = (event) => {
    setSearchKeyWord(event.target.value);
  };
  // end callback handler with debounce technic

  return (
    <main className={styles.admin_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar inputValue={searchKeyWord} typeValue={changeHandler} />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <FilterBy
              options={filterByOptions}
              handleChange={(value) => setRole(value.value)}
            />
          </div>
          <div className={styles.add_btn_wrap}>
            <Button onClick={() => route.push('addAdmin')}>Add Account</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <ListTable
          data={adminListData}
          loading={adminLoading}
          handleDeleteItem={handleDeleteDialog}
          fetchMoreData={fetchMoreData}
          dataCount={adminListCount}
          onClickUserName={gotoProfile}
        />
      </section>

      <DialogBox
        mainHading="You’re about to delete this account"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in ac nibh ut in. Convallis in tristique dui sit vestibulum habitant"
        leftButtonHandler={handleDeleteDialogCancel}
        rightButtonHandler={() =>
          handleDeleteAdmin(deleteItemId, deleteItemComment)
        }
        leftButtonName="Cancel"
        rightButtonName="Delete"
        handleShow={deleteDialog}
        inputValue={deleteItemComment}
        onChangeInput={(value) => setDeleteItemComment(value)}
      />
    </main>
  );
};

export default AdminListTable;
