import Image from 'next/image';
import React from 'react';
import styles from './whiteListUserTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';

const WhiteListUserTable = ({ data, handleDeleteItem }) => {
  return (
    <div id={'table_scroll'} className={styles.table_wrap}>
      <div className={styles.scroll_wrap}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Address</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          {data.length !== 0 ? (
            <tbody>
              {data?.map((item, idx) => {
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
          ) : (
            <div
              style={{
                textAlign: 'center',
                display: 'table-caption',
                color: 'white',
                marginTop: '40px',
              }}
            >
              Data Not Found
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

export default WhiteListUserTable;
