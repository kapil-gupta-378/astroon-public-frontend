import React from 'react';
import styles from './listTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';
import editIcon from '../../../../public/assets/images/Edit-table-icon.svg';
import Image from 'next/image';
const ListTable = ({ data, loading }) => {
  return (
    <div className={styles.table_wrap}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Profile</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            data.map((item, idx) => {
              return (
                <tr key={item.key}>
                  <th scope="row">{idx + 1}</th>
                  <td>Mark</td>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.role.name}</td>
                  <td>
                    {item.isActive && (
                      <div>
                        <span className={styles.dot}></span>
                        <span>active</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <Image
                      src={editIcon}
                      width={15}
                      height={15}
                      layout="fixed"
                      alt="delte-icon"
                    />
                  </td>
                  <td>
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
            })
          ) : (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListTable;
