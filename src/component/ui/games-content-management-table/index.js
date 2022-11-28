import React from 'react';
import styles from './gamesContentManagementTable.module.scss';
import editIcon from '../../../../public/assets/images/Edit-table-icon.svg';
import Image from 'next/image';
import moment from 'moment';

const GamesContentManagementTable = ({ data, loading, handleUpdateItem }) => {
  return (
    <div id={'table_scroll'} className={styles.table_wrap}>
      {!loading ? (
        <div className={styles.scroll_wrap}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Play Store</th>
                <th scope="col">App Store</th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>

            <tbody>
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.androidLink}</td>
                <td>{data.iosLink}</td>
                <td>
                  {moment(data.createdAt.toString()).format('DD/MM/YYYY')}
                </td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUpdateItem(data)}
                >
                  <Image
                    src={editIcon}
                    width={15}
                    height={15}
                    layout="fixed"
                    alt="delete-icon"
                  />
                </td>
              </tr>
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

export default GamesContentManagementTable;
