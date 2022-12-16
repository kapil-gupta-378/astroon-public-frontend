import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LeaderBoardTable from '../../component/common/leader-board-table';
import { getUserLeaderboardDataApi } from '../../../services/api/leader-board';
import styles from './adminLeaderBoardTable.module.scss';

const AdminLeaderboardTable = () => {
  const [adminLeaderBoardData, setAdminLeaderBoardData] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    getLeaderBoardData();
  }, []);

  const getLeaderBoardData = async () => {
    try {
      const res = await getUserLeaderboardDataApi();
      if (res.success) {
        setAdminLoading(false);
        setAdminLeaderBoardData(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <main className={styles.admin_List_table_wrap}>
      <section className={styles.list_table_wrap}>
        <LeaderBoardTable data={adminLeaderBoardData} loading={adminLoading} />
      </section>
    </main>
  );
};
export default AdminLeaderboardTable;
