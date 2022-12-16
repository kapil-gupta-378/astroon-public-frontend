import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { adminAuditApi, deleteAdminApi } from '../../../services/api/admin';
import DialogBox from '../../component/common/dialoag-box';
import SearchBar from '../../component/common/SearchBar';
import AddressTable from '../../component/ui/address-table';
import { fetchAddressListData } from '../../redux/wallet-list/walletAction';
import styles from './walletManagement.module.scss';
const WalletManagementTable = () => {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [deleteItemComment, setDeleteItemComment] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit] = useState(6);
  const dispatch = useDispatch();
  const route = useRouter();
  // const filterByOptions = [
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'subadmin', label: 'Sub Admin' },
  // ];
  const { addressListData, addressListLoading, addressListDataCount } =
    useSelector((state) => state.addressListReducer);

  const { adminToken } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    const paramsObj = {
      page: pageNumber,
      limit: pageLimit,
    };
    dispatch(fetchAddressListData(paramsObj));
    setPageNumber((value) => value + 1);
  }, [adminToken]);

  useEffect(() => {
    const paramsObj = {
      page: 1,
      limit: pageLimit,
      search: searchKeyWord,
    };
    dispatch(fetchAddressListData(paramsObj));
  }, [searchKeyWord]);

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
    };
    dispatch(fetchAddressListData(paramsObj, true));
    setPageNumber((value) => value + 1);
  };
  const handleDeleteAdmin = async (id, comment) => {
    const paramsObj = {
      page: pageNumber,
      limit: pageLimit,
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
        toast.success(res.message);
        setDeleteDialog(false);
        dispatch(fetchAddressListData(paramsObj));
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
    <main className={styles.address_list_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar inputValue={searchKeyWord} typeValue={changeHandler} />
        </div>
        <div className={styles.top_bar_right}></div>
      </section>
      <section className={styles.list_table_wrap}>
        <AddressTable
          data={addressListData}
          loading={addressListLoading}
          handleDeleteItem={handleDeleteDialog}
          fetchMoreData={fetchMoreData}
          dataCount={addressListDataCount}
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

export default WalletManagementTable;
