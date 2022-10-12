import React from 'react';
import styles from './blogTable.module.scss';
import deleteIcon from '../../../../public/assets/images/delete-table-icon.svg';
import Image from 'next/image';
import moment from 'moment';
const BlogTable = ({ data, loading, handlePopup }) => {
  return (
    <div className={styles.table_wrap}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Username</th>
            <th scope="col">Blog Title</th>
            <th scope="col">Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            data?.map((item, idx) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.user.userName}</td>
                  <td>{item.title}</td>
                  <td>
                    {moment(item.createdAt.toString()).format('DD/MM/YYYY')}
                  </td>
                  <td>
                    <Image
                      src={deleteIcon}
                      width={15}
                      height={15}
                      layout="fixed"
                      alt="delte-icon"
                      onClick={() => handlePopup(item.id)}
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

export default BlogTable;
