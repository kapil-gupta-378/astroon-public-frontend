import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './leaderBoard.module.scss';
import reward_gold from '../../../../public/assets/images/reward_gold.svg';
import reward_silver from '../../../../public/assets/images/reward_silver.svg';
import reward_bronze from '../../../../public/assets/images/reward_bronze.svg';
import { getUserLeaderboardDataApi } from '../../../../services/api/leader-board';
import { toast } from 'react-toastify';

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboardData();
  }, []);

  const getLeaderboardData = async () => {
    try {
      setLoading(true);

      const res = await getUserLeaderboardDataApi();
      if (res.success) {
        setLoading(false);
        setLeaderboardData(res.data);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={`container ${styles.leader_board_wrap}`}>
      <h3 className={styles.leader_board_heading}>Our Leaderboard</h3>
      <div id={'table_scroll'} className={styles.table_wrap}>
        {!loading ? (
          <div className={styles.scroll_wrap}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Address</th>
                  <th scope="col">Rewards Claimed</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData?.map((data, index) => (
                  <tr key={index}>
                    <td>
                      {' '}
                      {index === 0 && (
                        <Image
                          src={reward_gold}
                          width={58}
                          height={58}
                          layout="fixed"
                          alt="reward-icon"
                        />
                      )}
                      {index === 1 && (
                        <Image
                          src={reward_silver}
                          width={58}
                          height={58}
                          layout="fixed"
                          alt="reward-icon"
                        />
                      )}
                      {index === 2 && (
                        <Image
                          src={reward_bronze}
                          width={58}
                          height={58}
                          layout="fixed"
                          alt="reward-icon"
                        />
                      )}
                      {index !== 0 && index !== 1 && index !== 2 && index + 1}
                    </td>
                    <td>{data.walletAddress}</td>
                    <td>{data.totalReward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.spinner_wrap}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
