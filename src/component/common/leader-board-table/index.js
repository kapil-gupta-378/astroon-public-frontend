import React from 'react';
import Image from 'next/image';
import styles from './leaderBoardTable.module.scss';
import reward_gold from '../../../../public/assets/images/reward_gold.svg';
import reward_silver from '../../../../public/assets/images/reward_silver.svg';
import reward_bronze from '../../../../public/assets/images/reward_bronze.svg';

const LeaderBoardTable = ({ data, loading }) => {
  return (
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
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
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
                    <td>{item.walletAddress}</td>
                    <td>{item.totalReward}</td>
                  </tr>
                );
              })}
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
  );
};
export default LeaderBoardTable;
