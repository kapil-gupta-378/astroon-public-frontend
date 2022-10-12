import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../component/common/button';
import FilterBy from '../../component/common/FilterBy';
import ListTable from '../../component/common/list-table';
import SearchBar from '../../component/common/SearchBar';
import { fetchAdminListData } from '../../redux/admin/adminAction';
import styles from './adminListTable.module.scss';
const AdminListTable = () => {
  const dispatch = useDispatch();
  const filterByOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'super admin', label: 'Super Admin' },
    { value: 'sub admin', label: 'Sub Admin' },
  ];
  const { adminListData, adminLoading } = useSelector(
    (state) => state.adminReducer,
  );
  useEffect(() => {
    dispatch(fetchAdminListData());
  }, []);

  return (
    <main className={styles.admin_List_table_wrap}>
      <section className={styles.top_bar}>
        <div className={styles.top_bar_left}>
          <SearchBar />
        </div>
        <div className={styles.top_bar_right}>
          <div className={styles.filter_wrap}>
            <FilterBy options={filterByOptions} />
          </div>
          <div className={styles.add_btn_wrap}>
            <Button>Add Admin Account</Button>
          </div>
        </div>
      </section>
      <section className={styles.list_table_wrap}>
        <ListTable data={adminListData} loading={adminLoading} />
      </section>
    </main>
  );
};

export default AdminListTable;
