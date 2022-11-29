import Image from 'next/image';
import React from 'react';
import styles from './whiteListSeedUserTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';

const WhiteListSeedUserTable = ({ data, handleDeleteItem }) => {
  return (
    <div id={'table_scroll'} className={styles.table_wrap}>
      <div className={styles.scroll_wrap}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">address</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {data?.rows?.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{idx + 1}</th>
                  <td
                    style={{
                      color: `${
                        item.isValid === undefined
                          ? ''
                          : item.isValid === false && 'red'
                      }`,
                    }}
                  >
                    {item.walletAddress}
                  </td>
                  <td>{item.merkleRoot ? 'Old' : 'New'}</td>
                  <td>
                    {item.isValid === undefined
                      ? 'Valid'
                      : item.isValid === false
                      ? 'Invalid'
                      : 'Valid'}
                  </td>
                  <td
                    onClick={() => handleDeleteItem(item.walletAddress)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      src={deleteIcon}
                      width={15}
                      height={15}
                      layout="fixed"
                      alt="delte-icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WhiteListSeedUserTable;
